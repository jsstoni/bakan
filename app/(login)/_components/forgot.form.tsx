'use client';

import { Field } from '@/components/field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { userSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function ForgotForm() {
  const form = useForm({
    resolver: zodResolver(userSchema.pick({ email: true })),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(async () => {});

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={onSubmit}>
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

        <Button className="w-full" type="submit">
          Reset password
        </Button>

        <Link href="/signin" className="flex items-center justify-center gap-2">
          <ArrowLeft size={14} /> Back to login
        </Link>
      </form>
    </Form>
  );
}
