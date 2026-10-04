import { searchParamsSchema, type SearchParamsType } from "@/components/organisms/project-explorer.schema";
import { db } from "@/db";
import { projects, votes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, count, desc, eq, ilike, InferSelectModel, or, sql, } from "drizzle-orm";
import { connection } from "next/server";
import z from "zod";

export async function getFeaturedProjects() {
  /**
   * This get-select is no more with "use cache" to disable
   * explicit caching, because technically this function and
   * getRecentProjects query data dynamically in "/" page.
   * 
   * Instead of using revalidatePath, it uses next/cache
   * refresh in the mutation side. revalidatePath purges 
   * get-select caches in that page, while both function 
   * caches nothing. So refresh is the right call as it's only 
   * re-run dynamic get-select to get latest data.
   * 
   */
  const { userId } = await auth()  
  

  const projectsData = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      description: projects.description,
      tags: projects.tags,
      voteCount: projects.voteCount,
      userVote: votes.voteType
    })
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.voteCount))
    .limit(5)
    .leftJoin(
      votes,
      and(
        eq(votes.projectId, projects.id),
        userId 
          ? eq(votes.userId, userId) // only join votes belonging to this userId
          : sql`false`
      )
    )

  return projectsData
}

export async function getRecentProjects() {
  const { userId } = await auth()

  await connection()
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const projectsData = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      description: projects.description,
      tags: projects.tags,
      voteCount: projects.voteCount,
      userVote: votes.voteType,
      createdAt: projects.createdAt
    })
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.createdAt))
    .limit(10)
    .leftJoin(
      votes,
      and(
        eq(votes.projectId, projects.id),
        userId 
          ? eq(votes.userId, userId)
          : sql`false`
      )
    )

  return projectsData.filter(p => 
    p.createdAt &&
      new Date(p.createdAt) >= sevenDaysAgo)
}

export async function getApprovedProjectSlugs() {
  /**
   * No try/catch. Let the db select throws error at build time
   * if error exist.
   */
  const approvedProjectSlugs = await db
    .select({slug: projects.slug})
    .from(projects)
    .where(eq(projects.status, "approved"))

  return approvedProjectSlugs
}

export async function getProjectBySlug(slug: string) {
  const { userId } = await auth()  

  const project = await db
    .select({
      id: projects.id,
      name: projects.name,
      tagline: projects.tagline,
      description: projects.description,
      tags: projects.tags,
      createdAt: projects.createdAt,
      submittedBy: projects.submittedBy,
      websiteUrl: projects.websiteUrl,
      voteCount: projects.voteCount,
      userVote: votes.voteType
    })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1)
    .leftJoin(
      votes,
      and(
        eq(votes.projectId, projects.id),
        userId 
          ? eq(votes.userId, userId)
          : sql`false`
      )
    )
    .then(i => i[0]) // noUncheckedIndexedAccess is set to true might give i[n] an undefined value.
  
  return project
}

export type ExploreProjectSuccess = {
  success: true,
  data: {
    items: (
      & Pick<InferSelectModel<typeof projects>, 
        | "id" 
        | "name" 
        | "slug"
        | "description"
        | "tags"
        | "voteCount"
        | "createdAt"
        > 
      & { 
          userVote: 
            | Pick<InferSelectModel<typeof votes>, "voteType">["voteType"] 
            | null
        }
    )[],
    totalItems?: number
  }
}

type ExploreProjectFailed = {
  success: false,
  errors: z.ZodError["issues"]
}

type ExploreProjectResult = ExploreProjectFailed | ExploreProjectSuccess

export async function getExploreProjects(searchParams: SearchParamsType): Promise<ExploreProjectResult> {

  const { userId } = await auth()

  const searchParamsValidation = searchParamsSchema.safeParse(searchParams)

  if (!searchParamsValidation.success) {
    return {
      success: false,
      errors: searchParamsValidation.error.issues
    }
  }

  const {query: searchQuery, sort: orderBy } = searchParamsValidation.data

  const whereCondition = searchQuery
    ? (
        and(
          eq(projects.status, "approved"),
          or(
            ilike(projects.name, `%${searchQuery}%`),
            sql`EXISTS (
              SELECT 1 FROM jsonb_array_elements_text(${projects.tags}::jsonb) AS tag
              WHERE tag ILIKE ${searchQuery}
            )` // switched to this form because earlier form has no settings for disabling case-sensitivity
          )
        )
      )
    : eq(projects.status, "approved")

  let baseQuery = db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      description: projects.description,
      tags: projects.tags,
      voteCount: projects.voteCount,
      userVote: votes.voteType,
      createdAt: projects.createdAt
    })
    .from(projects)
    .limit(10)
    .leftJoin(
      votes,
      and(
        eq(votes.projectId, projects.id),
        userId 
          ? eq(votes.userId, userId)
          : sql`false`
      )
    )
    .where(whereCondition)
    .$dynamic()
    
  baseQuery = orderBy === "trending" 
    ? baseQuery.orderBy(desc(projects.voteCount))
    : baseQuery.orderBy(desc(projects.createdAt))


  const countQuery = db.select({ total: count() })
    .from(projects)
    .where(whereCondition)
  
  const [ results, counts ] = await Promise.all([ 
    baseQuery, 
    searchQuery 
      ? countQuery
      : Promise.resolve(null) 
  ])
  
  return {
    success: true,
    data: {
      items: results,
      totalItems: counts 
        ? counts[0]?.total ?? undefined
        : undefined
    }
  }
}

