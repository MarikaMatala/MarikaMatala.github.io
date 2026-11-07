# The Cultured Vault — installable demo

<!-- Last updated: 2026-11-07. -->

> Culture worth discovering. Stories worth remembering.

The Cultured Vault is an open-source cultural catalogue concept. This folder contains its static, installable Progressive Web App (PWA) demo. It demonstrates a possible interface for exploring films, series, animation, documentaries, podcasts, music, games and books.

- Live demo: https://marikamatala.github.io/The-Cultured-Vault-demo/
- Main project: https://github.com/MarikaMatala/The-Cultured-Vault
- Short phone installation guide: [INSTALLATION.md](INSTALLATION.md)

## 1. What this demo does

This is a lightweight front-end prototype. It does not require a framework, build process or third-party JavaScript package. It includes:

- a 1,000-entry sample catalogue with multiple media categories, including 986 additions across films, series, animation, documentaries, podcasts, music albums, games and books; the expanded selection includes Studio Ghibli and Disney animation, 1990s and 2000s nostalgia films, supernatural and cult series, and internationally popular Netflix titles such as Stranger Things, Wednesday, Squid Game, Dark and Bridgerton;
- search by title, creator, country and genre;
- category filters and sorting, with alphabetical title order as the default;
- an A–Z letter index and a 0–9 numeric index; both jump to matching catalogue groups, disable unavailable entries and follow the current search and category filters; the catalogue is paginated at 36 works per page to keep the page compact;
- owner-rating placeholders and outbound IMDb and Open Library lookup links only; no Rotten Tomatoes deep links, third-party ratings or reviews are imported;
- a form for adding a personal demo rating and optional comment;
- English-only interface and documentation;
- responsive layouts for phones, tablets and desktop browsers;
- PWA metadata and app icons;
- a service worker that caches the app shell for basic offline use.

The goal is to make the concept testable before implementing a production backend.

### External ratings and source policy

IMDb is provided as an outbound lookup link only. The Vault does not store or republish IMDb scores. Rotten Tomatoes links are omitted because its current terms restrict deep links to pages other than the home page without prior written consent.

The BookRank importer has been disabled because its published CC BY 4.0 statement did not clearly cover every field previously imported by this demo. No BookRank scores or records are currently imported. See the [Sources and licences page](sources.html) for the licence review and reuse policy.


## Sources and licences page

The demo includes an English-language [sources.html](sources.html) source register. It distinguishes the project's own software licence from external service terms and explains which sources are not imported. It also explains manually curated metadata, browser-local storage, and why third-party posters and covers are not copied.


## Open-source licence and third-party material

The demo's original source code and documentation are licensed under the MIT License; see [LICENSE](LICENSE). This licence does not apply to third-party works, data or trademarks. No third-party ratings, reviews, descriptions, posters, stills or covers are imported. IMDb and Open Library are outbound lookup links only. Rotten Tomatoes links are omitted because its current terms restrict deep links without prior written consent. The BookRank importer has been disabled because the published licence scope did not clearly cover every field previously consumed. See [sources.html](sources.html) for the licence analysis, source boundaries and reuse policy.
