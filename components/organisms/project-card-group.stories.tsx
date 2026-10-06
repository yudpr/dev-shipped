import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
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
    isFeatured: true,
    userVote: "up"
  },
  {
    id: 2,
    name: "ExampleProject2",
    slug: "exampleproject2",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    voteCount: 123,
    isFeatured: false,
    userVote: "down"
  },
  {
    id: 3,
    name: "ExampleProject3",
    slug: "exampleproject3",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    voteCount: 123,
    userVote: null
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
        {featuredProjects.map((i, index) => <ProjectCard {...i} key={index}/>)}
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
      {featuredProjects.slice(0, 0).map((i, index) => <ProjectCard {...i} key={index}/>)}
      </>
    )
  },
} satisfies Story