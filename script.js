// Portfolio interactions: language switch, responsive Android image gallery and footer year.
const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'fi';

function updateCarouselLabels(language) {
  document.querySelectorAll('[data-fi-label][data-en-label]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[language + 'Label']);
  });
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-fi][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  if (languageToggle) {
    languageToggle.textContent = language === 'fi' ? 'EN ↗' : 'FI ↗';
    languageToggle.setAttribute('aria-label', language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi');
  }
  updateCarouselLabels(language);
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
  });
}

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

const androidCarousel = document.getElementById('android-carousel');
const androidImage = document.getElementById('android-carousel-image');
const androidCounter = document.getElementById('android-counter');
let androidImageIndex = 0;

function showAndroidImage(index) {
  if (!androidImage || !androidCounter || !androidImages.length) return;
  androidImageIndex = (index + androidImages.length) % androidImages.length;
  const image = androidImages[androidImageIndex];
  androidImage.src = image.src;
  androidImage.alt = `${image.alt}, ${androidImageIndex + 1} / ${androidImages.length}`;
  androidCounter.textContent = `${androidImageIndex + 1} / ${androidImages.length}`;
}

if (androidCarousel) {
  androidCarousel.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.id === 'android-prev') showAndroidImage(androidImageIndex - 1);
    if (button.id === 'android-next') showAndroidImage(androidImageIndex + 1);
  });

  const keyboardStage = document.getElementById('android-carousel-stage');
  if (keyboardStage) {
    keyboardStage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showAndroidImage(androidImageIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showAndroidImage(androidImageIndex + 1);
      }
    });
  }

  let touchStartX = null;
  androidCarousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  androidCarousel.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) showAndroidImage(androidImageIndex + (deltaX < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });
}

updateCarouselLabels(currentLanguage);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
