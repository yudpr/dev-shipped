import { StoryObj, type Meta } from '@storybook/nextjs-vite';

import ProjectVoting from './project-voting';


/**
 * This component displays the project voting buttons,
 * upvote and downvote, as well as the vote amount.
 */

const meta = {
  title: "Molecules/Project Voting",
  component: ProjectVoting,
  args: {
    votes: 999,
    hasVoted: false
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectVoting>;

export default meta;

type Story = StoryObj<typeof ProjectVoting>;

export const Default = {} satisfies Story;
