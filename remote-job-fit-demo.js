// Browser-only prototype. Do not add network requests, analytics, or persistent storage here.
const form = document.getElementById("fit-form");
const results = document.getElementById("results");
const languageButton = document.getElementById("demo-language");
let language = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "fi";
let lastEvaluated = [];
const vocabulary = window.RemoteJobFitVocabulary;


// CV import is intentionally local-only. It extracts known keywords for review;
// it does not upload, save, or transmit CV contents.
const cvFileInput = document.getElementById("cv-file");
const cvTextInput = document.getElementById("cv-text");
const importStatus = document.getElementById("import-status");
const importButton = document.getElementById("import-cv");
const linkedinInput = document.getElementById("linkedin-url");

function extractKnownSkills(text) { return vocabulary.extractSkills(text, language); }
cvFileInput.addEventListener("change", async () => {
  const file = cvFileInput.files && cvFileInput.files[0];
  if (!file) return;
  if (file.size > 1024 * 1024) {
    importStatus.textContent = language === "fi" ? "Tiedosto on liian suuri. Enimmäiskoko on 1 Mt." : "File is too large. Maximum size is 1 MB.";
    cvFileInput.value = "";
    return;
  }
  if (!/\.(txt|md|text)$/i.test(file.name)) {
    importStatus.textContent = language === "fi" ? "Valitse .txt- tai .md-tiedosto. PDF- ja Word-tiedostoista voit kopioida tekstin kenttään." : "Choose a .txt or .md file. For PDF and Word files, copy the text into the field.";
    cvFileInput.value = "";
    return;
  }
  cvTextInput.value = await file.text();
  importStatus.textContent = language === "fi" ? "Tiedosto luettu paikallisesti. Tarkista teksti ja tunnista osaamiset." : "File read locally. Review the text and extract skills.";
});
importButton.addEventListener("click", () => {
  const text = cvTextInput.value.trim();
  if (!text) {
    importStatus.textContent = language === "fi" ? "Liitä ensin CV:n tai LinkedIn-profiilin tekstisisältö." : "Paste your CV or LinkedIn profile text first.";
    return;
  }
  const found = extractKnownSkills(text);
  if (!found.length) {
    importStatus.textContent = language === "fi" ? "Tunnettuja osaamissanoja ei löytynyt. Voit lisätä osaamiset käsin." : "No recognized skill keywords found. You can add skills manually.";
    return;
  }
  const current = terms(document.getElementById("skills").value);
  document.getElementById("skills").value = [...new Set([...current, ...found.map(item => item.label)])].join(", ");
  const titleInput = document.getElementById("target-title");
  if (!titleInput.value.trim()) {
    const foundRoles = vocabulary.detectRoles(text, language);
    if (foundRoles.length) titleInput.value = foundRoles[0];
  }
  importStatus.textContent = language === "fi"
    ? "Tunnistetut osaamiset lisättiin osaamiskenttään (" + found.length + "). Tarkista ja muokkaa listaa ennen arviointia."
    : "Extracted skills added to the skills field (" + found.length + "). Review and edit the list before calculating.";
});
linkedinInput.addEventListener("change", () => {
  const value = linkedinInput.value.trim();
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !/(^|\.)linkedin\.com$/i.test(url.hostname)) throw new Error("invalid");
    importStatus.textContent = language === "fi"
      ? "LinkedIn-linkki on lisätty viitteeksi. Profiilitietoja ei haeta automaattisesti; kopioi haluamasi profiiliteksti CV-kenttään."
      : "LinkedIn URL added as a reference. Profile data is not fetched automatically; paste the profile text into the CV field.";
  } catch {
    importStatus.textContent = language === "fi" ? "Anna kelvollinen LinkedIn-osoite muodossa https://www.linkedin.com/in/..." : "Enter a valid LinkedIn URL such as https://www.linkedin.com/in/...";
  }
});

const sampleRoles = [
  { title: "Junior Frontend Developer", company: "Illustrative sample role", text: "Build responsive web interfaces with HTML CSS JavaScript TypeScript React accessibility Git and REST API integrations. Collaborate with designers and backend developers." },
  { title: "Junior Full-Stack Developer", company: "Illustrative sample role", text: "Develop frontend and backend features using JavaScript TypeScript Node.js REST APIs SQL MySQL testing Git and responsive design. Support application development and database integration." },
  { title: "Junior Backend Developer", company: "Illustrative sample role", text: "Implement backend services and REST APIs with Python Node.js SQL MySQL MongoDB JSON automated testing and Git. Work with data models and API integrations." },
  { title: "IT Support Specialist", company: "Illustrative sample role", text: "Provide technical support, troubleshoot Windows and Microsoft 365 issues, manage service desk requests, support users, hardware, software, networking and documentation." },
  { title: "QA Tester", company: "Illustrative sample role", text: "Test web applications, write test cases, report bugs, perform manual testing and basic automation using test plans, API testing, Postman, Jira and clear documentation." },
  { title: "Junior Data Analyst", company: "Illustrative sample role", text: "Clean and analyse datasets, write SQL queries, prepare reports and dashboards, use Excel, Python, data visualisation and communicate insights to stakeholders." },
  { title: "Cybersecurity Analyst", company: "Illustrative sample role", text: "Support information security, review vulnerabilities, understand web application security, OWASP, risk assessment, access control, incident documentation and security awareness." },
  { title: "UI/UX Designer", company: "Illustrative sample role", text: "Create accessible user interfaces, user flows and prototypes. Work with UI UX Figma wireframes responsive design usability visual design and user research." },
  { title: "Graphic Designer", company: "Illustrative sample role", text: "Create visual identities, layouts and digital assets using graphic design, typography, Adobe Photoshop, Illustrator, InDesign, Canva and brand guidelines." },
  { title: "Digital Content Producer", company: "Illustrative sample role", text: "Plan and produce digital content, photography, video, audio, editing, social media assets, storytelling, content calendars and multimedia materials." },
  { title: "Digital Marketing Specialist", company: "Illustrative sample role", text: "Plan digital campaigns, manage social media, create content, apply SEO, analyse web analytics, email marketing, campaign reporting and audience engagement." },
  { title: "Communications Specialist", company: "Illustrative sample role", text: "Create clear internal and external communications, write and edit articles, web content, newsletters and social posts, coordinate communication activities and maintain consistent tone." },
  { title: "Technical Writer", company: "Illustrative sample role", text: "Write and maintain technical documentation, user guides, API documentation, release notes and knowledge base articles. Explain technical concepts clearly and collaborate with developers." },
  { title: "Multimedia Producer", company: "Illustrative sample role", text: "Produce multimedia content using video production, photography, audio editing, video editing, motion graphics, storyboarding, lighting and digital publishing." },
  { title: "Digital Project Coordinator", company: "Illustrative sample role", text: "Coordinate digital projects, track tasks and deadlines, maintain documentation, communicate with stakeholders, support Agile and Scrum workflows and collaborate across teams." },
  { title: "Motion Graphics Designer", company: "Illustrative sample role", text: "Create animated graphics, explainers and campaign assets. Use Adobe After Effects, Photoshop, Illustrator, typography, layout, visual storytelling, storyboards and brand systems." },
  { title: "3D Animator / 3D Generalist", company: "Illustrative sample role", text: "Create 3D assets and animated scenes. Skills may include Blender or Maya, modelling, UV mapping, texturing, rigging, character animation, lighting, rendering, compositing and showreel presentation." },
  { title: "Junior 3D Artist", company: "Illustrative sample role", text: "Build 3D models, textures and scenes for animation or interactive media. Understand modelling, topology, UVs, materials, lighting, rendering, Blender, Maya and feedback-based iteration." },
  { title: "Lighting and Compositing Artist", company: "Illustrative sample role", text: "Prepare lighting, render passes and compositing for animated scenes. Work with Blender or Maya, render settings, colour, image sequences, compositing tools, visual continuity and production pipelines." },
  { title: "Video and AV Producer", company: "Illustrative sample role", text: "Plan and produce video, webcast and live audiovisual content. Skills include camera operation, lighting, audio, editing, streaming, Premiere Pro, After Effects, production planning and troubleshooting." },
  { title: "Content and Communications Specialist", company: "Illustrative sample role", text: "Plan editorial content and communication across channels. Write and edit articles, social media posts, newsletters and web content; create graphics and videos; manage content calendars, stakeholder feedback and brand voice." },
  { title: "Product Marketing Specialist", company: "Illustrative sample role", text: "Create product messaging and launch content, coordinate campaigns, research audiences, work with SEO and analytics, use CRM or HubSpot, prepare sales materials and collaborate with product and sales teams." },
  { title: "Social Media Content Creator", company: "Illustrative sample role", text: "Plan and produce platform-specific content for LinkedIn, Instagram and Facebook. Create short videos, graphics and copy, maintain a content calendar, understand brand tone and review engagement analytics." },
  { title: "Junior ICT Systems Specialist", company: "Illustrative sample role", text: "Support ICT systems and users, troubleshoot incidents, document solutions and assist with Microsoft 365, Windows, Linux, networks, identity and access management, ticketing systems and basic cloud services." }
];

const copy = {
  fi: {
    missing:"Lisää vähintään yksi osaaminen tai liitä työpaikkailmoitus.",
    custom:"Oma ilmoitusteksti", customCompany:"Käyttäjän lisäämä teksti",
    greenTitle:"🟢 Pakollinen osaaminen löytyy profiilistasi",
    redTitle:"🔴 Pakollinen osaaminen puuttuu profiilistasi",
    yellowTitle:"🟡 Edut ja toivottavat lisäosaamiset (eivät pakollisia)",
    noneMatched:"Ei tunnistettuja osumia pakollisiin osaamisiin.",
    noneMissing:"Kaikki tunnistetut pakolliset osaamiset löytyvät profiilistasi.",
    noneOptional:"Ilmoituksesta ei tunnistettu erikseen eduksi katsottavia osaamisia.",
    found:"Löytyy profiilistasi", learn:"Ei vielä profiilissasi",
    learning:"Voit kehittää puuttuvia pakollisia taitoja oppimistavoitteina. Etsi luotettava kurssi tai dokumentaatio, tee pieni käytännön harjoitus ja lisää taito profiiliisi vasta, kun hallitset sen.",
    caveat:"Luokittelu perustuu ilmoituksen sanamuotoihin ja tunnistettuun sanastoon. Tarkista aina alkuperäinen ilmoitus: demo ei voi varmasti päätellä kaikkia vaatimuksia eikä arvioida todellista osaamistasoa.",
    customNote:"Arvio perustuu vain tähän liitettyyn tekstiin."
  },
  en: {
    missing:"Add at least one skill or paste a job description.",
    custom:"Your pasted job description", customCompany:"User-provided text",
    greenTitle:"🟢 Required skills found in your profile",
    redTitle:"🔴 Required skills missing from your profile",
    yellowTitle:"🟡 Preferred and useful additional skills (not mandatory)",
    noneMatched:"No recognised matches among required skills.",
    noneMissing:"All recognised required skills are listed in your profile.",
    noneOptional:"No separately preferred or optional skills were detected in the job description.",
    found:"Found in your profile", learn:"Not listed in your profile yet",
    learning:"You can turn missing required skills into learning goals. Find reliable training or documentation, complete a small practical exercise, and add a skill to your profile only when you can use it confidently.",
    caveat:"Classification is based on wording in the job description and the recognised vocabulary. Always check the original listing: the demo cannot reliably infer every requirement or assess actual proficiency.",
    customNote:"This estimate uses only the text you pasted."
  }
};

const roleTitlesFi = {
  "Junior Frontend Developer": "Junior-tason frontend-kehittäjä",
  "Junior Full-Stack Developer": "Junior-tason full-stack-kehittäjä",
  "Junior Backend Developer": "Junior-tason backend-kehittäjä",
  "IT Support Specialist": "IT-tukiasiantuntija",
  "QA Tester": "Ohjelmistotestaaja",
  "Junior Data Analyst": "Junior-tason data-analyytikko",
  "Cybersecurity Analyst": "Tietoturva-analyytikko",
  "UI/UX Designer": "Käyttöliittymä- ja UX-suunnittelija",
  "Graphic Designer": "Graafinen suunnittelija",
  "Digital Content Producer": "Digitaalisen sisällön tuottaja",
  "Digital Marketing Specialist": "Digitaalisen markkinoinnin asiantuntija",
  "Communications Specialist": "Viestinnän asiantuntija",
  "Technical Writer": "Tekninen kirjoittaja",
  "Multimedia Producer": "Multimediatuottaja",
  "Digital Project Coordinator": "Digitaalisten projektien koordinaattori",
  "Motion Graphics Designer": "Liikegrafiikan suunnittelija",
  "3D Animator / 3D Generalist": "3D-animaattori / 3D-generalisti",
  "Junior 3D Artist": "Junior-tason 3D-artisti",
  "Lighting and Compositing Artist": "Valaistus- ja kompositioartisti",
  "Video and AV Producer": "Video- ja AV-tuottaja",
  "Content and Communications Specialist": "Sisällön ja viestinnän asiantuntija",
  "Product Marketing Specialist": "Tuotemarkkinoinnin asiantuntija",
  "Social Media Content Creator": "Sosiaalisen median sisällöntuottaja",
  "Junior ICT Systems Specialist": "Junior-tason ICT-järjestelmäasiantuntija"
};

function terms(value) {
  const values = [...new Set(value.toLowerCase().split(/[,;\n]+/).map(item => item.trim()).filter(item => item.length > 1))];
  return [...new Set(vocabulary.normalizeSkillTerms(values))];
}
function tokenise(value) {
  return value.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ").split(/\s+/).filter(word => word.length > 1);
}
function scoreRole(role, skills, targetTitle, mustHave, excluded) {
  const searchable = (role.title + " " + role.text).toLowerCase();
  const detectedTerms = vocabulary.extractSkills(searchable).map(item => item.canonical.toLowerCase());
  const matchesTerm = term => vocabulary.containsPhrase(searchable, term) || detectedTerms.includes(term);
  const excludedMatches = excluded.filter(matchesTerm);
  const matchedSkills = skills.filter(matchesTerm);
  const titleTerms = tokenise(vocabulary.normalizeRoleTitle(targetTitle)).filter(term => term.length > 2);
  const matchedTitle = titleTerms.filter(term => vocabulary.containsPhrase(searchable, term) || detectedTerms.includes(term));
  const matchedMust = mustHave.filter(matchesTerm);
  const { matched: matchedRequirements, missing: missingRequirements, optional: optionalRequirements } = vocabulary.compareSkills(skills, role.title + " " + role.text, language);
  const components = [];
  if (skills.length) components.push({ value: matchedSkills.length / skills.length, weight: 70 });
  if (titleTerms.length) components.push({ value: matchedTitle.length / titleTerms.length, weight: 20 });
  if (mustHave.length) components.push({ value: matchedMust.length / mustHave.length, weight: 10 });
  const totalWeight = components.reduce((sum, item) => sum + item.weight, 0);
  const weightedScore = totalWeight
    ? components.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight
    : 0;
  let score = Math.round(weightedScore * 100);
  if (excludedMatches.length) score = Math.max(0, score - 35);
  return { score: Math.min(100, score), matchedSkills, matchedTitle, matchedMust, excludedMatches, matchedRequirements, missingRequirements, optionalRequirements };
}
function addText(parent, tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  parent.appendChild(element);
  return element;
}
function renderRole(role, result, isCustom = false) {
  const card = document.createElement("article");
  card.className = "result-card";
  const top = document.createElement("div");
  top.className = "result-top";
  const heading = document.createElement("div");
  addText(heading, "h3", "", language === "fi" && !isCustom ? (roleTitlesFi[role.title] || role.title) : role.title);
  const companyLabel = isCustom
    ? copy[language].customCompany
    : language === "fi" ? "Esimerkkitehtävä" : "Illustrative sample role";
  addText(heading, "p", "", companyLabel);
  top.appendChild(heading);
  addText(top, "span", "score", result.score + "%");
  card.appendChild(top);
  const meter = document.createElement("progress");
  meter.className = "meter";
  meter.max = 100;
  meter.value = result.score;
  meter.setAttribute("aria-label", (language === "fi" ? "Sopivuuspisteet " : "Match score ") + result.score + "%");
  card.appendChild(meter);
  function addSkillGroup(className, title, items, emptyText, showStatus=false) {
    const section = document.createElement("section");
    section.className = "skill-group " + className;
    addText(section, "h4", "", title);
    if (items.length) {
      const list = document.createElement("ul");
      items.forEach(item => {
        const li = document.createElement("li");
        addText(li, "span", "skill-name", item.label);
        if (showStatus) addText(li, "span", "skill-status", item.found ? copy[language].found : copy[language].learn);
        list.appendChild(li);
      });
      section.appendChild(list);
    } else addText(section, "p", "skill-empty", emptyText);
    card.appendChild(section);
  }
  addSkillGroup("skill-match", copy[language].greenTitle, result.matchedRequirements, copy[language].noneMatched);
  addSkillGroup("skill-missing", copy[language].redTitle, result.missingRequirements, copy[language].noneMissing);
  addSkillGroup("skill-optional", copy[language].yellowTitle, result.optionalRequirements, copy[language].noneOptional, true);
  if (result.missingRequirements.length) addText(card, "p", "learning-tip", copy[language].learning);
  addText(card, "p", "analysis-caveat", copy[language].caveat);
  if (result.excludedMatches.length) addText(card, "p", "matched", (language === "fi" ? "Poissulkevat osumat: " : "Excluded terms found: ") + result.excludedMatches.join(", "));
  if (isCustom) addText(card, "p", "matched", copy[language].customNote);
  return card;
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const skills = terms(document.getElementById("skills").value);
  const targetTitle = document.getElementById("target-title").value.trim();
  const mustHave = terms(document.getElementById("must-have").value);
  const excluded = terms(document.getElementById("exclude").value);
  const customText = document.getElementById("custom-job").value.trim();
  if (!skills.length && !customText) {
    lastEvaluated = [];
    results.replaceChildren();
    addText(results, "p", "empty-state", copy[language].missing);
    return;
  }
  const roles = [...sampleRoles];
  if (customText) {
    const firstLine = customText.split(/\r?\n/).map(line => line.trim()).find(Boolean) || copy[language].custom;
    roles.unshift({ title: firstLine.slice(0, 100), company: copy[language].customCompany, text: customText });
  }
  lastEvaluated = roles.map(role => ({ role, result: scoreRole(role, skills, targetTitle, mustHave, excluded), custom: role.company === copy[language].customCompany }));
  lastEvaluated.sort((a,b) => b.result.score - a.result.score);
  results.replaceChildren(...lastEvaluated.map(item => renderRole(item.role, item.result, item.custom)));
});
document.getElementById("reset-demo").addEventListener("click", () => {
  cvTextInput.value = "";
  cvFileInput.value = "";
  linkedinInput.value = "";
  importStatus.textContent = "";
  window.setTimeout(() => {
    lastEvaluated = [];
    results.replaceChildren();
    addText(results, "p", "empty-state", language === "fi" ? "Kentät tyhjennetty. Täytä osaamisesi ja kokeile uudelleen." : "Fields cleared. Enter your skills and try again.");
  }, 0);
});
languageButton.addEventListener("click", () => {
  applyDemoLanguage(language === "fi" ? "en" : "fi");
});


// Keep the embedded demo language aligned with the portfolio page.
function applyDemoLanguage(nextLanguage) {
  if (nextLanguage !== "fi" && nextLanguage !== "en") return;
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-fi][data-en]").forEach(element => { element.textContent = element.dataset[language]; });
  document.querySelectorAll("[data-fi-placeholder][data-en-placeholder]").forEach(element => { element.placeholder = element.dataset[language + "Placeholder"]; });
  if (languageButton) languageButton.setAttribute("aria-label", language === "fi" ? "Vaihda englanniksi" : "Switch to Finnish");
  if (lastEvaluated.length) {
    results.replaceChildren(...lastEvaluated.map(item => renderRole(item.role, item.result, item.custom)));
  } else {
    const state = results.querySelector(".empty-state");
    if (state) state.textContent = language === "fi" ? "Täytä osaamisesi ja paina “Arvioi sopivuus”." : "Enter your skills and select “Calculate match”.";
  }
}
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "portfolio-language") applyDemoLanguage(event.data.language);
});
window.addEventListener("load", () => {
  try { window.parent.postMessage({ type: "remote-job-fit-language-request" }, "*"); } catch (error) { /* standalone demo */ }
});
