import { Profile } from "@/app/dashboard/_components/profile";
import { ToggleTheme } from "@/components/toggle-theme";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { UrlObject } from "node:url";
import { Home, type LucideIcon, Menu } from "lucide-react";
import Link from "next/link";

type SubMenu = {
  icon?: LucideIcon;
  label: string;
  href: UrlObject | __next_route_internal_types__.RouteImpl<string>;
};

type NavigationLinks = {
  items?: SubMenu[];
} & SubMenu;

const navigationLinks: NavigationLinks[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  {
    href: "#",
    label: "Menus",
    icon: Menu,
    items: [{ href: "#", label: "Option 01" }],
  },
];

const menuItem = (item: NavigationLinks) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.label}>
        <NavigationMenuTrigger className="font-medium">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink
              asChild
              key={subItem.label}
              className="w-40 font-medium"
            >
              <Link href={subItem.href}>{subItem.label}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.label}>
      <NavigationMenuLink
        className="group flex flex-row items-center font-medium"
        asChild
      >
        <Link href={item.href}>
          {item.icon && <item.icon />}
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur">
      <div className="border-b">
        <div className="container mx-auto flex h-14 items-center gap-6">
          <h1>Logo</h1>

          <div className="ml-auto flex items-center gap-2">
            <ToggleTheme />
            <Profile />
          </div>
        </div>
      </div>

      <div className="border-b py-1 max-md:hidden">
        <div className="container mx-auto flex items-center justify-between gap-6">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationLinks.map((item) => menuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
