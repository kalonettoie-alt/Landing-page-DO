// dir.js — logo, apparitions au défilement
(function () {
  const LOGO = '<svg width="30" height="30" viewBox="0 0 512 512" aria-hidden="true"><defs><mask id="dlm"><rect width="512" height="512" fill="#000"/><circle cx="256" cy="256" r="148" fill="#fff"/><circle cx="256" cy="256" r="80" fill="#000"/><circle cx="338" cy="338" r="60" fill="#000"/></mask></defs><rect width="512" height="512" fill="currentColor" mask="url(#dlm)"/><circle cx="338" cy="338" r="45" fill="#8B7D3C"/></svg>';
  document.querySelectorAll('.mark').forEach(m => { m.innerHTML = LOGO + '<span>' + m.innerHTML + '</span>'; });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
  document.querySelectorAll('[data-tabs]').forEach(g => {
    const btns = g.querySelectorAll('[data-tab]'), panes = g.querySelectorAll('[data-pane]');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('on', x === b));
      panes.forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab);
    }));
  });
})();
