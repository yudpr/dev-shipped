import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import SyncWorkspacePage from "./sync-workspace-page";
import { ClerkProvider } from "@clerk/nextjs";


const meta = {
  title: "Pages/Sync Workspace Page",
  component: SyncWorkspacePage,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof SyncWorkspacePage>

export default meta;

type Story = StoryObj<typeof SyncWorkspacePage>

export const Default = {} satisfies Story;
