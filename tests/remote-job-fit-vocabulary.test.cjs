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
