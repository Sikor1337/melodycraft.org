import { describe, it, expect } from 'vitest';
import { TIER_PRICE, type Tier } from './types';

describe('TIER_PRICE', () => {
  it('prices the Just the Song (standard) plan at $9.99', () => {
    expect(TIER_PRICE.standard).toBe(9.99);
  });

  it('prices the 1-year streaming (premium) plan at $39.99', () => {
    expect(TIER_PRICE.premium).toBe(39.99);
  });

  it('prices the lifetime streaming (signature) plan at $69.99', () => {
    expect(TIER_PRICE.signature).toBe(69.99);
  });

  it('orders the tiers good-better-best (9.99 < 39.99 < 69.99)', () => {
    expect(TIER_PRICE.standard).toBeLessThan(TIER_PRICE.premium);
    expect(TIER_PRICE.premium).toBeLessThan(TIER_PRICE.signature);
  });

  it('defines a price for every tier', () => {
    const tiers: Tier[] = ['standard', 'premium', 'signature'];
    for (const tier of tiers) {
      expect(typeof TIER_PRICE[tier]).toBe('number');
      expect(TIER_PRICE[tier]).toBeGreaterThan(0);
    }
  });
});
