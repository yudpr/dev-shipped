import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ExplorePage from "./explore-page"

type ExplorePageType = typeof ExplorePage

const meta: Meta<ExplorePageType> = {
  title: "Pages/Explore Page" ,
  component: ExplorePage,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExplorePageType>

export const Default: Story = {}