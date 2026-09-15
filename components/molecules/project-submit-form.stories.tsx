import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectSubmitForm from "./project-submit-form";

/**
 * Contains a form for registering the user project
 */

const meta = {
  title: "Molecules/Project Submit Form",
  component: ProjectSubmitForm,
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectSubmitForm>

export default meta;

type Story = StoryObj<typeof ProjectSubmitForm>

export const Default = {} satisfies Story