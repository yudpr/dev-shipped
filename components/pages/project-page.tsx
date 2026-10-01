import Header from "../organisms/header"
import Footer from "../organisms/footer"
import ProjectSection from "../organisms/project-section"
import { Suspense } from "react"
import EmptyState from "../atoms/empty-state"
import SkeletonLoading from "../atoms/skeleton-loading"

type ProjectPageProps = { params: Promise<{ slug: string }> }

export default async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingState />}>
        <ProjectSection params={params} />
      </Suspense>
      <Footer />
    </>
  )
}

function LoadingState() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SkeletonLoading className="mb-8 h-6 w-[134.61px]"/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-start mb-8" >
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                      <SkeletonLoading className="h-9 w-44" />
                    </div>
                    <SkeletonLoading className="h-7 w-125" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkeletonLoading className="h-5 w-16 rounded-full" />
                  <SkeletonLoading className="h-5 w-10 rounded-full" />
                  <SkeletonLoading className="h-5 w-16 rounded-full" />
                  <SkeletonLoading className="h-5 w-10 rounded-full" />
                  <SkeletonLoading className="h-5 w-16 rounded-full" />
                </div>
              </div>
            </div>
            <div className="prose prose-neutral dark:prose-invert max-w-none flex flex-col gap-0.5">
              <SkeletonLoading className="h-7 w-30 mb-4" />
              <SkeletonLoading className="h-6 w-full" />
              <SkeletonLoading className="h-6 w-1/2" />
            </div>
            <SkeletonLoading className="h-36.5 w-full" />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <SkeletonLoading className="h-52.5 w-full rounded-lg mb-6" />
              <SkeletonLoading className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}