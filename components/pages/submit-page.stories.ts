import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SubmitPage from "./submit-page";

const meta = {
  title: "Pages/Submit Page",
  component: SubmitPage,
  tags: ["autodocs"]
} satisfies Meta<typeof SubmitPage>

export default meta;

type Story = StoryObj<typeof SubmitPage>

export const Default = {} satisfies Story
