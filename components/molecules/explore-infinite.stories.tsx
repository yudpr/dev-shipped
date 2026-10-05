import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ExploreInfinite from "./explore-infinite";

type ExploreInfiniteType = typeof ExploreInfinite

const meta: Meta<ExploreInfiniteType> = {
  title: "Molecules/Explore Infinite" ,
  component: ExploreInfinite,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExploreInfiniteType>

export const Default: Story = {}