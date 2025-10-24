import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import type { Route } from 'next';
import Link from 'next/link';

type Menu = { title: string; href: string };
const menu: Menu[] = [
  { title: 'Pricing', href: '/pricing' },
  { title: 'Sing In', href: '/signin' },
];

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.map((item, key) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <noIndex>
          <NavigationMenuItem key={key}>
            <NavigationMenuLink asChild>
              <Link href={item.href as Route}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
