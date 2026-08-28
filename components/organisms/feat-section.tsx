import { ArrowUpRight, Star } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import HomeSectionButton from "../atoms/home-section-button";

export default function FeatSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <HomeSectionHeader 
          icon={Star} 
          title="Featured Products"
          description="Top picks from our community this week"
        >
          <HomeSectionButton href="/explore">
            View All
            <ArrowUpRight className="size-4" data-icon="inline-end"/>
          </HomeSectionButton> 
        </HomeSectionHeader>
      </div>
    </section>
  )
}