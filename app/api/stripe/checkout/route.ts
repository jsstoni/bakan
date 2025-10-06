import { stripe } from '@/lib/payments/stripe';
import { db } from '@/server/db';
import { subscription } from '@/server/models/subscription';
import { type NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription'],
    });

    if (!session.customer || typeof session.customer === 'string') {
      throw new Error('Invalid customer data from Stripe.');
    }

    const customerId = session.customer.id;

    const {
      id: subscriptionId,
      items: { data: products },
    } = session.subscription as Stripe.Subscription;

    const {
      price: { id: priceId },
    } = products[0];

    const userEmail = session.customer_email;
    if (!userEmail) {
      throw new Error("No user EMAIL found in session's customer_email.");
    }

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error("No user ID found in session's client_reference_id.");
    }

    await db.insert(subscription).values({ customerId, priceId, userId });

    console.log('Subscription successfully created', {
      customerId,
      subscriptionId,
      priceId,
      userId,
      userEmail,
    });

    return NextResponse.redirect(new URL('/thankyou', request.url));
  } catch (error) {
    console.error('Error handling successful checkout:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
