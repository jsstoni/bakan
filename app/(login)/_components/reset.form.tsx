'use client';

import { Field } from '@/components/field';
import { Password } from '@/components/password';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/client';
import { registerSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

export function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const passwordSchema = registerSchema.pick({
    password: true,
    repassword: true,
  });

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      repassword: '',
    },
  });

  const token = searchParams.get('token') as string;

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof passwordSchema>) => {
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token,
      });

      if (error) {
        return toast.error(error.message);
      }

      toast.success('Password reset successfully');
      router.push('/signin');
    }
  );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FieldGroup>
          <Field
            control={form.control}
            name="password"
            label="Password"
            render={(field) => <Password field={field} />}
          />

          <Field
            control={form.control}
            name="repassword"
            label="Repeat password"
            render={(field) => <Password field={field} />}
          />
        </FieldGroup>

        <Button className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />} Reset password
        </Button>
      </form>
    </Form>
  );
}
