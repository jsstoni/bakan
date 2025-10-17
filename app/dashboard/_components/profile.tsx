'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth/client';
import { getInitials } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/signin');
        },
      },
    });
  };

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="space-y-3" align="end">
        <div>
          <p>{session.user.name}</p>
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>

        <ButtonGroup>
          <Button size={'sm'} asChild>
            <Link href="/dashboard/profile">
              <User /> My profile
            </Link>
          </Button>
          <Button size={'sm'} onClick={logout}>
            <LogOut /> Logout
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  );
}
