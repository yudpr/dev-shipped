import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectCard from "../molecules/project-card";
import ProjectCardGroup from "./project-card-group";

const featuredProjects = [
  {
    projectId: 1,
    name: "ExampleProject1",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    href: "/",
    votes: 123,
    isFeatured: true
  },
  {
    projectId: 2,
    name: "ExampleProject2",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    href: "/",
    votes: 123,
    isFeatured: true
  },
  {
    projectId: 3,
    name: "ExampleProject3",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    href: "/",
    votes: 123,
    isFeatured: true
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
    children: <></>
  },
} satisfies Story