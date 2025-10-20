import type { Auth } from '@/lib/auth';
import { ac, admin, user } from '@/lib/auth/permissions';
import { stripeClient } from '@better-auth/stripe/client';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
    stripeClient({ subscription: true }),
    inferAdditionalFields<Auth>(),
  ],
});
