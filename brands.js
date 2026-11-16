document.querySelectorAll('.logo-strip').forEach(strip => {
  const button = strip.querySelector('.brands-toggle');
  button.addEventListener('click', () => {
    const paused = strip.classList.toggle('is-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Resume animation ▶' : 'Pause animation Ⅱ';
  });
});
