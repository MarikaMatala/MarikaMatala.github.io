# The Cultured Vault — installable demo

<!-- Last updated: 2026-11-06 20:27 (Europe/Helsinki). -->

> Culture worth discovering. Stories worth remembering.

The Cultured Vault is an open-source cultural catalogue concept. This folder contains its static, installable Progressive Web App (PWA) demo. It demonstrates a possible interface for exploring films, series, animation, documentaries, podcasts, music, games and books.

- Live demo: https://marikamatala.github.io/The-Cultured-Vault-demo/
- Main project: https://github.com/MarikaMatala/The-Cultured-Vault
- Finnish guide: [README.fi.md](README.fi.md)
- Short phone installation guide: [INSTALLATION.md](INSTALLATION.md)

## 1. What this demo does

This is a lightweight front-end prototype. It does not require a framework, build process or third-party JavaScript package. It includes:

- a 500-entry sample catalogue with multiple media categories, including 486 additions across films, series, animation, documentaries, podcasts, music albums, games and books; the selection also features cult television, films and cartoons from the 1980s, 1990s and 2000s;
- search by title, creator, country and genre;
- category filters and sorting;
- separate sample ratings for the instance owner and the community;
- a form for adding a personal demo rating and optional comment;
- Finnish and English interface text;
- responsive layouts for phones, tablets and desktop browsers;
- PWA metadata and app icons;
- a service worker that caches the app shell for basic offline use.

The goal is to make the concept testable before implementing a production backend.

## 2. What it does not do

This demo does not provide registration, sign-in, user profiles, a server, an API, a shared database, public user reviews, cross-device synchronisation, live third-party catalogue metadata, a native APK/IPA, or App Store / Google Play distribution.

The catalogue and scores are examples. A review submitted in the demo is saved only in the current browser's localStorage. It is not uploaded to a server or committed to GitHub. Clearing browser data may remove it. Do not enter passwords, private details or sensitive information.

## 3. Requirements

To browse the demo:
- a modern browser (Chrome, Edge, Firefox, Safari or Samsung Internet);
- JavaScript enabled.

No account, API key, database, package manager or build tool is needed.

To test PWA installation and offline behaviour locally:
- a local web server, such as VS Code Live Server or Python's built-in HTTP server;
- HTTPS or localhost. Service workers do not work from a file:// URL.

To publish your own copy:
- a GitHub account and a fork of the public repository, or another static HTTPS host;
- Git is recommended but not mandatory if you edit files directly on GitHub.

## 4. Run locally from the beginning

### Option A — Visual Studio Code

1. Install Git and Visual Studio Code.
2. Clone or download the portfolio repository.
3. Open the repository folder in Visual Studio Code.
4. Open the The-Cultured-Vault-demo folder.
5. Install the Live Server extension if you do not already have it.
6. Right-click index.html and choose **Open with Live Server**.
7. Your browser should open the demo on a localhost address.

### Option B — Python

1. Install Python 3.
2. Open a terminal inside the The-Cultured-Vault-demo folder.
3. Run:

~~~bash
python -m http.server 8000
~~~

4. Open http://localhost:8000 in your browser.
5. Stop the server with Ctrl+C.

On some systems, use python3 instead of python.

### Option C — Use the published demo

Open https://marikamatala.github.io/The-Cultured-Vault-demo/ . This is the easiest way to try the interface on a phone or computer.

## 5. Install on a phone

### Samsung and other Android devices

1. Open the published HTTPS demo in Chrome.
2. Open Chrome's three-dot menu.
3. Choose **Install app** or **Add to Home screen**. The exact wording depends on the browser version.
4. Confirm the installation.

If no install prompt appears, check whether the browser offers Add to Home screen. The page must use HTTPS, the manifest and icons must load, and the service worker must install.

### iPhone and iPad

1. Open the HTTPS demo in Safari.
2. Tap the Share icon.
3. Choose **Add to Home Screen**.
4. Confirm by tapping **Add**.

Use Safari for the most reliable iOS installation flow. Chromium's JavaScript install prompt is not expected to appear in Safari.

## 6. File and folder map

~~~text
The-Cultured-Vault-demo/
├── index.html               # Page structure, text and accessibility landmarks
├── styles.css               # Theme, components, responsive and accessibility styles
├── app.js                   # Sample data, search, filters, rendering and local reviews
├── manifest.webmanifest     # PWA name, icons, scope and display mode
├── sw.js                    # App-shell cache and basic offline support
├── INSTALLATION.md          # Short Android and iOS installation guide
├── README.md                # This detailed English guide
├── README.fi.md             # Detailed Finnish guide
└── icons/
    ├── vault-icon.svg       # General app icon
    ├── vault-maskable.svg   # Maskable icon for Android launchers
    ├── apple-touch-icon.svg # Vector source artwork
    └── apple-touch-icon.png # Apple home-screen icon (180 × 180)
~~~

All app assets use relative paths so the demo can run under a GitHub Pages project path, not only at a domain root.

## 7. How the code works

### index.html

Defines the semantic page structure, bilingual text, form controls, accessibility landmarks, PWA metadata and local asset links. It links to styles.css and app.js; it should not contain the main styling or application logic.

### styles.css

Contains the visual design. Theme variables are at the top in the :root block. Edit those variables to change the dark bronze, silver and gold palette. Responsive breakpoints adapt the catalogue and form to smaller screens. A reduced-motion rule respects the visitor's operating-system preference.

### app.js

Contains the original sample works plus 486 additions (500 entries total), and browser-side behaviour:

1. reads the sample catalogue;
2. filters and sorts works using the controls;
3. builds catalogue cards with DOM methods;
4. shows the owner placeholder “Not rated yet” and IMDb ratings separately;
5. stores personal demo reviews in localStorage;
6. switches between Finnish and English;
7. registers the service worker on HTTPS or localhost.

Visitor-entered text is rendered using textContent instead of being interpreted as HTML.

### manifest.webmanifest

Provides the app name, start URL, scope, display mode, theme colours and icon paths. It is JSON: do not add JavaScript-style comments to this file.

### sw.js

Caches the static app shell after the first successful online load. The worker is registered with a scope limited to this demo folder so it does not control the rest of the portfolio site. The cache name contains a version number. Increment it when the cached file list changes or you need to force a fresh cache.

## 8. Edit the sample catalogue

Open app.js and find the works array near the top. An entry follows this structure:

~~~js
{
  id: "film-example-2026",
  title: "Example title",
  creator: "Creator or studio",
  type: "film",
  year: 2026,
  genres: ["Drama", "Mystery"],
  country: "Country",
  owner: null,
  imdbRating: null,
  ownerReview: ""
}
~~~

Every item needs a unique id. The type must match a key in typeLabels and a category filter in index.html. Current types are:

- film
- series
- animation
- documentary
- podcast
- music
- game
- book

Use year: null when a year is not applicable or intentionally unknown. Demo ratings use a 1–10 scale.

To add a category, update all three places: the data type in app.js, the bilingual typeLabels object, and the category filter buttons in index.html.

## 9. Change the design and languages

- Change theme colours in the :root variables at the top of styles.css.
- Update static Finnish and English text through data-fi and data-en attributes in index.html.
- Update dynamic labels in the ui and typeLabels objects in app.js.
- Keep visible keyboard focus and sufficient colour contrast.
- Test at narrow phone, tablet and desktop widths.

## 10. Local storage and privacy

The demo stores personal sample reviews under the localStorage key cultured-vault-demo-reviews-v1. This storage belongs to the current browser profile and site origin:

- a review saved on one device does not appear on another;
- private browsing may clear it at the end of the session;
- clearing website data may delete it;
- localStorage is not a secure database and must not be used for passwords or sensitive data.

A production release needs a separately designed data model, authentication, authorisation, database access rules, backups, privacy documentation and a secure backend. Never commit user data, API secrets or credentials to a public repository.

## 11. PWA cache and troubleshooting

**The newest changes do not appear:** close and reopen the installed app. The browser may still have an older cached version. During development, clear this site's storage and cache in browser developer tools. When changing the app-shell file list, increment CACHE_NAME in sw.js.

**The install option is missing:** confirm HTTPS, check that the manifest and icons load, and verify that the service worker installed. On iOS, use Safari's Share → Add to Home Screen flow instead of looking for an install prompt.

**The page has no styling:** check that index.html links to styles.css and that both files are in the same directory.

**Offline mode fails on the first visit:** the browser must load the demo online once so the service worker can cache the app shell. Then test again with the network disabled.

**A localStorage error appears:** the browser may block storage in private mode or due to privacy settings. Catalogue browsing should still work.

## 12. Accessibility and quality checklist

Before publishing changes, test:
- keyboard-only navigation and visible focus;
- skip link and logical heading order;
- form labels and live status messages;
- phone layout at 320–390 CSS pixels;
- browser zoom at 200%;
- reduced-motion preference;
- Finnish and English labels;
- search, sorting and every category filter;
- review validation and local persistence;
- PWA installation and offline reload over HTTPS.

Automated accessibility tools are useful, but they do not replace keyboard and screen-reader testing.

## 13. Contributing and licence

This demo belongs to the public The Cultured Vault project. Fork it, experiment, report issues and propose improvements. Read the main project's [CONTRIBUTING.md](https://github.com/MarikaMatala/The-Cultured-Vault/blob/main/CONTRIBUTING.md) and [MIT licence](https://github.com/MarikaMatala/The-Cultured-Vault/blob/main/LICENSE).

For an independent fork, use your own hosting, domain, database and API credentials. The original maintainer does not automatically provide hosting, user accounts or shared infrastructure to forks.

---

**Open the vault. Discover something extraordinary.**


## Personal and IMDb ratings

Every catalogue entry starts with the instance-owner status **Not rated yet**. No personal owner score or review text is prefilled. IMDb ratings, when present, are shown separately. IMDb user ratings are shown separately and are never presented as the owner's rating or as a community average. The displayed IMDb values are a static reference snapshot; ratings change over time. A dash means that no verified IMDb value has been added to this demo, not a zero score. Each work has an IMDb search link for checking the current rating. IMDb rating data is sourced from IMDb chart/list pages; official non-commercial dataset details and terms are available at https://developer.imdb.com/non-commercial-datasets/.

The catalogue contains 486 additions beyond the original 14 sample entries. Some entries have not yet been enriched with creator, genre or country metadata.


## Catalogue suggestions and owner ratings

The catalogue now contains 500 works. Visitors can suggest a missing film, series, animation, documentary, podcast, album, game or book, with optional year, creator and notes. Suggestions are stored in this browser's localStorage under `cultured-vault-suggestions-v1`; they remain local to this browser and device and are not sent to the maintainer without a backend.

Every work displays **Not rated yet** for the instance owner's rating. No owner score or review text is prefilled. IMDb ratings are displayed separately as external reference information.
