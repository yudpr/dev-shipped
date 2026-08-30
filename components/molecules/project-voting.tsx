import { ComponentProps } from "react";
import { Button } from "../ui/button";
import ProjectVotingButton from "../atoms/project-voting-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectVotingProps extends
  ComponentProps<"div"> {
    votes: number
    hasVoted: boolean
  }

export default function ProjectVoting({
  votes,
  hasVoted,
  className
}: ProjectVotingProps) {
  return (
    <div className={cn("flex flex-col w-fit items-center", className)}>
      <ProjectVotingButton hasVoted={hasVoted} intent="up-vote">
        <ChevronUp className="size-5"/>
      </ProjectVotingButton>
      <span className="text-sm font-semibold transition-colors text-foreground">{votes}</span>
      <ProjectVotingButton hasVoted={hasVoted} intent="down-vote">
        <ChevronDown className="size-5"/>
      </ProjectVotingButton>
    </div>
  )
}