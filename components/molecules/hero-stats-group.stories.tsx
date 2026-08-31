import { Rocket } from "lucide-react";
import HeroStats from "../atoms/hero-stats";
import HeroStatsGroup from "./hero-stats-group";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const heroStatsItems = [
   {
      icon: Rocket,
      value: "15k+",
      label: "Project Shared"
   },
   {
      icon: Rocket,
      value: "15k+",
      label: "Project Shared"
   },
   {
      icon: Rocket,
      value: "15k+",
      label: "Project Shared"
   },
]


/**
 * This component loops over hero-stats-items and puts
 * a shadcn separator in between each two elements of 
 * the array. This separator can adjust itself based
 * on the screen, from horizontal to vertical on larger
 * screen.
 */

const meta = {
  title: "Molecules/Hero Stats Group",
  component: HeroStatsGroup,
  args: {
    children: (<>{heroStatsItems.map(i => <HeroStats {...i}/>)}</>)
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroStatsGroup>

export default meta;

type Story = StoryObj<typeof HeroStatsGroup>

export const Default = {} satisfies Story

