# Go-live checklist — swap Stripe test links for live (planned: July 4, 2026)

Delete this file after go-live.

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

## 3. Swap the links in code
Paste the 3 live URLs into `src/config.ts` → `STRIPE_PAYMENT_LINKS`
(replace the `https://buy.stripe.com/test_...` values, keep the comments).

## 4. Check and deploy
```bash
npm run lint
npm test
deploy.bat
```

## 5. Verify on the live site
- Open https://sikor1337.github.io/melodycraft.org/ → order flow → "Pay with Stripe".
- Confirm the Stripe page URL has **no** `test_` and shows the right plan + price.
- Don't enter a card — test cards are rejected in live mode; a real charge is real money.
  (Optional real test: pay $9.99 yourself, confirm the `?paid=1` banner, then refund
  from the dashboard — or ask Claude, the plugin can create refunds.)

## 6. Turn on order-brief e-mail (code is ready, needs one key)
- Go to https://web3forms.com, enter the inbox that should receive briefs
  (e.g. hello@melodycraft.org) — the free access key arrives by e-mail.
- Paste it into `src/config.ts` → `WEB3FORMS_ACCESS_KEY` and deploy.
- From then on every "Pay with Stripe" click e-mails us the full brief with the
  `MC-...` reference code (the same code shows next to the payment in Stripe).

## Still open after go-live (not blocking)
- Own tracks + real testimonials (Phase 1 content).
