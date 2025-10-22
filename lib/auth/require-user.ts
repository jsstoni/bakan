import 'server-only';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const { user } = session;
  return user;
});

export const requireUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return !!session;
});

export const isAdmin = cache(async () => {
  const session = await getSession();
  return !!session && session.role === 'admin';
});
