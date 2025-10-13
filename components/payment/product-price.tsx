'use client';

import { Checkout } from '@/components/payment/checkout';
import type { IntervalPrice, StripeProduct } from '@/types/stripe';
import { useState } from 'react';

type Interval = 'year' | 'month';
type StripeProductMap = {
  [key: string]: StripeProduct;
}[];

export function SwithPrice({ products }: { products: StripeProductMap }) {
  const [interval, setInterval] = useState<Interval>('month');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(e.target.checked ? 'year' : 'month');
  };

  return (
    <div className="mt-10 grid grid-cols-2">
      {products.map((product, i) => {
        const [productId, data] = Object.entries(product)[i];
        return (
          <div
            className="space-y-1 rounded-lg border-2 border-blue-400 p-8 shadow-lg"
            key={productId}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">{data.productName}</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="interval"
                  checked={interval === 'year'}
                  onChange={handleChange}
                />
                <label htmlFor="interval">Pay yearly</label>
              </div>
            </div>
            <ProductPrice intervals={data.intervals} type={interval} />
          </div>
        );
      })}
    </div>
  );
}

function ProductPrice({
  intervals,
  type,
}: {
  intervals: IntervalPrice[];
  type: Interval;
}) {
  const product = intervals.find((d) => d.interval === type);

  if (!product) return <p>there aren't yearly payments</p>;

  return (
    <>
      <p className="font-bold text-3xl text-green-700">
        ${product.price / 100}{' '}
        <span className="font-normal text-muted-foreground text-sm">
          /{type === 'month' ? 'Monthly' : 'Yearly'}
        </span>
      </p>
      <Checkout priceId={product.id} />
    </>
  );
}
