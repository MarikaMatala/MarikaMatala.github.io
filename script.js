const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'fi';

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

document.getElementById('year').textContent = new Date().getFullYear();