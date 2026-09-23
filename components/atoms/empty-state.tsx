import { VariantProps } from "class-variance-authority";
import { 
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends
  ComponentProps<typeof EmptyContent>,
  VariantProps<typeof EmptyMedia> {
    emptyStateIcon?: LucideIcon
    emptyStateTitle: string,
    emptyStateDescription: string,
    mediaSpinner?: boolean
  }

export default function EmptyState({
  emptyStateIcon: Icon,
  emptyStateDescription,
  emptyStateTitle,
  variant = "default",
  mediaSpinner = false,
  ...props
}: EmptyStateProps) {
  return (
    <Empty 
      className={cn(
        "col-span-full", 
        !mediaSpinner && "empty-state"
      )}
    >
      <EmptyHeader>
        <EmptyMedia variant={variant}>
          {
            mediaSpinner
            ? <Spinner className="size-10"/>
            : Icon && <Icon/>
          }
        </EmptyMedia>
        <EmptyTitle>{emptyStateTitle}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {emptyStateDescription}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent {...props} />
    </Empty>
  )
}