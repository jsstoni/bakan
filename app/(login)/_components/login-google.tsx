'use client';

import Google from '@/components/google';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';

export function LoginGoogle() {
  const login = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/singin',
    });
  };

  return (
    <Button className="w-full" variant="secondary" onClick={login}>
      <Google /> Google
    </Button>
  );
}
