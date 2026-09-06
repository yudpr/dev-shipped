import { Compass, Home, LucideIcon } from "lucide-react";
import Logo from "../atoms/logo";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavItem from "../atoms/nav-item";
import AuthActions from "./auth-actions";

type NavItemType = {
  title: string,
  icon: LucideIcon,
  href: string
}

const navItems: NavItemType[] = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Explore",
    icon: Compass,
    href: "/explore"
  }
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo/>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(i => <NavItem key={i.title} {...i}>{i.title}</NavItem>)}
            </NavigationMenuList>
          </NavigationMenu>
          <AuthActions />
        </div>
      </div>
    </header> 
  )
}