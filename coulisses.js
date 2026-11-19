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

/* Galerie horizontale : conserve les légendes existantes. */
(() => {
  const gallery = document.querySelector('.bts-gallery');
  if (!gallery) return;
  const photos = Array.from(gallery.querySelectorAll('.bts-photo'));
  if (!photos.length) return;
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', 'Galerie de photos de coulisses');
  gallery.tabIndex = 0;
  const controls = document.createElement('div'); controls.className = 'bts-scroll-controls';
  const prev = document.createElement('button'); prev.type = 'button'; prev.textContent = '←'; prev.setAttribute('aria-label','Photo précédente');
  const count = document.createElement('span'); count.className = 'bts-scroll-count'; count.setAttribute('aria-live','polite');
  const next = document.createElement('button'); next.type = 'button'; next.textContent = '→'; next.setAttribute('aria-label','Photo suivante');
  controls.append(prev,count,next); gallery.after(controls);
  let current = 0;
  const behavior = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const go = index => {
    index = Math.max(0, Math.min(photos.length - 1,index));
    const photo = photos[index];
    const target = photo.offsetLeft - gallery.clientWidth / 2 + photo.offsetWidth / 2;
    gallery.scrollTo({left:target,behavior:behavior()});
  };
  const update = () => {
    const box = gallery.getBoundingClientRect();
    const center = box.left + gallery.clientWidth / 2;
    let distance = Infinity;
    photos.forEach((photo,index) => {
      const rect = photo.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - center);
      if (delta < distance) {distance = delta;current = index;}
    });
    photos.forEach((photo,index) => photo.classList.toggle('bts-current',index === current));
    count.textContent = `${current + 1} / ${photos.length}`;
    prev.disabled = current === 0; next.disabled = current === photos.length - 1;
  };
  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {event.preventDefault();go(current - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault();go(current + 1);}
  });
  let pending = false;
  gallery.addEventListener('scroll', () => {
    if (pending) return; pending = true;
    requestAnimationFrame(() => {pending = false;update();});
  }, {passive:true});
  new ResizeObserver(update).observe(gallery);
  gallery.addEventListener('focusin', event => {
    const photo = event.target.closest('.bts-photo');
    if (photo) go(photos.indexOf(photo));
  });
  update();
})();
