import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomeSectionHeader from "./home-section-header";
import HomeSectionButton from "../atoms/home-section-button";
import { ArrowUpRight, Star } from "lucide-react";

/**
 * This component has heading2, icon, and a paragraph,
 * that tells what each section about. You can pass
 * HomeSectionButton as a Link associated with the 
 * section.
 */

const meta = {
  title: "Molecules/Home Section Header",
  component: HomeSectionHeader,
  args: {
    icon: Star,
    title: "Featured Products",
    description: "Top picks from our community this week",
    children: (
      <HomeSectionButton href="/explore">
        View All
        <ArrowUpRight className="size-4" data-icon="inline-end"/>
      </HomeSectionButton> )
  },
  argTypes: {
    icon: {
      description: "Stays right on the left of title."
    },
    title: {
      description: "Using heading two element."
    },
    description: {
      description: "Using paragraph element."
    },
    children: {
      description: "Accepts HomeSectionButton"
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HomeSectionHeader>

export default meta;

type Story = StoryObj<typeof HomeSectionHeader>

export const Default = {} satisfies Story