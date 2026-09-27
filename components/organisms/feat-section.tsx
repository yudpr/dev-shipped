import { ArrowUpRight, Star } from "lucide-react";
import SectionHeader from "../molecules/section-header";
import CustomButton from "../atoms/custom-button";
import ProjectCardGroup from "./project-card-group";
import { getFeaturedProjects } from "@/lib/projects/project-select";
import ProjectCard from "../molecules/project-card";
import { Suspense } from "react";
import SkeletonLoading from "../atoms/skeleton-loading";

export default async function FeatSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <SectionHeader 
          icon={Star} 
          title="Featured Projects"
          description="Top picks from our community this week"
        >
          <CustomButton href="/explore" variant="outline" intent="section-header" asLink>
            View All
            <ArrowUpRight className="size-4" data-icon="inline-end"/>
          </CustomButton> 
        </SectionHeader>
        <Suspense fallback={<LoadingProjects />}>
          <FeatProjects/>
        </Suspense>
      </div>
    </section>
  )
}

async function FeatProjects(){
  const featuredProjects =  await getFeaturedProjects()

  return (
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
  )
}

function LoadingProjects() {
  return (
    <div className="grid-wrapper">
        {[...Array(5)].map((_, index) => <SkeletonLoading key={index} className="w-full h-44 rounded-xl"/>)}
    </div>
  )
}
