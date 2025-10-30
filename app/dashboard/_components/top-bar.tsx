import { AdminMenu } from '@/app/dashboard/_components/admin-menu';
import { Profile } from '@/app/dashboard/_components/profile';
import { Logo } from '@/components/icons/logo';
import { Menu, type NavigationLinks } from '@/components/menu';
import { ToggleTheme } from '@/components/toggle-theme';
import { Home } from 'lucide-react';
import { Suspense } from 'react';

const navigationLinks: NavigationLinks[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur">
      <div className="border-b">
        <div className="container mx-auto flex h-14 items-center gap-6">
          <h1 className="flex items-center gap-2 font-bold text-xl">
            <Logo className="size-6 fill-black dark:fill-white" />
            Bakan
          </h1>

          <div className="ml-auto flex items-center gap-2">
            <ToggleTheme />
            <Profile />
          </div>
        </div>
      </div>

      <div className="border-b py-1 max-md:hidden">
        <div className="container mx-auto flex items-center justify-between gap-6">
          <Menu links={navigationLinks} />

          <Suspense>
            <AdminMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
