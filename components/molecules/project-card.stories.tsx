import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectCard from "./project-card";

const featuredProject = {
  projectId: 1,
  name: "ExampleProject1ExampleProject1ExampleProject1ExampleProject1",
  description: "An example project for demonstration purposes.",
  tags: ["Feature", "Card"],
  votes: 1223,
  isFeatured: true
}

const meta = {
  title: "Organisms/Project Card",
  component: ProjectCard,
  args: {
    ...featuredProject
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectCard>

export default meta

type Story = StoryObj<typeof ProjectCard>

export const Default = {} satisfies Story