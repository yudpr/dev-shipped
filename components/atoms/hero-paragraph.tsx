import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface HeroParagraphProps extends
  ComponentProps<"p">{}

export default function HeroParagraph({
  className,
  ...props
}: HeroParagraphProps) {
  return (
    <p className={(cn("text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed", className))} {...props}/>
  )
}