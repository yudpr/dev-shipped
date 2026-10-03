"use client";

import { Compass } from "lucide-react";
import ExploreSearch from "../molecules/explore-search";
import ProjectCardGroup from "./project-card-group";
import { getExploreProjects } from "@/lib/projects/project-select";
import { ChangeEvent, Suspense, useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { searchParamsSchema, type SearchParamsType } from "./project-explorer.schema";
import z from "zod";
import ProjectCard from "../molecules/project-card";

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
  }, 400)

  const handleOrder = useCallback((sortType: SearchParamsType["sort"]) => {
    const params = new URLSearchParams(searchParams)

    if (sortType) {
      params.set("sort", sortType)
    } else {
      params.delete("sort")
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [])

  const [ error, setError ] = useState<ExloreProjectStateError>({ invalid: false })
  const query = searchParams.get("query")
  const sort = searchParams.get("sort")
  const [ projects, setProjects ] = useState<any[]>([])

  useEffect(() => {
    (async function () {
      const searchParamsValidation = searchParamsSchema.safeParse({ sort, query })

      if (!searchParamsValidation.success) {
        setError({
          invalid: true,
          errors: searchParamsValidation.error.issues
        })
        return
      }
      
      const result = await getExploreProjects(searchParamsValidation.data)
      
      if (!result.success) {
        setError({
          invalid: true,
          errors: result.errors
        })
        return
      }
      setError({invalid: false})

      setProjects(result.data)
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
      isPending
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
      <Suspense fallback={<></>}>
        <ProjectExplorer />
      </Suspense>
    </div>
  )
}

function ProjectExplorer() {
  const { exploreProject, exploreProjectState } = useExploreProject()
  // skeleton loading will be implemented soon
  return (
    <>
      <ExploreSearch {...exploreProject}/>
      <ProjectCardGroup 
        emptyStateDescription={emptyState.empty.description}
        emptyStateTitle={emptyState.empty.title}
        emptyStateIcon={Compass}
      >
       { exploreProjectState.data.map(i => <ProjectCard {...i} key={i.id}/>)} 
      </ProjectCardGroup>
    </>
  )
}
