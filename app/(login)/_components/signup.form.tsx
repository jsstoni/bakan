'use client';

import { Field } from '@/components/field';
import { Password } from '@/components/password';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/client';
import { registerSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, MailIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', name: '', password: '', repassword: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: `/verify-email?e=${data.email}`,
    });

    if (error) {
      return toast.error(error.message);
    }
    toast.success('Account created successfully');
    form.reset();
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FieldGroup>
          <Field
            control={form.control}
            name="name"
            label="Name"
            render={(field) => (
              <InputGroup>
                <InputGroupInput
                  type="text"
                  placeholder="jhon doe"
                  {...field}
                />
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
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
          <Field
            control={form.control}
            name="repassword"
            label="Repeat password"
            render={(field) => <Password field={field} />}
          />
        </FieldGroup>
        <p>
          Already have an account?{' '}
          <Link className="font-bold hover:underline" href="/signin">
            Sign In
          </Link>
        </p>
        <Button type="submit">
          {form.formState.isSubmitting && <Spinner />} Create account{' '}
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}
