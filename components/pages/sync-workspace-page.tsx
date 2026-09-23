"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '../ui/toast';

export default function SyncWorkspacePage() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  useEffect(() => {
    if (isSuccess) {
      toast.add({
        type: "success",
        description: "Project submitted successfully. Your project will be reviewed shortly.",
        id: "project-submitted-toast" // To avoid double toast in dev mode.
      })
    }
  }, [isSuccess]);

  // Set active newOrgId logic will be implemented here.
  return <></>
}