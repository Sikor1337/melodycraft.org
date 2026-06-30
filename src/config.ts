import { Tier } from './types';

/**
 * Stripe Payment Links — paste the URLs from your Stripe Dashboard here.
 *
 * How to get them:
 *   1. Stripe Dashboard → Product catalog → Payment Links → "New".
 *   2. Create one link per plan (Personal $49, Pro Release $99).
 *   3. (Recommended) Under "After payment", set the success URL to:
 *        https://sikor1337.github.io/melodycraft.org/?paid=1
 *   4. Copy each link (looks like https://buy.stripe.com/xxxxxxxx) and paste below.
 *
 * Leave a value as '' until it's ready — the checkout then shows an email
 * fallback instead of a broken button. Test-mode links work the same way.
 */
export const STRIPE_PAYMENT_LINKS: Record<Tier, string> = {
  standard: '', // Personal — $49
  premium: '', // Pro Release — $99
};

/** Email used as a fallback when a Payment Link isn't configured yet. */
export const CONTACT_EMAIL = 'hello@melodycraft.org';
