import { db } from '@/server/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
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
  telemetry: {
    enabled: false,
  },
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
