import { ResendEmail } from '@/app/(login)/_components/resend-email';
import Card from '@/components/card';
import { notFound } from 'next/navigation';
import z from 'zod';

export default async function VerifyUserEmail({
  searchParams,
}: PageProps<'/verify-email'>) {
  const email = (await searchParams).e as string;

  const schema = z.object({ email: z.email().min(1) });
  const parse = schema.safeParse({ email });
  if (parse.error) {
    notFound();
  }

  return (
    <Card
      title="Verify your email"
      description="Complete your registration by verifying your email address."
      className="max-w-sm [&_p]:mb-3"
    >
      <p>
        A verification link has been sent to{' '}
        <span className="underline">{email}</span>
      </p>
      <p>
        Please check your inbox and click the link to verify your email address.
      </p>
      <small>
        (Didn’t receive the email? Check your spam folder or click below to
        resend it.)
      </small>

      <ResendEmail className="mt-2 w-full" email={email} />
    </Card>
  );
}
