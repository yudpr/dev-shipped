import { StoryObj, type Meta } from '@storybook/nextjs-vite';

import HeroBadge from './hero-badge';


/**
 * This is a custom badge that shows a live 
 * status indicator.
 */

const meta = {
  title: "Atoms/Hero Badge",
  component: HeroBadge,
  args: {
    children: "Join our community and share your works now",
    variant: "outline"
  },
  argTypes: {
    children: {
      type: "string",
      description: "The text to display on the badge"
    },
    variant: {
      type: "string",
      description: "By default, the value is outline"
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HeroBadge>;

export default meta;

type Story = StoryObj<typeof HeroBadge>;

export const Default = {} satisfies Story;
