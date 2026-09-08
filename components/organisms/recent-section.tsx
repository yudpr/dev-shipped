import { Rocket } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import ProjectCardGroup from "./project-card-group";

interface RecentSectionProps {
  children?: React.ReactNode
}

export default function RecentSection({
  children  
}: RecentSectionProps) {
  return (
    <section className="py-20">
      <div className="wrapper">
        <HomeSectionHeader
          title="Recently Launched"
          icon={Rocket}
          description="Discover the latest projects from out community"
        />
        <ProjectCardGroup
          emptyStateIcon={Rocket}
          emptyStateTitle="No Recent Launches"
          emptyStateDescription="You&apos;re all caught up. Recent Lauches will appear here."
        >
          {children}
        </ProjectCardGroup>
      </div>
    </section>
  )
}