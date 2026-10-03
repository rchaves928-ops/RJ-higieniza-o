// Deferred initialization: all photos and controls exist before this runs.
(() => {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  const questions = document.querySelectorAll('[data-accordion] .faq__q');
  questions.forEach((button, index) => {
    const answer = button.nextElementSibling;
    if (!answer) return;
    button.id = 'faq-question-' + index;
    answer.id = 'faq-answer-' + index;
    button.setAttribute('aria-controls', answer.id);
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', button.id);
    button.addEventListener('click', () => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      questions.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        if (other.nextElementSibling) other.nextElementSibling.hidden = true;
        const icon = other.querySelector('.faq__icon');
        if (icon) icon.textContent = '+';
      });
      if (!wasOpen) {
        button.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        const icon = button.querySelector('.faq__icon');
        if (icon) icon.textContent = '–';
      }
    });
  });

  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImg');
  const closeButton = document.getElementById('lightboxClose');
  if (!dialog || !image || !closeButton) return;
  let opener = null;
  let previousOverflow = '';
  const closePhoto = () => {
    if (dialog.hidden) return;
    dialog.hidden = true;
    image.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
    if (opener) opener.focus();
  };
  document.querySelectorAll('.photo-open').forEach(button => {
    button.addEventListener('click', () => {
      const photo = button.querySelector('img');
      if (!photo) return;
      opener = button;
      previousOverflow = document.body.style.overflow;
      image.src = photo.currentSrc || photo.src;
      image.alt = photo.alt;
      dialog.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', closePhoto);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closePhoto();
  });
  document.addEventListener('keydown', event => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') closePhoto();
    if (event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus();
    }
  });
})();



