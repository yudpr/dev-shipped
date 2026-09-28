type ProjectPageProps = { params: Promise<{ slug: string }> }

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  return (
    <h1>{slug}</h1>
  )
}