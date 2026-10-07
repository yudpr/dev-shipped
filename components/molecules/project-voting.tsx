"use client";

import { ComponentProps, startTransition, useOptimistic } from "react";
import ProjectVotingButton from "../atoms/project-voting-button";
import { Triangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectVotingAction } from "@/lib/projects/project-actions";
import { toast } from "../ui/toast";
import { cva, VariantProps } from "class-variance-authority";

const projectVotingVariants = cva(
  "",
  {
    variants: {
      size: {
        default: "[&_svg]:size-4 [&>span]:text-base",
        lg: "[&_svg]:size-5 [&>span]:text-lg"
      }
    },
    defaultVariants: {
      size: "default"
    },
  }
)
interface ProjectVotingProps extends
  ComponentProps<"div"> {
    votes: number
    userVote: "up" | "down" | null
    projectId: number,
    size?: VariantProps<typeof projectVotingVariants>["size"]
  }

type IncomingVote = "up" | "down"

export default function ProjectVoting({
  votes,
  userVote,
  className,
  size,
  projectId
}: ProjectVotingProps) {
  const [ optimisticVotes, setOptimisticVotes ] = useOptimistic(
    { votes, userVote },
    (state, incomingVote: IncomingVote) => {
      const undoing = state.userVote === incomingVote
      const switching = state.userVote !== null && !undoing
      const amount = undoing
        ? incomingVote === "up" ? -1 : 1
        : switching
          ? incomingVote === "up" ? 2 : -2
          : incomingVote === "up" ? 1 : -1

      return {
        votes: Math.max(0, state.votes + amount),
        userVote: undoing ? null : incomingVote   
      }
    }
  )

  const votingHandler = (incomingVote: IncomingVote) => {
    startTransition(async () => {
      
      setOptimisticVotes(incomingVote)

      try {
        const result = await projectVotingAction(projectId, incomingVote)
        
        if (!result.success) {
          toast.add({
            type: "error",
            description: result.error
          })  
        }
      } catch (error) {
        console.error(error)
        toast.add({
          type: "error",
          description: "Network error. Please check your connection, then try again."
        })
      }
    })
  }

  return (
    <div className={cn(
        "flex flex-col w-fit items-center", 
        projectVotingVariants({ size }),
        className
    )}>
      <ProjectVotingButton 
        aria-pressed={optimisticVotes.userVote === "up"}
        intent="up-vote"
        size={size}
        onClick={() => { votingHandler("up") }}
      >
        <Triangle className="size-4 fill-current stroke-0"/>
      </ProjectVotingButton>
      <span className="text-base font-semibold transition-colors text-foreground">{optimisticVotes.votes}</span>
      <ProjectVotingButton 
        aria-pressed={optimisticVotes.userVote === "down"}
        intent="down-vote"
        size={size}
        onClick={() => { votingHandler("down") }}
        >
        <Triangle className="size-4 fill-current stroke-0 rotate-180"/>
      </ProjectVotingButton>
    </div>
  )
}
