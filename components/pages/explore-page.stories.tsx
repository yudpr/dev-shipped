import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import ExplorePage from "./explore-page"
import { ClerkProvider } from "@clerk/nextjs";
import { type ExplorePageProps } from "@/app/explore/page";

type ExplorePageType = typeof ExplorePage

const params: Awaited<ExplorePageProps["searchParams"]> = { query: "ai" }

const searchParams: ExplorePageProps["searchParams"] = Promise.resolve(params)


const meta: Meta<ExplorePageType> = {
  title: "Pages/Explore Page" ,
  component: ExplorePage,
  args: {
    searchParams
  },
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<ExplorePageType>

export const Default: Story = {}