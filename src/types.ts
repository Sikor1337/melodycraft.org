export type Tier = 'standard' | 'premium' | 'signature';

/** Details collected from the order form (no AI involved). */
export interface SongOrder {
  genre: string;
  occasion: string;
  forWhom: string;
  story: string;
}

/** A finalized order passed to checkout. */
export interface OrderItem {
  tier: Tier;
  price: number;
  order: SongOrder;
}

export const TIER_PRICE: Record<Tier, number> = {
  standard: 49,
  premium: 99,
  signature: 199,
};

/** Short product label shown in the builder/checkout. */
export const TIER_LABEL: Record<Tier, string> = {
  standard: 'Custom Song',
  premium: 'Pro Release',
  signature: 'Signature',
};

/** One-line "what you get" note per tier. */
export const TIER_NOTE: Record<Tier, string> = {
  standard: 'Personal-use license',
  premium: 'Full commercial rights & distribution',
  signature: 'Full rights · video · priority delivery',
};
