# Go-live checklist — July 4, 2026

Goal: real payments + order briefs landing in our inbox. One deploy at the end.
Delete this file after go-live. Tip: open a Claude session and say "go live" —
it knows this plan and can do steps 3–6 (and 2, if the Stripe plugin is
connected in live mode).

## 1. Finish Stripe account activation
Dashboard → complete business profile, identity verification, and bank payout details.
Account: `$ikor sandbox` → activate live mode.

## 2. Create the 3 live Payment Links
In the dashboard switch **Test mode OFF**, then create one Payment Link per plan
(or ask Claude — if the Stripe plugin is connected in live mode it can create them via API):

| Plan | Price | After payment |
|---|---|---|
| Just the Song | $9.99 | redirect to `https://sikor1337.github.io/melodycraft.org/?paid=1` |
| Streaming for a Year | $39.99 | redirect to `https://sikor1337.github.io/melodycraft.org/?paid=1` |
| Streaming for Life | $69.99 | redirect to `https://sikor1337.github.io/melodycraft.org/?paid=1` |

Settings per link: one-time payment, USD, "Don't collect shipping address".
Live URLs look like `https://buy.stripe.com/xxxx` — **no `test_` segment**.

## 3. Get the Web3Forms key (order-brief e-mail; code already shipped)
Go to https://web3forms.com, enter the inbox that should receive briefs
(e.g. hello@melodycraft.org) — the free access key arrives by e-mail.

## 4. Paste both into the code
In `src/config.ts`:
- `STRIPE_PAYMENT_LINKS` → the 3 live URLs (replace `.../test_...`, keep the comments).
- `WEB3FORMS_ACCESS_KEY` → the Web3Forms key.

## 5. Check and deploy (once)
```bash
npm run lint
npm test
deploy.bat
```

## 6. Verify on the live site
- Open https://sikor1337.github.io/melodycraft.org/ → order flow → "Pay with Stripe".
- The brief e-mail (with the `MC-...` reference) should hit the inbox at this
  click — before any payment. Check it arrived.
- Confirm the Stripe page URL has **no** `test_` and shows the right plan + price.
- Don't enter a card — test cards are rejected in live mode; a real charge is real money.
  (Optional real test: pay $9.99 yourself, confirm the `?paid=1` banner, match the
  `MC-...` code in Stripe to the e-mail, then refund from the dashboard — or ask
  Claude, the plugin can create refunds.)
- Delete this file.

## Still open after go-live (not blocking)
- Own tracks + real testimonials (Phase 1 content).
