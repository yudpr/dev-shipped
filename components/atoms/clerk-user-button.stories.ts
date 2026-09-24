import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClerkUserButton from "./clerk-user-button";

const meta = {
  title: "Atoms/Clerk User Button",
  component: ClerkUserButton,
  tags: ["autodocs"]
} satisfies Meta<typeof ClerkUserButton>

export default meta;

type Story = StoryObj<typeof ClerkUserButton>

export const Default = {} satisfies Story;