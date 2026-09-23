"use server";

import { type ProjectSubmitFormData } from "@/components/molecules/project-submit-form";
import { formSchema } from "@/components/molecules/project-submit-form.schema";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

type ActionResult =
  | { success: false, error: string }
  | { 
      success: true, 
      message?: string, 
      data?: {
        isSlugAvailable?: boolean,
        newOrgId?: string
      }
    }

export const addProjectAction = async (data: ProjectSubmitFormData): Promise<ActionResult | void> => {
  let targetOrgId: string | null | undefined = null
  let shouldSyncWorkspace = false 

  try {
    const { userId, orgId } = await auth();

    targetOrgId = orgId

    if (!userId) {
      return { success: false, error: "You must be signed-in to submit." }
    }

    if (!targetOrgId) {
      shouldSyncWorkspace = true

      const result = await createDefaultOrg(userId)
      if (!result.success) {
        return result
      }
      
      if (!result.data?.newOrgId){
        return {
          success: false,
          error: "Organization context is missing."
        }
      }

      targetOrgId = result.data.newOrgId
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

    /**
     * Success action will be redirected.
     */
  } catch(error) {
    console.error(error)
    return { success: false, error: "Failed to submit project." }
  }

  /**
   * redirect should exist outside try/catch block.
   */
  if (shouldSyncWorkspace) {
    redirect("/sync-workspace?success=true") 
  } else {
    redirect("/?success=true")
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
export const createDefaultOrg = async (userId: string): Promise<ActionResult> => {
  try {
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
        newOrgId: newOrg.id
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
