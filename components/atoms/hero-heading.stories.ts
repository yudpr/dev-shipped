import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroHeading from "./hero-heading";


/**
 * Hero heading with h1.
 */

const meta = {
  title: "Atoms/Hero Heading",
  component: HeroHeading,
  args: {
    children: "Don't Let Your Code Gather Dust. DevShipped It"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroHeading>

export default meta;

type Story = StoryObj<typeof HeroHeading>

export const Default = {} satisfies Story;