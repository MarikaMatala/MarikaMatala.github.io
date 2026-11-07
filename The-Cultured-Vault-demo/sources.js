/* English-only source register. */
(() => {
  document.documentElement.lang = "en";
  document.querySelectorAll("[data-en]").forEach(element => {
    if (element.querySelector("span, em")) {
      const template = document.createElement("template");
      template.innerHTML = element.dataset.en;
      element.replaceChildren(template.content.cloneNode(true));
    } else {
      element.textContent = element.dataset.en;
    }
  });
})();
