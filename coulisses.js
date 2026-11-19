(() => {
  const links = Array.from(document.querySelectorAll('.bts-open'));
  const dialog = document.querySelector('.bts-lightbox');
  if (!links.length || !dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('.bts-large');
  const counter = dialog.querySelector('.bts-count');
  const caption = dialog.querySelector('.bts-lightbox-caption');
  let current = 0;
  let opener = null;
  const show = index => {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    counter.textContent = `${current + 1} / ${links.length}`;
  };
  links.forEach((link,index) => link.addEventListener('click', event => {
    event.preventDefault(); opener = link; show(index); dialog.showModal();
    document.documentElement.classList.add('bts-modal-open');
  }));
  dialog.querySelector('.bts-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.bts-previous').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.bts-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {event.preventDefault();show(current - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault();show(current + 1);}
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('bts-modal-open');
    if (opener) opener.focus();
    image.removeAttribute('src');
  });
})();
