import type { Auth } from '@/lib/auth';
import { stripeClient } from '@better-auth/stripe/client';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    stripeClient({ subscription: true }),
    inferAdditionalFields<Auth>(),
  ],
});
