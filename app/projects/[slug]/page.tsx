import EmptyState from "@/components/atoms/empty-state"
import ProjectPage from "@/components/pages/project-page"
import { getApprovedProjectSlugs } from "@/lib/projects/project-select"
import { Suspense } from "react"

/**
 * This is needed for optimizing dynamic routes and SEO,
 * because Next.js will memoize and pre-render these slugs 
 * in production.
 */
export const generateStaticParams = async () => {
  const approvedProjectSlugs = await getApprovedProjectSlugs()
  return approvedProjectSlugs.map(p => ({ slug: p.slug })) //field is named "slug" because the dynamic folder name is [slug]
}

/**
 * No need "dynamicParams = true", because it isn't available
 * when cacheComponent = true. But cachedComponent can also 
 * allows Next.js to memoize newly generated project slugs
 * instead of just slugs that already exists at build time.
 */

export default function Project({ params }:PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={
      <EmptyState
        emptyStateTitle="Loading layout engine..."
        emptyStateDescription=""
        mediaSpinner
      />
    }>
      <ProjectPage params={params}/>
    </Suspense>
  )
}
