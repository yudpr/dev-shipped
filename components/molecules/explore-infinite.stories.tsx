import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import ExploreInfinite from "./explore-infinite";
import { type ExploreProjectSuccess } from "@/lib/projects/project-select";

type ExploreInfiniteType = typeof ExploreInfinite

const projects = [
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 9,
    name: "Markdownify1",
    slug: "markdownify1",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 365
  },
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 9,
    name: "Markdownify2",
    slug: "markdownify2",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 265
  },
  {
    createdAt: new Date(),
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    id: 9,
    name: "Markdownify3",
    slug: "markdownify3",
    tags:  ['Productivity', 'Svelte', 'Markdown', 'Documentation', 'Editor'],
    userVote: "up",
    voteCount: 165
  }
] satisfies ExploreProjectSuccess["data"]["items"]


const meta: Meta<ExploreInfiniteType> = {
  title: "Molecules/Explore Infinite" ,
  component: ExploreInfinite,
  args: {
    projects,
  },
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExploreInfiniteType>

export const Default: Story = {}