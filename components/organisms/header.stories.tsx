import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import Header from "./header";
import { ClerkProvider } from "@clerk/nextjs";

/**
 * This shows icon, navigation links, and auth actions.
 */

const meta = {
  title: "Organisms/Header",
  component: Header,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof Header>

export default meta;

type Story = StoryObj<typeof Header>;

export const Default = {} satisfies Story;