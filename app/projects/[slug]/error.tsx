"use client";

import EmptyState from "@/components/atoms/empty-state";
import { Button } from "@/components/ui/button";
import { FaceSlightlyFrowning } from "lucide-react";
import { useTransition } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function Error({error, retry}: ErrorPageProps) {
  const [ isPending, startTransition ] = useTransition()
  console.error(error)
  
  const handleRetry = () => {
    startTransition(() => {
      retry()
    })
  }
  
  if (isPending) {
    return (
      <EmptyState
        mediaSpinner
        emptyStateDescription='Please wait a moment'
        emptyStateTitle='Retrying...'
      />
    )
  }
  return (
    <EmptyState
      emptyStateDescription="An unexpected exception occurred during data processing. Please try reloading in a moment."
      emptyStateTitle="Something went wrong"
      emptyStateIcon={FaceSlightlyFrowning}
    >
      <Button 
        variant="outline"
        onClick={() => handleRetry()} 
      >
        Retry
      </Button>
    </EmptyState>
  )
}
