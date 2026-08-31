import { Meta, StoryObj } from "@storybook/nextjs-vite";
import EmptyState from "./empty-state";
import { Star } from "lucide-react";

/**
 * Shows empty states where no item to load.
 */

const meta = {
  title: "Organisms/Empty State",
  component: EmptyState,
  args: {
    emptyStateIcon: Star,
    emptyStateTitle: "No Reatured Products",
    emptyStateDescription: "You\'re all caught up. Featured products will appear here.",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof EmptyState>

export const Default = {} satisfies Story