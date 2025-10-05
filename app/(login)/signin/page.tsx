import { SignInForm } from '@/app/(login)/_components/signin.form';
import Card from '@/components/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function SignIn() {
  return (
    <Card
      title="Login to your account"
      description="Enter your email below to login to your account"
      className="min-w-sm"
    >
      <SignInForm />
    </Card>
  );
}
