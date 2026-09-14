document.addEventListener('DOMContentLoaded', () => {
  // 1. Limpiar el hash de la URL
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  // 2. Lógica del selector de idiomas
  const trigger = document.querySelector('.dropdown-trigger');
  const menu = document.querySelector('.dropdown-menu');
  const options = menu ? menu.querySelectorAll('li') : [];

  if (trigger && menu) {
    const path = window.location.pathname;
    const fileName = path.split('/').pop() || 'privacidad.html';
    
    // Mapeo de archivos según idioma
    const langMap = {
      'privacidad.html': { lang: 'es', targetEn: 'privacy.html', targetEs: 'privacidad.html' },
      'privacy.html':    { lang: 'en', targetEn: 'privacy.html', targetEs: 'privacidad.html' },
      'terminos.html':   { lang: 'es', targetEn: 'terms.html',   targetEs: 'terminos.html' },
      'terms.html':      { lang: 'en', targetEn: 'terms.html',   targetEs: 'terminos.html' },
      'ayuda.html':      { lang: 'es', targetEn: 'help.html',    targetEs: 'ayuda.html' },
      'help.html':       { lang: 'en', targetEn: 'help.html',    targetEs: 'ayuda.html' }
    };

    // Fallback a privacidad.html si no se reconoce
    const fileInfo = langMap[fileName] || langMap['privacidad.html'];
    const currentLang = fileInfo.lang;

    // Inicializar UI del selector
    options.forEach(opt => {
      if (opt.getAttribute('data-value') === currentLang) {
        opt.setAttribute('aria-selected', 'true');
        const span = trigger.querySelector('span');
        if (span) span.textContent = opt.textContent;
      } else {
        opt.setAttribute('aria-selected', 'false');
      }
    });

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-value');
        if (selectedLang !== currentLang) {
          window.location.href = selectedLang === 'en' ? fileInfo.targetEn : fileInfo.targetEs;
        } else {
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Lógica del formulario de contacto (ayuda / help)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : '';
      const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
      const message = document.getElementById('message') ? document.getElementById('message').value : '';
      
      const bodyText = `Nombre: ${name}\n\nMensaje:\n${message}`;
      
      window.location.href = `mailto:developer@idvia.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    });
  }
});
