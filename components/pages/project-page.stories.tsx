import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectPage from "./project-page";
import { ClerkProvider } from "@clerk/nextjs";

const meta = {
  title: "Pages/Project Page",
  component: ProjectPage,
  args: {
    params: Promise.resolve({ slug: "slug"})
  },
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectPage>

export default meta;

type Story = StoryObj<typeof ProjectPage>

export const Default: Story = {}