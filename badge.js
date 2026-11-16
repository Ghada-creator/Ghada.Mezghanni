/* Survol souris, bouton tactile et clavier ; aucun module externe. */
(() => {
  document.querySelectorAll('[data-flip-badge]').forEach(stage => {
    const card = stage.querySelector('.creator-badge');
    const button = stage.querySelector('.badge-toggle');
    const front = stage.querySelector('.badge-front');
    const back = stage.querySelector('.badge-back');
    let flipped = false;
    const show = value => {
      flipped = value;
      card.classList.toggle('is-flipped', value);
      front.setAttribute('aria-hidden', String(value));
      back.setAttribute('aria-hidden', String(!value));
      front.inert = value;
      back.inert = !value;
      button.setAttribute('aria-pressed', String(value));
      button.textContent = value ? 'View profile ↻' : 'View skills ↻';
    };
    card.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) show(true);
    });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') show(false);
    });
    button.addEventListener('click', () => show(!flipped));
    stage.addEventListener('keydown', event => {
      if (event.key === 'Escape') show(false);
    });
    show(false);
  });
})();
