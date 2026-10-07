import { Calendar, ExternalLink, Star, User } from "lucide-react"
import { getProjectBySlug } from "@/lib/projects/project-select"
import { notFound } from "next/navigation"
import SectionHeader from "../molecules/section-header"
import { Badge } from "../ui/badge"
import ProjectVoting from "../molecules/project-voting"
import CustomButton from "../atoms/custom-button"
import ProjectReturnLink from "../atoms/project-return-link"

type ProjectSectionProps = { params: Promise<{ slug: string }> }

export default async function ProjectSection({params}: ProjectSectionProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)    
  
  if (!project) return notFound()

  return (
    <section className="py-16">
      <div className="wrapper">
        <ProjectReturnLink />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-1 min-w-0">
                <SectionHeader
                  description={project.tagline ?? ""}
                  icon={Star}
                  title={project.name}
                />
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
                </div>
              </div>
            </div>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-primary/10">
              <h2 className="text-lg font-semibold mb-4">Project Details</h2>
              <div className="space-y-3">
                {
                  [
                    {
                      label: "Launched:",
                      value: new Date(project.createdAt?.toISOString() ?? "").toLocaleDateString(),
                      icon: Calendar
                    },
                    {
                      label: "Submitted by:",
                      value: project.submittedBy,
                      icon: User
                    }
                  ].map(({ label, value, icon:Icon}) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      {Icon && <Icon className="size-4 text-muted-foreground"/>}
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="border rounded-lg p-6 bg-background">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    Support this project:
                  </p> 
                  <ProjectVoting 
                    projectId={project.id}
                    userVote={project.userVote}
                    votes={project.voteCount}
                    size="lg"
                    className="m-auto"
                  />
                </div>
              </div>
              {
                project.websiteUrl && (
                  <CustomButton 
                    asLink 
                    variant="outline"
                    href={project.websiteUrl}
                    className="w-full rounded-lg"
                  >
                    Visit Website 
                    <ExternalLink 
                      className="size-4 ml-2"
                      data-icon="inline-end"
                    />
                  </CustomButton>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}