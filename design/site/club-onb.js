(function () {
  // Onboarding du Club des opérateurs.
  // Pas d'envoi de SMS ni de création de compte automatique pour l'instant : l'inscription
  // est transmise à l'équipe Deltom (Formspree, boîte « opérateurs »), qui recontacte la personne.
  // L'écran de fin ne s'affiche que si l'envoi a réellement abouti.
  const ENDPOINT = 'https://formspree.io/f/mwvgpkna';
  const MAIL = 'contact@deltomops.com', WA = 'https://wa.me/33759037259';
  const S = { step: 0, tel: '', prenom: '', nom: '', email: '', profil: '', ville: '', deps: [], rayon: 10, jours: [5, 6], creneau: 'Journée' };
  const PROF = ['Étudiant·e', 'Retraité·e', 'En reconversion', 'Parent', 'Déjà dans le ménage', 'Autre'];
  // Zones : toute l'Île-de-France. Recherche de commune via l'API publique geo.api.gouv.fr
  // (sans clé) ; si elle ne répond pas, le texte saisi est accepté tel quel.
  const DEPS = [['75', 'Paris'], ['92', 'Hauts-de-Seine'], ['93', 'Seine-Saint-Denis'], ['94', 'Val-de-Marne'], ['77', 'Seine-et-Marne'], ['78', 'Yvelines'], ['91', 'Essonne'], ['95', 'Val-d’Oise']];
  const ARR = Array.from({ length: 20 }, (_, i) => ({ l: `Paris ${i + 1}${i ? 'e' : 'er'}`, cp: '750' + String(i + 1).padStart(2, '0') }));
  const JRS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const root = document.createElement('div'); root.className = 'ob'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Inscription au Club');
  root.innerHTML = '<div class="ob-bg" data-x></div><div class="ob-p"><div class="ob-t"><button type="button" class="ob-bk" aria-label="Retour">←</button><div class="ob-pg"><i></i></div><button type="button" class="ob-x" data-x aria-label="Fermer">×</button></div><div class="ob-c"></div></div>';
  document.body.appendChild(root);
  const box = root.querySelector('.ob-c'), bar = root.querySelector('.ob-pg i'), bk = root.querySelector('.ob-bk');
  const N = 5;
  let sending = false;
  const telOk = () => S.tel.replace(/\D/g, '').length >= 9;
  const steps = [
    () => ({ h: 'Ton numéro de téléphone', p: 'Pour te recontacter au sujet de ton inscription.', b: `<label class="ob-f"><span>Téléphone</span><div class="ob-tel"><em>+33</em><input id="ob-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="6 12 34 56 78" value="${esc(S.tel)}" /></div></label><p class="ob-note">Ton numéro sert uniquement à ton inscription.</p>`, ok: telOk, cta: 'Continuer' }),
    () => ({ h: 'Faisons connaissance', p: 'Ton prénom apparaîtra sur tes missions.', b: `<div class="ob-r2"><label class="ob-f"><span>Prénom</span><input id="ob-pr" autocomplete="given-name" value="${esc(S.prenom)}" /></label><label class="ob-f"><span>Nom</span><input id="ob-nm" autocomplete="family-name" value="${esc(S.nom)}" /></label></div><label class="ob-f"><span>E-mail</span><input id="ob-em" type="email" autocomplete="email" value="${esc(S.email)}" /></label>`, ok: () => S.prenom.trim() && S.nom.trim() && /^\S+@\S+\.\S+$/.test(S.email), cta: 'Continuer' }),
    () => ({ h: 'Tu es plutôt…', p: 'Pour te proposer le bon rythme dès le départ.', b: `<div class="ob-ch" data-k="profil">${PROF.map(x => `<button type="button" class="${S.profil === x ? 'on' : ''}" data-v="${x}">${x}</button>`).join('')}</div>`, ok: () => !!S.profil, cta: 'Continuer' }),
    () => ({ h: 'Où veux-tu travailler ?', p: 'Indique ta ville et jusqu’où tu peux te déplacer. Tu pourras changer à tout moment.', b: `<label class="ob-f"><span>Ta ville ou ton code postal</span><div class="ob-ac"><input id="ob-vi" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="ob-sg" placeholder="ex. Montreuil, 94300, Paris 11e" value="${esc(S.ville)}" /><ul id="ob-sg" class="ob-sg" role="listbox" hidden></ul></div></label><label class="ob-f"><span>Distance maximale depuis chez toi · <b id="ob-rv">${S.rayon} km</b></span><input id="ob-ry" type="range" min="1" max="30" value="${S.rayon}" /></label><div class="ob-f"><span>Ou des départements entiers <em class="ob-opt">(facultatif)</em></span><div class="ob-ch sm" data-k="deps" data-m>${DEPS.map(([n, l]) => `<button type="button" class="${S.deps.includes(n) ? 'on' : ''}" data-v="${n}">${l} (${n})</button>`).join('')}</div></div>`, ok: () => S.ville.trim().length >= 2 || S.deps.length > 0, cta: 'Continuer' }),
    () => ({ h: 'Quand es-tu disponible ?', p: 'Tu ne recevras des missions que sur ces créneaux.', b: `<div class="ob-days">${JRS.map((d, i) => `<button type="button" class="${S.jours.includes(i) ? 'on' : ''}" data-d="${i}">${d}</button>`).join('')}</div><div class="ob-ch" data-k="creneau">${['Matin', 'Après-midi', 'Journée'].map(x => `<button type="button" class="${S.creneau === x ? 'on' : ''}" data-v="${x}">${x}</button>`).join('')}</div><p class="ob-err" role="alert" hidden></p>`, ok: () => S.jours.length > 0 && !sending, cta: 'Envoyer mon inscription', submit: true }),
    () => ({ h: `Inscription envoyée, ${esc(S.prenom || '')} !`, p: 'L’équipe Deltom te recontacte sous 48 h pour la suite.', b: `<div class="ob-done"><div class="ob-ok">✓</div><ul class="ob-ls"><li class="ok"><i>✓</i><div><b>Inscription reçue</b><span>+33 ${esc(S.tel)}</span></div></li><li class="ok"><i>✓</i><div><b>Zones et disponibilités</b><span>${esc(zoneTxt())} · ${S.jours.length} jour${S.jours.length > 1 ? 's' : ''} par semaine</span></div></li><li class="nx"><i>3</i><div><b>Formation · 10 h</b><span>Ton accès t’est envoyé après notre échange</span></div></li><li><i>4</i><div><b>Entreprise et documents</b><span>On le fait avec toi pendant la formation</span></div></li></ul><a class="ob-wa" href="${WA}" target="_blank" rel="noopener">Ajoute Christine sur WhatsApp</a><p class="ob-rm">Ta première mission possible dans 3 semaines.</p></div>`, ok: () => true, cta: 'Voir le programme de la formation', end: true }),
  ];
  const zoneTxt = () => [S.ville.trim() ? `${S.ville.trim()} + ${S.rayon} km` : '', S.deps.length ? S.deps.length + ' département' + (S.deps.length > 1 ? 's' : '') : ''].filter(Boolean).join(' · ');
  // Suggestions de communes d'Île-de-France
  let acT, acN = 0;
  const suggest = async (q, ul, inp) => {
    const n = ++acN, v = q.trim();
    const show = list => {
      if (n !== acN) return;
      ul.innerHTML = list.map((x, i) => `<li role="option" id="ob-sg${i}" data-v="${esc(x)}">${esc(x)}</li>`).join('');
      ul.hidden = !list.length; inp.setAttribute('aria-expanded', String(!!list.length));
    };
    if (v.length < 2) return show([]);
    const pm = v.match(/^paris\s*(\d{1,2})?/i), cp = v.match(/^\d{5}$/);
    if (pm) return show((pm[1] ? ARR.filter(a => a.cp.endsWith(pm[1].padStart(2, '0')) || String(+a.cp.slice(3)).startsWith(pm[1])) : [{ l: 'Paris', cp: '75' }, ...ARR]).slice(0, 8).map(a => `${a.l} (${a.cp})`));
    if (/^\d+$/.test(v) && !cp) return show([]);
    try {
      const u = 'https://geo.api.gouv.fr/communes?codeRegion=11&fields=nom,codesPostaux&limit=8&' + (cp ? 'codePostal=' + v : 'boost=population&nom=' + encodeURIComponent(v));
      const r = await fetch(u); if (!r.ok) throw 0;
      const d = await r.json();
      show(d.map(c => `${c.nom} (${cp ? v : c.codesPostaux[0]})`).slice(0, 8));
    } catch (e) { show([]); }
  };
  const render = () => {
    const st = steps[S.step]();
    bar.style.width = Math.min(100, (S.step) / N * 100) + '%';
    bk.style.visibility = S.step > 0 && S.step < N ? 'visible' : 'hidden';
    box.innerHTML = `<div class="ob-in"><h3>${st.h}</h3><p class="ob-lead">${st.p}</p><div class="ob-b">${st.b}</div><button type="button" class="bt p ob-go"${st.ok() ? '' : ' disabled'}>${st.cta}</button>${S.step === 0 ? '<p class="ob-s">Gratuit et sans engagement. En continuant, tu acceptes nos <a href="/cgv">conditions</a> et notre <a href="/confidentialite">politique de confidentialité</a>.</p>' : ''}</div>`;
    wire(st);
  };
  const refresh = () => { const st = steps[S.step](); const b = box.querySelector('.ob-go'); if (b) b.disabled = !st.ok(); };
  const submit = async () => {
    if (sending || !steps[S.step]().ok()) return;
    sending = true;
    const go = box.querySelector('.ob-go'), err = box.querySelector('.ob-err');
    if (err) err.hidden = true;
    if (go) { go.disabled = true; go.textContent = 'Envoi…'; }
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Inscription Club des opérateurs : ${S.prenom} ${S.nom}`,
          source: 'Onboarding Club (' + location.pathname + ')',
          prenom: S.prenom, nom: S.nom, email: S.email, telephone: '+33 ' + S.tel,
          profil: S.profil, ville: S.ville.trim(), rayon_km: S.rayon, departements: S.deps.map(n => DEPS.find(d => d[0] === n)[1] + ' (' + n + ')').join(', '),
          jours: S.jours.slice().sort().map(i => JRS[i]).join(', '), creneau: S.creneau,
        }),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      sending = false; S.step = N; render();
    } catch (e) {
      sending = false;
      if (go) { go.disabled = false; go.textContent = 'Réessayer'; }
      if (err) { err.hidden = false; err.innerHTML = `L’envoi n’a pas abouti. Réessaie, ou écris-nous sur <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a> ou à <a href="mailto:${MAIL}">${MAIL}</a>.`; }
    }
  };
  const wire = st => {
    const q = s => box.querySelector(s);
    const bind = (id, k) => { const el = q(id); if (el) el.addEventListener('input', () => { S[k] = el.value; refresh(); }); };
    bind('#ob-tel', 'tel'); bind('#ob-pr', 'prenom'); bind('#ob-nm', 'nom'); bind('#ob-em', 'email');
    const vi = q('#ob-vi'), sg = q('#ob-sg');
    if (vi) {
      let hi = -1;
      const pick = v => { vi.value = S.ville = v; sg.hidden = true; vi.setAttribute('aria-expanded', 'false'); refresh(); };
      const mark = () => sg.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('on', i === hi); if (i === hi) vi.setAttribute('aria-activedescendant', li.id); });
      vi.addEventListener('input', () => { S.ville = vi.value; hi = -1; sg.hidden = true; vi.setAttribute('aria-expanded', 'false'); refresh(); clearTimeout(acT); acT = setTimeout(() => suggest(vi.value, sg, vi), 200); });
      vi.addEventListener('keydown', e => {
        const li = sg.querySelectorAll('li'); if (sg.hidden || !li.length) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); hi = (hi + (e.key === 'ArrowDown' ? 1 : -1) + li.length) % li.length; mark(); }
        else if (e.key === 'Enter' && hi >= 0) { e.preventDefault(); e.stopPropagation(); pick(li[hi].dataset.v); }
        else if (e.key === 'Escape') { e.stopPropagation(); sg.hidden = true; }
      });
      sg.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); pick(li.dataset.v); } });
      vi.addEventListener('blur', () => setTimeout(() => { sg.hidden = true; vi.setAttribute('aria-expanded', 'false'); }, 120));
    }
    const ry = q('#ob-ry'); if (ry) ry.addEventListener('input', () => { S.rayon = +ry.value; q('#ob-rv').textContent = S.rayon + ' km'; });
    box.querySelectorAll('.ob-ch').forEach(g => g.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return; const k = g.dataset.k, v = b.dataset.v;
      if (g.hasAttribute('data-m')) { S[k] = S[k].includes(v) ? S[k].filter(x => x !== v) : [...S[k], v]; b.classList.toggle('on'); }
      else { S[k] = v; g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); }
      refresh();
    }));
    box.querySelectorAll('.ob-days button').forEach(b => b.addEventListener('click', () => { const d = +b.dataset.d; S.jours = S.jours.includes(d) ? S.jours.filter(x => x !== d) : [...S.jours, d]; b.classList.toggle('on'); refresh(); }));
    q('.ob-go').onclick = () => st.end ? done() : st.submit ? submit() : next();
    const first = box.querySelector('input:not([type=range])'); if (first) setTimeout(() => first.focus(), 60);
  };
  const done = () => { if (location.pathname !== '/club-operateurs/formation') location.href = '/club-operateurs/formation'; else close(); };
  const next = () => { if (!steps[S.step]().ok()) return; if (steps[S.step]().submit) { submit(); return; } S.step = Math.min(N, S.step + 1); render(); };
  bk.onclick = () => { if (sending) return; S.step = Math.max(0, S.step - 1); render(); };
  let last;
  const open = (pre = {}) => {
    Object.assign(S, pre);
    if (S.step === N) { S.step = 0; } // nouvelle inscription après un envoi réussi
    if (pre.ville) S.ville = String(pre.ville).trim();
    last = document.activeElement; root.classList.add('on'); document.documentElement.style.overflow = 'hidden'; render();
  };
  const close = () => { root.classList.remove('on'); document.documentElement.style.overflow = ''; if (last) last.focus(); };
  root.addEventListener('click', e => { if (e.target.closest('[data-x]')) close(); });
  root.addEventListener('keydown', e => { if (e.key === 'Escape') close(); if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); next(); } });
  document.addEventListener('click', e => { const a = e.target.closest('[data-onb]'); if (!a) return; e.preventDefault(); const pre = {}; if (a.dataset.ville) pre.ville = a.dataset.ville; if (a.dataset.profil) pre.profil = a.dataset.profil; open(pre); });
  window.clubOnboarding = open;
})();
