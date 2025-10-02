"use client";

import Card from "@/components/card";
import { Field } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { registerSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "", password: "", repassword: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      return toast.error(error.message);
    }
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted">
      <Card title="Create your account" className="min-w-sm">
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field
              control={form.control}
              name="name"
              label="Name"
              render={(field) => <Input type="text" {...field} />}
            />
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
            <Field
              control={form.control}
              name="repassword"
              label="Repeat password"
              render={(field) => <Input type="password" {...field} />}
            />
            <p>
              Already a user?{" "}
              <Link className="font-bold hover:underline" href="/signin">
                Login
              </Link>
            </p>
            <Button type="submit">Create account</Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
