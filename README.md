# Bakan
NEXT.js APP Router

### Packages

* Environment variables - @t3-oss/env-nextjs
* Schema validation - Zod
* Authentication - better-auth
* UI - Shadcn
* Payments - Stripe
* Analytics - Google Analytics

### Stripe

This project uses Stripe for payment processing. To set up Stripe, follow these steps:

1. Create a Stripe account at [stripe](https://stripe.com).
2. Obtain your Stripe API keys from the Stripe Dashboard.
3. Set the following environment variables in your `.env` file:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Ensure that you have configured your webhook endpoint in the Stripe Dashboard to point to `/api/stripe/webhook` in your application.
5. Install the Stripe CLI for local development and testing of webhooks:
   ```
   npm install -g stripe
   ```
6. Start the Stripe CLI to listen for events and forward them to your local server:
   ```
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
7. Set the `STRIPE_WEBHOOK_SECRET` environment variable in your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```
