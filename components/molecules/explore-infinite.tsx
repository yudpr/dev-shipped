"use client";

import { type CursorType, type ExploreProjectSuccess } from "@/lib/projects/project-select";
import ProjectCard from "./project-card";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import ProjectCardGroup from "../organisms/project-card-group";
import { Compass, FaceSlightlyFrowning, Loader, SearchX, WifiOff } from "lucide-react";
import { type ExplorePageProps } from "@/app/explore/page";
import { loadMoreExploreProjects } from "@/lib/projects/project-actions";

const emptyStateIconDict = {
  notFound: SearchX,
  emptyFeed: Compass,
  fetchError: FaceSlightlyFrowning,
  networkError: WifiOff
}

export type EmptyStateMessageType =
  | undefined
  | {
      type: keyof typeof emptyStateIconDict,
      title: string,
      description: string,
    }

interface ExploreInfiniteProps {
  projects: ExploreProjectSuccess["data"]["items"]
  nextCursor: CursorType | null
  emptyStateMessage: EmptyStateMessageType
  params: Awaited<ExplorePageProps["searchParams"]>
}

function useExploreInfinite(
  queriedProjects: ExploreProjectSuccess["data"]["items"],
  nextCursor: CursorType | null,
  params: Awaited<ExplorePageProps["searchParams"]>
) {
  const [ projects, setProjects ] = useState(queriedProjects)
  const [ cursor, setCursor ] = useState(nextCursor)
  const [ isPending, startTransition ] = useTransition()

  const loadMoreProjects = useCallback(() => {
    if (!cursor || isPending) return

    startTransition(async () => {
      try {
        const result = await loadMoreExploreProjects(params, cursor)

        if (!result.success) {
          // show result.error with sonner
        } else {
          setProjects(prev => [ ...prev, ...result.data.items])
          setCursor(result.data.nextCursor)
        }
      } catch {
        // show network error with sonner
      }
    })
  }, [cursor, isPending, params])

  return {
    loadMoreProjects,
    state: {
      projects,
      cursor,
      isPending
    }
  }
}

export default function ExploreInfinite({
  projects,
  nextCursor,
  emptyStateMessage,
  params
}: ExploreInfiniteProps) {
  const exploreInfinite = useExploreInfinite(projects, nextCursor, params)

  return (
    <>
      <ProjectCardGroup
        emptyStateDescription={emptyStateMessage?.description}
        emptyStateTitle={emptyStateMessage?.title}
        emptyStateIcon={emptyStateMessage?.type && emptyStateIconDict[emptyStateMessage.type]}
      >
        { !!exploreInfinite.state.projects.length && exploreInfinite.state.projects.map(i => <ProjectCard {...i} key={i.id}/>)}
      </ProjectCardGroup>
        { exploreInfinite.state.cursor && <ExploreScrollSentinel onVisible={exploreInfinite.loadMoreProjects}/>}
        { exploreInfinite.state.isPending && <LoadingMoreProjects />}
    </>
  )
}

function ExploreScrollSentinel({ onVisible }: { onVisible: () => void}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && onVisible())
    observer.observe(el)

    return () => observer.disconnect()
  }, [onVisible])

  return <div ref={ref} aria-hidden />
}

function LoadingMoreProjects() {
  return (
    <div className="text-center my-4">
      <Loader 
        role="status"
        aria-label="Loading"
        className="animate-spin size-8 mx-auto text-primary"
      />
    </div>
  )
}
