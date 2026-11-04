# Manual QA checklist | Manuaalinen testauslista

Use this checklist before publishing larger changes to the portfolio. The site is static, so the checks can be performed in a browser without a test framework.

Käytä tätä tarkistuslistaa ennen laajempien muutosten julkaisemista. Sivusto on staattinen, joten tarkistukset voi tehdä selaimessa ilman erillistä testauskehystä.

## Automated check | Automaattinen tarkistus

Run from the repository root:

```bash
python scripts/validate_site.py
```

Confirm that the GitHub Actions **Site validation** workflow passes for the pull request.

## Navigation and language | Navigaatio ja kieli

- [ ] The logo and site name return to the homepage.
- [ ] All main navigation links open the correct page.
- [ ] The current page is identified with `aria-current="page"` in the main navigation.
- [ ] The mobile menu opens and closes with its button.
- [ ] The mobile menu closes after a navigation link is selected.
- [ ] The mobile menu closes with Escape and returns focus to its button.
- [ ] The language switch changes visible Finnish and English content.
- [ ] The selected language remains active when navigating between pages.
- [ ] The browser tab title changes with the selected language.

## Keyboard and accessibility | Näppäimistö ja saavutettavuus

- [ ] The skip link appears when reached by keyboard and moves focus to the main content.
- [ ] Links, buttons, menus, galleries and interactive examples can be operated without a mouse.
- [ ] Keyboard focus is always visible.
- [ ] The image lightbox opens from a focused image, has a labelled close button and closes with Escape.
- [ ] Focus returns to the original image after the lightbox closes.
- [ ] The Android gallery responds to the left and right arrow keys.
- [ ] The OOP example selector and previous/next buttons work with a keyboard.
- [ ] Informative images have useful alternative text; decorative images use empty alternative text.
- [ ] The layout remains usable at 200% browser zoom.
- [ ] Animations respect the operating system's reduced-motion preference.

## Responsive layout | Responsiivisuus

Check at representative viewport widths:

- [ ] Small mobile: 360–390 px
- [ ] Large mobile: 430 px
- [ ] Tablet: 768 px
- [ ] Laptop: 1024–1280 px
- [ ] Desktop: 1440 px and wider

At each width, check for horizontal overflow, clipped text, overlapping controls, readable line lengths and usable touch targets. Repeat the mobile checks in both portrait and landscape orientation.

## Interactive content | Vuorovaikutteinen sisältö

- [ ] The Android image gallery loads its initial image and all next/previous controls work.
- [ ] The image counter updates when the gallery image changes.
- [ ] The logo samples expand and collapse.
- [ ] The C# example selector displays the selected sample.
- [ ] Previous and next C# controls are disabled at the first and last samples.
- [ ] External project links open the intended destination.

## PDF previews | PDF-esikatselut

- [ ] The Sana Vapaa poster PDF is visible inside its portfolio card.
- [ ] The audiovisual communications portfolio PDF is visible inside its portfolio card.
- [ ] Both embedded viewers resize appropriately on mobile and desktop.
- [ ] Both separate full-document links open the matching PDF.
- [ ] The Sana Vapaa filename is `Sana-Vapaa-tapahtumajuliste.pdf` in both the iframe and link.
- [ ] The Sana Vapaa description credits Jyvässeudun 4H-yhdistys's Luotsaamo project, not Ohjaamo.
- [ ] The PDF previews work in the target mobile browser; if its built-in PDF viewer is unsupported, check the full-document link fallback.

## Page metadata and publishing | Sivumetadata ja julkaisu

- [ ] Each public page has a unique title and meta description.
- [ ] Canonical URLs point to the matching public page.
- [ ] Open Graph and Twitter/X preview metadata are present.
- [ ] `sitemap.xml` lists the four public portfolio pages.
- [ ] `robots.txt` points to the sitemap.
- [ ] The custom 404 page provides working links back to the site.
- [ ] The GitHub Pages deployment completes and the live site reflects the change.

## Browsers | Selaimet

For significant layout or interaction changes, check at least one Chromium-based browser and Firefox. When possible, also check Safari or a mobile browser.
