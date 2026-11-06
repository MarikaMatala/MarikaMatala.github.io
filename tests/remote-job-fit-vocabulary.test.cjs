const test = require("node:test");
const assert = require("node:assert/strict");
const vocabulary = require("../remote-job-fit-vocabulary.js");

test("recognises Finnish and English skills, including common Finnish inflections",()=>{
 const fi=vocabulary.extractSkills("Olen tehnyt sovelluskehitystä, käyttöliittymäsuunnittelua ja tietoturvaa. Käytän Reactia ja JavaScriptiä.","fi");
 const en=vocabulary.extractSkills("I have experience in application development, UI/UX design and cybersecurity.","en");
 for(const term of ["Application development","UI/UX design","Cybersecurity","React","JavaScript"]) assert.ok(fi.some(x=>x.canonical===term));
 assert.ok(en.some(x=>x.canonical==="Application development"));
});
test("recognises software and programming languages",()=>{
 const found=vocabulary.extractSkills("JavaScript, TypeScript, React, GitHub and Docker");
 const terms=found.map(x=>x.canonical);
 for(const term of ["JavaScript","TypeScript","React","GitHub","Docker"]) assert.ok(terms.includes(term));
});
test("avoids Java partial match inside JavaScript",()=>{
 assert.equal(vocabulary.extractSkills("JavaScript developer").some(x=>x.canonical==="Java"),false);
 assert.equal(vocabulary.extractSkills("Java developer").some(x=>x.canonical==="Java"),true);
});
test("recognises Finnish and English job titles",()=>{
 assert.ok(vocabulary.detectRoles("Haen frontend-kehittäjän tehtävää.","fi").includes("Frontend-kehittäjä"));
 assert.ok(vocabulary.detectRoles("I work as a communications specialist.","en").includes("Communications Specialist"));
 assert.ok(vocabulary.detectRoles("Kokemusta koulunkäynninohjaajan työstä.","fi").includes("Koulunkäynninohjaaja"));
});
test("normalises Finnish manual input to canonical terms",()=>{
 assert.deepEqual(vocabulary.normalizeSkillTerms(["Sovelluskehitys","tietoturva","React"]),["application development","cybersecurity","react"]);
});

test("recognises Golang without matching the ordinary verb go",()=>{
 assert.equal(vocabulary.extractSkills("I want to go home").some(x=>x.canonical==="Go"),false);
 assert.equal(vocabulary.extractSkills("Golang developer").some(x=>x.canonical==="Go"),true);
});
test("maps Finnish job titles to canonical English titles",()=>{
 assert.equal(vocabulary.normalizeRoleTitle("Frontend-kehittäjä"),"frontend developer");
});

test("uses word boundaries and Finnish inflections",()=>{
 assert.equal(vocabulary.containsPhrase("JavaScript developer","Java"),false);
 assert.equal(vocabulary.containsPhrase("Reactia käytetään projektissa","React"),true);
});

test("recognises software and roles from additional fields",()=>{
 const terms=vocabulary.extractSkills("I use Unity, Godot, ZBrush and GitHub Copilot").map(x=>x.canonical);
 for(const term of ["Unity","Godot","ZBrush","GitHub Copilot"]) assert.ok(terms.includes(term));
 assert.ok(vocabulary.detectRoles("AI engineer").includes("AI Engineer"));
 assert.ok(vocabulary.detectRoles("peliohjelmoijan tehtävä","fi").includes("Peliohjelmoija"));
});

test("compares candidate skills with job requirements and reports gaps in Finnish and English",()=>{
 const en=vocabulary.compareSkills(["HTML","React"],"Required: HTML, React, TypeScript and accessibility","en");
 assert.deepEqual(en.matched.map(x=>x.canonical),["HTML","React"]);
 assert.deepEqual(en.missing.map(x=>x.canonical),["TypeScript","Accessibility"]);
 const fi=vocabulary.compareSkills(["Sovelluskehitys"],"Odotamme sovelluskehityksen, Reactin ja tietoturvan osaamista","fi");
 assert.deepEqual(fi.matched.map(x=>x.canonical),["Application development"]);
 assert.deepEqual(fi.missing.map(x=>x.canonical),["React","Cybersecurity"]);
});
test("does not report ambiguous one-letter language names as automatic gaps",()=>{
 const result=vocabulary.compareSkills([],"C, R and Go are mentioned in ordinary text","en");
 assert.equal(result.missing.some(x=>["C","R","Go"].includes(x.canonical)),false);
});

test("separates matched required, missing required and optional skills",()=>{
 const result=vocabulary.compareSkills(
  ["HTML","React"],
  "Required: HTML and React. TypeScript is essential. Nice to have: Figma and accessibility.",
  "en"
 );
 assert.deepEqual(result.matched.map(x=>x.canonical),["HTML","React"]);
 assert.deepEqual(result.missing.map(x=>x.canonical),["TypeScript"]);
 assert.deepEqual(result.optional.map(x=>x.canonical),["Figma","Accessibility"]);
 assert.equal(result.optional[0].found,false);
});
test("recognises Finnish optional markers and keeps explicit mandatory requirements red",()=>{
 const result=vocabulary.compareSkills(
  ["React"],
  "Reactin osaaminen vaaditaan. Figma katsotaan eduksi ja saavutettavuusosaaminen on plussaa.",
  "fi"
 );
 assert.deepEqual(result.matched.map(x=>x.canonical),["React"]);
 assert.deepEqual(result.missing.map(x=>x.canonical),[]);
 assert.deepEqual(result.optional.map(x=>x.canonical),["Figma","Accessibility"]);
});
