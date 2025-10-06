'use client';

import { Field } from '@/components/field';
import { Password } from '@/components/password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/auth-client';
import { userSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
    });

    if (error) {
      return toast.error(error.message);
    }
  });

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
        <Field
          control={form.control}
          name="password"
          label="Password"
          render={(field) => <Password field={field} />}
        />

        <Button type="submit">
          {form.formState.isSubmitting && <Spinner />} Login <ArrowRight />
        </Button>

        <p>
          Don't have an account?{' '}
          <Link className="font-bold hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
