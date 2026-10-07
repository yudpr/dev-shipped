import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import ProjectTagsCombobox from "./project-tags-combobox";

/**
 * This component is designed for managing options state and option
 * creation. It is intended to be used in a project submit form component
 * where the user can select multiple options. It provides an easy way for
 * users to create custom tags for their project.
 * 
 * All the logic is implemented inside a custom hook, which allows for easy
 * customization and reusability.
 */
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