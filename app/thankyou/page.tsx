import { buttonVariants } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

function ThankyouPage() {
  return (
    <div className="mx-auto mt-14 max-w-screen-sm border p-10 text-center shadow-2xl">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-6 font-bold text-4xl">Thanks for subscribing!</h1>
      <p className="text-muted-foreground">
        Your subscription has been processed successfully.
      </p>
      <p className="mx-auto my-6 max-w-sm">
        We appreciate your support. You can now access all the features
        available to you.
      </p>
      <a className={buttonVariants()} href="/dashboard">
        Go to panel
      </a>
    </div>
  );
}

export default ThankyouPage;
