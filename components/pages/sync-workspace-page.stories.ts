import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SyncWorkspacePage from "./sync-workspace-page";


const meta = {
  title: "Pages/Sync Workspace Page",
  component: SyncWorkspacePage,
  tags: ["autodocs"]
} satisfies Meta<typeof SyncWorkspacePage>

export default meta;

type Story = StoryObj<typeof SyncWorkspacePage>

export const Default = {} satisfies Story;
