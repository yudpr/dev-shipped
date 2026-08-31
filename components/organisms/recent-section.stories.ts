import { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecentSection from "./recent-section";

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

const meta = {
  title: "Organisms/Recent Section",
  component: RecentSection,
  tags: ["autodocs"]
} satisfies Meta<typeof RecentSection>

export default meta;

type Story = StoryObj<typeof RecentSection>

export const Default = {} satisfies Story