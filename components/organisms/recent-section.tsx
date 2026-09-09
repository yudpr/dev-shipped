import { Rocket } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import ProjectCardGroup from "./project-card-group";
import { getRecentProjects } from "@/lib/projects/project-select";
import ProjectCard from "../molecules/project-card";
import { Suspense } from "react";

export default function RecentSection() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <HomeSectionHeader
          title="Recently Launched"
          icon={Rocket}
          description="Discover the latest projects from out community"
        />
        <Suspense>
          <RecentProjects />
        </Suspense>
      </div>
    </section>
  )
}

async function RecentProjects() {
  const recentProjects = await getRecentProjects()

  return (
    <ProjectCardGroup
      emptyStateIcon={Rocket}
      emptyStateTitle="No Recent Launches"
      emptyStateDescription="You&apos;re all caught up. Recent Lauches will appear here."
    >
      {
        recentProjects
          .slice(0, 5)
          .map((i, index) => <ProjectCard key={index} {...i} />)
      }
    </ProjectCardGroup>
  )
}