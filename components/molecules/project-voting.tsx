"use client";

import { ComponentProps } from "react";
import ProjectVotingButton from "../atoms/project-voting-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectVotingAction } from "@/lib/projects/project-actions";
import { usePathname } from "next/navigation";

interface ProjectVotingProps extends
  ComponentProps<"div"> {
    votes: number
    hasVoted: boolean
    projectId: number
  }

export default function ProjectVoting({
  votes,
  hasVoted,
  className,
  projectId
}: ProjectVotingProps) {
  const pathname = usePathname()

  const upvoteHandler = async () => {
    const result = await projectVotingAction(projectId, "up", pathname)
    // Optimistic update will be implemented soon
  }

  const downvoteHandler = async () => {
    const result = await projectVotingAction(projectId, "down", pathname)
    // Optimistic update will be implemented soon
  }
  return (
    <div className={cn("flex flex-col w-fit items-center", className)}>
      <ProjectVotingButton 
        hasVoted={hasVoted} 
        intent="up-vote"
        onClick={upvoteHandler}
      >
        <ChevronUp className="size-5"/>
      </ProjectVotingButton>
      <span className="text-sm font-semibold transition-colors text-foreground">{votes}</span>
      <ProjectVotingButton 
        hasVoted={hasVoted} 
        intent="down-vote"
        onClick={downvoteHandler}
        >
        <ChevronDown className="size-5"/>
      </ProjectVotingButton>
    </div>
  )
}