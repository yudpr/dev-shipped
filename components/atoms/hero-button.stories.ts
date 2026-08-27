import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroButton from "./hero-button";

const meta = {
  title: "Atoms/Hero Button",
  component: HeroButton,
  args: {
    children: "Share Your Project"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroButton>

export default meta;

type Story = StoryObj<typeof HeroButton>

export const Default = {} satisfies Story