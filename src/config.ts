import { Tier } from './types';

/**
 * Stripe Payment Links — paste the URLs from your Stripe Dashboard here.
 *
 * How to get them:
 *   1. Stripe Dashboard → Product catalog → Payment Links → "New".
 *   2. Create one link per plan (Just the Song $9.99, Streaming for a Year $39.99,
 *      Streaming for Life $69.99).
 *   3. (Recommended) Under "After payment", set the success URL to:
 *        https://sikor1337.github.io/melodycraft.org/?paid=1
 *   4. Copy each link (looks like https://buy.stripe.com/xxxxxxxx) and paste below.
 *
 * Leave a value as '' until it's ready — the checkout then shows an email
 * fallback instead of a broken button. Test-mode links work the same way.
 */
export const STRIPE_PAYMENT_LINKS: Record<Tier, string> = {
  standard: 'https://buy.stripe.com/test_6oU3cvbCq9hQ0Sx9tU7wA00', // Just the Song — $9.99
  premium: 'https://buy.stripe.com/test_14AfZh7ma8dMbxb21s7wA01', // Streaming for a Year — $39.99
  signature: 'https://buy.stripe.com/test_6oU8wP9ui8dMcBf21s7wA02', // Streaming for Life — $69.99
};

/** Email used as a fallback when a Payment Link isn't configured yet. */
export const CONTACT_EMAIL = 'hello@melodycraft.org';
