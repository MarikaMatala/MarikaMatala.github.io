// KIELEN VAIHTO: lisää käännettävään HTML-elementtiin data-fi- ja data-en-attribuutit.
const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'fi';

// Päivittää kaikki tekstit valitulle kielelle ilman sivun uudelleenlatausta.
function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-fi][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  languageToggle.textContent = language === 'fi' ? 'EN ↗' : 'FI ↗';
  languageToggle.setAttribute('aria-label', language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi');
}

languageToggle.addEventListener('click', () => {
  setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
});

// Päivittää alatunnisteen vuosiluvun automaattisesti.
document.getElementById('year').textContent = new Date().getFullYear();