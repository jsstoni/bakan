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
import { authClient } from '@/lib/auth/auth-client';
import { registerSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, UserIcon } from 'lucide-react';
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
          name="name"
          label="Name"
          render={(field) => (
            <InputGroup>
              <InputGroupInput type="text" placeholder="jhon doe" {...field} />
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
        <p>
          Already a user?{' '}
          <Link className="font-bold hover:underline" href="/signin">
            Login
          </Link>
        </p>
        <Button type="submit">Create account</Button>
      </form>
    </Form>
  );
}
