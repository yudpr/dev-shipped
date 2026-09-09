import { db } from "@/db";
import { projects } from "@/db/schema";
import {  desc, eq, } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProjects() {
  "use cache";

  const projectsData = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.voteCount))
    .limit(5)

  return projectsData
}

export async function getAllProjects() {
  const projectsData = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "approved"))
    .orderBy(desc(projects.createdAt))
    .limit(10)

  return projectsData
}

export async function getRecentProjects() {
  await connection()
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const projectsData = await getAllProjects()

  return projectsData.filter(p => 
    p.createdAt &&
      new Date(p.createdAt) >= sevenDaysAgo)
}