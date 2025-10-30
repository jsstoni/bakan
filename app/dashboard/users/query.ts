import 'server-only';
import { auth } from '@/lib/auth';
import type { UserWithRole } from 'better-auth/plugins/admin';
import { cacheLife } from 'next/cache';
import { headers } from 'next/headers';

type ListUsersResult = {
  users: UserWithRole[];
  total: number;
  limit?: number;
  offset?: number;
};

export async function getUsers(
  offset: number
): Promise<ListUsersResult | null> {
  'use cache: private';
  cacheLife('minutes');
  const limit = 10;
  const result = await auth.api.listUsers({
    query: { limit, offset: (offset - 1) * limit },
    headers: await headers(),
  });

  if (!result.users) return null;

  return result;
}
