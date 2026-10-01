import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomePage from "./home-page";
import { ClerkProvider } from "@clerk/nextjs";

/**
 * Home page
 */

const meta = {
  title: "Pages/Home Page",
  component: HomePage,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof HomePage>

export default meta;

type Story = StoryObj<typeof HomePage>

export const Default = {} satisfies Story;