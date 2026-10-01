import Header from "../organisms/header"
import Footer from "../organisms/footer"
import ProjectSection from "../organisms/project-section"
import { Suspense } from "react"
import EmptyState from "../atoms/empty-state"

type ProjectPageProps = { params: Promise<{ slug: string }> }

export default async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <>
      <Header />
      <Suspense fallback={
        <EmptyState
          emptyStateTitle="Loading layout engine..."
          emptyStateDescription=""
          mediaSpinner
        /> // Will be replaced with skeleton loading.
      }>
        <ProjectSection params={params} />
      </Suspense>
      <Footer />
    </>
  )
}
