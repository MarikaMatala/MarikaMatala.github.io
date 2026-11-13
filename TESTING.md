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
- [ ] In-page and cross-page anchor links land on an existing section.
- [ ] All main navigation links open the correct page.
- [ ] The current page is identified with `aria-current="page"` in the main navigation.
- [ ] The mobile menu opens and closes with its button.
- [ ] The mobile menu closes after a navigation link is selected.
- [ ] The mobile menu closes with Escape and returns focus to its button.
- [ ] The language switch changes visible Finnish and English content.
- [ ] The selected language remains active when navigating between pages.
- [ ] The browser tab title changes with the selected language.

## Manual test results | Manuaalisten testien tulokset

- 12 November 2026: The mobile navigation's basic functions were tested on the user's own phone. No issues were noticed during the test.
- 12.11.2026: Mobiilivalikon perustoiminnot testattiin omalla puhelimella. Testin aikana ei havaittu toimintaongelmia.

## Keyboard and accessibility | Näppäimistö ja saavutettavuus

- [ ] The skip link appears when reached by keyboard and moves focus to the main content.
- [ ] Form controls have a visible, programmatically associated label in both languages.
- [ ] Image alternative text and embedded-document titles change to the selected language.
- [ ] Icon-only buttons expose a meaningful accessible name.
- [ ] ARIA ID references such as `aria-controls`, `aria-labelledby` and `aria-describedby` point to existing elements.
- [ ] Links, buttons, menus, galleries and interactive examples can be operated without a mouse.
- [ ] Keyboard focus is always visible.
- [ ] The image lightbox opens from a focused image, has a localized dialog name and close-button label, and closes with Escape.
- [ ] Tab and Shift+Tab keep focus inside the lightbox; background content is unavailable while it is open.
- [ ] Focus returns to the original image and the page becomes usable after the lightbox closes.
- [ ] The Android gallery responds to the left and right arrow keys.
- [ ] The OOP example selector and previous/next buttons work with a keyboard.
- [ ] Informative images have useful alternative text; decorative images use empty alternative text.
- [ ] The layout remains usable at 200% browser zoom.
- [ ] Animations respect the operating system's reduced-motion preference.

## Responsive layout | Responsiivisuus

Check at representative viewport widths:

- [ ] Narrow mobile: 320 px
- [ ] Small mobile: 360–390 px
- [ ] Large mobile: 430 px
- [ ] Tablet: 768 px
- [ ] Laptop: 1024–1280 px
- [ ] Desktop: 1440 px and wider

At each width, check for horizontal overflow, clipped text, overlapping controls, readable line lengths and usable touch targets. Open and close the mobile navigation with touch and keyboard, and verify its expanded state and Escape behaviour. Repeat the mobile checks in both portrait and landscape orientation.

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
- [ ] Open Graph preview metadata is present.
- [ ] `sitemap.xml` lists the four public portfolio pages.
- [ ] `robots.txt` points to the sitemap.
- [ ] The custom 404 page provides working links back to the site.
- [ ] The GitHub Pages deployment completes and the live site reflects the change.

## Browsers | Selaimet

For significant layout or interaction changes, check at least one Chromium-based browser and Firefox. When possible, also check Safari or a mobile browser.


## Remote Job Fit templates and secrets | Asetuspohjat ja salaisuudet

- [ ] The current browser demo works without an `.env` file or backend.
- [ ] Public `.env.example` contains placeholders only.
- [ ] A real local `.env` file is ignored by Git.
- [ ] No API keys, passwords, tokens, personal data or private connection strings appear in tracked files.
- [ ] The fictional JSON example parses as valid JSON.
- [ ] The demo still makes no network requests and does not persist entered CV text.
- [ ] Any imported external dataset has an exact version, licence, source URL and required attribution recorded in `THIRD-PARTY-NOTICES.md`.

## Remote Job Fit -pohjat ja tunnistetiedot

- [ ] Nykyinen selain-demo toimii ilman `.env`-tiedostoa tai backend-palvelinta.
- [ ] Julkisessa `.env.example`-tiedostossa on vain paikkamerkkejä.
- [ ] Oikea paikallinen `.env`-tiedosto on rajattu pois Gitistä.
- [ ] Seurattaviin tiedostoihin ei ole lisätty API-avaimia, salasanoja, tokeneita, henkilötietoja tai yksityisiä yhteysmerkkijonoja.
- [ ] Kuvitteellinen JSON-esimerkki on kelvollista JSON-muotoa.
- [ ] Demo ei tee verkkopyyntöjä eikä tallenna CV-tekstiä.
- [ ] Jokaisesta lisätystä ulkopuolisesta aineistosta on kirjattu tarkka versio, lisenssi, lähdeosoite ja vaaditut lähdemerkinnät tiedostoon `THIRD-PARTY-NOTICES.md`.


## Remote Job Fit skill-gap feedback | Osaamispuutteiden palaute

- [ ] Paste a job description and confirm the demo lists vocabulary-recognised requirements missing from the candidate profile.
- [ ] Confirm requirements already in the profile appear separately from missing requirements.
- [ ] Confirm an empty or unrelated job description does not invent missing skills.
- [ ] Confirm the learning suggestion is visible only when one or more recognised skills are missing.
- [ ] Check the explanation that keyword extraction is indicative and does not measure actual proficiency.
- [ ] Repeat in Finnish and English.
- [ ] Confirm short ambiguous terms such as C, R and Go are excluded from automatic gap detection.
- [ ] Confirm all analysis remains local to the browser and no profile or job text is transmitted or stored.

## Remote Job Fit -osaamispuutteiden palaute

- [ ] Liitä työpaikkailmoitus ja varmista, että demo näyttää sanastosta tunnistetut osaamiset, joita hakijan profiilissa ei ole.
- [ ] Varmista, että profiilista löytyvät osaamiset ja puuttuvat osaamiset näytetään erikseen.
- [ ] Varmista, ettei tyhjä tai asiaankuulumaton ilmoitus tuota keksittyjä osaamispuutteita.
- [ ] Varmista, että oppimisehdotus näkyy, kun tunnistettuja puuttuvia osaamisia on vähintään yksi.
- [ ] Tarkista huomautus siitä, että kyseessä on hakusanoihin perustuva suuntaa-antava poiminta, ei todellisen osaamistason mittaus.
- [ ] Testaa sekä suomeksi että englanniksi.
- [ ] Varmista, että lyhyet monitulkintaiset termit C, R ja Go ohitetaan automaattisessa puuteanalyysissä.
- [ ] Varmista, että analyysi pysyy selaimessa eikä profiili- tai ilmoitustekstiä lähetetä tai tallenneta.


## Accessibility regression checks | Saavutettavuuden regressiotarkistukset

The automated validator checks baseline semantics: document language, one main landmark and one H1, heading-level jumps, skip-link targets, image alt attributes, iframe titles, form-control labels, button names, ARIA ID references, positive tabindex values, and safe `target="_blank"` links. It also checks local files, fragment links and duplicate IDs.

Automaattinen validointi tarkistaa perustason semantiikan: dokumentin kielen, yhden main-maamerkin ja H1-otsikon, otsikkotasojen hypyt, ohituslinkin kohteen, kuvien alt-attribuutit, iframe-kehysten otsikot, lomakekenttien nimet, painikkeiden nimet, ARIA-tunnisteviittaukset, positiiviset tabindex-arvot sekä turvalliset `target="_blank"`-linkit. Lisäksi tarkistetaan paikalliset tiedostot, ankkurilinkit ja päällekkäiset ID-tunnisteet.

These checks do not calculate colour contrast, inspect the rendered accessibility tree, or replace manual testing with a screen reader. See [ACCESSIBILITY.md](ACCESSIBILITY.md) for the audit scope and manual checklist.

Nämä tarkistukset eivät laske värikontrastia, tutki selaimen muodostamaa saavutettavuuspuuta eivätkä korvaa ruudunlukijalla tehtävää manuaalista testausta. Katso auditoinnin rajaus ja manuaalinen tarkistuslista tiedostosta [ACCESSIBILITY.md](ACCESSIBILITY.md).
