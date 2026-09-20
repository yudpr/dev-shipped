import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectSlugInput from "./project-slug-input";

const meta = {
  title: "Atoms/Project Slug Input",
  component: ProjectSlugInput,
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectSlugInput>

export default meta;

type Story = StoryObj<typeof ProjectSlugInput>

export const Default = {} satisfies Story
