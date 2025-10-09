import { ResetForm } from '@/app/(login)/_components/reset.form';
import Card from '@/components/card';

export default function ResetPassword() {
  return (
    <Card
      className="min-w-sm"
      title="Set a new password"
      description="Your new password must be different from previusly used passwords"
    >
      <ResetForm />
    </Card>
  );
}
