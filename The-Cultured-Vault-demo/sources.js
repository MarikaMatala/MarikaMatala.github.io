/* Bilingual controls for the source-register page. */
(() => {
  let language = "fi";
  const button = document.getElementById("sources-language");
  function setLanguage(next) {
    if (next !== "fi" && next !== "en") return;
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-fi][data-en]").forEach(element => {
      if (element.querySelector("span, em")) {
        const template = document.createElement("template");
        template.innerHTML = element.dataset[language];
        element.replaceChildren(template.content.cloneNode(true));
      } else {
        element.textContent = element.dataset[language];
      }
    });
    button.setAttribute("aria-label", language === "fi" ? "Switch to English" : "Vaihda suomeksi");
  }
  button.addEventListener("click", () => setLanguage(language === "fi" ? "en" : "fi"));
})();
