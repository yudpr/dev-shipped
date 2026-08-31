import { Rocket } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import ProjectCardGroup from "./project-card-group";
import ProjectCard from "../molecules/project-card";

const recentProjects = [
  {
    projectId: 1,
    name: "GitPulse",
    description: "Real-time analytics dashboard for GitHub repositories with instant Slack alerts for critical PR reviews.",
    tags: ["DevTools", "React", "Analytics", "Automation"],
    href: "/",
    votes: 342,
    isFeatured: true
  },
   {
    projectId: 7,
    name: "CronSniper",
    description: "A simple visual debugger for complex cron expressions with dynamic timezone previews and execution history mapping.",
    tags: ["Utils", "Vue", "Cron", "Timezone"],
    href: "/",
    votes: 87,
    isFeatured: false
  },
  {
    projectId: 8,
    name: "LogStreamer",
    description: "Lightweight self-hosted WebSocket server built for streaming containerized logs securely across multiple remote clusters.",
    tags: ["DevOps", "Rust", "WebSockets", "Logging", "Security"],
    href: "/",
    votes: 143,
    isFeatured: false
  },
  {
    projectId: 9,
    name: "Markdownify",
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    tags: ["Productivity", "Svelte", "Markdown", "Documentation", "Editor"],
    href: "/",
    votes: 64,
    isFeatured: false
  },
  {
    projectId: 10,
    name: "FlexiMock",
    description: "A simple library to seamlessly intercept and mock native fetch calls during integration testing environments.",
    tags: ["Testing", "JS", "Mocking", "Fetch", "TestingLibrary"],
    href: "/",
    votes: 95,
    isFeatured: false
  }
]


export default function RecentSection() {
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
          {
            recentProjects
              .slice(0, 0)
              .map((i, index) => <ProjectCard key={index} {...i} />)
          }
        </ProjectCardGroup>
      </div>
    </section>
  )
}