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
| Pricing | ✅ Done | Three plans (*good-better-best* strategy): **Personal $49**, **Pro Release $99** (most popular) and **Signature $199** (anchor — makes $99 look like great value) |
| Order form | ✅ Done | Style, occasion, who it's for, story → proceed to checkout |
| FAQ | ✅ Done | 5 questions and answers |
| Mobile version | ✅ Done | Fully responsive + a "hamburger" menu |
| Live web address | ✅ Done | Free hosting (GitHub Pages) |

## 4. What's "just for show" for now (to be completed) ⚠️

These look and click like the real thing, but are **not yet connected** to real systems:

- 🎵 **Music samples** — currently popular Spotify playlists used as placeholders. We need to add **our own tracks**.
- 💳 **Payment (Stripe)** — checkout **redirects to Stripe's secure payment page** (Payment Links). It only needs **3 Payment Links** (one per plan: Personal, Pro Release, Signature) pasted in from our Stripe account; until then an "Email my order" fallback is shown.
- 🔐 **Login / account** — the buttons work visually, but there are **no real user accounts** yet. **Out of scope for the MVP** — accounts arrive with the full 1.0 version.
- 📨 **Orders** — after a "purchase," the order **doesn't go anywhere yet** (no database / email). To be connected.
- 💬 **Reviews and stats** (e.g., "10,000+ customers") — placeholder text, to be replaced with real data.

---

## 5. Development roadmap

> 🎯 **Current scope = MVP:** the site + **payment for a song order** (Stripe). **No user accounts** — those come later, in the full 1.0 version. MVP goal: a customer lands, fills in the brief, pays; we receive the order by email.
>
> ⚡ **Fastest path to the first sale:** paste in the **3 Stripe links** + add **our own tracks and real reviews**.
>
> 📅 **Realistic timeline:**
> - **Now (July 2026) — MVP:** Phase 2 (Stripe) **starts today**, Phase 1 (content) in parallel. Goal: **MVP live and first sales within ~1 week**. The priority is to **start earning**.
> - **Later (once the MVP proves out and sales come in) — 1.0:** Phase 3 (accounts) roughly **September–October 2026**. We don't start it until the MVP is earning.
> - **In parallel / after MVP:** Phase 4 (marketing) — kicks in once payments work.

### Phase 1 (MVP) — Content 🟡 · *now, July 2026*
*Goal: the site shows the real offering, ready to present to customers.*
- [ ] Replace music samples with **our own tracks** (links from Spotify / Apple Music / YouTube).
- [ ] Add real **customer reviews** (and optionally photos/names with consent).
- [ ] Verify **pricing and plan descriptions**.
- [ ] Polish the copy (headlines, FAQ) to match our brand.

### Phase 2 (MVP) — Payment for a song 🟠 · *starting today — priority*
*Goal: a customer can actually pay for an order — no account required.*
- [ ] Paste in the **3 Stripe links** (Payment Links) — real transactions.
- [ ] The order (customer brief) reaches us by **email** — no database for now.
- [ ] A "thank you" page after payment (`?paid=1`).

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
- **Security:** the site currently stores no customer data or payments (because it's still a demo version).

---

*Questions about this document? Every point can be expanded — just say which one.*
