"use server";

import { type ProjectSubmitFormData } from "@/components/molecules/project-submit-form";
import { formSchema } from "@/components/molecules/project-submit-form.schema";
import { db } from "@/db";
import { projects, votes } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ActionResult =
  | { success: false, error: string }
  | { 
      success: true, 
      message?: string, 
      data?: {
        isSlugAvailable?: boolean,   
        sync?: SyncWorkspaceData
      } 
    }

type SyncWorkspaceData = 
  | { 
      shouldSyncWorkspace: true 
      newOrgId: string
    }
  | { 
      shouldSyncWorkspace?: false 
      newOrgId?: never
    }

export const addProjectAction = async (data: ProjectSubmitFormData): Promise<ActionResult> => {
  let targetOrgId: string | null | undefined = null
  let shouldSyncWorkspace = false

  try {
    const { userId, orgId } = await auth();

    targetOrgId = orgId

    if (!userId) {
      return { success: false, error: "You must be signed-in to submit." }
    }

    if (!targetOrgId) {
      const result = await createDefaultOrg()
      if (!result.success) {
        return result
      }
      
      if (!result.data?.sync?.shouldSyncWorkspace || !result.data.sync.newOrgId ){
        return {
          success: false,
          error: "Organization context is missing."
        }
      }

      targetOrgId = result.data.sync.newOrgId
      shouldSyncWorkspace = result.data.sync.shouldSyncWorkspace
    }

    const validatedData = formSchema.safeParse(data)

    if (!validatedData.success) {
      return { success: false, error: "Validation Error:" + validatedData.error.issues.map(i => i.message).join("; ") + "." }
    }
    await db.insert(projects).values({ 
      ...validatedData.data, 
      userId,
      organizationId: targetOrgId
    })

    if (shouldSyncWorkspace) {
      return {
        success: true,
        data: {
          sync: {
            newOrgId: targetOrgId,
            shouldSyncWorkspace: true
          }
        }
      }
    }

    return { success: true }
  } catch(error) {
    console.error(error)
    return { success: false, error: "Failed to submit project." }
  }
}

/**
 * Live checking lives in client component so it needs to live as
 * server action then will be imported to client component. Live
 * check should not be cached, so no 'use cache' is used.
 */
export const checkSlugAvailability = async (slug: string): Promise<ActionResult> => {
  const validatedSlug = formSchema.pick({ slug: true }).safeParse({ slug })
  if (!validatedSlug.success) {
    return { success: false, error: validatedSlug.error.issues.map(i => i.message).join("; ") + "." }
  }
  try {
    const result = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, validatedSlug.data.slug))
      .limit(1)

    return { success: true, data: { isSlugAvailable: result.length === 0 } }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Database exception occured."}
  }
}

/**
 * If the user doesn't belong to an org, create an org dedicated 
 * for the users as the app needs them to belong to an org.
 */
const createDefaultOrg = async (): Promise<ActionResult> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "You must be signed-in to submit." }
    }

    const client = await clerkClient()

    const user = await client.users.getUser(userId)

    const orgName = user.fullName
      ?? user.firstName
      ?? user.username
      ?? user.primaryEmailAddress?.emailAddress.split("@")[0]
      ?? "My Workspace"

    /**
     * The user becomes admin of its own organization automatically.
     */
    const newOrg = await client.organizations.createOrganization({
      name: orgName + "'s Organization",
      createdBy: userId
    })
    
    /**
     * Confirm if newOrgId is available before returning it.
     */
    if (!newOrg.id) {
      return {
        success: false,
        error: "Organization context is missing."
      }
    }
    return {
      success: true,
      data: {
        sync: {
          newOrgId: newOrg.id,
          shouldSyncWorkspace: true
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Could not configure your organization workspace. Please try again."
    }
  }
}

type VoteType = "up" | "down"

export const projectVotingAction = async (
  projectId: number, 
  incomingVoteType: VoteType, 
  currentPath: string
): Promise<ActionResult> => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { success: false, error: "You must be signed-in to submit." }
    }
    
    /**
     * Look for an existing vote from the user.
     */
    const existingVote = await db
      .select({ voteType: votes.voteType })
      .from(votes)
      .where(and(eq(votes.projectId, projectId), eq(votes.userId, userId)))
      .limit(1)
      .then((rows) => rows[0]) // unpack that one data from array
    
    /**
     * Keep database atomic by using transaction because this action needs to
     * mutate two tables at the same execution, projects' vote count and votes'
     * vote type.
     */
    await db.transaction(async (tx) => {
      /**
       * Undo vote if the user click the same button as the existing vote.
       */
      if (existingVote && existingVote.voteType === incomingVoteType) {
        await tx
          .delete(votes)
          .where(and(eq(votes.projectId, projectId), eq(votes.userId, userId)))
        
        const modifier = incomingVoteType === "up"? -1 : 1
        await tx
          .update(projects)
          .set({ voteCount: sql`GREATEST(0, vote_count + ${modifier})` })
          .where(eq(projects.id, projectId))

      /**
       * Direct change if the user clicked the opposite button as the existing vote.
       */
      } else if ( existingVote && existingVote.voteType !== incomingVoteType) {
        await tx
          .update(votes)
          .set({ voteType: incomingVoteType })
          .where(and(eq(votes.projectId, projectId), eq(votes.userId, userId)))
        
        const modifier = incomingVoteType === "up"? 2 : -2
        await tx
          .update(projects)
          .set({ voteCount: sql`GREATEST(0, vote_count + ${modifier})` })
          .where(eq(projects.id, projectId))

      /**
       * Brand new vote if the existing vote is none.
       */
      } else {
        await tx
          .insert(votes)
          .values({
            projectId,
            userId,
            voteType: incomingVoteType
          })

        const modifier = incomingVoteType === "up"? 1 : -1
        await tx
          .update(projects)
          .set({ voteCount: sql`GREATEST(0, vote_count + ${modifier})` })
          .where(eq(projects.id, projectId))
      }
    })

    /**
     * Clear cache to reflect changes on the specified path.
     */
    revalidatePath(currentPath)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Could not sync your vote with our database servers." }
  }
}