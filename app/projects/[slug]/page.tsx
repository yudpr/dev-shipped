import ProjectPage from "@/components/pages/project-page"
import { getApprovedProjectSlugs } from "@/lib/projects/project-select"

/**
 * This is needed for optimizing dynamic routes and SEO,
 * because Next.js will memoize and pre-render these slugs 
 * in production.
 */
export const generateStaticParams = async () => {
  const approvedProjectSlugs = await getApprovedProjectSlugs()
  return approvedProjectSlugs?.map(p => ({ slug: p.slug })) //field is named "slug" because the dynamic folder name is [slug]

}

/**
 * No need "dynamicParams = true", cachedComponent can also 
 * allows Next.js to memoize newly generated project slugs
 * instead of just slugs that already exists at build time.
 */

type Params = { params: Promise<{ slug: string }> }

export default async function Project({ params }:Params) {
  const { slug } = await params

  return <ProjectPage slug={slug}/>
}
