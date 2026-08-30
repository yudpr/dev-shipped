import { StoryObj, type Meta } from '@storybook/nextjs-vite';

import ProjectVoting from './project-voting';


/**
 * This is a custom badge that shows a live 
 * status indicator.
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
