import { Meta, StoryObj } from "@storybook/nextjs-vite";
import AuthActions from "./auth-actions";

/**
 * This component shows buttons/links depending of the
 * user auth state managed by clerk. If the user is 
 * authenticated, 'submit project' and user buttons
 * will be visible. Otherwise, sign in link and sign up 
 * button.
 */


const meta = {
  title: "Organisms/Auth Actions",
  component: AuthActions,
  tags: ["autodocs"]
} satisfies Meta<typeof AuthActions>

export default meta;

type Story = StoryObj<typeof AuthActions>;

export const Default = {} satisfies Story;