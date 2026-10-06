import { allProjects } from "@/db/data"

export function getFeaturedProjects() {
  return [
    ...allProjects
  ]
}

export function getRecentProjects() {
  return []
}


export function getProjectBySlug() {

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

const items = [
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 1,
    name: "Markdownify1",
    slug: "markdownify1",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 365
  },
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 2,
    name: "Markdownify2",
    slug: "markdownify2",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 265
  },
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 3,
    name: "Markdownify3",
    slug: "markdownify3",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 165
  }
]

export function getExploreProjects() {
  return { 
    success: true,
    data: {
      items,
      totalItems: 3,
      nextCursor: null
    }
  }
}
