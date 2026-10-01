import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClerkUserButton from "./clerk-user-button";
import { ClerkProvider } from "@clerk/nextjs";

const meta = {
  title: "Atoms/Clerk User Button",
  component: ClerkUserButton,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof ClerkUserButton>

export default meta;

type Story = StoryObj<typeof ClerkUserButton>

export const Default = {} satisfies Story;