import { describe, it, expect } from 'vitest';
import { TIER_PRICE, type Tier } from './types';

describe('TIER_PRICE', () => {
  it('prices the Personal (standard) plan at $49', () => {
    expect(TIER_PRICE.standard).toBe(49);
  });

  it('prices the Pro Release (premium) plan at $99', () => {
    expect(TIER_PRICE.premium).toBe(99);
  });

  it('prices the Signature anchor plan at $199', () => {
    expect(TIER_PRICE.signature).toBe(199);
  });

  it('orders the tiers good-better-best (49 < 99 < 199)', () => {
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
