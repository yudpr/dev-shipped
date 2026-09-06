import { Meta, StoryObj } from "@storybook/nextjs-vite";
import CustomButton from "./custom-button";
import { ArrowUpRight } from "lucide-react";

/**
 * This is customized button for devShipped app. It uses
 * 'intent' key to select which custom style to use. The
 * options availaible are mostly based on specific case
 * where the button is applied. For example, 'hero' is 
 * used in hero section. You can still choose different 
 * styling via the original, 'variant' key. No default 
 * options are provided.
 * 
 * This button also has 'buttonType' key to select which 
 * button type to use, currently, there are 'link' and
 * the original 'button' type from shadcn.
 */

const meta = {
  title: "Atoms/Custom Button",
  component: CustomButton,
  args: {
    children: "Share Your Project",
  },
  argTypes: {
    intent: {
      description: `
      - hero: Call to Action (CTA) in the hero section.
      - section-header: Section header button. It has margin-left-auto enabled and is hidden on smaller screens.`
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof CustomButton>

export default meta;

type Story = StoryObj<typeof CustomButton>

export const Default = {} satisfies Story

export const Hero = {
  args: {
    intent: "hero",
    size: "lg",
    asLink: true
  }
} satisfies Story

export const SectionHeader = {
  args: {
    variant: "outline",
    intent: "section-header",
    asLink: true,
    children: (
      <>
        View All
        <ArrowUpRight className="size-4" data-icon="inline-end"/>
      </>
    )
  }
} satisfies Story