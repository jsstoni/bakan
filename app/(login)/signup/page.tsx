import { SignUpForm } from '@/app/(login)/_components/signup.form';
import Card from '@/components/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignUp() {
  return (
    <Card
      title="Create your account"
      description="Just a few quick things to get started"
      className="min-w-sm"
    >
      <SignUpForm />
    </Card>
  );
}
