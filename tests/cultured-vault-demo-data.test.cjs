const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "The-Cultured-Vault-demo", "app.js");
const appSource = fs.readFileSync(appPath, "utf8");

function readBalancedArray(source, start) {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') inString = true;
    else if (character === "[") depth += 1;
    else if (character === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  throw new Error("Could not find the end of the catalogue array.");
}

function readAdditionalWorks() {
  const marker = "const additionalWorks = ";
  const markerIndex = appSource.indexOf(marker);
  assert.notEqual(markerIndex, -1, "additionalWorks dataset should exist");
  const arrayStart = appSource.indexOf("[", markerIndex);
  return JSON.parse(readBalancedArray(appSource, arrayStart));
}

test("the demo contains 550 uniquely identified catalogue works", () => {
  const objectIds = [...appSource.matchAll(/(?:id:|"id":)"([^"]+)"/g)]
    .map((match) => match[1]);
  const additionalIds = readAdditionalWorks().map((entry) => entry[0]);
  const allIds = [...objectIds, ...additionalIds];

  assert.equal(allIds.length, 550);
  assert.equal(new Set(allIds).size, allIds.length, "catalogue IDs must be unique");
});

test("additional sample entries do not carry pre-filled owner ratings", () => {
  const additionalWorks = readAdditionalWorks();

  assert.equal(additionalWorks.length, 100);
  assert.ok(additionalWorks.every((entry) => entry.length === 8));
  assert.match(
    appSource,
    /works\.push\(\.\.\.additionalWorks\.map\(\(\[id,title,creator,type,year,genres,country,community\]\) => \(\{\s*id,title,creator,type,year,genres,country,owner:0,community,ownerReview:""/
  );
  assert.match(
    appSource,
    /works\.forEach\(work => \{ work\.owner = 0; work\.ownerReview = ""; \}\);/
  );
});

test("the visible catalogue count and documentation agree with the dataset", () => {
  const html = fs.readFileSync(
    path.join(root, "The-Cultured-Vault-demo", "index.html"),
    "utf8"
  );
  const readme = fs.readFileSync(
    path.join(root, "The-Cultured-Vault-demo", "README.md"),
    "utf8"
  );
  const finnishReadme = fs.readFileSync(
    path.join(root, "The-Cultured-Vault-demo", "README.fi.md"),
    "utf8"
  );

  assert.match(html, /id="total-count">550</);
  assert.match(html, /Näytetään 550 teosta/);
  assert.match(html, /with 550 sample works/);
  assert.match(readme, /550-entry sample catalogue/);
  assert.match(readme, /536 additions \(550 entries total\)/);
  assert.match(finnishReadme, /550 teoksen esimerkkikatalogi/);
  assert.match(finnishReadme, /536 lisäystä \(yhteensä 550 teosta\)/);
});
