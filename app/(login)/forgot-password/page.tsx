import { ForgotForm } from '@/app/(login)/_components/forgot.form';
import Card from '@/components/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: '',
};

export default function Forgot() {
  return (
    <Card
      title="Forgot your Password?"
      description="A link will be sent to your email to reset your password."
      className="min-w-sm"
    >
      <ForgotForm />
    </Card>
  );
}
