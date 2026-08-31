import { Meta, StoryObj } from "@storybook/nextjs-vite";

import ProjectVotingButton from "./project-voting-button";
import { ChevronDown } from "lucide-react";

/**
 * This is a button for giving upvote/downvote to a
 * project card. It has 2 custom variants, described
 * as intent, while using shadcn button component and
 * the variants as the base. This variant is classified
 * into upvote and downvote. If the button is clicked
 * each will give different styling. This can work
 * because it uses hasVoted boolean value, which is 
 * passed to aria-pressed attribute. The styling will
 * change by using this attribute as selector with 
 * tailwind.
 */

const meta = {
  title: "Atoms/Project Voting Button",
  component: ProjectVotingButton,
  args: {
    intent: "down-vote",
    hasVoted: false,
    children: <ChevronDown className="size-5"/>
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectVotingButton>

export default meta;

type Story = StoryObj<typeof ProjectVotingButton>

export const Default = {} satisfies Story;