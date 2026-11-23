# UI-kirjastot, animaatiot ja jatkokehitys

Tämä dokumentti kokoaa yhteen portfolion nykyiset toteutustavat, mahdolliset jatkokehityksessä käytettävät kirjastot sekä linkit niiden dokumentaatioihin.

## Portfolion nykyinen toteutus

Portfolio on tarkoituksella kevyt staattinen HTML-, CSS- ja JavaScript-sivusto. GitHub Pages julkaisee sen suoraan ilman Viteä, npm-asennuksia tai build-vaihetta. Älä lisää React/Vite-riippuvuuksia sivuille ennen kuin sivusto päätetään erikseen siirtää kyseiseen rakenteeseen.

Sivustossa on jo käytössä:

- Google Fonts: nykyisissä sivupohjissa käytetään muun muassa Fraunces-, IBM Plex Mono- ja Source Sans 3 -fontteja. Ne ovat SIL Open Font License 1.1 -lisensoituja avoimia fontteja; sivusto lataa ne Google Fonts -palvelusta eikä fonttitiedostoja ole kopioitu tähän repositorioon.
- `gothic-effects.css`: goottilainen mandala, sumumaiset taustavärit, infonauhan hohde, hover-siirtymät ja koristeelliset yksityiskohdat.
- `style.css`: sivuston varsinainen responsiivinen asettelu ja komponenttityylit.
- `script.js`: kielenvaihto, työnäytteiden vuorovaikutukset ja hillityt scroll-reveal-animaatiot.
- PrismJS 1.30.0: C#-koodiesimerkkien syntaksikorostus työnäytteet-sivulla. Kirjasto ladataan jsDelivr-CDN:stä; sen lisenssi on MIT.

Animaatioissa huomioidaan `prefers-reduced-motion`-asetus, jonka avulla käyttäjä voi vähentää tai poistaa liikkeen käyttöjärjestelmän asetuksista.

## Kirjastot tulevaa React/Vite-versiota varten

| Kirjasto | Käyttötarkoitus | Huomio |
| --- | --- | --- |
| [Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-vite) + `@tailwindcss/vite` | Utility-luokat ja yhtenäinen tyylijärjestelmä | Vaatii Vite/build-asennuksen; ei ole liitetty nykyiseen staattiseen sivustoon. |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | Tailwindiin perustuvat valmiit animaatioluokat | Lisää vasta Tailwind-versioon siirryttäessä. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Saavutettavat Tabs-, Dialog-, Tooltip- ja ToggleGroup-toiminnot | React-komponentteja; nykyinen sivusto käyttää HTML:n omia `details/summary`- ja button-elementtejä. |
| [shadcn/ui](https://ui.shadcn.com/) | Muokattavat käyttöliittymäkomponentit Radix-primitiivien pohjalta | Komponentit lisätään projektiin lähdekoodina; edellyttää React-työkaluketjua. |
| [Lucide](https://lucide.dev/) / [lucide-react](https://lucide.dev/guide/react/) | Selkeät käyttöliittymäikonit | React-versio ei ole suoraan käytettävissä nykyisessä HTML-sivustossa; yksittäiset SVG-kuvakkeet sopivat myös staattiseen sivustoon. |
| [Simple Icons](https://simpleicons.org/) | Teknologioiden ja ohjelmistojen logot | Tarkista jokaisen logon brändiohjeet ja käyttöehdot. |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Kevyet, syntetisoidut äänitehosteet ilman äänitiedostoja | Ääni käynnistetään vain käyttäjän toiminnosta, ei automaattisesti sivun latautuessa. Tarjoa myös mahdollisuus olla käyttämättä ääntä. |

## Esimerkki: hillitty aaltoefekti CSS:llä

Tämä on pieni, riippuvuuksista vapaa esimerkki. Lisää se vain koristeelliseen elementtiin, ei tekstin taakse niin, että luettavuus heikkenee.

```css
.decorative-wave {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.decorative-wave::after {
  content: "";
  position: absolute;
  z-index: -1;
  inset: auto -10% -65% -10%;
  height: 75%;
  border: 1px solid rgb(182 92 114 / 35%);
  border-radius: 45%;
  background: radial-gradient(ellipse, rgb(35 69 45 / 24%), transparent 70%);
  animation: wave-drift 18s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes wave-drift {
  from { transform: translate3d(-2%, 0, 0) rotate(-4deg); }
  to   { transform: translate3d(2%, -8%, 0) rotate(4deg); }
}

@media (prefers-reduced-motion: reduce) {
  .decorative-wave::after { animation: none; }
}
```


## Dokumentaatio ja inspiraatio

- [W3Schools: CSS transitions](https://www.w3schools.com/htmlcss/htmlcss_transitions.asp)
- [W3Schools: CSS animations](https://www.w3schools.com/htmlcss/htmlcss_animations.asp)
- [W3Schools: CSS transforms](https://www.w3schools.com/htmlcss/htmlcss_transforms.asp)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Tailwind CSS v4 + Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [Lucide](https://lucide.dev/)
- [Simple Icons](https://simpleicons.org/)

---

## English summary

The current portfolio is a lightweight static HTML/CSS/JavaScript website. It uses Lora and Nunito Sans typography and an autumn-inspired cottagecore colour palette. Tailwind CSS v4, Radix/shadcn UI and `lucide-react` are documented as options for a possible future React/Vite version, not as dependencies already installed on the live site. Existing CSS effects are dependency-free and respect reduced-motion preferences. Add third-party images or generated audio only when the assets, intended use and permissions are clear.


## Visual asset licensing check — 23 November 2026

The current portfolio pages do not load Font Awesome, Lucide, Bootstrap Icons, Heroicons or another external icon package. The homepage contains two inline SVG project-card illustrations; these are custom project visuals rather than a linked icon-font or icon-library dependency.

The portfolio's decorative SVGs (`images/metal-rose-sigil.svg` and `images/antique-paper-texture.svg`) and The Cultured Vault demo's two app-icon SVGs were generated with ChatGPT assistance for this project. They are not copied from an icon library. Their provenance is documented in the relevant image and demo source notes. OpenAI's Terms of Use assign the user OpenAI's rights, if any, in generated Output as between OpenAI and the user, to the extent permitted by applicable law; generated output may not be unique and must not infringe third-party rights.

The fonts and PrismJS are external runtime dependencies, not copied image/icon assets. Check each upstream licence again before bundling or redistributing the actual font or library files.
