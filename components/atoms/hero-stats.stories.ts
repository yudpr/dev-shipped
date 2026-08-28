import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UsersRound } from "lucide-react";
import HeroStats from "./hero-stats";

/**
 * "A component for displaying hero stats in a 
 * visually appealing way."
 */

const meta = {
  title: "Atoms/Hero Stats",
  component: HeroStats,
  args: {
    icon: UsersRound,
    value: "5k+",
    label: "Developer Community"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroStats>

export default meta;

type Story = StoryObj<typeof HeroStats>

export const Default = {} satisfies Story