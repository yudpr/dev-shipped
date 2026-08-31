import FeatSection from "../organisms/feat-section";
import HeroSection from "../organisms/hero-section";
import RecentSection from "../organisms/recent-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatSection />
      <RecentSection />
    </div>
  )
}