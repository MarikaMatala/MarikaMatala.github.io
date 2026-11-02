/* Contact form moderation and AJAX delivery through FormSubmit. */
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

  function showFeedback(message, isError = false) {
    feedback.hidden = false;
    feedback.textContent = message;
    feedback.setAttribute('role', isError ? 'alert' : 'status');
    feedback.focus();
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.elements.namedItem('name');
    const message = form.elements.namedItem('message');
    if ([name, message].some((field) => containsBlockedContent(field.value))) {
      showFeedback(document.documentElement.lang.startsWith('en')
        ? 'Your message could not be sent. Please remove abusive or discriminatory content and try again.'
        : 'Viestiä ei voitu lähettää. Poista asiaton tai syrjivä sisältö ja yritä uudelleen.', true);
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    const label = submitButton ? submitButton.innerHTML : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.textContent = document.documentElement.lang.startsWith('en') ? 'Sending…' : 'Lähetetään…';
    }
    feedback.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      const result = await response.json();
      // FormSubmit can return HTTP 200 even when it rejects a submission.
      if (String(result.success) !== 'true') {
        throw new Error(result.message || 'The form service did not accept the message.');
      }
      showFeedback(document.documentElement.lang.startsWith('en')
        ? 'Thank you! Your message was sent successfully.'
        : 'Kiitos! Viestisi lähetettiin onnistuneesti.');
      form.reset();
    } catch (error) {
      const detail = error && error.message ? error.message : '';
      const activation = /activat/i.test(detail);
      showFeedback(document.documentElement.lang.startsWith('en')
        ? (activation
          ? 'The form needs to be activated first. Please check the inbox and spam folder of the receiving email address and confirm the FormSubmit activation email. Then try again.'
          : 'The message could not be sent. Please try again later or contact me directly by email.')
        : (activation
          ? 'Lomake vaatii vielä käyttöönoton vahvistamisen. Tarkista sähköpostin saapuneet- ja roskapostikansiot ja vahvista FormSubmitin aktivointiviesti. Yritä sen jälkeen uudelleen.'
          : 'Viestin lähetys ei onnistunut. Yritä myöhemmin uudelleen tai ota yhteyttä suoraan sähköpostitse.'), true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        submitButton.innerHTML = label;
      }
    }
  });

  form.addEventListener('input', () => {
    if (!feedback.hidden) feedback.hidden = true;
  });
})();
