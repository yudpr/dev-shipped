import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import ExploreSection from "./explore-section"
import { type ExplorePageProps } from "@/app/explore/page"

type ExploreSectionType = typeof ExploreSection

const params: Awaited<ExplorePageProps["searchParams"]> = { query: "ai" }

const searchParams: ExplorePageProps["searchParams"] = Promise.resolve(params)

const meta: Meta<ExploreSectionType> = {
  title: "Organisms/Explore Section" ,
  component: ExploreSection,
  args: {
    searchParams
  },
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExploreSectionType>

export const Default: Story = {}