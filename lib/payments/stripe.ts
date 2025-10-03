import 'server-only';
import { env } from '@/lib/env';
import type { StripeProduct } from '@/types/stripe';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
});

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring',
  });

  const grouped = prices.data.reduce(
    (acc, price) => {
      const product =
        typeof price.product === 'string'
          ? { id: price.product, name: undefined }
          : (price.product as { id: string; name: string });

      const productId = product.id;
      if (!productId) return acc;

      const amount = price.unit_amount as number;

      if (!acc[productId]) {
        acc[productId] = {
          id: price.id,
          productName: product.name,
          productId: product.id,
          unitAmount: amount,
          currency: price.currency,
          intervals: [],
          trialPeriodDays: price.recurring?.trial_period_days as number,
        };
      }

      if (price.recurring?.interval) {
        acc[product.id].intervals.push({
          id: price.id,
          interval: price.recurring.interval,
          price: amount,
        });
      }

      return acc;
    },
    {} as Record<string, StripeProduct>
  );

  return Object.entries(grouped).map(([productId, data]) => ({
    [productId]: data,
  }));
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id,
  }));
}
