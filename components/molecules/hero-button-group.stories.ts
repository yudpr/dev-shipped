import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroButtonGroup from "./hero-button-group";

/**
 * A button group that controls a group of buttons 
 * layouting in hero section.
 */

const meta = {
  title: "Molecules/Hero Button Group",
  component: HeroButtonGroup,
  tags: ["autodocs"]
} satisfies Meta<typeof HeroButtonGroup>

export default meta;

type Story = StoryObj<typeof HeroButtonGroup>

export const Default = {} satisfies Story;