# Optional backend — not implemented

The current Remote Job Fit demo is a browser-only static application. This directory is a planning placeholder for a possible future API/backend; it does not contain a working server.

## If you decide to build a backend

1. Choose a framework (for example, FastAPI or Node.js) and create its project files here.
2. Decide which data source or job API you are legally allowed to use.
3. Read the provider's official documentation, API terms, rate limits and attribution requirements.
4. Put local settings in `../.env` copied from `../.env.example`.
5. Add a backend-specific dependency manifest only after selecting the framework and versions.
6. Validate all incoming data and restrict CORS to the exact origins you operate.
7. Never return provider API keys or server secrets to browser code.
8. Do not store CVs or personal data unless there is a clear purpose, lawful basis, retention policy and appropriate security.
9. Add tests and document how to run the backend before connecting it to the public website.

## Example local setup

The values in `../.env.example` are fictional placeholders. Replace them locally with values from the official provider or service you have selected. Some public data APIs do not require an API key; do not invent one if the provider does not issue one.

No backend framework, database or third-party API is installed or configured by this README.
