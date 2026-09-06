import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu";

interface NavItemProps extends
  ComponentProps<typeof NavigationMenuLink> {
    icon: LucideIcon
  }

export default function NavItem({
  className,
  href="/",
  children,
  icon: Icon,
}: NavItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink 
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        "px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50",
        className
      )}
      >
        <Icon />
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}