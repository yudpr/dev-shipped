import React, { ComponentProps } from "react";
import EmptyState from "../atoms/empty-state";

interface ProjectCardGroupProps extends
  ComponentProps<typeof EmptyState> {
    children?: React.ReactNode
  }

export default function ProjectCardGroup({
  children,
  emptyStateDescription,
  emptyStateIcon,
  emptyStateTitle
}: ProjectCardGroupProps) {
  const cleanChildren = React.Children.toArray(children);
  const hasChildren = React.Children.count(cleanChildren) > 0
  return (
    <div className="grid-wrapper">
        {
          hasChildren
            ? children
            : <EmptyState
                emptyStateDescription={emptyStateDescription}
                emptyStateIcon={emptyStateIcon}
                emptyStateTitle={emptyStateTitle}
              />
        }
    </div>
  )
}