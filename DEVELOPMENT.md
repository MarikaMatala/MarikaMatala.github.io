# Development guide | Kehitysohje

This portfolio is a static website built with HTML, CSS and vanilla JavaScript. It is published with GitHub Pages and does not require Node.js, npm or a build step.

Tämä portfolio on staattinen HTML-, CSS- ja JavaScript-sivusto. Se julkaistaan GitHub Pagesin kautta, eikä se tarvitse Node.js:ää, npm:ää tai erillistä build-vaihetta.

## Run locally | Käynnistä paikallisesti

1. Clone or download this repository.
2. Open a terminal in the repository root.
3. Start Python's built-in web server:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in a browser.
5. Stop the server with `Ctrl+C`.

You can also open `index.html` directly, but using a local server is recommended so relative paths and browser behaviour match the published site more closely.

## Main files | Tärkeimmät tiedostot

| File | Purpose |
| --- | --- |
| `index.html` | Homepage and introduction |
| `minusta.html` | About, education and skills |
| `tyonaytteet.html` | Projects and work samples |
| `yhteystiedot.html` | Contact details and professional links |
| `404.html` | Custom GitHub Pages not-found page |
| `style.css` | Main layout and component styles |
| `gothic-effects.css`, `gothic-redesign.css`, `autumn-cottagecore.css` | Visual theme and decorative styling |
| `script.js` | Language switching and interactive components |
| `images/` | Portfolio images and downloadable samples |
| `sitemap.xml`, `robots.txt` | Search-engine discovery files |

## Language and content | Kieli ja sisältö

- Finnish is the default language in the HTML.
- Add both `data-fi` and `data-en` attributes to visible text that should change with the language switch.
- Document titles use `data-fi-title` and `data-en-title` on the `<title>` element.
- Keep page titles, meta descriptions, Open Graph metadata and canonical URLs consistent when adding or renaming a page.
- Give informative images meaningful `alt` text. Use an empty `alt=""` only for decorative images.

## PDF work samples | PDF-työnäytteet

The Work Samples page embeds the Sana Vapaa event poster and the audiovisual communications portfolio in responsive `<iframe>` PDF viewers. Keep the files in `images/` and update both the iframe `src` and the separate full-document link if a PDF is renamed. The Sana Vapaa asset is currently `images/Sana-Vapaa-tapahtumajuliste.pdf`; its event credit belongs to the Luotsaamo project run by Jyvässeudun 4H-yhdistys.

Työnäytteet-sivulla Sana Vapaa -tapahtumajuliste ja audiovisuaalisen viestinnän portfolio näytetään responsiivisissa PDF-kehyksissä (`<iframe>`). Säilytä PDF-tiedostot `images/`-kansiossa ja päivitä sekä kehyksen `src` että erillinen koko tiedoston avauslinkki, jos tiedostonimi muuttuu. Sana Vapaa -julisteen tiedosto on `images/Sana-Vapaa-tapahtumajuliste.pdf`. Tapahtuma on osa Jyvässeudun 4H-yhdistyksen Luotsaamo-hanketta.

## Styling and accessibility | Tyylit ja saavutettavuus

- Prefer shared styles in the existing CSS files instead of adding one-off inline styles.
- Keep keyboard focus indicators visible.
- Preserve the skip link and semantic landmarks such as `header`, `nav`, `main` and `footer`.
- Respect `prefers-reduced-motion` when adding animations.
- Check layouts at mobile, tablet and desktop widths.

## Validation | Tarkistukset

The repository includes a dependency-free validation script:

```bash
python scripts/validate_site.py
```

It checks root-level HTML pages for duplicate IDs, missing local `href` and `src` targets, and broken fragment links to IDs on the same site. GitHub Actions runs the same check on pull requests and pushes to `main`.

## Publishing | Julkaisu

The live site is published from the repository's `main` branch using GitHub Pages. Keep published assets and page paths relative to the repository root. After merging a change, allow GitHub Pages a short time to deploy before checking the live site.

For a detailed browser-based verification plan, use [TESTING.md](TESTING.md).

## Pull request checklist | Pull request -tarkistuslista

- [ ] The change has one clear purpose.
- [ ] Finnish and English text are both updated where needed.
- [ ] Images have suitable alternative text.
- [ ] Keyboard navigation and visible focus have been considered.
- [ ] Mobile and desktop layouts have been checked.
- [ ] `python scripts/validate_site.py` passes.
- [ ] No credentials, tokens, private data or local development files are committed.
