import 'server-only';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

export const requireUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const { user } = session;

  return user;
});
