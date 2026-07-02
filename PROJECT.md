# MelodyCraft — Project Overview & Roadmap

> A plain-language document for non-technical readers. It explains **what the site is**, **what already works**, **what's just for show**, and **what's planned next**.
>
> 🇵🇱 Polish version: [`PROJEKT.md`](./PROJEKT.md)

---

## 1. What is it?

**MelodyCraft** is a sales page (landing page) for a service that creates **custom songs on demand**. A customer shares their story, and professional producers craft a finished, studio-quality track — delivered in 24 hours. Perfect as a gift, for an occasion (birthday, wedding, anniversary), or for online creators.

- **Target market:** the United States (the site is in English).
- **Style:** elegant and "boutique" — dark background, gold accent, classic serif typography. It deliberately avoids looking like a cheap "AI generator."

## 2. Where can I see it?

🔗 **Live site:** https://sikor1337.github.io/melodycraft.org/

> Publishing is **manual** — after editing we run `deploy.bat`, and the site updates within ~1–2 minutes.

---

## 3. What already works ✅

| Element | Status | Description |
|---|---|---|
| Hero section | ✅ Done | Headline, buttons, a "player" card with a featured track |
| "How it works" | ✅ Done | 3 steps: share your story → we produce it → you receive it |
| Music samples | ✅ Done | Spotify players embedded on the page (*currently placeholders*) |
| Customer reviews | ✅ Done | 3 testimonials (*currently placeholders*) |
| Pricing | ✅ Done | Three plans (*good-better-best* strategy): **Just the Song $9.99**, **Streaming for a Year $39.99** (most popular) and **Streaming for Life $69.99** (anchor — makes $39.99 look like great value) |
| Order form | ✅ Done | Style, occasion, who it's for, story → proceed to checkout |
| FAQ | ✅ Done | 5 questions and answers |
| Mobile version | ✅ Done | Fully responsive + a "hamburger" menu |
| Live web address | ✅ Done | Free hosting (GitHub Pages) |

## 4. What's "just for show" for now (to be completed) ⚠️

These look and click like the real thing, but are **not yet connected** to real systems:

- 🎵 **Music samples** — currently popular Spotify playlists used as placeholders. We need to add **our own tracks**.
- 💳 **Payment (Stripe)** — checkout **already redirects to Stripe's secure payment page** (Payment Links) — currently in **test mode** (Stripe's sandbox: the full real flow, but no real money moves). Our Stripe account exists and is being configured; once it's activated we swap in the **3 live links** (one per plan) and real payments are on. If a link were ever missing, an "Email my order" fallback is shown instead.
- 🔐 **Login / account** — the buttons work visually, but there are **no real user accounts** yet. **Out of scope for the MVP** — accounts arrive with the full 1.0 version.
- 📨 **Orders** — each order now gets a **reference code** (e.g. `MC-ABC123`) that appears next to the payment in our Stripe dashboard, and the brief is saved in the customer's browser. But the brief itself **doesn't reach us automatically yet** (no database / email). To be connected.
- 💬 **Reviews and stats** (e.g., "10,000+ customers") — placeholder text, to be replaced with real data.

---

## 5. Development roadmap

> 🎯 **Current scope = MVP:** the site + **payment for a song order** (Stripe). **No user accounts** — those come later, in the full 1.0 version. MVP goal: a customer lands, fills in the brief, pays; we receive the order by email.
>
> ⚡ **Fastest path to the first sale:** finish **Stripe account activation** (then swap the test links for live ones) + add **our own tracks and real reviews**.
>
> 📅 **Realistic timeline:**
> - **Now (July 2026) — MVP:** Phase 2 (Stripe) is **in progress** — test payments already work end-to-end; we're waiting on live account activation. Phase 1 (content) runs in parallel. Goal: **MVP live and first sales within ~1 week**. The priority is to **start earning**.
> - **Later (once the MVP proves out and sales come in) — 1.0:** Phase 3 (accounts) roughly **September–October 2026**. We don't start it until the MVP is earning.
> - **In parallel / after MVP:** Phase 4 (marketing) — kicks in once payments work.

### Phase 1 (MVP) — Content 🟡 · *now, July 2026*
*Goal: the site shows the real offering, ready to present to customers.*
- [ ] Replace music samples with **our own tracks** (links from Spotify / Apple Music / YouTube).
- [ ] Add real **customer reviews** (and optionally photos/names with consent).
- [ ] Verify **pricing and plan descriptions**.
- [ ] Polish the copy (headlines, FAQ) to match our brand.

### Phase 2 (MVP) — Payment for a song 🟠 · *in progress — priority*
*Goal: a customer can actually pay for an order — no account required.*
- [x] Wire up the **3 Stripe links** (Payment Links) — ✅ done in **test mode** (July 3, 2026); the whole flow works, no real money yet.
- [ ] Swap in the **live** Payment Links once the Stripe account is activated (account created, configuration in progress) — real transactions.
- [ ] The order (customer brief) reaches us by **email** — no database for now. *(Today: the brief stays in the customer's browser; only the reference code reaches Stripe.)*
- [x] A "thank you" message after payment (`?paid=1`) — ✅ done (confirmation banner).

### Phase 3 — Full 1.0 version: accounts 🔵 · *later — once the MVP is earning (~Sept–Oct 2026)*
*Goal: accounts and customer support — out of MVP scope, only after sales are validated.*
- [ ] Real **login and user accounts**.
- [ ] **Customer dashboard** — view orders, download finished songs, request revisions.
- [ ] A simple **admin panel** for us — manage orders (instead of email).

### Phase 4 — Marketing & growth 🟢 · *in parallel / after MVP launch*
*Goal: more traffic and higher conversion.*
- [ ] A custom **domain** (e.g., melodycraft.org instead of the github.io address).
- [ ] **SEO** + a social-share image (link preview when shared).
- [ ] **Analytics** (how many visitors, what they click, how many buy).
- [ ] Blog / case studies, referral programs, seasonal discounts.

> The order and scope of phases can change freely — this is a proposal, not a fixed plan.

---

## 6. What we need from the team 📋

To kick off **Phase 1**, it would help to have:
1. **3–6 links** to our tracks (Spotify preferred; Apple Music / YouTube also fine).
2. **Real customer reviews** (quote + name/city).
3. Confirmation of **pricing** and what each plan includes.
4. A **contact** (support email) and any social-media links.
5. (Optional) a **logo** and any photos.

---

## 7. The technical side (in brief)

*For the curious — no jargon:*

- **What it's built with:** a modern web toolkit (React + Vite + Tailwind). It's an industry standard — easy to develop and maintain.
- **Where it's hosted:** GitHub Pages — **free** hosting. Once payments/database are connected, there will be small service costs (e.g., Stripe takes a fee per transaction).
- **Updates:** changes are published by running `deploy.bat`, which builds the site and pushes it to GitHub Pages (the `docs/` folder on the `main` branch).
- **Security:** the site itself stores no customer data; payment happens entirely on Stripe's secure pages (currently in test mode — no real money until the live links go in).

---

*Questions about this document? Every point can be expanded — just say which one.*
