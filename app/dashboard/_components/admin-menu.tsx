import { Menu, type NavigationLinks } from '@/components/menu';
import { isAdmin } from '@/lib/auth/require-user';
import { BarChart, User } from 'lucide-react';

const navigationLinks: NavigationLinks[] = [
  { href: '/dashboard/users', label: 'Users', icon: User },
  { href: '/dashboard', label: 'Analytics', icon: BarChart },
];

export async function AdminMenu() {
  const admin = await isAdmin();
  if (!admin) return null;

  return <Menu links={navigationLinks} />;
}
