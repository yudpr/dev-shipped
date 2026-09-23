import EmptyState from "@/components/atoms/empty-state";
import SyncWorkspacePage from "@/components/pages/sync-workspace-page";
import { Suspense } from "react";

export default function SyncWorkspace() {
  return (
    <Suspense fallback={
      <EmptyState
        emptyStateTitle="Loading layout engine..."
        emptyStateDescription=""
        mediaSpinner
      />
    }>
      <SyncWorkspacePage />
    </Suspense>
  )
}
