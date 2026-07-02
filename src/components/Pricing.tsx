import React from 'react';
import { Check } from 'lucide-react';
import { Tier, TIER_PRICE, TIER_LABEL } from '../types';

interface PricingProps {
  onSelectPlan: (tier: Tier) => void;
}

const PLANS = [
  {
    tier: 'standard' as Tier,
    name: TIER_LABEL.standard,
    price: TIER_PRICE.standard,
    note: 'one-time',
    features: [
      'Custom studio-quality song',
      'Up to 3-minute track',
      'Mastered MP3 download',
      '2 revisions included',
      'Personal-use license',
    ],
    featured: false,
  },
  {
    tier: 'premium' as Tier,
    name: TIER_LABEL.premium,
    price: TIER_PRICE.premium,
    note: 'one-time',
    features: [
      'Everything in Just the Song',
      'Published to Apple Music, Spotify & more',
      '1 year of streaming distribution',
      'You approve before we upload',
    ],
    featured: true,
  },
  {
    tier: 'signature' as Tier,
    name: TIER_LABEL.signature,
    price: TIER_PRICE.signature,
    note: 'one-time',
    features: [
      'Everything in the yearly plan',
      'Lifetime distribution that never expires',
      'Priority delivery',
      'You approve before we upload',
    ],
    featured: false,
  },
];

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 md:py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-accent mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">
            Pay once. Own it forever.
          </h2>
          <p className="text-lg text-stone-400">No subscriptions, no hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.featured ? 'bg-accent/[0.06] border border-accent/25' : 'surface'
              }`}
            >
              <div className="flex items-center justify-between mb-6 min-h-7">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                {plan.featured && (
                  <span className="text-xs font-semibold text-accent border border-accent/30 rounded-full px-3 py-1">
                    Most popular
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-stone-500">{plan.note}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-stone-300">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.tier)}
                className={`w-full py-3.5 rounded-lg font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-accent hover:bg-accent/90 text-stone-950'
                    : 'border border-white/15 text-white hover:bg-white/5'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-stone-500 mt-8 max-w-2xl">
          Add professional lyric writing to any plan for{' '}
          <span className="text-stone-300">$3.99</span>. You always approve the final song before
          we upload it anywhere.
        </p>
      </div>
    </section>
  );
};
