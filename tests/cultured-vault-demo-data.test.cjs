// CODE MAP / COMMENTING GUIDE
// File purpose: Automaattiset testit Cultured Vault -demon tietueiden määrälle, rakenteelle ja yksilöllisyydelle.
// Read from top to bottom: settings and helper functions come first, followed by tests or checks.

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
const demoPath = path.join(root, "The-Cultured-Vault-demo");
const appSource = fs.readFileSync(path.join(demoPath, "app.js"), "utf8");

// FUNCTION SECTION START: readBalancedArray.
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

// FUNCTION SECTION START: readAdditionalWorks.
// FUNCTION SECTION END: readBalancedArray. The next section starts at the next definition or at the end of the file.
function readAdditionalWorks() {
  const marker = "const additionalWorks = ";
  const markerIndex = appSource.indexOf(marker);
  assert.notEqual(markerIndex, -1, "additionalWorks dataset should exist");
  const arrayStart = appSource.indexOf("[", markerIndex);
  return JSON.parse(readBalancedArray(appSource, arrayStart));
}

test("the demo contains 1,000 uniquely identified catalogue works", () => {
  const objectIds = [...appSource.matchAll(/(?:id:|"id":)"([^"]+)"/g)]
    .map((match) => match[1]);
  const additionalIds = readAdditionalWorks().map((entry) => entry[0]);
  const allIds = [...objectIds, ...additionalIds];

  assert.equal(objectIds.length, 900, "the primary catalogue should contain 900 works");
  assert.equal(additionalIds.length, 100, "the additional catalogue should contain 100 works");
  assert.equal(allIds.length, 1000, "the complete catalogue should contain 1,000 works");
  assert.equal(new Set(allIds).size, allIds.length, "catalogue IDs must be unique");
});

test("additional sample entries do not carry pre-filled owner ratings", () => {
  const additionalWorks = readAdditionalWorks();

  assert.equal(additionalWorks.length, 100);
  assert.ok(additionalWorks.every((entry) => entry.length === 7));
  assert.match(
    appSource,
    /works\.push\(\.\.\.additionalWorks\.map\(\(\[id,title,creator,type,year,genres,country\]\) => \(\{\s*id,title,creator,type,year,genres,country,owner:0,ownerReview:""/
  );
  assert.match(
    appSource,
    /works\.forEach\(work => \{ work\.owner = 0; work\.ownerReview = ""; \}\);/
  );
});

test("the visible catalogue count and English documentation agree with the dataset", () => {
  const html = fs.readFileSync(path.join(demoPath, "index.html"), "utf8");
  const readme = fs.readFileSync(path.join(demoPath, "README.md"), "utf8");

  assert.match(html, /id="total-count">1,000</);
  assert.match(html, /data-en="works in catalogue"/);
  assert.match(readme, /catalogue of 1,000 works/);
  assert.doesNotMatch(readme, /550-entry sample catalogue|536 additions \(550 entries total\)/);
});

// FUNCTION SECTION END: readAdditionalWorks. The next section starts at the next definition or at the end of the file.