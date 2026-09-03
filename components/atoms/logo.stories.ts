import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Logo from "./logo";

/**
 * devShipped logo
 */

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"]
} satisfies Meta<typeof Logo>

export default meta;

type Story = StoryObj<typeof Logo>

export const Default = {} satisfies Story;