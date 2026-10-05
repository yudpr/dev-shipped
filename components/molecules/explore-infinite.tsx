"use client";

import { type CursorType, type ExploreProjectSuccess } from "@/lib/projects/project-select";
import ProjectCard from "./project-card";
import { useState } from "react";
import ProjectCardGroup from "../organisms/project-card-group";
import { Compass, FaceSlightlyFrowning, SearchX, WifiOff } from "lucide-react";

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
}

export default function ExploreInfinite({
  projects: queriedProjects,
  nextCursor,
  emptyStateMessage
}: ExploreInfiniteProps) {
  const [ projects, setProjects ] = useState(queriedProjects)

  return (
    <>
      <ProjectCardGroup
        emptyStateDescription={emptyStateMessage?.description}
        emptyStateTitle={emptyStateMessage?.title}
        emptyStateIcon={emptyStateMessage?.type && emptyStateIconDict[emptyStateMessage.type]}
      >
        { projects && projects.map((i, index) => <ProjectCard {...i} key={index}/>)}
      </ProjectCardGroup>

    </>
  )
}