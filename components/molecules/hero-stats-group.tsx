import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface HeroStatsGroupProps extends
  ComponentProps<"div"> {}

export default function HeroStatsGroup({
  className,
  children,
  ...props
}: HeroStatsGroupProps) {
  return (
    <div 
      className={cn("flex flex-col items-center sm:flex-row justify-center gap-8 sm:gap-12 max-w-2xl w-full", className)} 
      {...props}
    >
      {
        React.Children.toArray(children)
          .flatMap((i, index) => (
            index === 0
              ? [i]
              : [<Separator className="data-horizontal:w-32 sm:data-horizontal:self-stretch sm:data-horizontal:h-auto sm:data-horizontal:w-px" />, i]
          ))
      }
    </div>
  )
}