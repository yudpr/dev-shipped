import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import SubmitPage from "./submit-page";
import { ClerkProvider } from "@clerk/nextjs";

const meta = {
  title: "Pages/Submit Page",
  component: SubmitPage,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof SubmitPage>

export default meta;

type Story = StoryObj<typeof SubmitPage>

export const Default = {} satisfies Story
