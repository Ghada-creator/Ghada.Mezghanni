/* Vos 12 liens sont intégrés dans l’ordre fourni.
   Complétez brand avec le nom exact de chaque marque.
   Le champ brand remplace le titre et le libellé en haut de la carte.
   Ne modifiez pas les liens si vous souhaitez conserver cet ordre. */
const instagramPosts = [
  {
    "url": "https://www.instagram.com/p/DfZfT2qRmva/?knvt=MWIxbTNvbW9iZnlrcQ%3D%3D",
    "brand": "Dawlati UAE"
  },
  {
    "url": "https://www.instagram.com/reels/DMFLIMVK4dN/",
    "brand": "Give way"
  },
  {
    "url": "https://www.instagram.com/p/DePGP6kjf_B/?dmpr=dWdvZ283ZWZpdzBw",
    "brand": "Dawlati UAE"
  },
  {
    "url": "https://www.instagram.com/p/DfhZh53CHc8/?dmpr=bHZnamdkdDhzb2Zy",
    "brand": "YLA Metal"
  },
  {
    "url": "https://www.instagram.com/p/DfW0QvPlTTW/?evlk=MTQ4NWFzemh1NmpqNQ%3D%3D",
    "brand": "YLA Metal"
  },
  {
    "url": "https://www.instagram.com/p/DfHPkI5CJOq/",
    "brand": "YLA Metal"
  },
  {
    "url": "https://www.instagram.com/p/DfHPkI5CJOq/?hvrq=MjhreHFxZjlucTJw",
    "brand": "YLA Metal"
  },


  {
    "url": "https://www.instagram.com/p/DdcNmMdFBYl/?evlk=MTBpbnY2MnY2czBwYg%3D%3D",
    "brand": "JOUBIJOUX"
  },
  {
    "url": "https://www.instagram.com/p/DdZOLWCirYV/?dmpr=MWpna2xzbnFmaW02MQ%3D%3D",
    "brand": "JOUBIJOUX"
  },
  {
    "url": "https://www.instagram.com/p/DfmnwCXkcqb/?bqrl=aWZkdm16Mmdzdjhy",
    "brand": "Ember Automotive"
  },
  {
    "url": "https://www.instagram.com/p/Dfj-fTclhBd/?bqrl=YjBxazd5dm1jbzM1",
    "brand": "Ember Automotive"
  },
  {
    "url": "https://www.instagram.com/p/CyVg7Y8I0im/?avpt=ZXVkbTd6c2YxZ25t",
    "brand": "Al wow tunisia"
  },
  {
    "url": "https://www.instagram.com/p/CyIjncVoXW_/?jplx=MW9wM2E5dTM1ZWhs",
    "brand": "Al wow tunisia"
  }
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
  const cards = instagramPosts.map((entry, index) => {
    const rawUrl = typeof entry === "string" ? entry : entry.url;
    const brand = typeof entry === "object" && typeof entry.brand === "string" ? entry.brand.trim() : "";
    const validUrl = instagramUrl(rawUrl);
    let permalink = null;
    if (validUrl) {
      const parsed = new URL(validUrl);
      const match = parsed.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
      if (match) permalink = 'https://www.instagram.com/' + match[1] + '/' + match[2] + '/';
    }
    const post = {title: brand || 'Selected content', category: permalink ? 'Content created by Ghada' : 'Link to be added', url: permalink || ''};
    const card = make('article', 'ig-card');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${index + 1} of ${instagramPosts.length}: ${post.title}`);
    const top = make('div', 'ig-card-top');
    const logo = make('img'); logo.src = 'logo-gm.png'; logo.alt = ''; logo.width = 29; logo.height = 29;
    top.append(logo, make('span', '', brand || 'GHADA / SELECTED CONTENT'));
    const media = make('div', 'ig-media');
    const placeholder = () => {
      media.replaceChildren();
      const empty = make('div', 'ig-placeholder');
      empty.append(make('span', 'ig-placeholder-number', String(index + 1).padStart(2,'0')), make('span', '', 'ADD YOUR INSTAGRAM LINK'));
      media.append(empty);
    };
    if (permalink) {
      const frame = make('iframe', 'ig-embed');
      frame.src = permalink + 'embed/';
      frame.title = (brand || 'Ghada’s selected content') + ' — Instagram';
      frame.loading = 'lazy';
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      media.append(frame);
    } else placeholder();
    card.append(top, media, make('p', 'ig-category', post.category), make('h3', '', post.title));
    const url = instagramUrl(post.url);
    if (url) {
      const link = make('a', 'ig-action', 'View on Instagram ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
    } else card.append(make('span', 'ig-pending', 'Instagram link to be added'));
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
