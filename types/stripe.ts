export type IntervalPrice = { id: string; interval: string; price: number };

export type StripeProduct = {
  id: string;
  productName?: string;
  productId: string;
  unitAmount: number;
  currency: string;
  intervals: IntervalPrice[];
  trialPeriodDays: number | null;
};
