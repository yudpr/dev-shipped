import { Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroBadge from "../atoms/hero-badge";
import HeroHeading from "../atoms/hero-heading";
import HeroParagraph from "../atoms/hero-paragraph";
import HeroButtonGroup from "../molecules/hero-button-group";
import HeroButton from "../atoms/hero-button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <HeroBadge>Join our community and share your works now</HeroBadge>
          <HeroHeading>Don&apos;t Let Your Code Gather Dust. DevShipped It</HeroHeading>
          <HeroParagraph>The community platform for developers and indie hackers to launch their apps, share side projects, and get real feedback through upvotes. Stop building in secret.</HeroParagraph>
          <HeroButtonGroup>
            <HeroButton href="/share">
              <Share2 data-icon="inline-start"/>
              Share Your Project
            </HeroButton>
            <HeroButton variant="secondary" href="/explore">
              Explore Projects
              <ArrowRight data-icon="inline-end"/>
            </HeroButton>
          </HeroButtonGroup>
        </div>
      </div>
    </section>
  )
}