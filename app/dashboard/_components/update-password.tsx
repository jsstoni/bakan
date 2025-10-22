'use client';

import { Field } from '@/components/field';
import { Password } from '@/components/password';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth/client';
import { registerSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export function UpdatePassword() {
  const passwordSchema = registerSchema
    .omit({ email: true, name: true })
    .extend({
      currentpass: z.string(),
    })
    .refine((data) => data.password === data.repassword, {
      path: ['repassword'],
      message: 'Passwords do not match',
    });

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      repassword: '',
      currentpass: '',
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof passwordSchema>) => {
      const { error } = await authClient.changePassword({
        newPassword: values.password,
        currentPassword: values.currentpass,
        revokeOtherSessions: true,
      });

      if (error) {
        return toast.error(error.message);
      }

      toast.success('Password changed successfully');
    }
  );

  return (
    <FieldSet>
      <FieldLegend>Change your password</FieldLegend>
      <Form {...form}>
        <form className="max-w-xs space-y-4" onSubmit={onSubmit}>
          <FieldGroup>
            <Field
              control={form.control}
              name="currentpass"
              label="Old Password"
              render={(field) => <Password field={field} />}
            />
            <Field
              control={form.control}
              name="password"
              label="New Password"
              render={(field) => <Password field={field} />}
            />
            <Field
              control={form.control}
              name="repassword"
              label="Confirm New Password"
              render={(field) => <Password field={field} />}
            />
          </FieldGroup>

          <Button type="submit">
            {form.formState.isSubmitting && <Spinner />} Save
          </Button>
        </form>
      </Form>
    </FieldSet>
  );
}
