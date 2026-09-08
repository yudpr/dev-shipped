import { Meta, StoryObj } from "@storybook/nextjs-vite";

import HomePage from "./home-page.view";
import { ProjectCardProps } from "../molecules/project-card";

const exampleProjects: ProjectCardProps[] = [
  {
    id: 1,
    name: "GitPulse",
    slug: "gitpulse",
    tagline: "Real-time GitHub analytics and Slack notifications.",
    description: "Real-time analytics dashboard for GitHub repositories with instant Slack alerts for critical PR reviews.",
    websiteUrl: "https://gitpulse.example.com",
    tags: ["DevTools", "React", "Analytics", "Automation"],
    createdAt: new Date(Date.now() - 654 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000), // ~21 months ago
    approvedAt: new Date(Date.now() - 654 * 24 * 60 * 60 * 1000 + 1 * 45 * 60 * 1000), // 1 hour 45 mins later
    status: "approved" as const,
    submittedBy: "hello@example.com",
    voteCount: 342,
    organizationId: null,
    userId: null
  },
]


/**
 * Home page
 */

const meta = {
  title: "Pages/Home Page",
  component: HomePage,
  args: {
    featuredProjects: exampleProjects,
    recentProjects: exampleProjects
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HomePage>

export default meta;

type Story = StoryObj<typeof HomePage>

export const Default = {} satisfies Story;