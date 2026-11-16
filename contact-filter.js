/*
 * File purpose: Check contact-form text for abusive or discriminatory content.
 * Code structure: DOM elements, filter lists, helper functions, and event listeners.
 *
 * This file only checks the form content. The browser handles valid form submissions
 * using the form's normal HTML POST behaviour.
 */
(() => {
  // Find the form and the element used to display validation feedback.
  const form = document.querySelector('.contact-form');
  const feedback = document.getElementById('contact-form-feedback');

  // Stop here if this page does not contain the contact form.
  if (!form || !feedback) return;

  // Words and word fragments that should be blocked in form submissions.
  const blockedTerms = [
    'vittu', 'vitun', 'vittua', 'vittuil', 'perkele', 'saatana', 'saatanan', 'helvetti',
    'paska', 'paskan', 'paskaa', 'kusip', 'mulkk', 'runkk', 'runkkari', 'huora', 'huoran',
    'lutka', 'idiootti', 'kusipää', 'painu vittuun',
    'fuck', 'fucking', 'fucked', 'motherfucker', 'shit', 'bullshit', 'bitch', 'bastard',
    'asshole', 'arsehole', 'cunt', 'dickhead', 'slut', 'whore', 'retard',
    'nigger', 'nigga', 'faggot', 'kike', 'chink', 'spic', 'wetback', 'raghead',
    'scheisse', 'arschloch', 'hurensohn', 'schlampe', 'joder', 'mierda',
    'putain', 'connard', 'salope', 'merde', 'encule', 'stronzo', 'cazzo', 'vaffanculo',
    'knulla', 'jävel', 'helvete'
  ];

  // Harmful phrases are checked separately because they can contain several words.
  const abusivePhrases = [
    'kill all', 'go kill yourself', 'you should die', 'i will kill you',
    'heil hitler', 'white power', 'white supremac', 'racial supremac',
    'tapa itsesi', 'kuole pois', 'toivon että kuolet', 'painu vittuun'
  ];

  // Convert text into a consistent format before checking it.
  // This also helps detect some attempts to hide words with numbers or symbols.
  const normalize = (value) => {
    return value
      .toLocaleLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\\u036f]/g, '')
      .replace(/[0]/g, 'o')
      .replace(/[1!|]/g, 'i')
      .replace(/[3]/g, 'e')
      .replace(/[4@]/g, 'a')
      .replace(/[5$]/g, 's')
      .replace(/[7]/g, 't')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Return true when the text contains a blocked word or harmful phrase.
  function containsBlockedContent(value) {
    // Add spaces around the text so complete words can be checked separately.
    const normalized = ' ' + normalize(value) + ' ';

    const containsBlockedTerm = blockedTerms.some((term) => {
      const normalizedTerm = ' ' + normalize(term) + ' ';
      return normalized.includes(normalizedTerm);
    });

    const containsAbusivePhrase = abusivePhrases.some((phrase) => {
      return normalized.includes(normalize(phrase));
    });

    return containsBlockedTerm || containsAbusivePhrase;
  }

  // Check the name and message fields when the visitor submits the form.
  form.addEventListener('submit', (event) => {
    const name = form.elements.namedItem('name');
    const message = form.elements.namedItem('message');

    const hasBlockedContent = [name, message].some((field) => {
      return containsBlockedContent(field.value);
    });

    if (hasBlockedContent) {
      // Prevent the form from being sent when blocked content is found.
      event.preventDefault();

      // Show feedback in the same language as the current page.
      feedback.hidden = false;
      feedback.textContent = document.documentElement.lang.startsWith('en')
        ? 'Your message could not be sent. Please remove abusive or discriminatory content and try again.'
        : 'Viestiä ei voitu lähettää. Poista asiaton tai syrjivä sisältö ja yritä uudelleen.';

      // Move focus to the feedback so keyboard and screen reader users notice it.
      feedback.focus();
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // If the content is valid, the browser continues with the normal HTML POST submission.
  });

  // Hide the feedback message when the visitor starts editing the form again.
  form.addEventListener('input', () => {
    if (!feedback.hidden) {
      feedback.hidden = true;
    }
  });
})();
