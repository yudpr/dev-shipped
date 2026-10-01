import { allProjects } from "@/db/data"

export function getFeaturedProjects() {
  return [
    ...allProjects
  ]
}

export function getRecentProjects() {
  return []
}


export function getProjectBySlug(slug="project_slug") {

  return {
    id: "projects_id",
    name: "projects_name",
    tagline: "projects_tagline",
    description: "projects_description",
    tags: ["a", "b", "c", "d", "e"],
    createdAt: null,
    submittedBy: "projects_submittedBy",
    websiteUrl: "projects_websiteUrl",
    voteCount: 123,
    userVote: "votes_voteType"
  }
}