import { ArrowUpRight, Star } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import CustomButton from "../atoms/custom-button";
import ProjectCardGroup from "./project-card-group";
import ProjectCard from "../molecules/project-card";
import { getFeaturedProjects } from "@/lib/projects/project-select";


export default async function FeatSection() {
  const featuredProjects = await getFeaturedProjects()
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <HomeSectionHeader 
          icon={Star} 
          title="Featured Projects"
          description="Top picks from our community this week"
        >
          <CustomButton href="/explore" variant="outline" intent="section-header" asLink>
            View All
            <ArrowUpRight className="size-4" data-icon="inline-end"/>
          </CustomButton> 
        </HomeSectionHeader>
        <ProjectCardGroup
          emptyStateIcon={Star}
          emptyStateTitle="No Featured Projects"
          emptyStateDescription="You&apos;re all caught up. Featured projects will appear here."
        >
          {
            featuredProjects
              .slice(0, 5)
              .map((i, index) => <ProjectCard key={index} {...i} isFeatured={true}/>)
          }
        </ProjectCardGroup>
      </div>
    </section>
  )
}