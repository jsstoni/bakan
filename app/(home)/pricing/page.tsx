import { Plans } from '@/components/payment/plans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'The pricing page of the application.',
};

export default function Pricing() {
  return (
    <section className="mx-auto mt-14 max-w-5xl py-10">
      <h1 className="font-bold text-4xl">Pricing</h1>
      <p className="text-lg">Use Stripe test cards to simulate payments.</p>
      <Plans />
    </section>
  );
}
