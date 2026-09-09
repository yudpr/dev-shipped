import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SkeletonLoading from "./skeleton-loading";

const meta = {
  title: "Atoms/Skeleton Loading",
  component: SkeletonLoading,
  tags: ["autodocs"]
} satisfies Meta<typeof SkeletonLoading>

export default meta;

type Story = StoryObj<typeof SkeletonLoading>

export const Default = {
  args: {
    className: "h-8 w-33.25"
  }
} satisfies Story;