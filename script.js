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
  try { localStorage.setItem('portfolio-language', language); } catch (error) { /* storage may be disabled */ }
  document.documentElement.lang = language;
  document.querySelectorAll('[data-fi][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  if (languageToggle) {
    const label = languageToggle.querySelector('.language-label');
    if (label) label.textContent = language === 'fi' ? 'ENGLISH' : 'SUOMEKSI';
    languageToggle.setAttribute('aria-label', language === 'fi' ? 'Vaihda sivusto englanniksi' : 'Switch the website to Finnish');
  }
  updateCarouselLabels(language);
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
  });
}

try {
  if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en');
} catch (error) { /* storage may be disabled */ }

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


const oopBrowser = document.getElementById('oop-browser');
if (oopBrowser) {
  const panels = Array.from(oopBrowser.querySelectorAll('.oop-sample-panel'));
  const selector = document.getElementById('oop-sample-select');
  const counter = document.getElementById('oop-counter');
  const previous = document.getElementById('oop-prev');
  const next = document.getElementById('oop-next');
  let activeSample = 0;

  function showOopSample(index) {
    if (!panels.length) return;
    activeSample = Math.max(0, Math.min(index, panels.length - 1));
    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activeSample;
    });
    if (selector) selector.value = String(activeSample);
    if (counter) counter.textContent = `${activeSample + 1} / ${panels.length}`;
    if (previous) previous.disabled = activeSample === 0;
    if (next) next.disabled = activeSample === panels.length - 1;
  }

  if (selector) selector.addEventListener('change', () => showOopSample(Number(selector.value)));
  if (previous) previous.addEventListener('click', () => showOopSample(activeSample - 1));
  if (next) next.addEventListener('click', () => showOopSample(activeSample + 1));
  showOopSample(0);
}


// Accessible image enlargement: activate any portfolio image to open it, then
// click the enlarged image or backdrop (or press Escape) to return to the page.
(function setupImageLightbox() {
  const images = Array.from(document.querySelectorAll('main img'));
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.hidden = true;
  overlay.tabIndex = -1;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Suurenna kuva / Enlarge image');

  const help = document.createElement('span');
  help.className = 'lightbox-help';
  const enlarged = document.createElement('img');
  enlarged.alt = '';
  const rights = document.createElement('div');
  rights.className = 'lightbox-rights';
  rights.innerHTML = '<strong>© MM · Tekijänoikeudet / Copyright</strong><span class="rights-copy-fi">Koodit ja visuaaliset työt ovat itse tekemiäni harrastusprojekteja tai opintojen harjoitustöitä, ellei toisin mainita. Kuvat ovat omiani, ellei kuvan tai projektin yhteydessä toisin ilmoiteta. Yhteistyö- ja kolmansien osapuolten materiaalien oikeudet säilyvät niiden omilla oikeudenhaltijoilla. Älä käytä materiaaleja uudelleen ilman lupaa.</span><span class="rights-copy-en" hidden>Code and visual work are created by me as personal projects or coursework unless otherwise credited. Images are my own unless stated otherwise alongside the image or project. Rights to collaborative and third-party materials remain with their respective owners. Please do not reuse materials without permission.</span>';
  overlay.append(help, enlarged, rights);
  document.body.appendChild(overlay);

  let previousFocus = null;

  function openImage(image) {
    previousFocus = image;
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt || 'Portfolio image';
    help.textContent = currentLanguage === 'fi'
      ? 'Sulje napsauttamalla kuvaa tai taustaa · ESC'
      : 'Click image or backdrop to close · ESC';
    rights.querySelector('.rights-copy-fi').hidden = currentLanguage !== 'fi';
    rights.querySelector('.rights-copy-en').hidden = currentLanguage !== 'en';
    overlay.hidden = false;
    overlay.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeImage() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    enlarged.removeAttribute('src');
    document.body.style.overflow = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  images.forEach((image) => {
    image.classList.add('image-zoomable');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-haspopup', 'dialog');
    image.setAttribute('aria-label', (image.alt || 'Portfolio image') + ' — enlarge image');
  });

  document.addEventListener('click', (event) => {
    const image = event.target.closest('main img.image-zoomable');
    if (image) {
      // Keep image links inside the accessible lightbox instead of also opening a second tab.
      event.preventDefault();
      openImage(image);
      return;
    }
    if (!overlay.hidden && (event.target === overlay || event.target === enlarged || event.target === help)) {
      closeImage();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!overlay.hidden && event.key === 'Escape') {
      event.preventDefault();
      closeImage();
      return;
    }
    const image = event.target.closest && event.target.closest('main img.image-zoomable');
    if (image && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openImage(image);
    }
  });
})();

// Keep the saved language selected above; Finnish is the default in the HTML.
updateCarouselLabels(currentLanguage);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


// Scroll-triggered reveals: subtle, staggered motion without an animation library.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll(
    '.section-heading, .about-copy, .interlude-photo, .project-card, .contact-section .contact-links'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  revealItems.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', (index % 3) * 90 + 'ms');
  });

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      activeObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -45px 0px'
  });

  revealItems.forEach((element) => observer.observe(element));
})();
