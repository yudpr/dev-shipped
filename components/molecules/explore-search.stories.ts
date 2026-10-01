import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ExploreSearch from "./explore-search";

type ExploreSearchType = typeof ExploreSearch

const meta: Meta<ExploreSearchType> = {
  title: "Molecules/Explore Search" ,
  component: ExploreSearch,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExploreSearchType>

export const Default: Story = {}