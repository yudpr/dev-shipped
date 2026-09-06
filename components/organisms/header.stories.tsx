import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "./header";

/**
 * This shows icon, navigation links, and auth actions.
 */

const meta = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"]
} satisfies Meta<typeof Header>

export default meta;

type Story = StoryObj<typeof Header>;

export const Default = {} satisfies Story;