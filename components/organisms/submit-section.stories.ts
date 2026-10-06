import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import SubmitSection from "./submit-section";

const meta = {
  title: "Organisms/Submit Section",
  component: SubmitSection,
  tags: ["autodocs"]
} satisfies Meta<typeof SubmitSection>

export default meta;

type Story = StoryObj<typeof SubmitSection>

export const Default = {} satisfies Story
