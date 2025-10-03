'use server';

import { getSession } from '@/lib/auth/require-user';
import { env } from '@/lib/env';
import { stripe } from '@/lib/payments/stripe';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(formData: FormData) {
  const priceId = formData.get('priceId') as string;
  const session = await getSession();

  if (!session) {
    redirect('/signup');
  }

  const sessionCheckout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BASE_URL}/`,
    customer_email: session.user.email,
    client_reference_id: session.user.id,
    allow_promotion_codes: true,
  });

  redirect(sessionCheckout.url as Route);
}
