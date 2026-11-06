# Accessibility audit and checklist | Saavutettavuusauditointi ja tarkistuslista

## Scope and status | Rajaus ja tila

This portfolio is a static bilingual website. The source-level validator checks a set of baseline semantics on every pull request. These checks are useful regression guards, but they do **not** establish WCAG 2.2 AA conformance. A complete evaluation also requires rendered-page inspection, colour-contrast measurements, keyboard testing and assistive-technology testing.

Tämä portfolio on staattinen kaksikielinen verkkosivusto. Lähdekoodin validointiskripti tarkistaa jokaisessa pull requestissa joukon saavutettavuuden perustason asioita. Tarkistukset auttavat ehkäisemään regressioita, mutta ne **eivät** todista WCAG 2.2 AA -vaatimustenmukaisuutta. Täydellinen arviointi edellyttää lisäksi sivujen tarkastelua selaimessa, värikontrastien mittaamista, näppäimistötestausta ja avustavien teknologioiden käyttöä.

## Automated baseline | Automaattiset perustarkistukset

Run:

```bash
python scripts/validate_site.py
python -m unittest discover -s tests -p "test_site_accessibility.py"
```

The validator checks:

- The document has a language declaration, one main landmark and one H1.
- Heading levels do not jump over a level.
- A keyboard skip link points to an existing target.
- Images have an `alt` attribute (empty alt is allowed for decorative images).
- Embedded frames have a title.
- Form controls have an accessible name through a visible label or an appropriate ARIA attribute.
- Buttons have an accessible name.
- ARIA ID references resolve to elements on the same page.
- Positive `tabindex` values are not used.
- Links opened in a new tab use `rel="noopener"` or `rel="noreferrer"`.
- Local references, fragment links and IDs are valid.

Validointi tarkistaa:

- Dokumentilla on kielimääritys, yksi main-maamerkki ja yksi H1-otsikko.
- Otsikkotasot eivät hyppää tason yli.
- Näppäimistöllä käytettävä ohituslinkki vie olemassa olevaan kohteeseen.
- Kuvilla on `alt`-attribuutti (koristekuville sallitaan tyhjä alt).
- Upotetuilla kehyksillä on otsikko.
- Lomakekentillä on saavutettava nimi näkyvän label-elementin tai sopivan ARIA-määrityksen kautta.
- Painikkeilla on saavutettava nimi.
- ARIA-tunnisteviittaukset osoittavat saman sivun olemassa oleviin elementteihin.
- Positiivisia `tabindex`-arvoja ei käytetä.
- Uuteen välilehteen avautuvilla linkeillä on `rel="noopener"` tai `rel="noreferrer"`.
- Paikalliset tiedostoviittaukset, ankkurilinkit ja ID-tunnisteet ovat kunnossa.

## Findings addressed | Korjatut havainnot

1. The two code-example selectors had fixed Finnish `aria-label` values even though their visible labels change with the language selector. The fixed ARIA labels overrode the translated labels. The selectors now rely on their associated visible `<label for="...">` elements.
2. Informative work-sample images now have Finnish and English alternative text. The language switch updates their `alt` values.
3. Android gallery descriptions now have Finnish and English variants.
4. PDF iframe titles now change with the selected language. The Remote Job Fit iframe title is also localized through the shared title handling.
5. The standalone browser demo now has its own keyboard skip link; the validator recognizes both explicit `for` labels and controls nested inside a `<label>`.

1. Kahdella koodiesimerkkien valintakentällä oli kiinteä suomenkielinen `aria-label`, vaikka näkyvät label-tekstit vaihtuvat kielivalitsimella. Kiinteä ARIA-nimi ohitti käännetyn näkyvän tekstin. Valintakentät käyttävät nyt niihin liitettyjä näkyviä `<label for="...">`-elementtejä.
2. Työnäytekuvilla on nyt suomen- ja englanninkieliset vaihtoehtoiset tekstit. Kielivalinta päivittää niiden `alt`-arvot.
3. Android-kuvagallerian kuvauksista on suomen- ja englanninkieliset versiot.
4. PDF-iframe-kehysten otsikot vaihtuvat valitun kielen mukaan. Myös Remote Job Fit -kehyksen otsikko päivitetään yhteisellä käsittelyllä.
5. Erillisessä selain-demossa on nyt oma näppäimistöllä käytettävä ohituslinkki. Validointi tunnistaa sekä `for`-attribuutilla liitetyt label-elementit että label-elementin sisään sijoitetut kentät.

## Manual checklist | Manuaalinen tarkistuslista

### Keyboard and focus | Näppäimistö ja fokus

- [ ] Complete every page using only Tab, Shift+Tab, Enter, Space and arrow keys where appropriate.
- [ ] Focus order follows the visual and reading order.
- [ ] Focus is clearly visible and not hidden behind sticky elements.
- [ ] Mobile navigation opens, closes with Escape and returns focus to its trigger.
- [ ] The image lightbox traps focus, closes with Escape and returns focus to the image.
- [ ] No keyboard trap exists outside intentionally modal interactions.

- [ ] Käy jokainen sivu läpi käyttäen vain Tab-, Shift+Tab-, Enter- ja välilyöntinäppäimiä sekä tarvittaessa nuolinäppäimiä.
- [ ] Fokusjärjestys vastaa visuaalista ja lukujärjestystä.
- [ ] Fokus näkyy selvästi eikä jää kiinnitettyjen elementtien taakse.
- [ ] Mobiilinavigaatio avautuu, sulkeutuu Esc-näppäimellä ja palauttaa fokuksen avauspainikkeeseen.
- [ ] Kuvan suurennus pitää fokuksen dialogissa, sulkeutuu Esc-näppäimellä ja palauttaa fokuksen alkuperäiseen kuvaan.
- [ ] Näppäimistöjumiutumista ei esiinny tarkoituksellisten modaalisten toimintojen ulkopuolella.

### Screen readers and language | Ruudunlukijat ja kieli

- [ ] Check the Finnish and English versions with a screen reader (NVDA with Firefox or Chrome; VoiceOver or TalkBack where available).
- [ ] Confirm the document language changes between `fi` and `en`.
- [ ] Confirm image alternatives, iframe titles, select labels and icon-button names are announced in the selected language.
- [ ] Confirm headings and landmarks provide a useful navigation structure.

- [ ] Tarkista suomen- ja englanninkieliset versiot ruudunlukijalla (NVDA ja Firefox tai Chrome; mahdollisuuksien mukaan VoiceOver tai TalkBack).
- [ ] Varmista, että dokumentin kieli vaihtuu `fi`- ja `en`-arvojen välillä.
- [ ] Varmista, että kuvien vaihtoehtoiset tekstit, iframe-otsikot, valintakenttien nimet ja kuvakepainikkeiden nimet kuuluvat valitulla kielellä.
- [ ] Varmista, että otsikot ja maamerkit muodostavat käyttökelpoisen navigointirakenteen.

### Contrast, zoom and motion | Kontrasti, suurennus ja liike

- [ ] Measure normal text contrast against its actual rendered background; target at least 4.5:1.
- [ ] Measure large text contrast; target at least 3:1.
- [ ] Check meaningful UI boundaries, icons and focus indicators for applicable non-text contrast requirements.
- [ ] Test at 200% and 400% zoom and at a 320 CSS-pixel viewport; check for loss of content or two-dimensional scrolling.
- [ ] Confirm reduced-motion preferences disable or simplify non-essential motion.
- [ ] Check touch targets and spacing on a small mobile screen.

- [ ] Mittaa normaalin tekstin kontrasti sen todellista taustaa vasten; tavoite on vähintään 4,5:1.
- [ ] Mittaa suuren tekstin kontrasti; tavoite on vähintään 3:1.
- [ ] Tarkista olennaisten käyttöliittymärajojen, kuvakkeiden ja fokusilmaisimien soveltuvat ei-tekstimuotoisen sisällön kontrastivaatimukset.
- [ ] Testaa 200 %:n ja 400 %:n suurennuksella sekä 320 CSS-pikselin näkymäleveydellä; varmista, ettei sisältö katoa eikä synny tarpeetonta kaksiulotteista vieritystä.
- [ ] Varmista, että vähennetyn liikkeen asetus poistaa tai yksinkertaistaa ei-välttämättömiä animaatioita.
- [ ] Tarkista kosketuskohteiden koko ja välistys pienellä mobiilinäytöllä.

## Reference standards | Lähdestandardit

- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Easy Checks – A First Review of Web Accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [W3C Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
