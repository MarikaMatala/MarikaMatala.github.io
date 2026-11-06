# The Cultured Vault — installable browser demo

This directory contains the installable Progressive Web App (PWA) demo for The Cultured Vault. It is a static front-end prototype and does not require an application server beyond static HTTPS hosting.

## Install on Android (including Samsung)

1. Open the demo URL in Chrome.
2. Use the browser menu and choose **Install app** or **Add to Home screen**.
3. Confirm the installation. The app opens in its own window.

Samsung Internet may offer **Add page to** / **Home screen** depending on version. Chrome is recommended for the install prompt.

## Install on iPhone or iPad

1. Open the demo URL in **Safari**.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Confirm the name and tap **Add**.

On iOS, installation is performed through Safari's Share menu; the web install prompt used by Chromium browsers is not available.

## Included PWA capabilities

- Web app manifest with standalone display mode and app icons.
- Service worker scoped only to this demo directory.
- Basic offline app-shell caching after the first successful visit.
- Responsive layout for phone, tablet and desktop.
- Finnish and English interface.
- Browser-local demo ratings stored in local storage.

## Current limitations

This is not a native Android APK or an iOS App Store application. It has no backend, user accounts, shared reviews, authentication or cloud synchronization. Local demo reviews remain on the device/browser where they were created. Clearing browser storage can remove them.

The service worker and install features require HTTPS. GitHub Pages provides HTTPS automatically for the published site. After a new deployment, close and reopen the installed app if an older cached version is still displayed.
