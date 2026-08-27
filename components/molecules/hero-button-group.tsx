import { cn } from "@/lib/utils";

import { ComponentProps } from "react";

interface HeroButtonGroupProps extends
  ComponentProps<"div"> {}

export default function HeroButtonGroup({
  className,
  children,
  ...props
}: HeroButtonGroupProps) {
  return (
    <div 
      className={cn("flex flex-col sm:flex-row gap-4 mb-16", className)}
      {...props}
    >
      {children}
    </div>
  )
}