import { Meta, StoryObj } from "@storybook/nextjs-vite";

import HomePage from "./home-page";

/**
 * Home page
 */

const meta = {
  title: "Pages/Home Page",
  component: HomePage,
  tags: ["autodocs"]
} satisfies Meta<typeof HomePage>

export default meta;

type Story = StoryObj<typeof HomePage>

export const Default = {} satisfies Story;