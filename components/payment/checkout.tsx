'use client';

import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/lib/payments/checkout';
import { ArrowRight } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function Checkout({ priceId }: { priceId: string }) {
  return (
    <form action={createCheckoutSession}>
      <input type="hidden" name="priceId" value={priceId} />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="outline">
      Get Started <ArrowRight className="ml-2 size-4" />
    </Button>
  );
}
