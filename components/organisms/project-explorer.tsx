import { Compass, FaceSlightlyFrowning, LucideIcon, WifiOff } from "lucide-react";
import ExploreSearch from "../molecules/explore-search";
import ProjectCardGroup from "./project-card-group";
import { ExploreProjectSuccess, getExploreProjects } from "@/lib/projects/project-select";
import { Suspense } from "react";
import ProjectCard from "../molecules/project-card";
import SkeletonLoading from "../atoms/skeleton-loading";
import { type ExplorePageProps } from "@/app/explore/page";

type EmptyStateMessageType =
  | undefined
  | {
      title: string,
      description: string,
      icon: LucideIcon
    }

export default function ProjectExplorerSection(props: ExplorePageProps) {
  return(
    <div className="space-y-10">
      <Suspense fallback={<LoadingProjectExplorer />}>
        <ExploreSearch />
      </Suspense>
      <Suspense fallback={<LoadingProjects />}>
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
  let projects: ExploreProjectSuccess["data"] = []
  let emptyStateMessage: EmptyStateMessageType

  try {
    const params = await searchParams
    const result = await getExploreProjects(params)
    
    if (result.success && result.data.length) {
      projects = result.data
    } else if (result.success && !result.data.length && params.query) {
      emptyStateMessage = {
        title: "No projects found",
        description: "We couldn't find anything matching your search. Try checking your spelling, broadening your terms, or clearing your filters.",
        icon: Compass
      }
    } else if (result.success && !result.data.length && !params.query){
      emptyStateMessage = {
        title: "Empty feed",
        description: "No active projects are registered on this dashboard yet. Once a project is added, it will populate here instantly.",
        icon: Compass
      }
    } else if (!result.success){
      emptyStateMessage = {
        title: "Cannot process your queries",
        description: result.errors.map(i => i.message).join("; ") + ".",
        icon: FaceSlightlyFrowning
      }
    }

  } catch {
    emptyStateMessage = {
      title: "Connection interrupted",
      description: " We couldn't load this page because your internet connection is a bit unstable. Please check your signal and try again.",
      icon: WifiOff
    }
  }

  return (
    <ProjectCardGroup 
      emptyStateDescription={emptyStateMessage?.description}
      emptyStateTitle={emptyStateMessage?.title}
      emptyStateIcon={emptyStateMessage?.icon}
    >
    { projects && projects.map(i => <ProjectCard {...i} key={i.id}/>)} 
    </ProjectCardGroup>
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
    <div className="space-y-5">
      <div className="flex justify-center">
        <SkeletonLoading className="max-w-3xl flex-1 h-10"/>
      </div>
      <SkeletonLoading className="w-45 h-8 sm:hidden"/>
      <SkeletonLoading className="w-full h-5 sm:hidden"/>
    </div>
  )
}
