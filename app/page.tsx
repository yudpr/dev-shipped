import { Button } from "@/components/ui/button";
import HeroBadge from "@/components/custom/hero-badge";

export default function Home() {
  return (
    <div>
      <HeroBadge>Join our community and share your works now</HeroBadge>
      <h1>Don't Let Your Code Gather Dust. DevShipped It</h1>
      <p>The community platform for developers and indie hackers to launch their apps, share side projects, and get real feedback through upvotes. Stop building in secret.</p>
      <Button>Share Your Project</Button>
      <Button>Explore Projects</Button>
    </div>
  );
}
