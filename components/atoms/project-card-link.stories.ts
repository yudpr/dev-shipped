import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectCardLink from "./project-card-link";

type ProjectCardLinkType = typeof ProjectCardLink

const meta: Meta<ProjectCardLinkType> = {
  title: "Atoms/Project Card Link",
  component: ProjectCardLink,
  tags: ["autodocs"]
}

export default meta;

export const Default: StoryObj<ProjectCardLinkType> = {}