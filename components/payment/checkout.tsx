'use client';

import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/lib/payments/checkout';
import { ArrowRight } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function Checkout({ priceId }: { priceId: string }) {
  return (
    <form className="mt-4" action={createCheckoutSession}>
      <input type="hidden" name="priceId" value={priceId} />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full bg-blue-600 text-white hover:bg-blue-700"
      variant="secondary"
      type="submit"
      disabled={pending}
    >
      Get Started <ArrowRight className="ml-2 size-4" />
    </Button>
  );
}
