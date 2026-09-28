import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectPage from "./project-page";

const meta = {
  title: "Pages/Project Page",
  component: ProjectPage,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectPage>

export default meta;

type Story = StoryObj<typeof ProjectPage>

export const Default: Story = {}