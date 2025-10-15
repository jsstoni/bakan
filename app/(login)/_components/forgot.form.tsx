'use client';

import { Field } from '@/components/field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/client';
import { userSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

export function ForgotForm() {
  const emailSchema = userSchema.pick({ email: true });
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof emailSchema>) => {
      const { error } = await authClient.forgetPassword({
        email: values.email,
      });

      if (error) {
        return toast.error(error.message);
      }

      toast.success(
        "If the email exists in our database, you'll receive an email."
      );
      form.reset();
    }
  );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field
          control={form.control}
          name="email"
          label="Email"
          render={(field) => (
            <InputGroup>
              <InputGroupInput
                type="email"
                placeholder="Enter your email"
                {...field}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner />} Reset password
        </Button>

        <Link href="/signin" className="flex items-center justify-center gap-2">
          <ArrowLeft size={14} /> Back to login
        </Link>
      </form>
    </Form>
  );
}
