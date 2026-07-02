# MelodyCraft — opis projektu i plan rozwoju

> Dokument dla osób nietechnicznych. Tłumaczy **czym jest strona**, **co już działa**, **co jest tylko na pokaz** i **co planujemy dalej**.
>
> 🇺🇸 English version: [`PROJECT.md`](./PROJECT.md)

---

## 1. Co to jest?

**MelodyCraft** to strona sprzedażowa (landing page) usługi tworzenia **spersonalizowanych piosenek na zamówienie**. Klient opowiada swoją historię, a producenci tworzą gotowy, studyjny utwór — dostarczany w 24 godziny. Idealne na prezent, na okazję (urodziny, ślub, rocznica) albo dla twórców internetowych.

- **Grupa docelowa:** rynek USA (strona jest po angielsku).
- **Charakter:** elegancki, „butikowy" — ciemne tło, złoty akcent, klasyczna szeryfowa typografia. Świadomie unika wyglądu „taniego generatora AI".

## 2. Gdzie to zobaczyć?

🔗 **Strona na żywo:** https://sikor1337.github.io/melodycraft.org/

> Publikacja zmian jest **ręczna** — po edycji uruchamiamy `deploy.bat`, a strona aktualizuje się w ~1–2 minuty.

---

## 3. Co już działa ✅

| Element | Status | Opis |
|---|---|---|
| Sekcja główna (hero) | ✅ Gotowe | Hasło, przyciski, karta „odtwarzacza" z przykładowym utworem |
| „Jak to działa" | ✅ Gotowe | 3 kroki: opowiedz historię → produkujemy → odbierasz |
| Próbki muzyki | ✅ Gotowe | Odtwarzacze Spotify osadzone na stronie (*na razie przykładowe*) |
| Opinie klientów | ✅ Gotowe | 3 referencje (*na razie przykładowe*) |
| Cennik | ✅ Gotowe | Trzy pakiety (strategia *good-better-best*): **Just the Song $9.99**, **Streaming for a Year $39.99** (najpopularniejszy) i **Streaming for Life $69.99** (kotwica — sprawia, że $39.99 wygląda na świetną ofertę) |
| Formularz zamówienia | ✅ Gotowe | Styl, okazja, dla kogo, historia → przejście do płatności |
| Najczęstsze pytania (FAQ) | ✅ Gotowe | 5 pytań i odpowiedzi |
| Wersja mobilna | ✅ Gotowe | Pełne dopasowanie do telefonu + menu „hamburger" |
| Działający adres w internecie | ✅ Gotowe | Hosting darmowy (GitHub Pages) |

## 4. Co jest na razie „na pokaz" (do dokończenia) ⚠️

To wygląda i klika się jak prawdziwe, ale **jeszcze nie jest podłączone** do realnych systemów:

- 🎵 **Próbki muzyki** — teraz to popularne playlisty Spotify jako zaślepki. Trzeba wstawić **nasze własne utwory**.
- 💳 **Płatność (Stripe)** — checkout **już przekierowuje do bezpiecznej płatności Stripe** (Payment Links) — na razie w **trybie testowym** (sandbox Stripe: pełny prawdziwy przepływ, ale bez prawdziwych pieniędzy). Konto Stripe istnieje i jest w trakcie konfiguracji; po aktywacji podmieniamy **3 linki na produkcyjne** (po jednym na pakiet) i ruszają prawdziwe płatności. Gdyby linku kiedyś zabrakło, pokazuje się awaryjny przycisk „Email my order".
- 🔐 **Logowanie / konto** — przyciski działają wizualnie, ale **nie ma prawdziwych kont** użytkowników. **W MVP tego nie robimy** — konta wchodzą dopiero do pełnej wersji 1.0.
- 📨 **Zamówienia** — każde zamówienie dostaje już **kod referencyjny** (np. `MC-ABC123`), widoczny przy płatności w naszym panelu Stripe, a brief zapisuje się w przeglądarce klienta. Ale sam brief **nie trafia jeszcze do nas automatycznie** (brak bazy danych / maila). Do podłączenia.
- 💬 **Opinie i statystyki** (np. „10 000+ klientów") — teksty przykładowe, do zastąpienia prawdziwymi.

---

## 5. Plan rozwoju (roadmapa)

> 🎯 **Zakres na teraz = MVP:** strona + **płatność za zamówienie piosenki** (Stripe). **Bez kont użytkownika** — te dodamy dopiero w pełnej wersji 1.0. Cel MVP: klient wchodzi, wypełnia brief, płaci; my dostajemy zamówienie na maila.
>
> ⚡ **Najszybsza droga do pierwszej sprzedaży:** dokończyć **aktywację konta Stripe** (potem podmienić linki testowe na produkcyjne) + wstawić **własne utwory i prawdziwe opinie**.
>
> 📅 **Realny harmonogram:**
> - **Teraz (lipiec 2026) — MVP:** Faza 2 (Stripe) **w toku** — płatności testowe działają już od początku do końca; czekamy na aktywację konta produkcyjnego. Równolegle Faza 1 (treści). Cel: **MVP live i pierwsze sprzedaże w ciągu ~1 tygodnia**. Najważniejsze — **zacząć zarabiać**.
> - **Później (gdy MVP się obroni, są sprzedaże) — 1.0:** Faza 3 (konta) orientacyjnie **wrzesień–październik 2026**. Nie ruszamy jej, dopóki MVP nie zarabia.
> - **Równolegle / po MVP:** Faza 4 (marketing) — wchodzi, gdy płatności już działają.

### Faza 1 (MVP) — Treści 🟡 · *teraz, lipiec 2026*
*Cel: strona pokazuje prawdziwą ofertę, gotowa do pokazania klientom.*
- [ ] Podmienić próbki muzyki na **nasze utwory** (linki ze Spotify / Apple Music / YouTube).
- [ ] Wstawić prawdziwe **opinie klientów** (i ewentualnie zdjęcia/imiona za zgodą).
- [ ] Zweryfikować **ceny i opisy pakietów**.
- [ ] Dopracować teksty (hasła, FAQ) pod naszą markę.

### Faza 2 (MVP) — Płatność za piosenkę 🟠 · *w toku — priorytet*
*Cel: klient może realnie zapłacić za zamówienie — bez zakładania konta.*
- [x] Podpiąć **3 linki Stripe** (Payment Links) — ✅ zrobione w **trybie testowym** (3 lipca 2026); cały przepływ działa, jeszcze bez prawdziwych pieniędzy.
- [ ] Podmienić linki na **produkcyjne** po aktywacji konta Stripe (konto założone, konfiguracja w toku) — prawdziwe transakcje.
- [ ] Zamówienie (brief klienta) trafia do nas **mailem** — na razie bez bazy danych. *(Dziś: brief zostaje w przeglądarce klienta; do Stripe trafia tylko kod referencyjny.)*
- [x] Komunikat „dziękujemy" po płatności (`?paid=1`) — ✅ zrobione (baner potwierdzenia).

### Faza 3 — Pełna wersja 1.0: konta 🔵 · *później — gdy MVP zarabia (ok. wrzesień–październik 2026)*
*Cel: konta i obsługa klienta — poza zakresem MVP, dopiero po walidacji sprzedaży.*
- [ ] Prawdziwe **logowanie i konta** użytkowników.
- [ ] **Panel klienta** — podgląd zamówień, pobieranie gotowych utworów, prośby o poprawki.
- [ ] Prosty **panel dla nas** — zarządzanie zamówieniami (zamiast maila).

### Faza 4 — Marketing i wzrost 🟢 · *równolegle / po uruchomieniu MVP*
*Cel: więcej odwiedzin i wyższa konwersja.*
- [ ] Własna **domena** (np. melodycraft.org zamiast adresu github.io).
- [ ] **SEO** + obrazek do social media (podgląd przy udostępnianiu linku).
- [ ] **Analityka** (ile osób wchodzi, co klika, ile kupuje).
- [ ] Blog / przykłady realizacji, programy poleceń, rabaty sezonowe.

> Kolejność i zakres faz można dowolnie zmieniać — to propozycja, nie sztywny plan.

---

## 6. Czego potrzebujemy od zespołu 📋

Żeby ruszyć z **Fazą 1**, przydadzą się:
1. **3–6 linków** do naszych utworów (Spotify najlepiej; może być Apple Music / YouTube).
2. **Prawdziwe opinie** klientów (cytat + imię/miasto).
3. Potwierdzenie **cen** i tego, co zawiera każdy pakiet.
4. **Kontakt** (adres e-mail wsparcia) i ewentualne linki do social mediów.
5. (Opcjonalnie) **logo** i ewentualne zdjęcia.

---

## 7. Strona od strony technicznej (w skrócie)

*Dla ciekawych — bez żargonu:*

- **Z czego zrobiona:** nowoczesny zestaw narzędzi do stron internetowych (React + Vite + Tailwind). To standard branżowy — łatwo rozwijać i utrzymywać.
- **Gdzie stoi:** GitHub Pages — hosting **darmowy**. Po podłączeniu płatności/bazy danych dojdą niewielkie koszty usług (np. Stripe pobiera prowizję od transakcji).
- **Aktualizacje:** zmiany publikujemy poleceniem `deploy.bat`, które buduje stronę i wysyła ją na GitHub Pages (folder `docs/` na gałęzi `main`).
- **Bezpieczeństwo:** sama strona nie przechowuje żadnych danych klientów; płatność odbywa się w całości na bezpiecznych stronach Stripe (na razie w trybie testowym — prawdziwe pieniądze dopiero po podmianie linków na produkcyjne).

---

*Masz pytania do tego dokumentu? Każdy punkt można rozwinąć — wystarczy powiedzieć który.*
