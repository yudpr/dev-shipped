import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomeSectionButton from "./home-section-button";
import { ArrowUpRight } from "lucide-react";

/**
 * This button is intended for home section sub-header.
 * It has margin-left-auto enabled and is hidden on
 * smaller screens.
 */

const meta = {
  title: "Atoms/Home Section Button",
  component: HomeSectionButton,
  args: {
    children: (
      <>
        View All
        <ArrowUpRight className="size-4" data-icon="inline-end"/>
      </>
    )
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HomeSectionButton>

export default meta;

type Story = StoryObj<typeof HomeSectionButton>

export const Default = {} satisfies Story