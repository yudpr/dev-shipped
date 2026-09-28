type ProjectPageProps = { params: Promise<{ slug: string }> }

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  // logic for handling getProjectBySlug will be implemented here
  return (
    <h1>{slug}</h1>
  )
}