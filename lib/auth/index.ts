import { env } from '@/lib/env/env-client';
import { db } from '@/server/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  user: {
    additionalFields: {
      plan: {
        type: 'string',
        input: false,
        defaultValue: 'user',
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ token, url }) => {
      console.log(`token: ${token}`, url);
    },
  },
  plugins: [nextCookies()],
});
