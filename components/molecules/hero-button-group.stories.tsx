import { Meta, StoryObj } from "@storybook/nextjs-vite";

import HeroButtonGroup from "./hero-button-group";
import CustomButton from "../atoms/custom-button";
import { Share2, ArrowRight } from "lucide-react";

/**
 * A button group that controls a group of CTA buttons 
 * layouting in hero section.
 */

const meta = {
  title: "Molecules/Hero Button Group",
  component: HeroButtonGroup,
  tags: ["autodocs"]
} satisfies Meta<typeof HeroButtonGroup>

export default meta;

type Story = StoryObj<typeof HeroButtonGroup>

export const Default = {
  args: {
    children: (
      <>
        <CustomButton href="/share">
          <Share2 data-icon="inline-start"/>
          Share Your Project
        </CustomButton>
        <CustomButton variant="secondary" href="/explore">
          Explore Projects
          <ArrowRight data-icon="inline-end"/>
        </CustomButton>
      </>
    )
  }
} satisfies Story;