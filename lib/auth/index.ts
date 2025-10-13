import { env } from '@/lib/env';
import { env as envClient } from '@/lib/env/env-client';
import { stripe as stripeClient } from '@/lib/payments/stripe';
import { db } from '@/server/db';
import { stripe } from '@better-auth/stripe';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  baseURL: envClient.NEXT_PUBLIC_BASE_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ token, url }) => {
      console.log(`token: ${token}`, url);
    },
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: 'pro',
            priceId: 'price_1SHrVvQOV5rNSMQkTmWjV7kA',
            limits: {},
          },
        ],
        getCheckoutSessionParams: () => ({
          params: {
            payment_method_types: ['card'],
            allow_promotion_codes: true,
            tax_id_collection: {
              enabled: true,
            },
            automatic_tax: {
              enabled: true,
            },
          },
        }),
      },
    }),
    nextCookies(),
  ],
});

export type Auth = typeof auth;
