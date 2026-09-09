import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectCard, { type ProjectCardProps } from "../molecules/project-card";
import ProjectCardGroup from "./project-card-group";
import { Rocket } from "lucide-react";

const featuredProjects: ProjectCardProps[] = [
  {
    id: 1,
    name: "ExampleProject1",
    slug: "exampleproject1",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    voteCount: 123,
    createdAt: new Date(),
    approvedAt: new Date(),
    status: "approved",
    submittedBy: "test@email.com",
    websiteUrl: "https://www.example.com",
    tagline: "Example Project Description",
    isFeatured: true,
    userId: null,
    organizationId: null
  },
  {
    id: 2,
    name: "ExampleProject2",
    slug: "exampleproject2",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    voteCount: 123,
    createdAt: new Date(),
    approvedAt: new Date(),
    status: "approved",
    submittedBy: "test@email.com",
    websiteUrl: "https://www.example.com",
    tagline: "Example Project Description",
    isFeatured: false,
    userId: null,
    organizationId: null
  },
  {
    id: 3,
    name: "ExampleProject3",
    slug: "exampleproject3",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    voteCount: 123,
    createdAt: new Date(),
    approvedAt: new Date(),
    status: "approved",
    submittedBy: "test@email.com",
    websiteUrl: "https://www.example.com",
    tagline: "Example Project Description",
    userId: null,
    organizationId: null
  }
]

/**
 * This is where we group project cards together.
 */

const meta = {
  title: "Organisms/Project Card Group",
  component: ProjectCardGroup,
  args: {
    children: (
      <>
        {featuredProjects.map(i => <ProjectCard {...i}/>)}
      </>
    )
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectCardGroup>

export default meta

type Story = StoryObj<typeof ProjectCardGroup>

export const Default = {} satisfies Story
export const Empty = {
  args: {
    emptyStateDescription: "test description",
    emptyStateIcon: Rocket,
    emptyStateTitle: "test title",
    children: (
      <>
      {featuredProjects.slice(0, 0).map(i => <ProjectCard {...i}/>)}
      </>
    )
  },
} satisfies Story