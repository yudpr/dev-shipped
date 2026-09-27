"use client";

import { ComponentProps, startTransition, useOptimistic } from "react";
import ProjectVotingButton from "../atoms/project-voting-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectVotingAction } from "@/lib/projects/project-actions";
import { toast } from "../ui/toast";

interface ProjectVotingProps extends
  ComponentProps<"div"> {
    votes: number
    userVote: "up" | "down" | null
    projectId: number
  }

interface NewData { 
  amount: number, 
  incomingVote: "up" | "down"
}

export default function ProjectVoting({
  votes,
  userVote,
  className,
  projectId
}: ProjectVotingProps) {
  const [ optimisticVotes, setOptimisticVotes ] = useOptimistic(
    { votes, userVote },
    (state, newData: NewData) => ({
      votes: Math.max(0, state.votes + newData.amount),
      userVote: newData.incomingVote
    })
  )

  const votingHandler = (incomingVote: "up"|"down") => {
    startTransition(async () => {
      let modifier = 0

      if (userVote && incomingVote === userVote) {
        modifier = incomingVote === "up"? -1 : 1
      } else if (userVote && incomingVote !== userVote) {
        modifier = incomingVote === "up"? 2 : -2
      } else {
        modifier = incomingVote === "up"? 1 : -1
      }

      setOptimisticVotes({ 
        amount: modifier, 
        incomingVote
      })

      try {
        const result = await projectVotingAction(projectId, incomingVote)
        
        if (!result.success) {
          toast.add({
            type: "error",
            description: result?.error ?? "Something went wrong"
          })  
        }
      } catch {
        toast.add({
          type: "error",
          description: "Network error. Please try again later."
        })  
      }
    })
  }

  return (
    <div className={cn("flex flex-col w-fit items-center", className)}>
      <ProjectVotingButton 
        aria-pressed={optimisticVotes.userVote === "up"}
        intent="up-vote"
        onClick={() => { votingHandler("up") }}
      >
        <ChevronUp className="size-5"/>
      </ProjectVotingButton>
      <span className="text-sm font-semibold transition-colors text-foreground">{optimisticVotes.votes}</span>
      <ProjectVotingButton 
        aria-pressed={optimisticVotes.userVote === "down"}
        intent="down-vote"
        onClick={() => { votingHandler("down") }}
        >
        <ChevronDown className="size-5"/>
      </ProjectVotingButton>
    </div>
  )
}
