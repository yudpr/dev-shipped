import { clerkClient, clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth) => {
  try {
    const { userId, orgId } = await auth()

    /**
     * If the user doesn't belong to an org, create an org dedicated 
     * for the users as the app needs them to belong to an org.
     */
    if (userId && !orgId) {
      const client = await clerkClient()

      /**
       * Check if the user has an organization membership before 
       * trying to login to this app. if it does, continue to the app.
       * Otherwise, create a dedicated org.
       * 
       * The org is gonne get activated in the frontend instead of in
       * middleware.
       */
      const {data: memberships } = await client.users.getOrganizationMembershipList({ userId })

      if (!memberships || memberships.length === 0) {
        const user = await client.users.getUser(userId)

        const orgName = user.fullName
          ?? user.firstName
          ?? user.username
          ?? user.primaryEmailAddress?.emailAddress.split("@")[0]
          ?? "My Workspace"
        
        /**
         * The user becomes admin of its own organization automatically.
         */
        await client.organizations.createOrganization({
          name: orgName + "'s Organization",
          createdBy: userId
        })
      }
    }
  } catch (error) {
    console.error("Organization provisioning failed silently:", error);
  }
  return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
