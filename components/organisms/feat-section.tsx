import { ArrowUpRight, Star } from "lucide-react";
import HomeSectionHeader from "../molecules/home-section-header";
import HomeSectionButton from "../atoms/home-section-button";
import FeatCardGroup from "./feat-card-group";
import ProjectCard from "../molecules/project-card";

type FeaturedProjectType = {
  projectId: number,
  name: string,
  description: string,
  tags: string[],
  href: string,
  votes: number,
  isFeatured: boolean
}

const featuredProjects: FeaturedProjectType[] = [
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
    projectId: 2,
    name: "SchemaForge",
    description: "A visual, drag-and-drop database schema builder that instantly exports production-ready Prisma and TypeORM code.",
    tags: ["Database", "Next.js", "Prisma", "TypeScript", "SQL"],
    href: "/",
    votes: 289,
    isFeatured: true
  },
  {
    projectId: 3,
    name: "MockingJay API",
    description: "Blazing fast local mock server generator that builds functional REST and GraphQL endpoints from a single JSON file.",
    tags: ["API", "Node.js", "GraphQL", "Backend"],
    href: "/",
    votes: 512,
    isFeatured: true
  },
  {
    projectId: 4,
    name: "TailwindShine",
    description: "A lightweight browser extension that optimizes and minifies messy Tailwind utility classes directly inside inspect element.",
    tags: ["CSS", "Extension", "Tailwind", "Frontend"],
    href: "/",
    votes: 198,
    isFeatured: true
  },
  {
    projectId: 5,
    name: "QueryBuddy",
    description: "An AI-powered SQL assistant that translates plain English prompts into highly optimized Postgres and MySQL queries.",
    tags: ["AI", "Database", "PostgreSQL", "LLM", "SQL"],
    href: "/",
    votes: 421,
    isFeatured: true
  },
  {
    projectId: 6,
    name: "DockerLean",
    description: "A terminal user interface (TUI) tool that visualizes Docker layer sizes and safely strips out unused dependencies.",
    tags: ["DevOps", "Go", "Docker", "CLI", "TUI"],
    href: "/",
    votes: 315,
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
];

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
        <FeatCardGroup>
          {
            featuredProjects
              .filter(i => i.isFeatured)
              .slice(0, 4)
              .map(i => <ProjectCard {...i}/>)
          }
        </FeatCardGroup>
      </div>
    </section>
  )
}