import { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecentSection from "./recent-section";

const meta = {
  title: "Organisms/Recent Section",
  component: RecentSection,
  tags: ["autodocs"]
} satisfies Meta<typeof RecentSection>

export default meta;

type Story = StoryObj<typeof RecentSection>

export const Default = {} satisfies Story