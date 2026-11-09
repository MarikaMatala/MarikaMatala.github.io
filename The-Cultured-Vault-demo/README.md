# The Cultured Vault — browser demo

<!-- Last reviewed: 2026-11-09. -->

> Culture worth discovering. Stories worth remembering.

The Cultured Vault is a static cultural-catalogue prototype for exploring films, series, animation, documentaries, podcasts, music, games and books.

- Live demo: https://marikamatala.github.io/The-Cultured-Vault-demo/
- Main project repository: https://github.com/MarikaMatala/The-Cultured-Vault
- Source and licence register: [sources.html](sources.html)
- Project code licence: [MIT License](LICENSE)

## Current features

- A manually curated catalogue of 1,000 works across eight media categories.
- Search by title, creator, country and genre.
- Category filters and sorting by title, original catalogue order (Featured) or release year.
- A–Z and 0–9 navigation, including a one-character jump field.
- Pagination at 36 catalogue entries per page.
- External lookup links on each work: IMDb search and a Google search restricted to Rotten Tomatoes pages. Book entries also link to Open Library search.
- Personal demo ratings and optional comments, stored in the visitor's current browser.
- A local-only form for suggesting works.
- English-only interface.
- Responsive dark interface with bronze, silver and gold accents.
- A web app manifest and service worker for app-shell metadata and basic same-origin caching.

## External lookup and data policy

The external links are navigation aids only. The Vault does not scrape IMDb or Rotten Tomatoes, call their data APIs, import their ratings, reproduce reviews, or copy their images or descriptions. Rotten Tomatoes is reached through a Google site-search link rather than a direct deep link because its current Terms of Use restrict links to pages other than its homepage without prior written consent.

Book entries open an Open Library search. The Vault does not currently call the Open Library API, import its records or download its covers.

No third-party numeric ratings, review text, plot descriptions, biographies, posters, covers, stills, album artwork or promotional images are imported. Catalogue records contain plain-text titles and manually curated factual fields. This does not mean every fact or collection has been individually cleared by a rights holder; database rights and source-specific restrictions may still apply.

See [Sources and licences](sources.html) for the current list of services and the project's rights boundary. Services and datasets that are not currently integrated are intentionally not listed as active sources.

## Visitor data and privacy

The suggestion and rating forms are local browser demonstrations:

- Suggestions, ratings and optional comments are stored in the visitor's own browser using `localStorage`.
- Entries are not sent to the maintainer, shared with other visitors or added to the public catalogue.
- Clearing browser storage may remove the saved entries.
- Do not enter sensitive or personal information.

There is no server-side backend, database, user account, sign-in, cloud synchronisation or public community-review system.

## Installation status

The manifest and service worker are present as technical groundwork, but the app-install button and installation instructions are intentionally not offered. Installation readiness has not been fully validated, so this project should currently be used as a browser demo. Basic app-shell caching may work after the first successful online visit.

## Development

The demo is built with plain HTML, CSS and JavaScript. It does not require a framework, build step or third-party JavaScript package.

Main files:

- `index.html` — page structure and interface content.
- `app.js` — catalogue data, filtering, navigation, local suggestions and local ratings.
- `styles.css` — responsive layout and visual theme.
- `sources.html` — current source and licence register.
- `sw.js` — service worker and app-shell cache.
- `manifest.webmanifest` — web app metadata and icons.
- `LICENSE` — MIT licence for original project-authored HTML, CSS and JavaScript source code only; excludes catalogue records, documentation, icons, the manifest and third-party material.

## Licence boundary

For this project, the MIT licence applies only to original project-authored application source code in HTML, CSS and JavaScript, excluding embedded catalogue records and all third-party material. It does not cover documentation, SVG or PNG icons, other visual assets, the web app manifest, or any third-party content. It does not apply to the underlying films, series, books, music, games, characters, artwork, logos, datasets, trademarks or other third-party material.

The presence of a title or creator name in the catalogue is not a claim of ownership, endorsement or permission to reproduce the underlying work. Review [sources.html](sources.html) before reusing or contributing material.

### Asset provenance

The 180 × 180 PNG touch icon is referenced by the web app manifest but is not covered by the MIT code licence. Its original source and export provenance should be verified before reuse or redistribution. The alternate `apple-touch-icon.svg` file is not referenced by the page or manifest and is not part of the service-worker cache.
