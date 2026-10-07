"use client";

import EmptyState from "@/components/atoms/empty-state";
import { Button } from "@/components/ui/button";
import { FaceSlightlyFrowning } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({error, reset}: ErrorPageProps) {
  console.error(error)
  return (
    <EmptyState
      emptyStateDescription="An unexpected exception occurred during data processing. Please try reloading in a moment."
      emptyStateTitle="Something went wrong"
      emptyStateIcon={FaceSlightlyFrowning}
    >
      <Button 
        variant="outline"
        onClick={() => reset()} 
      >
        Refresh
      </Button>
    </EmptyState>
  )
}
