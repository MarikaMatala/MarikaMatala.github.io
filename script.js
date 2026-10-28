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
  updateCarouselLabels(language);
}

languageToggle.addEventListener('click', () => {
  setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
});

// Android-kurssitöiden kuvakaruselli.
const androidImages = [
  { src: 'images/android-kurssin%20tehtavien%20kuvia/1.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/12.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/2.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/3-1.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/3-2.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/4.png', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-1.JPG', alt: 'Android-kurssin harjoitustyön valokuva' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-11.JPG', alt: 'Android-kurssin harjoitustyön valokuva' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-111.PNG', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-112.PNG', alt: 'Android-kurssin harjoitustyön kuvakaappaus' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-2.JPG', alt: 'Android-kurssin harjoitustyön valokuva' }
];
const androidImage = document.getElementById('android-carousel-image');
const androidCounter = document.getElementById('android-counter');
const androidPrevious = document.getElementById('android-prev');
const androidNext = document.getElementById('android-next');
let androidImageIndex = 0;

function showAndroidImage(index) {
  if (!androidImage || !androidCounter) return;
  androidImageIndex = (index + androidImages.length) % androidImages.length;
  const image = androidImages[androidImageIndex];
  androidImage.src = image.src;
  androidImage.alt = `${image.alt} ${androidImageIndex + 1} / ${androidImages.length}`;
  androidCounter.textContent = `${androidImageIndex + 1} / ${androidImages.length}`;
}

if (androidPrevious && androidNext) {
  androidPrevious.addEventListener('click', () => showAndroidImage(androidImageIndex - 1));
  androidNext.addEventListener('click', () => showAndroidImage(androidImageIndex + 1));
}

// Päivittää karusellin painikkeiden nimet valitun kielen mukaan.
function updateCarouselLabels(language) {
  document.querySelectorAll('[data-fi-label][data-en-label]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[language + 'Label']);
  });
}
updateCarouselLabels(currentLanguage);

// Päivittää alatunnisteen vuosiluvun automaattisesti.
document.getElementById('year').textContent = new Date().getFullYear();