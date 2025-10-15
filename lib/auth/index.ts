import { ResetPasswordEmail } from '@/components/email/reset-password';
import { resend } from '@/lib/email';
import { env } from '@/lib/env';
import { env as envClient } from '@/lib/env/env-client';
import { stripe as stripeClient } from '@/lib/payments/stripe';
import { db } from '@/server/db';
import { stripe } from '@better-auth/stripe';
import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  baseURL: envClient.NEXT_PUBLIC_BASE_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 3600,
    sendResetPassword: async ({ token, user }) => {
      const { error } = await resend.emails.send({
        from: envClient.NEXT_PUBLIC_EMAIL_HOST,
        to: user.email,
        subject: 'Reset your password',
        react: ResetPasswordEmail({ token, name: user.name }),
      });

      if (error) {
        console.log(error);
        throw new APIError('BAD_REQUEST', {
          message: 'Failed to send password reset email.',
        });
      }
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
