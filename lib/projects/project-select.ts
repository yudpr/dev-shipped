import { db } from "@/db";
import { projects } from "@/db/schema";
import { and, desc, eq, gte } from "drizzle-orm";

export async function getFeaturedProjects() {
  const projectsData = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.voteCount))
    .limit(5)

  return projectsData
}

export async function getRecentProjects() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const projectsData = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.status, "approved"),
        gte(projects.createdAt, sevenDaysAgo) //get now up to 7 days before
      )
    )
    .limit(5)

  return projectsData
}