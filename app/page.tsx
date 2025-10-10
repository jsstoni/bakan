import { Logo } from '@/components/logo';
import { SwithPrice } from '@/components/payment/product-price';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getStripePrices } from '@/lib/payments/stripe';
import { ArrowRightIcon } from 'lucide-react';

export default async function Home() {
  const products = await getStripePrices();
  return (
    <>
      <header className="fixed top-0 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center">
          <div className="flex items-center gap-2">
            <Logo className="size-6 fill-black dark:fill-white" />
            <span className="font-semibold text-lg">Bakan</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl space-y-4 py-20 text-center md:py-34">
        <Badge variant="secondary">Production-ready Next.js Boilerplate</Badge>
        <h1 className="text-balance font-black text-4xl tracking-tight md:text-7xl">
          Launch your SaaS with Next.js in minutes
        </h1>
        <p className="text-balance text-muted-foreground text-xl">
          Includes authentication, payments, database, and analytics from the
          start. Build your SaaS without wasting time on configuration.
        </p>
        <div>
          <Button size="lg">
            Get Started <ArrowRightIcon />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl py-12">
        <div className="mb-8 space-y-4 text-center">
          <h3 className="font-bold text-2xl md:text-4xl">
            Everything you need to get started
          </h3>
          <p>Modern and complete stack to build SaaS applications</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Better Auth integrated with support for email/password, OAuth,
                and secure sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Better-Auth</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>
                Stripe integrated for subscriptions, one-time payments, and
                customer management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Stripe</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Google Analytics configured to track events and user behavior.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Google-Analytics</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
              <CardDescription>
                Drizzle ORM with TypeScript for type-safe queries and automatic
                migrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>drizzle-orm</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <SwithPrice products={products} />
    </>
  );
}
