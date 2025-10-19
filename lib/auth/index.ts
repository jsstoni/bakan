import { env } from '@/lib/env';
import { env as envClient } from '@/lib/env/env-client';
import { stripe as stripeClient } from '@/lib/payments/stripe';
import { db } from '@/server/db';
import { sendResetPassword, sendVerificationEmail } from '@/server/email';
import { stripe } from '@better-auth/stripe';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

const expiresIn = 60 * 60 * 24;

export const auth = betterAuth({
  baseURL: envClient.NEXT_PUBLIC_BASE_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: expiresIn,
    sendResetPassword,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail,
    expiresIn,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      prompt: 'select_account consent',
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
