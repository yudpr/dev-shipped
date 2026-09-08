import { ComponentProps } from "react";
import FeatSection from "../organisms/feat-section";
import HeroSection from "../organisms/hero-section";
import RecentSection from "../organisms/recent-section";
import ProjectCard, { ProjectCardProps } from "../molecules/project-card";

interface HomePageViewProps extends
  ComponentProps<typeof RecentSection> {
    recentProjects: ProjectCardProps[]
    featuredProjects: ProjectCardProps[]
  }

export default function HomePageView({
  featuredProjects = [],
  recentProjects = []
}: HomePageViewProps) {
  return (
    <>
      <HeroSection />
      <FeatSection>
        {
          featuredProjects
            .slice(0, 5)
            .map((i, index) => <ProjectCard key={index} {...i} isFeatured={true}/>)
        }
      </FeatSection>
      <RecentSection>
        {
          recentProjects
            .slice(0, 5)
            .map((i, index) => <ProjectCard key={index} {...i} />)
        }
      </RecentSection>
    </>
  )  
}