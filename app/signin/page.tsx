"use client";

import Card from "@/components/card";
import { Field } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });

    if (error) {
      return toast.error(error.message);
    }
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted">
      <Card
        title="Login to your account"
        description="Enter your email below to login to your account"
        className="min-w-sm"
      >
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field
              control={form.control}
              name="email"
              label="Email"
              render={(field) => <Input type="email" {...field} />}
            />
            <Field
              control={form.control}
              name="password"
              label="Password"
              render={(field) => <Input type="password" {...field} />}
            />
            <Button size="sm">Login</Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
