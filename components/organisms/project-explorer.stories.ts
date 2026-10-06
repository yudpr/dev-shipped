import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ProjectExplorer from "./project-explorer";
import { type ExplorePageProps } from "../../app/explore/page"

type ProjectExplorerType = typeof ProjectExplorer

const params: Awaited<ExplorePageProps["searchParams"]> = { query: "ai" }

const searchParams: ExplorePageProps["searchParams"] = Promise.resolve(params)

const meta: Meta<ProjectExplorerType> = {
  title: "Organisms/Project Explorer" ,
  component: ProjectExplorer,
  args: {
    searchParams
  },
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ProjectExplorerType>

export const Default: Story = {}