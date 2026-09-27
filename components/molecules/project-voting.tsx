"use client";

import { ComponentProps } from "react";
import ProjectVotingButton from "../atoms/project-voting-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectVotingAction } from "@/lib/projects/project-actions";

interface ProjectVotingProps extends
  ComponentProps<"div"> {
    votes: number
    userVote: "up" | "down" | null
    projectId: number
  }

export default function ProjectVoting({
  votes,
  userVote,
  className,
  projectId
}: ProjectVotingProps) {

  const upvoteHandler = async () => {
    const result = await projectVotingAction(projectId, "up")
    // Optimistic update will be implemented soon
  }

  const downvoteHandler = async () => {
    const result = await projectVotingAction(projectId, "down")
    // Optimistic update will be implemented soon
  }
  return (
    <div className={cn("flex flex-col w-fit items-center", className)}>
      <ProjectVotingButton 
        aria-pressed={userVote === "up"}
        intent="up-vote"
        onClick={upvoteHandler}
      >
        <ChevronUp className="size-5"/>
      </ProjectVotingButton>
      <span className="text-sm font-semibold transition-colors text-foreground">{votes}</span>
      <ProjectVotingButton 
        aria-pressed={userVote === "down"}
        intent="down-vote"
        onClick={downvoteHandler}
        >
        <ChevronDown className="size-5"/>
      </ProjectVotingButton>
    </div>
  )
}
