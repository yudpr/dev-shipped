import { Meta, StoryObj } from "@storybook/nextjs-vite";

import HeroSection from "./hero-section";

/**
 * Hero section
 */

const meta = {
  title: "Organisms/Hero Section",
  component: HeroSection,
  tags: ["autodocs"]
} satisfies Meta<typeof HeroSection>

export default meta;

type Story = StoryObj<typeof HeroSection>

export const Default = {} satisfies Story;