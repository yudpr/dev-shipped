import { Meta, StoryObj } from "@storybook/nextjs-vite";
import FeatCardGroup from "./feat-card-group";

const featuredProjects = [
  {
    projectId: 1,
    name: "ExampleProject1",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    votes: 123,
    isFeatured: true
  },
  {
    projectId: 2,
    name: "ExampleProject2",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    votes: 123,
    isFeatured: true
  },
  {
    projectId: 3,
    name: "ExampleProject3",
    description: "An example project for demonstration purposes.",
    tags: ["Feature", "Card"],
    votes: 123,
    isFeatured: true
  }
]

const meta = {
  title: "Organisms/Feat Card Group",
  component: FeatCardGroup,
  args: {
    children: (
      <>
        {featuredProjects.map(i => <></>)}
      </>
    )
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FeatCardGroup>

export default meta

type Story = StoryObj<typeof FeatCardGroup>

export const Default = {} satisfies Story