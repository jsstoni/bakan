'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function ResendEmail({
  className,
  email,
}: React.ComponentProps<'button'> & { email: string }) {
  const [isPending, startTransition] = useTransition();

  const sendEmail = () => {
    startTransition(async () => {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Verification email sent successfully!');
      }
    });
  };

  return (
    <Button className={cn(className)} onClick={sendEmail} disabled={isPending}>
      {isPending ? (
        <>
          <Spinner />
          Sending...
        </>
      ) : (
        'Resend verification email'
      )}
    </Button>
  );
}
