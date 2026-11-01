/* Basic multilingual contact-form moderation.
   This client-side filter blocks common profanity, slurs and abusive phrases.
   It is a deterrent, not a complete moderation or translation system. */
(() => {
  const form = document.querySelector('.contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !feedback) return;

  const blockedTerms = [
    // Finnish profanity and abusive language
    'vittu','vitun','vittua','vittuil','perkele','saatana','saatanan','helvetti',
    'paska','paskan','paskaa','kusip','mulkk','runkk','runkkari','huora','huoran',
    'lutka','idiootti','kusipää','painu vittuun',
    // English profanity and common abusive slurs
    'fuck','fucking','fucked','motherfucker','shit','bullshit','bitch','bastard',
    'asshole','arsehole','cunt','dickhead','slut','whore','retard',
    'nigger','nigga','faggot','kike','chink','spic','wetback','raghead',
    // Common profanity in several other languages
    'scheisse','arschloch','hurensohn','schlampe','joder','mierda',
    'putain','connard','salope','merde','encule','stronzo','cazzo','vaffanculo',
    'knulla','jävel','helvete'
  ];

  const abusivePhrases = [
    'kill all','go kill yourself','you should die','i will kill you',
    'heil hitler','white power','white supremac','racial supremac',
    'tapa itsesi','kuole pois','toivon että kuolet','painu vittuun'
  ];

  const normalize = (value) => value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const termPatterns = blockedTerms.map((term) => {
    const escaped = term.split(/\s+/).map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
    return new RegExp('(^|\\s)' + escaped + '($|\\s)', 'iu');
  });

  function containsBlockedContent(value) {
    const normalized = normalize(value);
    if (!normalized) return false;
    return termPatterns.some((pattern) => pattern.test(normalized)) ||
      abusivePhrases.some((phrase) => normalized.includes(normalize(phrase)));
  }

  form.addEventListener('submit', (event) => {
    const fields = ['name', 'subject', 'message']
      .map((name) => form.elements.namedItem(name))
      .filter(Boolean);

    if (fields.some((field) => containsBlockedContent(field.value))) {
      event.preventDefault();
      feedback.hidden = false;
      feedback.textContent = document.documentElement.lang.startsWith('en')
        ? 'Your message could not be sent. Please remove profanity, insults, discriminatory language, threats or other abusive content and try again.'
        : 'Viestiä ei voitu lähettää. Poista kirosanat, loukkaukset, syrjivä kielenkäyttö, uhkaukset ja muu asiaton sisältö ja yritä uudelleen.';
      feedback.focus();
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      feedback.hidden = true;
      feedback.textContent = '';
    }
  });

  form.addEventListener('input', () => {
    if (!feedback.hidden) {
      feedback.hidden = true;
      feedback.textContent = '';
    }
  });
})();
