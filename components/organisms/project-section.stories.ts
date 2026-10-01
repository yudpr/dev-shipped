import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectSection from "./project-section";

const meta: Meta<typeof ProjectSection> = {
  title: "Organisms/Project Section",
  component: ProjectSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProjectSection>

export const Default: Story = {}