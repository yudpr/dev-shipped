import { ComponentProps } from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Badge as BaseBadge, badgeVariants } from "../ui/badge";
import LiveStatusIndicator from "./live-status-indicator";

interface HeroBadgeProps extends 
  ComponentProps<typeof BaseBadge>,
  VariantProps<typeof badgeVariants>{}

export default function HeroBadge({
  children,
  variant="outline",
  className,
  ...props
}: HeroBadgeProps) {
  return (
    <BaseBadge
      variant={variant}
      className={cn("px-3 py-2 mb-8 backdrop-blur-sm text-sm font-medium h-auto", className)}
      {...props}
    >
      <LiveStatusIndicator data-icon="inline-start"/>
      {children}
    </BaseBadge>
  )
}