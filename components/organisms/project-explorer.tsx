"use client";

import { Compass } from "lucide-react";
import ExploreSearch from "../molecules/explore-search";
import ProjectCardGroup from "./project-card-group";
import { ExploreProjectSuccess, getExploreProjects } from "@/lib/projects/project-select";
import { ChangeEvent, Suspense, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { searchParamsSchema, type SearchParamsType } from "./project-explorer.schema";
import z from "zod";
import ProjectCard from "../molecules/project-card";
import SkeletonLoading from "../atoms/skeleton-loading";

interface ExloreProjectStateErrorTrue {
  invalid: true
  errors: z.ZodError["issues"]
}

interface ExloreProjectStateErrorFalse {
  invalid: false
}

type ExloreProjectStateError = ExloreProjectStateErrorTrue | ExloreProjectStateErrorFalse

export type UseExploreProject = ReturnType<typeof useExploreProject>

function useExploreProject() {
  const requestId = useRef(0)

  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const trimmedSearch = e.target.value.trim()
    if (trimmedSearch) {
      params.set("query", e.target.value)
    } else {
      params.delete("query")
    }
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
    setIsLoading(true)
  }, 400)

  const handleOrder = useDebouncedCallback((sortType: SearchParamsType["sort"]) => {
    const params = new URLSearchParams(searchParams)

    if (sortType) {
      params.set("sort", sortType)
    } else {
      params.delete("sort")
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
    setIsLoading(true)
  }, 400)

  const [ error, setError ] = useState<ExloreProjectStateError>({ invalid: false })
  const query = searchParams.get("query")
  const sort = searchParams.get("sort")
  const [ projects, setProjects ] = useState<ExploreProjectSuccess["data"]>([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    (async function () {
      const id = ++requestId.current
      const searchParamsValidation = searchParamsSchema.safeParse({ sort, query })

      if (!searchParamsValidation.success) {
        setError({
          invalid: true,
          errors: searchParamsValidation.error.issues
        })
        setIsLoading(false)
        return
      }
      
      const result = await getExploreProjects(searchParamsValidation.data)
      
      if (!result.success) {
        setError({
          invalid: true,
          errors: result.errors
        })
        setIsLoading(false)
        return
      }

      if (id === requestId.current) {
        setError({invalid: false})
        setProjects(result.data)
        setIsLoading(false)
      }
    })()
  }, [sort, query])


  return {
    exploreProject:{
      searchParams,
      handleOrder,
      handleSearch
    },
    exploreProjectState: {
      data: projects,
      error,
      isSearching: isPending || isLoading
    }
  }
}

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

export default function ProjectExplorerSection() {
  return(
    <div className="space-y-10">
      <Suspense fallback={<LoadingProjectExplorer />}>
        <ProjectExplorer />
      </Suspense>
    </div>
  )
}

function ProjectExplorer() {
  const exploreProject = useExploreProject()
  
  return (
    <>
      <ExploreSearch {...exploreProject}/>
      {
        exploreProject.exploreProjectState.isSearching
          ? <LoadingProjects />
          : (
              <ProjectCardGroup 
                emptyStateDescription={emptyState.empty.description}
                emptyStateTitle={emptyState.empty.title}
                emptyStateIcon={Compass}
              >
              { exploreProject.exploreProjectState.data.map(i => <ProjectCard {...i} key={i.id}/>)} 
              </ProjectCardGroup>

            )
      }
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
    <div className="space-y-10">
      <div className="space-y-5">
        <div className="flex justify-center">
          <SkeletonLoading className="max-w-3xl flex-1 h-10 hidden sm:block"/>
        </div>
        <SkeletonLoading className="w-45 h-8 sm:hidden"/>
      </div>
      <LoadingProjects />
    </div>
  )
}
