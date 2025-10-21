import { Profile } from '@/app/dashboard/_components/profile';
import { Menu, type NavigationLinks } from '@/components/menu';
import { ToggleTheme } from '@/components/toggle-theme';
import { Home } from 'lucide-react';

const navigationLinks: NavigationLinks[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
];

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
          <Menu links={navigationLinks} />
        </div>
      </div>
    </header>
  );
}
