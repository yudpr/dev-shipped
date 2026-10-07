import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectReturnLink from "./project-return-link";

type ProjectReturnLinkType = typeof ProjectReturnLink

const meta: Meta<ProjectReturnLinkType> = {
  title: "Atoms/Project Return Link",
  component: ProjectReturnLink,
  tags: ["autodocs"]
}

export default meta;

export const Default: StoryObj<ProjectReturnLinkType> = {}