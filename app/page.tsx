import { SwithPrice } from '@/components/payment/product-price';
import { getStripePrices } from '@/lib/payments/stripe';

export default async function Home() {
  const products = await getStripePrices();
  return (
    <>
      <h1>APP</h1>

      <SwithPrice products={products} />
    </>
  );
}
