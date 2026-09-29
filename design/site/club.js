(function () {
  const $ = id => document.getElementById(id), wait = ms => new Promise(r => setTimeout(r, ms));
  const eur = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
  const hm = n => Math.floor(n / 60) + ' h' + (n % 60 ? ' ' + String(n % 60).padStart(2, '0') : '');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  const obs = root => root.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  const loop = (el, run) => { if (!el) return; let on = false, busy = false; new IntersectionObserver(es => es.forEach(e => { on = e.isIntersecting; if (on && !busy) (async () => { busy = true; while (on) await run(); busy = false; })(); }), { threshold: .2 }).observe(el); };

  const secs = [...document.querySelectorAll('[data-bg]')], hex = s => [1, 3, 5].map(i => parseInt(s.substr(i, 2), 16));
  const paint = () => { const y = scrollY + innerHeight * .55; let i = secs.findIndex(s => { const r = s.getBoundingClientRect(); return r.top + scrollY <= y && r.bottom + scrollY > y; }); if (i < 0) i = y < 200 ? 0 : secs.length - 1; const s = secs[i], r = s.getBoundingClientRect(), top = r.top + scrollY, p = (y - top) / r.height, nx = secs[i + 1]; let c = hex(s.dataset.bg); if (nx && p > .55) { let t = (p - .55) / .45; t = t * t * (3 - 2 * t); const d = hex(nx.dataset.bg); c = c.map((v, k) => Math.round(v + (d[k] - v) * t)); } document.body.style.backgroundColor = `rgb(${c})`; };
  addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true }); addEventListener('resize', paint); paint();
  const nv = $('nv'); const sc = () => nv.classList.toggle('sc', scrollY > 30); addEventListener('scroll', sc, { passive: true }); sc();

  // cagnotte
  const wv = $('wv'), bars = [...$('bars').children], H = [38, 58, 52, 74, 100];
  loop($('st'), async () => {
    bars.forEach(b => b.style.height = '4%'); wv.textContent = '0 €'; await wait(500);
    bars.forEach((b, i) => setTimeout(() => b.style.height = H[i] + '%', i * 120));
    for (let s = 0; s <= 40; s++) { wv.textContent = eur(2208 * (1 - Math.pow(1 - s / 40, 3))); await wait(30); }
    await wait(4000);
  });

  obs(document);

  // christine
  const ms = [...document.querySelectorAll('#cv .m')];
  loop($('cv'), async () => { ms.forEach(m => m.classList.remove('on')); await wait(500); for (const m of ms) { m.classList.add('on'); await wait(1400); } await wait(3500); });

  // simulateur
  const T = [['Studio', 26, 90], ['T2', 34, 120], ['T3', 42, 150], ['T4', 51, 180]]; let ty = 1;
  $('sm-ty').innerHTML = T.map(([n, p, m], i) => `<button type="button" data-i="${i}"><b>${n}</b><span>${p} €</span><em>≈ ${hm(m)}</em></button>`).join('');
  const calc = () => {
    const m = +$('sm-m').value, j = +$('sm-j').value, [, p, t] = T[ty];
    [['sm-m', 1, 4], ['sm-j', 1, 7]].forEach(([id, a, b]) => $(id).style.setProperty('--p', (($(id).value - a) / (b - a) * 100) + '%'));
    $('sm-mv').textContent = m; $('sm-jv').textContent = j;
    $('sm-mo').textContent = eur(p * m * j * 4.33); $('sm-d').textContent = eur(p * m); $('sm-w').textContent = eur(p * m * j);
    $('sm-h').textContent = hm(t * m); $('sm-e').textContent = (Math.round(p / t * 600) / 10).toString().replace('.', ',') + ' €';
    $('sm-ty').querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === ty));
  };
  $('sm-ty').onclick = e => { const b = e.target.closest('button'); if (b) { ty = +b.dataset.i; calc(); } };
  ['sm-m', 'sm-j'].forEach(id => $(id).addEventListener('input', calc)); calc();

  // code postal
  const DEP = ['75', '77', '78', '91', '92', '93', '94', '95'], cp = $('mz-cp'), mo = $('mz-o'), mb = $('mz-b');
  if (cp) cp.addEventListener('input', () => { const v = cp.value.replace(/\D/g, '').slice(0, 5); cp.value = v; if (v.length < 2) { mo.className = 'mz-o'; mo.textContent = 'Tape ton code postal pour vérifier.'; delete mb.dataset.ville; return; } const d = v.slice(0, 2); if (DEP.includes(d)) { mo.className = 'mz-o ok'; mo.textContent = 'Oui, Deltom propose des missions dans le ' + d + '.'; if (v.length === 5) mb.dataset.ville = v; } else { mo.className = 'mz-o ko'; mo.textContent = 'Deltom n’est pas encore présent dans ce département.'; delete mb.dataset.ville; } });
  // bouton fixe mobile
  const sb = $('stk-b'), hr = document.querySelector('.hr'), fn = $('rejoindre'); let pastHero = false, atForm = false;
  const upd = () => sb && sb.classList.toggle('on', pastHero && !atForm);
  if (sb && hr) new IntersectionObserver(es => { pastHero = !es[0].isIntersecting; upd(); }).observe(hr);
  if (sb && fn) new IntersectionObserver(es => { atForm = es[0].isIntersecting; upd(); }, { threshold: .15 }).observe(fn);
  // formulaire
  const fm = $('fm');
  fm.onsubmit = e => {
    e.preventDefault();
    const bad = [...fm.querySelectorAll('[required]')].filter(i => !i.value.trim());
    fm.querySelectorAll('input').forEach(i => i.style.borderColor = ''); bad.forEach(i => i.style.borderColor = '#C0392B');
    if (bad.length) { bad[0].focus(); return; } if (window.clubOnboarding) window.clubOnboarding({ prenom: fm.prenom.value.trim(), tel: fm.tel.value.trim().replace(/^(\+33|0)/, ''), ville: fm.ville.value.trim(), profil: fm.profil ? fm.profil.value.replace('Déjà dans le ménage', 'Déjà dans le ménage') : '', step: 1 }); else fm.classList.add('sent');
  };
})();
