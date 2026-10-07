"use client";

import { type CursorType, type ExploreProjectSuccess } from "@/lib/projects/project-select";
import ProjectCard from "./project-card";
import { type ComponentProps, useCallback, useEffect, useRef, useState, useTransition } from "react";
import ProjectCardGroup from "../organisms/project-card-group";
import { Compass, FaceSlightlyFrowning, Loader, RefreshCw, SearchX } from "lucide-react";
import { type ExplorePageProps } from "@/app/explore/page";
import { loadMoreExploreProjects } from "@/lib/projects/project-actions";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";

const emptyStateIconDict = {
  notFound: SearchX,
  emptyFeed: Compass,
  fetchError: FaceSlightlyFrowning
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
      /**
       * Re-attached try/catch block as RPC sends message over the live internet,
       * from users' devices to our server. If network connection drops, promise 
       * rejects.
       */
      try {
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
      } catch (error) {
        console.error(error)
        setNeedRetry(true)

        toast.add({
          type: "error",
          description: "Network error. Please check your connection, then try again."
        })
      }
    
    })
  }, [cursor, isPending, params])

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
          exploreInfinite.state.cursor && (
            exploreInfinite.state.needRetry 
              ? <RetryLoadingMoreProjects onClick={() => exploreInfinite.setNeedRetry(false)}/> 
              : <ExploreScrollSentinel onVisible={exploreInfinite.loadMoreProjects} />
          )
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
        className="rounded-full bg-muted/10 border-muted/20 hover:border-muted/30 hover:bg-muted/20"
        aria-label="Retry loading more projects"
        { ...props}
      >
        <RefreshCw 
          className="size-6 text-muted/70 hover:text-muted" 
          aria-hidden="true"
        />
      </Button>
    </div>
  )
}
