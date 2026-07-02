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
  standard: 9.99,
  premium: 39.99,
  signature: 69.99,
};

/** Short product label shown in the builder/checkout. */
export const TIER_LABEL: Record<Tier, string> = {
  standard: 'Just the Song',
  premium: 'Streaming for a Year',
  signature: 'Streaming for Life',
};

/** One-line "what you get" note per tier. */
export const TIER_NOTE: Record<Tier, string> = {
  standard: 'Personal-use license',
  premium: 'On Apple Music & Spotify for 1 year',
  signature: 'On streaming for life',
};
