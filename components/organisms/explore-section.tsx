import { Compass } from "lucide-react";
import SectionHeader from "../molecules/section-header";
import ProjectExplorer from "./project-explorer";

export default function ExploreSection () {
  return (
    <section className="py-20">
      <div className="wrapper">
        <SectionHeader
          description="Discover the best of our community's projects"
          title="Explore"
          icon={Compass}
        />
        <ProjectExplorer />
      </div>
    </section>
  )
}