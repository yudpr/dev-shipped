import { Meta, StoryObj } from "@storybook/nextjs-vite"
import ExplorePage from "./explore-page"
import { ClerkProvider } from "@clerk/nextjs";

type ExplorePageType = typeof ExplorePage

const meta: Meta<ExplorePageType> = {
  title: "Pages/Explore Page" ,
  component: ExplorePage,
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