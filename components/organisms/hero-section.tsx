import HeroBadge from "../atoms/hero-badge";
import HeroHeading from "../atoms/hero-heading";
import HeroParagraph from "../atoms/hero-paragraph";

export default function HeroSection() {
  return (
    <div>
      <HeroBadge>Join our community and share your works now</HeroBadge>
      <HeroHeading>Don&apos;t Let Your Code Gather Dust. DevShipped It</HeroHeading>
      <HeroParagraph>The community platform for developers and indie hackers to launch their apps, share side projects, and get real feedback through upvotes. Stop building in secret.</HeroParagraph>
    </div>
  )
}