import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getFeaturedProjects() {
  const projectsData = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.voteCount))
    .limit(5)

  return projectsData
}