// pro-client.js — interactions de l'en-tête et des pages.
// L'en-tête, le méga-menu, le menu mobile et le pied de page sont rendus au build
// (build/site.mjs) : ce script ne fait qu'ajouter les comportements.
(function () {
  const hd = document.getElementById('hd');
  if (hd) {
    const its = hd.querySelectorAll('.px-it');
    let t;
    its.forEach(it => {
      const b = it.querySelector('button'); if (!b) return;
      const open = o => { its.forEach(x => x.classList.toggle('op', o && x === it)); b.setAttribute('aria-expanded', o); };
      it.addEventListener('mouseenter', () => { clearTimeout(t); open(true); });
      it.addEventListener('mouseleave', () => { t = setTimeout(() => open(false), 120); });
      b.addEventListener('click', () => open(!it.classList.contains('op')));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') its.forEach(x => x.classList.remove('op')); });
    const bg = hd.querySelector('.px-bg'), mob = hd.querySelector('.px-mob');
    if (bg && mob) {
      const setMob = o => { mob.classList.toggle('on', o); bg.setAttribute('aria-expanded', o); bg.setAttribute('aria-label', o ? 'Fermer le menu' : 'Ouvrir le menu'); };
      bg.onclick = () => setMob(!mob.classList.contains('on'));
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && mob.classList.contains('on')) { setMob(false); bg.focus(); } });
    }
    const sc = () => hd.classList.toggle('sc', scrollY > 6); addEventListener('scroll', sc, { passive: true }); sc();
  }
  const STAG = '.gm-pb,.gm-st,.gm-ex,.gm-md,.gm-tl,.gm-ba,.gm-kp,.bento,.team,.steps,.g2,.g3,.g4,.wall,.pr,.zn,.pains,.who,.kp,.cons-tags';
  document.querySelectorAll(STAG).forEach(g => {
    [...g.children].forEach((c, k) => { c.classList.add('rv'); c.style.transitionDelay = (k * 70) + 'ms'; });
    g.classList.remove('rv'); g.classList.add('in');
  });
  document.querySelectorAll('.rv').forEach(el => el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true }));
  const cnt = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cnt.unobserve(e.target);
    const el = e.target, txt = el.textContent, m = txt.match(/^(\d+)(.*)$/); if (!m) return;
    const to = +m[1], rest = m[2], t0 = performance.now(), d = 900;
    const tick = t => { const p = Math.min(1, (t - t0) / d), v = Math.round(to * (1 - Math.pow(1 - p, 3))); el.textContent = v + rest; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  document.querySelectorAll('.big,.kp b,.pr b').forEach(el => { if (!el.querySelector('*') && /^\d/.test(el.textContent)) cnt.observe(el); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
  document.querySelectorAll('[data-tabs]').forEach(g => {
    const btns = g.querySelectorAll('[data-tab]'), panes = g.querySelectorAll('[data-pane]');
    btns.forEach(b => b.addEventListener('click', () => { btns.forEach(x => x.classList.toggle('on', x === b)); panes.forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab); }));
  });
})();
