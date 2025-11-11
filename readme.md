# Flag Quiz – Europe Edition

Ett spel där du kan testa dina kunskaper om Europas flaggor.
Spelet hämtar slumpmässiga europeiska länder via REST Countries API och utmanar dig att gissa rätt land baserat på flaggan som visas.

## Funktioner

-   Slumpmässigt utvalda flaggor
-   Poängräkning baserad på antal felgissningar
-   Möjlighet att ta hjälp om du fastnar
-   Highscore-lista som sparas i localStorage

## Så fungerar spelet

1. En flagga visas på skärmen.
2. Du skriver in vilket land du tror det är.
3. Fel svar ger minuspoäng.
4. Du kan ta hjälp, men det påverkar poängen.
5. När spelet är slut sparas ditt resultat i highscore-listan.

## Tekniker

-   HTML för struktur
-   CSS för layout och design
-   TypeScript för spel­logik
-   localStorage för att spara highscore
