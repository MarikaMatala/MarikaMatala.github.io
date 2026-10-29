# UI-kirjastot, animaatiot ja jatkokehitys

Tämä dokumentti kokoaa portfolion nykyiset toteutustavat, mahdolliset jatkokehityksen kirjastot ja luotettavat dokumentaatiolinkit.

## Portfolion nykyinen toteutus

Portfolio on tarkoituksella kevyt staattinen HTML-, CSS- ja JavaScript-sivusto. GitHub Pages julkaisee sen suoraan ilman Viteä, npm-asennuksia tai build-vaihetta. Älä lisää React/Vite-riippuvuuksia sivuille ennen kuin sivusto päätetään erikseen siirtää kyseiseen rakenteeseen.

Sivustossa on jo käytössä:

- Google Fonts: Lora otsikoihin ja Nunito Sans leipätekstiin.
- `gothic-effects.css`: goottilainen mandala, sumumaiset taustavärit, infonauhan hohde, hover-siirtymät ja koristeelliset yksityiskohdat.
- `style.css`: sivuston varsinainen responsiivinen asettelu ja komponenttityylit.
- `script.js`: kielenvaihto, työnäytteiden vuorovaikutukset ja hillityt scroll-reveal-animaatiot.
- PrismJS 1.30.0: C#-koodiesimerkkien syntaksikorostus työnäytteet-sivulla.

Animaatioissa huomioidaan `prefers-reduced-motion`, jotta käyttöjärjestelmän vähennetyn liikkeen asetus saa vähentää tai poistaa liikkeen.

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

The current portfolio is a lightweight static HTML/CSS/JavaScript site with a readable Lora/Nunito Sans type system and an autumn cottagecore palette. Tailwind CSS v4, Radix/shadcn UI and `lucide-react` are documented as options for a possible future React/Vite version, not as dependencies already installed on the live site. Existing CSS effects are dependency-free and respect reduced-motion preferences. Add third-party images or generated audio only when the assets, intended use and permissions are clear.
