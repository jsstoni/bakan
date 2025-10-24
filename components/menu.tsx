import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';

type SubMenu = {
  icon?: LucideIcon;
  label: string;
  href: string;
};

export type NavigationLinks = {
  items?: SubMenu[];
} & SubMenu;

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
              <Link href={subItem.href as Route}>{subItem.label}</Link>
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
        <Link href={item.href as Route}>
          {item.icon && <item.icon />}
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export function Menu({ links }: { links: NavigationLinks[] }) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {links.map((item) => menuItem(item))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
