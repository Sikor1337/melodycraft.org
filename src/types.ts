export type Tier = 'standard' | 'premium';

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
};
