import { Meta, StoryObj } from "@storybook/nextjs-vite";
import LiveStatusIndicator from "./live-status-indicator";

/**
 * An animated live status indicator.
 * It needs to be an icon if living 
 * inside a badge (via 'data-icon' 
 * attrbute).
 */

const meta = {
  title: "Design System/Custom/Live Status Indicator",
  component: LiveStatusIndicator,
  tags: ["autodocs"]
} satisfies Meta<typeof LiveStatusIndicator>

export default meta;

type Story = StoryObj<typeof LiveStatusIndicator>

export const Default = {} satisfies Story;