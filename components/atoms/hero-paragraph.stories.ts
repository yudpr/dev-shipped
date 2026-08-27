import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroParagraph from "./hero-paragraph";

/**
 * Hero paragraph
 */

const meta = {
  title: "Atoms/Hero Paragraph",
  component: HeroParagraph,
  args: {
    children: "The community platform for developers and indie hackers to launch their apps, share side projects, and get real feedback through upvotes. Stop building in secret."
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroParagraph>

export default meta;

type Story = StoryObj<typeof HeroParagraph>

export const Default = {} satisfies Story;