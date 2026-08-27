import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface HeroHeadingProps extends
  ComponentProps<"h1">{}

export default function HeroHeading({
  className,
  ...props
}: HeroHeadingProps) {
  return (
    <h1 className={(cn("text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl", className))} {...props}/>
  )
}