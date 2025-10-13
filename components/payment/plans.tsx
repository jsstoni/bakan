'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Plans() {
  const handlePro = async () => {
    const { error } = await authClient.subscription.upgrade({
      plan: 'pro',
      successUrl: '/dashboard',
      cancelUrl: '/pricing',
    });

    if (error) {
      toast.error(error.message || 'You must log in');
    }
  };

  return (
    <div className="mt-10 grid grid-cols-2">
      <div className="space-y-1 rounded-lg border border-blue-400 p-8 shadow-lg">
        <h3 className="font-bold text-2xl">Pro plan</h3>

        <p className="mb-4 font-bold text-3xl">
          $20
          <span className="font-normal text-muted-foreground text-sm">
            /Monthly
          </span>
        </p>

        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          variant="secondary"
          onClick={handlePro}
        >
          Get Started <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}
