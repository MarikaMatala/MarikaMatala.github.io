// Browser-only prototype. Do not add network requests, analytics, or persistent storage here.
const form = document.getElementById("fit-form");
const results = document.getElementById("results");
const languageButton = document.getElementById("demo-language");
let language = "fi";

const sampleRoles = [
  { title: "Junior Frontend Developer", company: "Illustrative sample role", text: "Build responsive web interfaces with HTML CSS JavaScript TypeScript React accessibility Git and REST API integrations. Collaborate with designers and backend developers." },
  { title: "Junior Full-Stack Developer", company: "Illustrative sample role", text: "Develop frontend and backend features using JavaScript TypeScript Node.js REST APIs SQL MySQL testing Git and responsive design. Support application development and database integration." },
  { title: "Junior Backend Developer", company: "Illustrative sample role", text: "Implement backend services and REST APIs with Python Node.js SQL MySQL MongoDB JSON automated testing and Git. Work with data models and API integrations." },
  { title: "UI/UX and Web Designer", company: "Illustrative sample role", text: "Create accessible user interfaces and prototypes. Work with UI UX Figma responsive design HTML CSS usability visual design and frontend developers." }
];

const copy = {
  fi: { missing:"Lisää vähintään yksi osaaminen tai liitä työpaikkailmoitus.", custom:"Oma ilmoitusteksti", customCompany:"Käyttäjän lisäämä teksti", matched:"Osuneet hakusanat:", noMatch:"Ei suoria hakusanaosumia. Kokeile lisätä osaamisia tai muokata ilmoituksen tekstiä.", title:"Sopivuusvertailu", clear:"Tyhjennä kentät" },
  en: { missing:"Add at least one skill or paste a job description.", custom:"Your pasted job description", customCompany:"User-provided text", matched:"Matched keywords:", noMatch:"No direct keyword matches. Try adding skills or adjusting the job description.", title:"Job fit comparison", clear:"Clear fields" }
};

function terms(value) {
  return [...new Set(value.toLowerCase().split(/[,;\n]+/).map(item => item.trim()).filter(item => item.length > 1))];
}
function tokenise(value) {
  return value.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ").split(/\s+/).filter(word => word.length > 1);
}
function scoreRole(role, skills, targetTitle, mustHave, excluded) {
  const searchable = (role.title + " " + role.text).toLowerCase();
  const excludedMatches = excluded.filter(term => searchable.includes(term));
  const matchedSkills = skills.filter(term => searchable.includes(term));
  const titleTerms = tokenise(targetTitle).filter(term => term.length > 2);
  const matchedTitle = titleTerms.filter(term => (role.title + " " + role.text).toLowerCase().includes(term));
  const matchedMust = mustHave.filter(term => searchable.includes(term));
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
  return { score: Math.min(100, score), matchedSkills, matchedTitle, matchedMust, excludedMatches };
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
  addText(heading, "h3", "", role.title);
  addText(heading, "p", "", role.company);
  top.appendChild(heading);
  addText(top, "span", "score", result.score + "%");
  card.appendChild(top);
  const meter = document.createElement("progress");
  meter.className = "meter";
  meter.max = 100;
  meter.value = result.score;
  meter.setAttribute("aria-label", (language === "fi" ? "Sopivuuspisteet " : "Match score ") + result.score + "%");
  card.appendChild(meter);
  const matched = [...result.matchedSkills, ...result.matchedTitle, ...result.matchedMust];
  addText(card, "p", "matched", matched.length ? copy[language].matched + " " + [...new Set(matched)].join(", ") : copy[language].noMatch);
  if (result.excludedMatches.length) addText(card, "p", "matched", (language === "fi" ? "Poissulkevat osumat: " : "Excluded terms found: ") + result.excludedMatches.join(", "));
  if (isCustom) addText(card, "p", "matched", language === "fi" ? "Arvio perustuu vain tähän liitettyyn tekstiin." : "This estimate uses only the text you pasted.");
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
    results.replaceChildren();
    addText(results, "p", "empty-state", copy[language].missing);
    return;
  }
  const roles = [...sampleRoles];
  if (customText) {
    const firstLine = customText.split(/\r?\n/).map(line => line.trim()).find(Boolean) || copy[language].custom;
    roles.unshift({ title: firstLine.slice(0, 100), company: copy[language].customCompany, text: customText });
  }
  const evaluated = roles.map(role => ({ role, result: scoreRole(role, skills, targetTitle, mustHave, excluded), custom: role.company === copy[language].customCompany }));
  evaluated.sort((a,b) => b.result.score - a.result.score);
  results.replaceChildren(...evaluated.map(item => renderRole(item.role, item.result, item.custom)));
});
document.getElementById("reset-demo").addEventListener("click", () => {
  window.setTimeout(() => {
    results.replaceChildren();
    addText(results, "p", "empty-state", language === "fi" ? "Kentät tyhjennetty. Täytä osaamisesi ja kokeile uudelleen." : "Fields cleared. Enter your skills and try again.");
  }, 0);
});
languageButton.addEventListener("click", () => {
  language = language === "fi" ? "en" : "fi";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-fi][data-en]").forEach(element => { element.textContent = element.dataset[language]; });
  document.querySelectorAll("[data-fi-placeholder][data-en-placeholder]").forEach(element => { element.placeholder = element.dataset[language + "Placeholder"]; });
  const state = results.querySelector(".empty-state");
  if (state) state.textContent = language === "fi" ? "Täytä osaamisesi ja paina “Arvioi sopivuus”." : "Enter your skills and select “Calculate match”.";
});
