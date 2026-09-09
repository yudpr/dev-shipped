import { Meta, StoryObj } from "@storybook/nextjs-vite";
import FeatSection from "./feat-section";

/**
 * Featured This Week Section
 */

const meta = {
  title: "Organisms/Feat Section",
  component: FeatSection,
  tags: ["autodocs"]
} satisfies Meta<typeof FeatSection>

export default meta;

type Story = StoryObj<typeof FeatSection>

export const Default = {} satisfies Story