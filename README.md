# Bakan
NEXT.js 16 App Router

### Packages

* Database - DrizzleORM
* Authentication - better-auth
* Payments - Stripe
* UI - Shadcn
* Analytics - Google Analytics
* Schema validation - Zod
* Environment variables - @t3-oss/env-nextjs
* Security - Arcjet
* Code linting and formatting - Biome

### Stripe

This project uses Stripe for payment processing. To set up Stripe, follow these steps:

1. Create a Stripe account at [stripe](https://stripe.com).
2. Obtain your Stripe API keys from the Stripe Dashboard.
3. Set the following environment variables in your `.env` file:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Ensure that you have configured your webhook endpoint in the Stripe Dashboard to point to `/api/auth/stripe/webhook` in your application.
5. Install the Stripe CLI for local development and testing of webhooks:
   ```
   npm install -g stripe
   ```
6. Start the Stripe CLI to listen for events and forward them to your local server:
   ```
   stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
   ```
7. Set the `STRIPE_WEBHOOK_SECRET` environment variable in your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

### Better-Auth ~ Stripe

I recommend using static prices by copying only the price ID from the Stripe dashboard.

### Environment variables

there are two files in the `lib/env` folder `index` with the server environment and `client` with the client environment

| KEY | DOCS |
| --- | --- |
| NEXT_PUBLIC_BASE_URL | |
| NEXT_PUBLIC_REPO_URL | |
| DATABASE_URL | |
| STRIPE_SECRET_KEY | |
| STRIPE_WEBHOOK_SECRET | |
| BETTER_AUTH_SECRET | |
| RESEND_API_KEY | |
| NEXT_PUBLIC_EMAIL_HOST | |
| GOOGLE_CLIENT_ID | |
| GOOGLE_CLIENT_SECRET | |
| NEXT_PUBLIC_GAID | |
