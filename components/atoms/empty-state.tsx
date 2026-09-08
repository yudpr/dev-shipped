import { 
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { LucideIcon, RefreshCcwIcon } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
    emptyStateIcon: LucideIcon
    emptyStateTitle: string,
    emptyStateDescription: string,
  }

export default function EmptyState({
  emptyStateIcon: Icon,
  emptyStateDescription,
  emptyStateTitle
}: EmptyStateProps) {
  return (
    <Empty className="empty-state col-span-full">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{emptyStateTitle}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {emptyStateDescription}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCcwIcon data-icon="inline-start" />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}