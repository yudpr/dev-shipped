import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "./footer";

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  tags: ["autodocs"]
} satisfies Meta<typeof Footer>

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default = {} satisfies Story;