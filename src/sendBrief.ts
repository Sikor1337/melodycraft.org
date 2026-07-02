import { SongOrder, Tier, TIER_LABEL } from './types';
import { WEB3FORMS_ACCESS_KEY } from './config';

/**
 * Fire-and-forget: email the order brief (via Web3Forms) as the customer is
 * redirected to Stripe. `keepalive` lets the request outlive the navigation.
 * Failures are swallowed — the email must never block the payment; the brief
 * is also stashed in localStorage under the same reference as a backup.
 */
export const sendBriefEmail = (order: SongOrder, tier: Tier, price: number, ref: string): void => {
  if (!WEB3FORMS_ACCESS_KEY) return;
  void fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: 'MelodyCraft checkout',
      subject: `New song order ${ref} — ${TIER_LABEL[tier]} ($${price})`,
      reference: ref,
      plan: `${TIER_LABEL[tier]} ($${price})`,
      style: order.genre,
      occasion: order.occasion,
      for: order.forWhom,
      story: order.story,
    }),
  }).catch(() => {
    /* ignore — payment flow continues regardless */
  });
};
