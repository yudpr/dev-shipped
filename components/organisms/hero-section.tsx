import { Share2, ArrowRight, ArrowUpDown } from "lucide-react";
import HeroBadge from "../atoms/hero-badge";
import HeroHeading from "../atoms/hero-heading";
import HeroParagraph from "../atoms/hero-paragraph";
import HeroButtonGroup from "../molecules/hero-button-group";
import CustomButton from "../atoms/custom-button";
import { 
  Rocket,
  UsersRound,
  type LucideIcon 
} from "lucide-react";
import HeroStatsGroup from "../molecules/hero-stats-group";
import HeroStats from "../atoms/hero-stats";

interface HeroStatsType {
  icon: LucideIcon,
  value: string,
  label: string,
}

export const heroStatsItems: HeroStatsType[] = [
   {
      icon: UsersRound,
      value: "1k+",
      label: "Developer Community"
   },
   {
      icon: Rocket,
      value: "2.5k+",
      label: "Project Shared"
   },
   {
      icon: ArrowUpDown,
      value: "30k+",
      label: "Interactions"
   }
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <HeroBadge>Join our community and share your works now</HeroBadge>
          <HeroHeading>Don&apos;t Let Your Code Gather Dust. DevShipped It</HeroHeading>
          <HeroParagraph>The community platform for developers and indie hackers to launch their apps, share side projects, and get real feedback through upvotes. Stop building in secret.</HeroParagraph>
          <HeroButtonGroup>
            <CustomButton href="/share" size="lg" intent="hero" asLink>
              <Share2 data-icon="inline-start"/>
              Share Your Project
            </CustomButton>
            <CustomButton href="/explore" size="lg" variant="secondary" intent="hero" asLink>
              Explore Projects
              <ArrowRight data-icon="inline-end"/>
            </CustomButton>
          </HeroButtonGroup>
          <HeroStatsGroup>
            { heroStatsItems.map((i, index) => <HeroStats key={`hero-stats-${index}`} {...i} />) }
          </HeroStatsGroup>
        </div>
      </div>
    </section>
  )
}