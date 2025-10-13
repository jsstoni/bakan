import { SwithPrice } from '@/components/payment/product-price';
import { getStripePrices } from '@/lib/payments/stripe';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'The pricing page of the application.',
};

export default async function Pricing() {
  const products = await getStripePrices();

  return (
    <section className="mx-auto mt-14 max-w-5xl py-10">
      <h1 className="font-bold text-4xl">Pricing</h1>
      <p className="text-lg">Use Stripe test cards to simulate payments.</p>
      <SwithPrice products={products} />
    </section>
  );
}
