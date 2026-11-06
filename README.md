# Portfolio | Marika Matalamäki

<!-- // Last updated: 2026-11-06 13:36 (Europe/Helsinki). -->

**Portfolio website:** https://marikamatala.github.io/

## About

I am an ICT engineer who graduated from JAMK. My interests and skills include frontend and web development, application development, UI/UX, visual design and digital media. My background combines technical skills with experience in visual communication and media production.

I am looking for **entry-level and junior positions**, as well as **paid company trainee, graduate and other early-career programmes or internships open to graduates**, including people who graduated within the past 12 months. I am **not looking for internships required as part of a Finnish university of applied sciences degree**, as I have already graduated, or for **unpaid work or internships**. My first preference is **on-site and hybrid work in Helsinki, Espoo and Vantaa**, where there are more companies in my field and I have friends and acquaintances. I also consider suitable opportunities in **Jyväskylä** and am willing to relocate to the Helsinki metropolitan area for work. I am also interested in **remote roles, international opportunities and work involving travel**.

I continue to develop my portfolio and add selected projects and examples to the website. Some additional work samples are kept in private repositories and are available on request.

Olen JAMKista valmistunut ICT-insinööri. Osaamiseeni ja kiinnostuksenkohteisiini kuuluvat frontend- ja web-kehitys, sovelluskehitys, UI/UX-suunnittelu, visuaalinen suunnittelu ja digitaalinen media. Taustassani yhdistyvät tekninen osaaminen sekä kokemus visuaalisesta viestinnästä ja mediatuotannosta.

Etsin **entry-tason ja junior-tason työpaikkoja** sekä **palkallisia yritysten trainee-, graduate- ja muita uransa alkuvaiheen ohjelmia tai harjoittelupaikkoja**, jotka soveltuvat myös jo valmistuneille tai viimeisen 12 kuukauden aikana valmistuneille. **En etsi AMK-tutkintoon kuuluvia harjoittelupaikkoja**, sillä olen jo valmistunut, enkä **palkattomia töitä tai harjoitteluja**. Ensisijaisesti kiinnostavat **paikan päällä tehtävät ja hybridityöt Helsingissä, Espoossa ja Vantaalla**, joissa on enemmän oman alani yrityksiä ja joissa minulla on tuttuja ja ystäviä. Haen myös **Jyväskylästä**, jos sopiva työmahdollisuus löytyy, ja olen valmis muuttamaan pääkaupunkiseudulle työn perässä. Olen kiinnostunut myös **etätyöstä, kansainvälisistä työmahdollisuuksista ja matkustamista edellyttävistä tehtävistä**.

Kehitän portfoliotani jatkuvasti ja lisään verkkosivulle valikoituja projekteja ja työnäytteitä. Osa muista työnäytteistä on yksityisissä repositorioissa, ja niitä voi pyytää nähtäväksi viestillä.

## Security and privacy notice / Tietoturva ja yksityisyys

**English:** All examples have been reviewed and modified before publication. They contain no personal information or real credentials. Passwords, usernames, API keys, access tokens, database connection strings, session secrets and private server details have been removed or replaced with clearly marked placeholders. Replace placeholders with your own values when using an example. Never publish actual passwords, API keys, tokens or other sensitive credentials in a public repository.

**Suomeksi:** Kaikki esimerkit on tarkistettu ja muokattu ennen julkaisua. Ne eivät sisällä henkilökohtaisia tietoja tai oikeita tunnistetietoja. Salasanat, käyttäjätunnukset, API-avaimet, käyttöoikeustokenit, tietokantayhteydet, istuntosalaisuudet ja yksityiset palvelintiedot on poistettu tai korvattu selkeästi merkityillä paikkamerkeillä. Korvaa paikkamerkit omilla tiedoillasi, jos otat esimerkin käyttöön. Älä koskaan julkaise oikeita salasanoja, API-avaimia, tokeneita tai muita salassa pidettäviä tunnistetietoja julkisessa repositoriossa.

---

**Website status:** This portfolio is still a work in progress. Its content, translations and work samples are being updated. The latest update is shown at the top of the published website.

**Sivuston tila:** Portfolio on edelleen työn alla. Sen sisältöä, kieliversioita ja työnäytteitä päivitetään. Viimeisimmän päivityksen ajankohta näkyy julkaistun sivuston yläosassa.

## Repository structure

- `index.html` — homepage and short introduction, in Finnish and English
- `minusta.html` — education, background and self-assessed skills
- `tyonaytteet.html` — project descriptions, image galleries, interactive C# examples, inline PDF previews and the embedded Remote Job Fit demo
- `remote-job-fit-demo.html`, `remote-job-fit-demo.css`, `remote-job-fit-demo.js` — isolated browser-only Remote Job Fit prototype; entered data is processed in memory and is not transmitted or stored
- `backend-code-examples.md` — five reviewed backend code examples covering Mongoose, REST API CRUD, session authentication and automated testing
- `yhteystiedot.html` — email, LinkedIn, GitHub and job availability
- `style.css` — responsive layout and shared component styles
- `autumn-cottagecore.css` — autumn colors, readable typography, cottagecore-inspired details and accessibility refinements
- `script.js` — persistent language toggle, Android image carousel and interactive OOP examples
- `images/` — image assets, the `Sana-Vapaa-tapahtumajuliste.pdf` event poster and the audiovisual communications portfolio PDF
- `scripts/validate_site.py` and `.github/workflows/site-validation.yml` — automated checks for missing local references, duplicate HTML IDs and broken same-site HTML anchors

## Development and local preview

See [DEVELOPMENT.md](DEVELOPMENT.md) for instructions on running the static site locally, its file structure, language conventions, accessibility considerations, validation and publishing.

## Recent portfolio updates

The Work Samples page now displays the **Sana Vapaa** event poster and the audiovisual communications portfolio directly in responsive, embedded PDF viewers. The Sana Vapaa poster was created for an event organised as part of the **Luotsaamo project run by Jyvässeudun 4H-yhdistys**. Its PDF asset is named `images/Sana-Vapaa-tapahtumajuliste.pdf`.

The Work Samples page also includes an interactive Remote Job Fit browser demo. The experiment began as a way for its author to map personal skills and explore possible job roles; the public examples now cover software development, IT and ICT support, testing, data, cybersecurity, design, media, marketing and communications. Visitors can replace the sample skills, target title and job description with their own information to make the experiment relevant to their background and goals. The demo runs entirely in the browser, makes no network requests, and does not persist entered profile data. It is a limited front-end prototype and does not run the Python/FastAPI backend or fetch live vacancies. The full source project is available in the separate [remote-job-fit repository](https://github.com/MarikaMatala/remote-job-fit).

The Work Samples page also includes quick links to its main project sections. A GitHub Actions workflow checks local HTML file references, duplicate IDs and same-site HTML anchors on pull requests and pushes to `main`. See [DEVELOPMENT.md](DEVELOPMENT.md) and [TESTING.md](TESTING.md) for the current development and QA instructions.

## Technologies and areas

HTML · CSS · JavaScript · C# examples · Git · GitHub Pages · PrismJS · Web and application development · UI/UX · Visual design · Digital media

## Languages

The portfolio website and this README are available in Finnish and English. The site is a static HTML/CSS/JavaScript project and does not require a build step or npm dependencies.

PrismJS 1.30.0 is loaded from jsDelivr on the work samples page to highlight C# code examples. The library is used under its MIT license. The gothic textures, responsive layouts and subtle decorative animation are implemented with CSS to keep the site lightweight. The language choice is remembered between pages in the browser.

## UI libraries, animation and accessibility

The current site uses native HTML, CSS and JavaScript and is published directly with GitHub Pages. Its autumn cottagecore visual theme, decorative details and motion are implemented mainly in CSS, with reduced-motion support. PrismJS 1.30.0 is used for C# syntax highlighting on the work samples page.

A reference guide for possible future libraries—including Tailwind CSS v4, tw-animate-css, Radix/shadcn UI, Lucide, Simple Icons and the Web Audio API—is available in [UI-LIBRARIES.md](UI-LIBRARIES.md). These React/Vite libraries are documented as future options, not dependencies installed in the current static site.

 The guide also includes animation examples and links to official documentation and CSS learning resources.

## Käyttöliittymäkirjastot, animaatiot ja saavutettavuus

Nykyinen sivusto käyttää tavallista HTML:ää, CSS:ää ja JavaScriptiä, ja GitHub Pages julkaisee sen ilman erillistä build-vaihetta. Syksyinen cottagecore-ilme, koristeet ja animaatiot on toteutettu pääosin CSS:llä, ja liikkeen vähentämisen asetukset huomioidaan. C#-koodiesimerkkien korostamiseen käytetään PrismJS 1.30.0 -kirjastoa.

Mahdollisia tulevan React/Vite-version kirjastoja, animaatioesimerkkejä ja virallisia dokumentaatioita käsitellään tiedostossa [UI-LIBRARIES.md](UI-LIBRARIES.md). React/Vite-kirjastot on dokumentoitu jatkokehityksen vaihtoehtoina; niitä ei ole lisätty nykyisen staattisen sivuston riippuvuuksiksi.

## Career Support, Sponsorship & Collaboration | Uran tukeminen, sponsorointi ja yhteistyö

I am building my career in IT, digital media and creative fields, and I am open to putting my skills into practice through projects of all sizes. Support for my work can take different forms: financial contributions, project-based sponsorship, software and licences, development tools, equipment or other useful supplies. I welcome enquiries from both individuals and companies.

I am interested in projects involving web development, digital services, visual design, content creation, photography, video, communications and social media. I am also open to advertising and marketing projects, including agreed social media collaborations and sponsored posts on my channels. The scope, deliverables, compensation and any visibility or publication arrangements are agreed in advance. Commercial collaborations and sponsored content are clearly disclosed.

Rakennan uraani IT:n, digitaalisen median ja luovien alojen parissa ja olen valmis tarjoamaan osaamistani erikokoisiin projekteihin. Työskentelyäni voi tukea monella tavalla: rahallisella tuella, projektikohtaisella sponsoroinnilla, ohjelmistoilla ja lisensseillä, kehitystyökaluilla, laitteilla tai muilla hyödyllisillä tarvikkeilla. Yhteydenotot ovat tervetulleita sekä yksityishenkilöiltä että yrityksiltä.

Olen kiinnostunut esimerkiksi verkkosivuihin ja digitaalisiin palveluihin, visuaaliseen suunnitteluun, sisällöntuotantoon, valokuvaukseen, videoihin, viestintään ja sosiaaliseen mediaan liittyvistä projekteista. Teen mielelläni myös mainos- ja markkinointitarkoituksiin suunniteltua työtä sekä sovittaessa yhteistyöjulkaisuja ja sponsoroituja postauksia sosiaalisen median kanavissani. Sovimme etukäteen työn sisällöstä, toimitettavista materiaaleista, korvauksesta ja mahdollisesta näkyvyydestä. Kaupalliset yhteistyöt ja sponsoroitu sisältö merkitään asianmukaisesti.

💜 **[Support my work on GitHub Sponsors](https://github.com/sponsors/MarikaMatala)**  
☕ **[Support my work on Buy Me a Coffee](https://buymeacoffee.com/marikamatala)**

---

## Copyright and use | Tekijänoikeudet ja käyttö

The code and visual work in this portfolio are created by Marika Matalamäki, either as personal projects or coursework, unless a specific item is credited otherwise. Images are her own unless otherwise stated alongside an image or project. Rights to collaborative work, coursework materials and third-party assets remain with their respective rights holders. Do not reuse materials without permission from the relevant rights holder. Unauthorised use may lead to claims for remuneration or damages where applicable by law.

Portfolion koodit ja visuaaliset työt ovat Marika Matalamäen itse tekemiä, joko harrastusprojekteina tai opintojen harjoitustöinä, ellei yksittäisen työn yhteydessä toisin ilmoiteta. Kuvat ovat hänen omiaan, ellei kuvan tai projektin yhteydessä toisin mainita. Yhteistyöprojektien, opintotöiden ja kolmansien osapuolten materiaalien oikeudet säilyvät niiden omilla oikeudenhaltijoilla. Materiaaleja ei saa käyttää uudelleen ilman asianomaisen oikeudenhaltijan lupaa. Luvattomasta käytöstä voidaan vaatia hyvitystä tai vahingonkorvausta sovellettavan lain mukaisesti.


## Remote Job Fit vocabulary and data sources | Osaamissanaston lähteet

The browser demo uses a project-maintained, manually curated bilingual vocabulary of skills, programming languages, software, tools and job titles. Finnish and English aliases are mapped to shared internal terms. It is a keyword helper, not a complete labour-market taxonomy or an assessment of actual competence. The vocabulary is stored in `remote-job-fit-vocabulary.js`; no third-party skill-extraction model, scraped job-ad corpus or bulk dataset is bundled.

Sources consulted as terminology and taxonomy references:

- **European Commission ESCO** — multilingual European classification of occupations, skills and competences, including Finnish and English. ESCO is available for reuse free of charge subject to acknowledgement; adapted versions must be identified as modified. ESCO v1.2.1 describes 3,039 occupations and 13,939 skills in 28 languages. The demo does not bundle a downloaded ESCO dataset. [ESCO overview](https://esco.ec.europa.eu/en) · [Reuse conditions](https://esco.ec.europa.eu/en/about-esco/faq) · [Downloads](https://esco.ec.europa.eu/en/use-esco/download).
- **Wikidata** — structured multilingual reference data released under CC0. Useful for cross-checking names of occupations, programming languages and software. No bulk Wikidata export is bundled. [Wikidata for developers](https://www.wikidata.org/wiki/Wikidata:For_developers/en).
- **Wikipedia** — consulted for programming occupations and programming-language names, not copied as a source of descriptions. Most Wikipedia text is under CC BY-SA 4.0; reuse requires attribution, a licence link and compliance with ShareAlike conditions. [List of programming occupations](https://en.wikipedia.org/wiki/List_of_programming_occupations) · [List of programming languages](https://en.wikipedia.org/wiki/List_of_programming_languages) · [Wikimedia content reuse guidance](https://www.mediawiki.org/wiki/Wikimedia_APIs/Content_reuse).
- **O*NET** — occupational reference containing job titles, skills and software-skill examples. Much of its database is CC BY 4.0, but third-party exceptions apply. O*NET data has not been imported into this vocabulary. [Database](https://www.onetcenter.org/database.html) · [Licence information](https://www.onetcenter.org/license_agreements.html).
- **Job Market Finland** — Finnish occupational profiles and ICT-sector job-title examples, including software developer, game programmer, animator, ICT technician, information security expert and webmaster. [ICT sector](https://tyomarkkinatori.fi/en/personal-customers/professional-information/profession-fields/ict-sector) · [Software developer](https://tyomarkkinatori.fi/en/personal-customers/professional-information/professions/software-developer).
- **OECD Skills for the Digital Transition** — digital occupation profiles and associated skills, including web development, UI/UX, software quality assurance, version control, technical support and digital marketing. [Digital occupation skills profiles](https://www.oecd.org/en/publications/skills-for-the-digital-transition_38c36777-en/full-report/component-7.html).
- **Nesta Skills Extractor** — MIT-licensed open-source Python library for extracting skill phrases from job advertisements and mapping them to a skills taxonomy. It is a possible reference for a future NLP prototype and is not used by this browser-only demo. [Source repository](https://github.com/nestauk/ojd_daps_skills).
- **SkillNER** — MIT-licensed, rule-based Python/spaCy library for extracting skill terms from text. It is another possible future reference, not a dependency of this browser-only demo. [Source repository](https://github.com/AnasAito/SkillNER).
- **Queast technology taxonomy** — a public catalogue of software technologies, names and aliases under CC BY-SA 4.0. It may help expand software-name coverage later, but is not imported into the current list. [Taxonomy and reuse information](https://technologies.quea.st/).

This vocabulary is a project-specific curated list, not an official ESCO, O*NET or Wikidata classification. New terms must be checked for spelling, Finnish-English equivalents, context and licensing. Do not copy descriptions, proprietary job-ad content or bulk datasets without checking their individual terms.

### Suomeksi

Demon sanasto on projektia varten käsin koottu ja muokattu suomi–englanti-synonyymilista. Sen suunnittelussa on tarkasteltu ESCO-luokitusta, Wikidataa, Wikipediaa ja O*NET-aineistoa. Demoon ei ole kopioitu Wikipedia-artikkelien tekstejä eikä lisätty ladattua ESCO-, O*NET- tai Wikidata-aineistopakettia. Sanasto ei ole näiden palveluiden virallinen luokitus. Mahdolliset myöhemmin lisättävät aineistot tarkistetaan erikseen lisenssien ja lähdemerkintöjen osalta.
