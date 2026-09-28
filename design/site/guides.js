// guides.js — sommaire actif.
// La newsletter (.nlf) est envoyée par forms.js : la confirmation ne s'affiche
// que si l'inscription a réellement abouti.
(function () {
  const links = [...document.querySelectorAll('.toc a')];
  if (!links.length) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('.art h2[id]').forEach(h => io.observe(h));
})();
