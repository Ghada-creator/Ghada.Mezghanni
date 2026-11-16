document.querySelectorAll('.experience-bubble').forEach(button => {
  const front = button.querySelector('.bubble-front');
  const back = button.querySelector('.bubble-back');
  button.addEventListener('click', () => {
    const flipped = button.classList.toggle('is-flipped');
    button.setAttribute('aria-pressed', String(flipped));
    button.setAttribute('aria-label', (flipped ? 'Hide' : 'Show') + ' experience at ' + button.dataset.company);
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
  });
});
