import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

type Menu = { title: string; href: string };
const menu: Menu[] = [{ title: 'Sing In', href: '/signin' }];

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.map((item, key) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <noIndex>
          <NavigationMenuItem key={key}>
            <NavigationMenuLink asChild>
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
