import { ComponentProps } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonLoadingProps extends
  ComponentProps<typeof Skeleton> {}

export default function SkeletonLoading({
  className,
  ...props
}: SkeletonLoadingProps) {
  return <Skeleton className={cn("bg-muted/20", className)} {...props}/>
}