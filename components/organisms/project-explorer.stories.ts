import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ProjectExplorer from "./project-explorer";

type ProjectExplorerType = typeof ProjectExplorer

const meta: Meta<ProjectExplorerType> = {
  title: "Organisms/Project Explorer" ,
  component: ProjectExplorer,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ProjectExplorerType>

export const Default: Story = {}