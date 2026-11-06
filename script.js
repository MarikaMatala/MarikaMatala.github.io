// Portfolio interactions: language switch, responsive Android image gallery and interactive C# examples.
const languageToggle = document.getElementById('language-toggle');
const primaryNavigation = document.getElementById('primary-navigation');
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
  const pageTitle = document.querySelector('title');
  if (pageTitle) {
    const localizedTitle = pageTitle.dataset[language + 'Title'];
    if (localizedTitle) pageTitle.textContent = localizedTitle;
  }
  document.querySelectorAll('[data-fi][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  if (languageToggle) {
    const label = languageToggle.querySelector('.language-label');
    if (label) label.textContent = 'FIN / ENG';
    languageToggle.setAttribute('aria-label', language === 'fi' ? 'Sivuston kieli: suomi. Vaihda englanniksi.' : 'Website language: English. Switch to Finnish.');
    languageToggle.setAttribute('title', language === 'fi' ? 'Suomi / English' : 'Finnish / English');
  }
  if (primaryNavigation) primaryNavigation.setAttribute('aria-label', language === 'fi' ? 'Päänavigaatio' : 'Main navigation');
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle && menuToggle.getAttribute('aria-expanded') !== 'true') menuToggle.setAttribute('aria-label', language === 'fi' ? 'Avaa navigaatiovalikko' : 'Open navigation menu');
  updateCarouselLabels(language);
  document.querySelectorAll('[data-fi-alt][data-en-alt]').forEach((image) => {
    image.setAttribute('alt', image.dataset[language + 'Alt']);
  });
  if (androidImage) showAndroidImage(androidImageIndex);
  document.querySelectorAll('iframe[data-fi-title][data-en-title]').forEach((frame) => {
    frame.title = frame.dataset[language + 'Title'];
  });
  document.querySelectorAll('.remote-job-fit-embed iframe').forEach((frame) => {
    try { frame.contentWindow.postMessage({ type: 'portfolio-language', language }, '*'); } catch (error) { /* iframe may not be ready */ }
  });
}

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'remote-job-fit-language-request') {
    document.querySelectorAll('.remote-job-fit-embed iframe').forEach((frame) => {
      if (frame.contentWindow === event.source) {
        try { frame.contentWindow.postMessage({ type: 'portfolio-language', language: currentLanguage }, '*'); } catch (error) { /* iframe may have closed */ }
      }
    });
  }
});

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
  });
}

try {
  if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en');
} catch (error) { /* storage may be disabled */ }

const androidImages = [
  { src: 'images/android-kurssin%20tehtavien%20kuvia/1.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/12.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/2.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/3-1.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/3-2.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/4.png', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-1.JPG', altFi: 'Android-kurssin harjoitustyön valokuva', altEn: 'Photo from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-11.JPG', altFi: 'Android-kurssin harjoitustyön valokuva', altEn: 'Photo from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-111.PNG', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-112.PNG', altFi: 'Android-kurssin harjoitustyön kuvakaappaus', altEn: 'Screenshot from an Android course exercise' },
  { src: 'images/android-kurssin%20tehtavien%20kuvia/kuva-2.JPG', altFi: 'Android-kurssin harjoitustyön valokuva', altEn: 'Photo from an Android course exercise' }
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
  const localizedAlt = currentLanguage === 'fi' ? image.altFi : image.altEn;
  androidImage.alt = `${localizedAlt}, ${androidImageIndex + 1} / ${androidImages.length}`;
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

  const closeButton = document.createElement('button');
  closeButton.className = 'lightbox-close';
  closeButton.type = 'button';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'Sulje suurennettu kuva');
  const help = document.createElement('span');
  help.className = 'lightbox-help';
  const enlarged = document.createElement('img');
  enlarged.alt = '';
  const rights = document.createElement('div');
  rights.className = 'lightbox-rights';
  rights.innerHTML = '<strong>© MM · Tekijänoikeudet / Copyright</strong><span class="rights-copy-fi">Koodit ja visuaaliset työt ovat itse tekemiäni harrastusprojekteja tai opintojen harjoitustöitä, ellei toisin mainita. Kuvat ovat omiani, ellei kuvan tai projektin yhteydessä toisin ilmoiteta. Yhteistyö- ja kolmansien osapuolten materiaalien oikeudet säilyvät niiden omilla oikeudenhaltijoilla. Älä käytä materiaaleja uudelleen ilman lupaa.</span><span class="rights-copy-en" hidden>Code and visual work are created by me as personal projects or coursework unless otherwise credited. Images are my own unless stated otherwise alongside the image or project. Rights to collaborative and third-party materials remain with their respective owners. Please do not reuse materials without permission.</span>';
  overlay.append(closeButton, help, enlarged, rights);
  document.body.appendChild(overlay);

  let previousFocus = null;

  function openImage(image) {
    previousFocus = image;
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt || 'Portfolio image';
    help.textContent = currentLanguage === 'fi'
      ? 'Sulje-painikkeella tai painamalla ESC'
      : 'Use the Close button or press ESC';
    closeButton.setAttribute('aria-label', currentLanguage === 'fi' ? 'Sulje suurennettu kuva' : 'Close enlarged image');
    rights.querySelector('.rights-copy-fi').hidden = currentLanguage !== 'fi';
    rights.querySelector('.rights-copy-en').hidden = currentLanguage !== 'en';
    overlay.hidden = false;
    closeButton.focus();
    document.body.style.overflow = 'hidden';
  }

  closeButton.addEventListener('click', closeImage);

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
    if (!overlay.hidden && event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus();
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


// Accessible responsive navigation for tablet and mobile layouts.
(() => {
  const toggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('primary-navigation');
  if (!toggle || !navigation) return;

  const closeMenu = (returnFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-label', currentLanguage === 'fi' ? 'Avaa navigaatiovalikko' : 'Open navigation menu');
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    navigation.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-label', opening
      ? (currentLanguage === 'fi' ? 'Sulje navigaatiovalikko' : 'Close navigation menu')
      : (currentLanguage === 'fi' ? 'Avaa navigaatiovalikko' : 'Open navigation menu'));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();


// Backend coursework browser: five selectable panels with previous/next navigation.
const backendBrowser = document.getElementById('backend-browser');
if (backendBrowser) {
  const panels = Array.from(backendBrowser.querySelectorAll('[data-backend-sample]'));
  const selector = document.getElementById('backend-sample-select');
  const counter = document.getElementById('backend-counter');
  const previous = document.getElementById('backend-prev');
  const next = document.getElementById('backend-next');
  let activeSample = 0;

  function showBackendSample(index) {
    if (!panels.length) return;
    const requestedIndex = Number(index);
    if (!Number.isFinite(requestedIndex)) return;
    activeSample = Math.max(0, Math.min(requestedIndex, panels.length - 1));
    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activeSample;
    });
    if (selector) selector.value = String(activeSample);
    if (counter) counter.textContent = `${activeSample + 1} / ${panels.length}`;
    if (previous) previous.disabled = activeSample === 0;
    if (next) next.disabled = activeSample === panels.length - 1;
  }

  if (selector) {
    selector.addEventListener('change', () => showBackendSample(selector.value));
  }
  if (previous) previous.addEventListener('click', () => showBackendSample(activeSample - 1));
  if (next) next.addEventListener('click', () => showBackendSample(activeSample + 1));
  showBackendSample(0);
}
