import { ResetPasswordEmail } from '@/components/email/reset-password';
import { VerifyEmail } from '@/components/email/verify-email';
import { resend } from '@/lib/email';
import { env as envClient } from '@/lib/env/client';
import { APIError, type User } from 'better-auth';

type Send = {
  user: User;
  token: string;
};

export const sendResetPassword = async ({ user, token }: Send) => {
  const { error } = await resend.emails.send({
    from: envClient.NEXT_PUBLIC_EMAIL_HOST,
    to: user.email,
    subject: 'Reset your password',
    react: ResetPasswordEmail({ token, name: user.name }),
  });

  if (error) {
    console.log(error);
    throw new APIError('BAD_REQUEST', {
      message: 'Failed to send verification email.',
    });
  }
};

export const sendVerificationEmail = async ({
  user,
  url,
}: Send & { url: string }) => {
  const { error } = await resend.emails.send({
    from: envClient.NEXT_PUBLIC_EMAIL_HOST,
    to: user.email,
    subject: 'Confirm your email',
    react: VerifyEmail({ token: url, name: user.name }),
  });

  if (error) {
    console.log(error);
    throw new APIError('BAD_REQUEST', {
      message: 'Failed to send verification email.',
    });
  }
};
