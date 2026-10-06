import ExploreSearch from "../molecules/explore-search";
import { type CursorType, type ExploreProjectSuccess, getExploreProjects } from "@/lib/projects/project-select";
import { Suspense } from "react";
import SkeletonLoading from "../atoms/skeleton-loading";
import { type ExplorePageProps } from "@/app/explore/page";
import ExploreInfinite, { type EmptyStateMessageType } from "../molecules/explore-infinite";

export default function ProjectExplorerSection(props: ExplorePageProps) {
  return(
    <div className="space-y-10">
      <Suspense fallback={<LoadingProjectExplorer />}>
        <ProjectExplorer {...props}/>
      </Suspense>
    </div>
  )
}

async function ProjectExplorer({searchParams}: ExplorePageProps) {
  /**
   * Switched to this version because earlier form has two request.
   * Those are triggered by "router.replace" which render the RSC
   * and let the server query to get the latest value from db. The other
   * one is by calling server action/RPC with "getExploreProjects" that 
   * takes values from "useSearchParams" in "useEffect", which directly
   * interract to the database instead of the server.
   * 
   * The prove is, in the network tab, there are two queries names
   * with only difference is one of them has "_rsc" parameter. Query
   * with "_rsc" is triggered by "router.replace", otherwise is the one
   * in "useEffect". Both request and receive exactly the same value.
   * 
   * This new approach uses "searchParams" that is taken from "PageProps"
   * and as an argument for getExploreProjects in server component to get the
   * new RSC. When "router.replace" is called, this "searchParams" will be
   * automatically updated asynchronously.
   * 
   * The "use client" part is now scopped only for handling "router.replace",
   * a state, and a few more.
   */
  let projects: ExploreProjectSuccess["data"]["items"] = []
  let emptyStateMessage: EmptyStateMessageType
  let totalItems: number | undefined
  let nextCursor: CursorType | null = null

  const params = await searchParams

  const result = await getExploreProjects(params, null)
  
  if (result.success && result.data.items.length) {
    projects = result.data.items
    totalItems = result.data.totalItems
    nextCursor = result.data.nextCursor
  } else if (result.success && !result.data.items.length && params.query) {
    emptyStateMessage = {
      type: "notFound", // type needs to be added and get the icon in explore-infinite, because can't pass LucideIcon from RSC to client component
      title: "No projects found",
      description: "We couldn't find anything matching your search. Try checking your spelling, broadening your terms, or clearing your filters.",
    }
  } else if (result.success && !result.data.items.length && !params.query){
    emptyStateMessage = {
      type: "emptyFeed",
      title: "Empty feed",
      description: "No active projects are registered on this dashboard yet. Once a project is added, it will populate here instantly.",
    }
  } else if (!result.success){
    emptyStateMessage = {
      type: "fetchError",
      title: "Cannot process your queries",
      description: result.error, // not moving the entire empty messages because, this value is the only message that is taken from get-explore-projects. It seems doing it this way easier than passing it to the prop.
    }
  } 
  
  return (
    <>
      <ExploreSearch totalItems={totalItems}/>
      <ExploreInfinite
        key={`${params.query ?? ""}-${params.sort ?? ""}`} // To refresh the component every params changes instead of just props.
        projects={projects}
        nextCursor={nextCursor}
        emptyStateMessage={emptyStateMessage}
        params={params}
      />
    </>
  )
}

function LoadingProjects() {
  return (
    <div className="grid-wrapper">
        {[...Array(5)].map((_, index) => <SkeletonLoading key={index} className="w-full h-44 rounded-xl"/>)}
    </div>
  )
}

function LoadingProjectExplorer() {
  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-center">
          <SkeletonLoading className="max-w-3xl flex-1 h-10"/>
        </div>
        <SkeletonLoading className="w-45 h-8 sm:hidden"/>
        <SkeletonLoading className="w-full h-5 sm:hidden"/>
      </div>
      <LoadingProjects />
    </>
  )
}
