import { Meta, StoryObj } from "@storybook/nextjs-vite";

import ProjectVotingButton from "./project-voting-button";
import { ChevronDown } from "lucide-react";

/**
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