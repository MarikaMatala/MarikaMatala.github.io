# Remote Job Fit — project templates

This folder contains **optional setup templates** for future development of the Remote Job Fit project.

## Current demo status

The public GitHub Pages demo is a static, browser-only prototype. It uses HTML, CSS and JavaScript. It does not need Node.js, Python, a database, an API key, a backend server or an `.env` file.

The files in this folder are examples for a possible future backend or local development setup. They are not connected to the current demo and are not required to use it.

## Folder structure

- `.env.example` — placeholder environment variables for a possible future backend. Copy it to `.env` locally only if your own backend needs these settings.
- `config/app.example.js` — illustrative JavaScript configuration with explanatory comments and fake values.
- `config/demo.example.json` — valid JSON sample configuration. Values are synthetic examples.
- `config/README.md` — how to adapt the configuration safely.
- `data/README.md` — rules for adding external occupation/skill data and recording licences.
- `backend/README.md` — optional backend setup notes. No backend is implemented by these instructions alone.

## Licence for the Remote Job Fit demo

The MIT licence in this folder applies **only to the Remote Job Fit demo's original source code**, specifically:

- `remote-job-fit-demo.html`
- `remote-job-fit-demo.css`
- `remote-job-fit-demo.js`
- `remote-job-fit-vocabulary.js`

It also covers original documentation and example files located inside this `remote-job-fit/` folder, where they are authored by the copyright holder.

The MIT licence does **not** apply to the rest of the portfolio website or repository. In particular, it does not grant permission to reuse portfolio photographs, personal information, graphics, other projects, PDF files, artwork, or other website content. Third-party components and assets remain under their respective licences. See the root `README.md` and `THIRD-PARTY-NOTICES.md`.

MIT permits use, copying, modification, distribution and commercial use of the covered demo code, provided the copyright and licence notice are retained. The licence also includes warranty and liability disclaimers. If you do not want others to reuse the demo code on these terms, do not distribute it under MIT.

## Important: no real credentials

All values are fictional placeholders. No personal data, usernames, passwords, API keys, access tokens, private URLs or database credentials are included.

If you later need an API key:
1. Choose a provider and read its official API documentation and terms.
2. Create your own account directly with that provider.
3. Generate your own key in its official developer dashboard.
4. Store it only in your local, untracked `.env` file or a secure deployment secret store.
5. Never put it in HTML, CSS, browser JavaScript, JSON examples, screenshots, commits or public issue comments.

A browser application cannot keep a secret API key private. Any key shipped to a visitor's browser can be inspected. Calls requiring private credentials must go through a properly secured backend.

## Licensing and external data

The current sample data is fictional and written for this project. No downloaded ESCO, O*NET, Wikidata, Wikipedia or Queast dataset is bundled here. Do not copy a third-party taxonomy or library into this project until its exact release, licence, attribution requirements and any ShareAlike obligations have been checked.

See the root `README.md` section **Remote Job Fit vocabulary and data sources** and `THIRD-PARTY-NOTICES.md` for the source register.
