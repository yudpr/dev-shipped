import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ExploreSection from "./explore-section"

type ExploreSectionType = typeof ExploreSection

const meta: Meta<ExploreSectionType> = {
  title: "Organisms/Explore Section" ,
  component: ExploreSection,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExploreSectionType>

export const Default: Story = {}