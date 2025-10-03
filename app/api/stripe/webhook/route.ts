import { env } from '@/lib/env';
import { stripe } from '@/lib/payments/stripe';
import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
const relevantEvents = new Set([
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headerPayload = await headers();
  const signature = headerPayload.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not found.' },
        { status: 400 }
      );
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  if (relevantEvents.has(event.type)) {
    const subscription = event.data.object as Stripe.Subscription;
    console.log('update or remove subscription', subscription);
  } else {
    return NextResponse.json(
      { error: `Unsupported event type: ${event.type}` },
      { status: 400 }
    );
  }

  return NextResponse.json({ received: true });
}
