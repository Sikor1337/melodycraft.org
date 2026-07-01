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
- 🔐 **Login / account** — the buttons work visually, but there are **no real user accounts** yet.
- 📨 **Orders** — after a "purchase," the order **doesn't go anywhere yet** (no database / email). To be connected.
- 💬 **Reviews and stats** (e.g., "10,000+ customers") — placeholder text, to be replaced with real data.

---

## 5. Development roadmap

> ⚡ **Fastest path to the first sale:** paste in the **3 Stripe links** (technically Phase 2, but it's literally pasting 3 links — a few minutes) + add **our own tracks and real reviews** (Phase 1). Everything else is later-stage growth.

### Phase 1 — Content (next step) 🟡
*Goal: the site shows the real offering, ready to present to customers.*
- [ ] Replace music samples with **our own tracks** (links from Spotify / Apple Music / YouTube).
- [ ] Add real **customer reviews** (and optionally photos/names with consent).
- [ ] Verify **pricing and plan descriptions**.
- [ ] Polish the copy (headlines, FAQ) to match our brand.

### Phase 2 — Real orders & payments 🟠
*Goal: a customer can actually buy and pay.*
- [ ] Connect a **payment gateway** (Stripe) — real transactions.
- [ ] **Save orders** (database) + email notification to us and a confirmation to the customer.
- [ ] "Thank you" / order-status page.

### Phase 3 — Accounts & customer support 🔵
*Goal: customers get their own space, we get a panel.*
- [ ] Real **login and user accounts**.
- [ ] **Customer dashboard** — view orders, download finished songs, request revisions.
- [ ] A simple **admin panel** for us — manage orders.

### Phase 4 — Marketing & growth 🟢
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
