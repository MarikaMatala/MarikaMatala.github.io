# Third-party data and software notices

This file records the status of external resources considered for the Remote Job Fit prototype. It distinguishes references from materials actually included in the repository.

## Included in the current demo

- No third-party occupational dataset, job-ad corpus, skill-extraction library or taxonomy export is bundled.
- The current keyword vocabulary is maintained as a project-specific list of short names and aliases. It is not an imported ESCO, O*NET, Wikidata or Wikipedia dataset.
- The example vacancy and profile in `remote-job-fit/config/demo.example.json` are fictional and written for demonstration.

## Potential data sources — not currently imported

### European Commission ESCO

- Source: https://esco.ec.europa.eu/en
- Reuse conditions: https://esco.ec.europa.eu/en/about-esco/faq
- Status: considered as a future multilingual occupation and skill source; no dataset files are included.
- Required acknowledgement if integrated into an application: "This service uses the ESCO classification of the European Commission."
- Any modified or adapted ESCO content must be clearly identified as modified.

### Wikidata structured data

- Source: https://www.wikidata.org/
- Licensing: CC0 for structured data. Text in other Wikidata namespaces may have different terms.
- Status: reference only; no bulk export is included.

### O*NET Database

- Source: https://www.onetcenter.org/database.html
- Licence: CC BY 4.0 for the covered database content, subject to third-party exceptions.
- Status: reference only; no O*NET data is included.
- If integrated, identify the exact database version, credit the O*NET Database and USDOL/ETA, link the licence and state modifications.

### Wikipedia

- Reuse guidance: https://www.mediawiki.org/wiki/Wikimedia_APIs/Content_reuse
- Licence: article text is generally available under CC BY-SA 4.0, subject to page-specific terms and exceptions.
- Status: no article prose or downloaded Wikipedia dataset is included. Do not copy text or adapt a Wikipedia-derived dataset without attribution and ShareAlike compliance.

### Queast Technology Taxonomy

- Source: https://technologies.quea.st/
- Licence shown for the current taxonomy release: CC BY-SA 4.0.
- Status: considered as a future reference; no taxonomy release is included. Check the selected release's licence and checksum before use.

## Open-source skill extraction libraries — not bundled

- [SkillNER](https://github.com/AnasAito/SkillNER) — MIT-licensed project. Not installed, copied or imported by this demo.
- [Nesta Skills Extractor](https://github.com/nestauk/ojd_daps_skills) — its public repository identifies an open-source Skills Extractor library. Verify the exact version's LICENSE file and the licences of its supported taxonomies/models before using or bundling it. Not installed, copied or imported by this demo.

## Adding a new source

Before adding a source, record its exact release/version, licence, source URL, download date, required attribution, modifications and any third-party restrictions. If a licence is unclear, do not include the material until permission is confirmed.
