import { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavItem from "./nav-item";
import { Home } from "lucide-react";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";

/**
 * It uses NavigationMenuItem and NavigationMenuLink
 * from shadcn as the base.
 */

const meta = {
  title: "Atoms/Navigation Item",
  component: NavItem,
  decorators: [
    (Story) => (
      <NavigationMenu>
        <NavigationMenuList>
          <Story />
        </NavigationMenuList>
      </NavigationMenu>
    )
  ],
  args: {
    icon: Home,
    children: "Home",
    href: "/"
  }
} satisfies Meta<typeof NavItem>

export default meta;

type Story = StoryObj<typeof NavItem>

export const Default = {} satisfies Story;