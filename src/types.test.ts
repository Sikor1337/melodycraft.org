import { describe, it, expect } from 'vitest';
import { TIER_PRICE, type Tier } from './types';

describe('TIER_PRICE', () => {
  it('prices the Personal (standard) plan at $49', () => {
    expect(TIER_PRICE.standard).toBe(49);
  });

  it('prices the Pro Release (premium) plan at $99', () => {
    expect(TIER_PRICE.premium).toBe(99);
  });

  it('defines a price for every tier', () => {
    const tiers: Tier[] = ['standard', 'premium'];
    for (const tier of tiers) {
      expect(typeof TIER_PRICE[tier]).toBe('number');
      expect(TIER_PRICE[tier]).toBeGreaterThan(0);
    }
  });
});
