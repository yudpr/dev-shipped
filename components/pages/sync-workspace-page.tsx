"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth, useOrganizationList } from '@clerk/nextjs';
import EmptyState from '../atoms/empty-state';
import { FaceSlightlyFrowning } from 'lucide-react';
import { Button } from '../ui/button';

export default function SyncWorkspacePage() {
    /**
   * Handles if orgId exists.
   */
  const { orgId } = useAuth();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const router = useRouter();
  const searchParams = useSearchParams()
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    /**
     *  Wait until Clerk's security state is fully ready 
     * */
    if (!isLoaded) return;

    /**
     * Continue if orgId exists, otherwise, setActive orgId.
     */
    if (orgId) {
      router.replace('/')
      return
    }
    const newOrgId = searchParams.get("orgId")

    if (userMemberships.data && userMemberships.data.length > 0) {
      setActive({ organization: newOrgId })
        .then(() => { 
          /**
           * Continue if success.
           */
          router.replace('/')
        })
        .catch((error) => {
          console.error("Failed to activate workspace:", error)
          setErrorState(true)
      });
      return
    }

    // Clerk is loaded, but no memberships exist at all after 3 seconds
    const timeout = setTimeout(() => {
      if (!orgId && (!userMemberships.data || userMemberships.data.length === 0)) {
        setErrorState(true);
      }
    }, 3000)

    return () => clearTimeout(timeout);
  }, [isLoaded, orgId, userMemberships.data, setActive, router, searchParams]);

  if (errorState) {
    return (
      <EmptyState
        emptyStateDescription='We are taking longer than usual to sync your workspace records.'
        emptyStateTitle='Workspace Setup Delayed'
        emptyStateIcon={FaceSlightlyFrowning}
      >
        <Button 
          variant="outline"
          onClick={() => router.refresh()} 
        >
          Refresh
        </Button>
      </EmptyState>
    )
  }

  return (
    <EmptyState
      mediaSpinner
      emptyStateDescription='Preparing your project home, please hang tight.'
      emptyStateTitle='Configuring your workspace...'
    />
  );
}
