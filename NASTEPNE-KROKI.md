# MelodyCraft — plan działania (start stąd)

> Lista kroków do doprowadzenia strony do stanu „można sprzedawać".
> Kolejność od najważniejszego. Legenda: **[Ty]** = robi klient, **[ja]** = robi Claude/dev.
> Strona live: https://sikor1337.github.io/melodycraft.org/

**Stan na teraz:** strona działa, ma 3 plany cenowe, jest na żywo. Brakuje realnych
płatności i prawdziwych treści (próbki, opinie). Checkout ma na razie awaryjny przycisk
„Email my order".

---

## 🔴 Krok 1 — Płatności Stripe (blokuje realną sprzedaż)

- [ ] **[Ty]** Załóż / zaloguj się na Stripe → **Payment Links** → utwórz **3 linki**:
  - [ ] Personal — **$49**
  - [ ] Pro Release — **$99**
  - [ ] Signature — **$199**
  - [ ] (opcjonalnie) w „After payment" success URL: `https://sikor1337.github.io/melodycraft.org/?paid=1`
- [ ] **[Ty → ja]** Wkleić 3 linki (`https://buy.stripe.com/...`)
- [ ] **[ja]** Wstawić linki do `src/config.ts` i zrobić deploy (`deploy.bat`)

## 🟠 Krok 2 — Prawdziwe treści (żeby nie wyglądało jak demo)

- [ ] **[Ty]** Podać **3–6 linków do Waszych utworów na Spotify** → [ja] podmienię zaślepki w `Hero` i `AudioSamples`
- [ ] **[Ty]** Podać **prawdziwe opinie** klientów (cytat + imię/miasto) → [ja] podmienię testimonials
- [ ] **[Ty]** Potwierdzić **e-mail wsparcia** (teraz `hello@melodycraft.org`) → [ja] zaktualizuję `config.ts` + stopkę
- [ ] **[Ty]** Zdecydować o statystykach typu „10 000+ klientów" (zostawiamy / zmieniamy na realne)

## 🟡 Krok 3 — Obsługa zamówienia po zapłacie

- [ ] **[decyzja]** Po zapłacie zamówienie nigdzie nie trafia. Najprostsza opcja bez backendu:
      powiadomienia mailowe ze Stripe + brief klienta. Do ustalenia jak chcemy to obsłużyć.

## 🟢 Krok 4 — Marketing (później)

- [ ] Własna domena (np. `melodycraft.org` zamiast `github.io`) → wtedy `base` w `vite.config.ts` na `'/'`
- [ ] SEO + obrazek do social media (podgląd linku)
- [ ] Analityka (Google Analytics / Plausible)
- [ ] Blog / realizacje, program poleceń, rabaty sezonowe

---

## ⚡ Najszybsza ścieżka do „można sprzedawać"
**Krok 1 (płatności)** + punkty z **Kroku 2: utwory, opinie, e-mail**. Reszta to ulepszenia.

## 📝 Notatki techniczne (dla [ja])
- Linki Stripe → `src/config.ts` (`STRIPE_PAYMENT_LINKS`: `standard` / `premium` / `signature`)
- Próbki Spotify → `src/components/AudioSamples.tsx` i `Hero` (placeholdery oznaczone komentarzem)
- Po każdej zmianie: `npm run lint`, potem `deploy.bat` (build → commit `docs/` → push)
