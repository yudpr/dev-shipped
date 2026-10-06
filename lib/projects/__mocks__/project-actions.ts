import { getExploreProjects } from "./project-select"

export const addProjectAction = async () => {
  return { 
    success: true, 
    message: "Project submitted successfully. Your project will be reviewed shortly." 
  }
}

export const checkSlugAvailability = async () => {
  return { success: true }
}

export const projectVotingAction = async () => {
  return { success: true }
}

export function loadMoreExploreProjects() {
  return getExploreProjects()
}
