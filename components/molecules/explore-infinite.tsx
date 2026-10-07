"use client";

import { type CursorType, type ExploreProjectSuccess } from "@/lib/projects/project-select";
import ProjectCard from "./project-card";
import { ComponentProps, useCallback, useEffect, useRef, useState, useTransition } from "react";
import ProjectCardGroup from "../organisms/project-card-group";
import { Compass, FaceSlightlyFrowning, Loader, RefreshCw, SearchX, WifiOff } from "lucide-react";
import { type ExplorePageProps } from "@/app/explore/page";
import { loadMoreExploreProjects } from "@/lib/projects/project-actions";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";

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
  const [ needRetry, setNeedRetry ] = useState(false)

  const loadMoreProjects = useCallback(() => {
    if (!cursor || isPending) return

    startTransition(async () => {
      const result = await loadMoreExploreProjects(params, cursor)
      
      if (!result.success) {
        setNeedRetry(true)

        toast.add({
          type: "error",
          description: result.error
        })
      } else {
        setProjects(prev => [ ...prev, ...result.data.items])
        setCursor(result.data.nextCursor)
      }
    
    })
  }, [cursor, isPending, params, needRetry])

  return {
    loadMoreProjects,
    setNeedRetry,
    state: {
      projects,
      cursor,
      isPending,
      needRetry
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
        { 
          exploreInfinite.state.cursor 
            ? exploreInfinite.state.needRetry 
              ? <RetryLoadingMoreProjects onClick={() => exploreInfinite.setNeedRetry(false)}/> 
              : <ExploreScrollSentinel onVisible={exploreInfinite.loadMoreProjects} />
            : null
        }
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

function RetryLoadingMoreProjects (props: { onClick: ComponentProps<typeof Button>["onClick"]}) {
  return (
    <div className="text-center my-4">
      <Button
        variant="outline"
        size="icon-lg"
        className="rounded-full bg-gray-200 border-gray-300 hover:bg-gray-300"
        { ...props}
      >
        <RefreshCw className="size-6 text-gray-400 hover:text-gray-500" />
      </Button>
    </div>
  )
}