import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectTagsCombobox from "./project-tags-combobox";

const meta = {
  title: "Atoms/Project Tags Combobox",
  component: ProjectTagsCombobox,
  args: {
    options: ["React", "Next.js"],
    placeholder: "Select tags"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectTagsCombobox>

export default meta;

type Story = StoryObj<typeof ProjectTagsCombobox>

export const Default = {} satisfies Story