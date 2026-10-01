import { Compass } from "lucide-react";
import ExploreSearch from "../molecules/explore-search";
import ProjectCardGroup from "./project-card-group";

// Swap empty state logic will be implemented soon
const emptyState = {
  empty: {
    title: "Empty feed",
    description: "No active projects are registered on this dashboard yet. Once a project is added, it will populate here instantly."
  },
  notFound: {
    title: "No projects found",
    description: "We couldn't find anything matching your search. Try checking your spelling, broadening your terms, or clearing your filters."
  }
}

export default function ProjectExplorer() {
  return (
    <div className="space-y-10">
      <ExploreSearch />
      <ProjectCardGroup 
        emptyStateDescription={emptyState.empty.description}
        emptyStateTitle={emptyState.empty.title}
        emptyStateIcon={Compass}
      >
        {/* Project group and the skeleton, and get projects logic will be implemented soon */}
      </ProjectCardGroup>
    </div>
  )
}
