# The Cultured Vault — demo installation

For the full setup guide, project explanation, architecture, file map, sample data format, privacy notes, troubleshooting and contribution guidance, read:

- [README — English](README.md)
- [README — suomeksi](README.fi.md)

## Android (including Samsung)

1. Open the published demo in Chrome over HTTPS.
2. Open the browser's three-dot menu.
3. Choose **Install app** or **Add to Home screen**.
4. Confirm the installation.

Samsung Internet may offer an **Add page to** or **Home screen** option depending on its version. Chrome is recommended for the install prompt.

## iPhone and iPad

1. Open the published demo in Safari over HTTPS.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Confirm the name and tap **Add**.

iOS uses Safari's Share menu for this flow. Chromium's JavaScript install prompt is not available in Safari.

## Important limitations

This is a static PWA prototype, not a native APK/IPA or an App Store / Google Play release. It has no backend, user accounts, shared reviews or cloud synchronisation. Personal demo reviews remain in the current browser's local storage.

The first visit needs an internet connection so the service worker can cache the app shell. Basic offline loading is available after a successful initial load.
