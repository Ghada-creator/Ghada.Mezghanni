/* À COMPLÉTER : un objet par publication.
   image : chemin de votre capture (ex. "posts/post-01.jpg").
   url : lien Instagram complet du post ou du reel.
   Ne laissez pas image vide après avoir ajouté une véritable publication.
   Les emplacements vides servent uniquement à préparer la galerie. */
const instagramPosts = [
  { title: "Your first publication", category: "Preview · to be added", image: "", url: "", alt: "" },
  { title: "Your second publication", category: "Preview · to be added", image: "", url: "", alt: "" },
  { title: "Your third publication", category: "Preview · to be added", image: "", url: "", alt: "" },
  { title: "Your fourth publication", category: "Preview · to be added", image: "", url: "", alt: "" },
  { title: "Your fifth publication", category: "Preview · to be added", image: "", url: "", alt: "" }
];

(() => {
  const stage = document.getElementById('ig-stage');
  if (!stage) return;
  const counter = document.getElementById('ig-counter');
  const prev = document.getElementById('ig-prev');
  const next = document.getElementById('ig-next');
  let active = 0;
  const make = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };
  const instagramUrl = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && ['instagram.com','www.instagram.com'].includes(url.hostname) ? url.href : null;
    } catch { return null; }
  };
  const cards = instagramPosts.map((post, index) => {
    const card = make('article', 'ig-card');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${index + 1} of ${instagramPosts.length}: ${post.title}`);
    const top = make('div', 'ig-card-top');
    const logo = make('img'); logo.src = 'logo-gm.png'; logo.alt = ''; logo.width = 29; logo.height = 29;
    top.append(logo, make('span', '', 'GHADA / SELECTED CONTENT'));
    const media = make('div', 'ig-media');
    const placeholder = () => {
      media.replaceChildren();
      const empty = make('div', 'ig-placeholder');
      empty.append(make('span', 'ig-placeholder-number', String(index + 1).padStart(2,'0')), make('span', '', 'YOUR INSTAGRAM PUBLICATION HERE'));
      media.append(empty);
    };
    if (post.image) {
      const image = make('img'); image.src = post.image; image.alt = post.alt || post.title;
      image.addEventListener('error', placeholder, {once:true}); media.append(image);
    } else placeholder();
    card.append(top, media, make('p', 'ig-category', post.category), make('h3', '', post.title));
    const url = instagramUrl(post.url);
    if (url) {
      const link = make('a', 'ig-action', 'View on Instagram ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
    } else card.append(make('span', 'ig-pending', 'Image and Instagram link to be added'));
    const select = make('button', 'ig-select'); select.type = 'button'; select.setAttribute('aria-label', 'Select ' + post.title);
    select.addEventListener('click', () => { active = index; render(); });
    card.append(select); stage.append(card);
    return {card, select};
  });
  function render() {
    const n = cards.length;
    cards.forEach(({card, select}, index) => {
      let distance = (index - active + n) % n;
      if (distance > n / 2) distance -= n;
      card.dataset.position = String(distance);
      const current = distance === 0;
      const visible = Math.abs(distance) <= (matchMedia('(max-width:650px)').matches ? 1 : 2);
      card.inert = !visible;
      card.setAttribute('aria-hidden', String(!visible));
      select.hidden = current;
      const link = card.querySelector('.ig-action');
      if (link) link.tabIndex = current ? 0 : -1;
    });
    counter.textContent = n ? `${String(active + 1).padStart(2,'0')} / ${String(n).padStart(2,'0')}` : 'No publications yet';
    prev.disabled = next.disabled = n < 2;
  }
  prev.addEventListener('click', () => { active = (active - 1 + cards.length) % cards.length; render(); });
  next.addEventListener('click', () => { active = (active + 1) % cards.length; render(); });
  const mobile = matchMedia('(max-width:650px)'); mobile.addEventListener('change', render);
  render();
})();
