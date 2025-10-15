import { LoginGoogle } from '@/app/(login)/_components/login-google';
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
      description="Welcome back you've been missed!"
      className="min-w-sm"
    >
      <LoginGoogle />
      <div className="my-4 flex items-center gap-2 text-xs uppercase [&_hr]:flex-1">
        <hr />
        <span>Or log in with your Email</span>
        <hr />
      </div>
      <SignInForm />
    </Card>
  );
}
