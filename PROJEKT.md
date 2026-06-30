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

> Po każdej zmianie strona aktualizuje się automatycznie (zwykle w ~2 minuty).

---

## 3. Co już działa ✅

| Element | Status | Opis |
|---|---|---|
| Sekcja główna (hero) | ✅ Gotowe | Hasło, przyciski, karta „odtwarzacza" z przykładowym utworem |
| „Jak to działa" | ✅ Gotowe | 3 kroki: opowiedz historię → produkujemy → odbierasz |
| Próbki muzyki | ✅ Gotowe | Odtwarzacze Spotify osadzone na stronie (*na razie przykładowe*) |
| Opinie klientów | ✅ Gotowe | 3 referencje (*na razie przykładowe*) |
| Cennik | ✅ Gotowe | Dwa pakiety: **Personal $49** i **Pro Release $99** |
| Formularz zamówienia | ✅ Gotowe | Styl, okazja, dla kogo, historia → przejście do płatności |
| Najczęstsze pytania (FAQ) | ✅ Gotowe | 5 pytań i odpowiedzi |
| Wersja mobilna | ✅ Gotowe | Pełne dopasowanie do telefonu + menu „hamburger" |
| Działający adres w internecie | ✅ Gotowe | Hosting darmowy (GitHub Pages) |

## 4. Co jest na razie „na pokaz" (do dokończenia) ⚠️

To wygląda i klika się jak prawdziwe, ale **jeszcze nie jest podłączone** do realnych systemów:

- 🎵 **Próbki muzyki** — teraz to popularne playlisty Spotify jako zaślepki. Trzeba wstawić **nasze własne utwory**.
- 💳 **Płatność (Stripe)** — checkout **przekierowuje do bezpiecznej płatności Stripe** (Payment Links). Czeka tylko na **wklejenie 2 linków** z naszego konta Stripe; do tego czasu działa awaryjny przycisk „Email my order".
- 🔐 **Logowanie / konto** — przyciski działają wizualnie, ale **nie ma prawdziwych kont** użytkowników.
- 📨 **Zamówienia** — po „zakupie" zamówienie **nie trafia jeszcze nigdzie** (brak bazy danych / maila). Do podłączenia.
- 💬 **Opinie i statystyki** (np. „10 000+ klientów") — teksty przykładowe, do zastąpienia prawdziwymi.

---

## 5. Plan rozwoju (roadmapa)

### Faza 1 — Treści (najbliższy krok) 🟡
*Cel: strona pokazuje prawdziwą ofertę, gotowa do pokazania klientom.*
- [ ] Podmienić próbki muzyki na **nasze utwory** (linki ze Spotify / Apple Music / YouTube).
- [ ] Wstawić prawdziwe **opinie klientów** (i ewentualnie zdjęcia/imiona za zgodą).
- [ ] Zweryfikować **ceny i opisy pakietów**.
- [ ] Dopracować teksty (hasła, FAQ) pod naszą markę.

### Faza 2 — Realne zamówienia i płatności 🟠
*Cel: klient może realnie kupić i zapłacić.*
- [ ] Podłączyć **bramkę płatności** (Stripe) — prawdziwe transakcje.
- [ ] **Zapisywanie zamówień** (baza danych) + powiadomienie e-mail do nas i potwierdzenie do klienta.
- [ ] Strona „dziękujemy" / status zamówienia.

### Faza 3 — Konta i obsługa klienta 🔵
*Cel: klient ma swoje miejsce, my mamy panel.*
- [ ] Prawdziwe **logowanie i konta** użytkowników.
- [ ] **Panel klienta** — podgląd zamówień, pobieranie gotowych utworów, prośby o poprawki.
- [ ] Prosty **panel dla nas** — zarządzanie zamówieniami.

### Faza 4 — Marketing i wzrost 🟢
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
- **Aktualizacje:** każda zmiana w kodzie automatycznie publikuje nową wersję strony — bez ręcznego „wgrywania".
- **Bezpieczeństwo:** strona nie przechowuje na razie żadnych danych klientów ani płatności (bo to jeszcze wersja pokazowa).

---

*Masz pytania do tego dokumentu? Każdy punkt można rozwinąć — wystarczy powiedzieć który.*
