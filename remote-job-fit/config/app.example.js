/*
 * FICTIONAL CONFIGURATION TEMPLATE — NOT LOADED BY THE CURRENT DEMO.
 *
 * The GitHub Pages demo is browser-only and does not need this file.
 * Copy and adapt it only if you create a separate local backend.
 *
 * Replace example values with settings for services you have chosen.
 * Never place real API keys, passwords, access tokens or personal data here.
 * Keep secrets in an untracked local .env file or a secure secret manager.
 */

module.exports = {
  // Local address for a backend you run yourself.
  host: "127.0.0.1",

  // Example port; check that it is available on your computer.
  port: 8000,

  // Choose fi or en as the default interface language.
  defaultLanguage: "en",

  // Keep external job search disabled until a provider and its terms are reviewed.
  externalJobSearchEnabled: false,

  // Reserved placeholder. Replace only with the official endpoint of your chosen provider.
  jobsApiBaseUrl: "https://example.invalid/api",

  // Read the actual key from process.env in a backend implementation.
  // Do not hard-code a real key in this file.
  jobsApiKeyEnvironmentVariable: "JOBS_API_KEY"
};
