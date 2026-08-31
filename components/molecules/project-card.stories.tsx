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

/**
 * This component displays the project shared in a form
 * of a card. It has title, description, 2 types of badge,
 * and ProjectVoting component. It is build on top of
 * shadcn card component. 
 * 
 * The badge for displaying 'featured' tag is placed
 * inside a static-defined div with 'h-5' sizing, which
 * the same size is used by the badge.
 * 
 * All the badge here is defined in the same file as this
 * component, while ProjectVoting is imported.
 * 
 * As for the footer, as it can have more tags than the
 * component can display, and to avoid uneven heights with
 * other cards, it uses horizontal scroll fade, so instead 
 * of hidden when overflowed, you can scroll horizontally
 * to see each tags.
 * 
 * Title uses 1 line truncate and description uses 3 sized
 * line-clamps to make heights consistent across cards, to
 * avoid unnecessary details, while still have an appealing 
 * visual.
 */

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