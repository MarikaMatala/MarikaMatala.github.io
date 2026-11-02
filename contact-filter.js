/* Lightweight contact-form content filter. Valid submissions use native HTML POST. */
(() => {
  const form = document.querySelector('.contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !feedback) return;

  const blockedTerms = [
    'vittu','vitun','vittua','vittuil','perkele','saatana','saatanan','helvetti',
    'paska','paskan','paskaa','kusip','mulkk','runkk','runkkari','huora','huoran',
    'lutka','idiootti','kusipää','painu vittuun',
    'fuck','fucking','fucked','motherfucker','shit','bullshit','bitch','bastard',
    'asshole','arsehole','cunt','dickhead','slut','whore','retard',
    'nigger','nigga','faggot','kike','chink','spic','wetback','raghead',
    'scheisse','arschloch','hurensohn','schlampe','joder','mierda',
    'putain','connard','salope','merde','encule','stronzo','cazzo','vaffanculo',
    'knulla','jävel','helvete'
  ];
  const abusivePhrases = [
    'kill all','go kill yourself','you should die','i will kill you',
    'heil hitler','white power','white supremac','racial supremac',
    'tapa itsesi','kuole pois','toivon että kuolet','painu vittuun'
  ];

  const normalize = (value) => value.toLocaleLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[0]/g, 'o').replace(/[1!|]/g, 'i').replace(/[3]/g, 'e')
    .replace(/[4@]/g, 'a').replace(/[5$]/g, 's').replace(/[7]/g, 't')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();

  function containsBlockedContent(value) {
    const normalized = ' ' + normalize(value) + ' ';
    return blockedTerms.some((term) => normalized.includes(' ' + normalize(term) + ' ')) ||
      abusivePhrases.some((phrase) => normalized.includes(normalize(phrase)));
  }

  form.addEventListener('submit', (event) => {
    const name = form.elements.namedItem('name');
    const message = form.elements.namedItem('message');
    if ([name, message].some((field) => containsBlockedContent(field.value))) {
      event.preventDefault();
      feedback.hidden = false;
      feedback.textContent = document.documentElement.lang.startsWith('en')
        ? 'Your message could not be sent. Please remove abusive or discriminatory content and try again.'
        : 'Viestiä ei voitu lähettää. Poista asiaton tai syrjivä sisältö ja yritä uudelleen.';
      feedback.focus();
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    // Otherwise, do not prevent the browser's normal POST submission.
  });

  form.addEventListener('input', () => {
    if (!feedback.hidden) feedback.hidden = true;
  });
})();
