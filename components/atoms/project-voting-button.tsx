import { ComponentProps } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const projectVotingButtonVariants = cva(
  "bg-transparent text-primary hover:text-primary",
  {
    variants: {
      intent: {
        "up-vote": "aria-pressed:bg-primary/10 aria-pressed:hover:bg-primary/20 aria-[pressed=false]:hover:bg-primary/10",
        "down-vote": "aria-pressed:text-destructive aria-[pressed=false]:opacity-50 aria-[pressed=false]:cursor-not-allowed"
      },

    }
  }
)

interface ProjectVotingButtonProps extends
  ComponentProps<typeof Button>,
  VariantProps<typeof buttonVariants>,
  VariantProps<typeof projectVotingButtonVariants> {
    hasVoted: boolean
  }

export default function ProjectVotingButton({
  variant="ghost",
  size="icon-sm",
  hasVoted=false,
  intent="up-vote",
  className,
  ...props
}: ProjectVotingButtonProps) {
  return (
    <Button 
      aria-pressed={hasVoted}
      className={cn(
        buttonVariants({size, variant}),
        projectVotingButtonVariants({intent}),
        className
      )} {...props}/>
  )
}