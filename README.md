# FRYDENT — Praxis-Website (frydent.de)

Statyczna strona wizytówkowa Zahnarztpraxis FRYDENT, Bonndorf im Schwarzwald.
Wygenerowana z projektu w Claude Design. Działa bez budowania — czysty HTML + JS.

## Struktura
- index.html — strona główna
- praxis-team.html, geschichte.html, rundgang.html — praktyka, historia, galeria
- leistungen.html (tematy przez #hash: #prophylaxe #endo #prothetik #paro #funktion #aesthetik)
- neu-bei-uns.html, service.html, jobs.html, news.html
- support.js — runtime stron (wymagany)
- image-slot.js + .image-slots.state.json — zdjęcia w slotach (wymagane; state json zawiera wgrane zdjęcia)
- assets/ — logo, zdjęcia
- .nojekyll — WYMAGANE dla GitHub Pages (serwuje pliki z kropką)

## Publikacja (GitHub Pages)
1. Nowe repo (np. frydent-website), wrzucić CAŁĄ zawartość tego folderu do roota.
2. Settings → Pages → Deploy from branch → main / root.
3. Strona pod https://<user>.github.io/<repo>/
4. Domena docelowa: dodać plik CNAME z "www.frydent.de" + wpis DNS CNAME → <user>.github.io (dopiero przy publikacji!).

## Do zrobienia przed publiczną publikacją
- Podmienić link Dr. Flex (przyciski "Online buchen" / data-drflex) na prawdziwy widget.
- Podpiąć formularze (kontakt, Bewerbung) np. do Formspree.
- Na info.frydent.de dodać w nagłówku i stopce link powrotny "← Zur Praxis-Website" → https://frydent.de
