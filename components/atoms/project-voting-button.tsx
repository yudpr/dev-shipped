import { ComponentProps } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const projectVotingButtonVariants = cva(
  "bg-transparent text-primary/40 hover:text-primary/70 aria-pressed:text-primary aria-pressed:hover:bg-primary-foreground/50 aria-pressed:[&_svg]:stroke-3",
  {
    variants: {
      intent: {
        "up-vote": "hover:bg-secondary/30",
        "down-vote": "hover:bg-destructive/20"
      },

    }
  }
)

interface ProjectVotingButtonProps extends
  ComponentProps<typeof Button>,
  VariantProps<typeof buttonVariants>,
  VariantProps<typeof projectVotingButtonVariants> {}

export default function ProjectVotingButton({
  variant="ghost",
  intent="up-vote",
  size="default",
  className,
  ...props
}: ProjectVotingButtonProps) {
  return (
    <Button 
      className={cn(
        buttonVariants({size, variant}),
        projectVotingButtonVariants({intent}),
        "relative z-10",
        className
      )} {...props}/>
  )
}
