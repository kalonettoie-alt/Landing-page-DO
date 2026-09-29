// auth.js — bulle de connexion / inscription (type Airbnb) ouverte par tous les liens vers la console.
(function () {
  const CONSOLE = '../client-web/Console%20client%20-%20barre%20en%20haut.html';
  const ONBOARD = '../client-web/Onboarding%20client.html';
  const css = `
.au-ov{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(16,33,31,.5);opacity:0;transition:opacity .2s}
.au-ov.on{opacity:1}.au-ov[hidden]{display:none}
.au-c{position:relative;width:100%;max-width:440px;max-height:calc(100vh - 40px);overflow:auto;background:#fff;border-radius:26px;box-shadow:0 30px 80px rgba(16,33,31,.3);transform:translateY(14px) scale(.98);transition:transform .22s cubic-bezier(.2,.8,.2,1);color:#172524}
.au-ov.on .au-c{transform:none}
.au-t{display:grid;grid-template-columns:40px 1fr 40px;align-items:center;padding:14px 16px;border-bottom:1px solid #ECE8E0}
.au-t b{text-align:center;font-size:15px;font-weight:700;letter-spacing:-.015em}
.au-i{width:36px;height:36px;border:0;border-radius:99px;background:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#172524}
.au-i:hover{background:#F5F3EE}.au-i[hidden]{visibility:hidden;display:flex}
.au-b{padding:26px 28px 30px}
.au-b h2{font-size:23px;font-weight:780;letter-spacing:-.035em;margin:0 0 6px}
.au-b .sb{margin:0 0 20px;font-size:14.5px;line-height:1.55;color:#56625F}.au-b .sb b{color:#172524}
.au-f{position:relative;display:block}
.au-f input{width:100%;box-sizing:border-box;height:56px;border:1.5px solid #DDD8CD;border-radius:14px;padding:18px 16px 0;font:inherit;font-size:16px;color:#172524;outline:none;background:#fff}
.au-f span{position:absolute;left:17px;top:18px;font-size:15.5px;color:#6F7B78;pointer-events:none;transition:all .15s}
.au-f input:focus,.au-f input:not(:placeholder-shown){border-color:#172524}
.au-f input:focus+span,.au-f input:not(:placeholder-shown)+span{top:9px;font-size:11.5px;font-weight:650;color:#56625F}
.au-f.bad input{border-color:#C0392B}.au-er{display:none;margin:8px 2px 0;font-size:13px;color:#C0392B}.au-f.bad+.au-er{display:block}
.au-f .eye{position:absolute;right:10px;top:10px;height:36px;padding:0 10px;border:0;background:none;font:inherit;font-size:13px;font-weight:700;text-decoration:underline;color:#172524;cursor:pointer}
.au-n{margin:10px 2px 18px;font-size:12px;line-height:1.5;color:#6F7B78}.au-n a{color:#56625F;text-decoration:underline}
.au-go{display:flex;align-items:center;justify-content:center;width:100%;height:52px;border:0;border-radius:14px;background:#1A3A3A;color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s}
.au-go:hover{background:#24504E}.au-go[aria-disabled="true"]{opacity:.35;pointer-events:none}
.au-or{display:flex;align-items:center;gap:14px;margin:22px 0;font-size:12px;color:#6F7B78}.au-or::before,.au-or::after{content:"";flex:1;height:1px;background:#ECE8E0}
.au-al{display:flex;flex-direction:column;gap:10px}
.au-al a{display:grid;grid-template-columns:20px 1fr 20px;align-items:center;height:52px;padding:0 18px;border:1.5px solid #DDD8CD;border-radius:14px;font-size:15px;font-weight:650;color:#172524;text-decoration:none;text-align:center}
.au-al a:hover{border-color:#172524;background:#FAF8F3}
.au-lk{display:block;width:max-content;max-width:100%;white-space:nowrap;margin:16px auto 0;border:0;background:none;font:inherit;font-size:14px;font-weight:650;color:#172524;text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.au-cd{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin:0 0 18px}
.au-cd input{width:100%;box-sizing:border-box;height:58px;border:1.5px solid #DDD8CD;border-radius:14px;font:inherit;font-size:22px;font-weight:750;text-align:center;color:#172524;outline:none}
.au-cd input:focus{border-color:#172524}
.au-ft{margin:18px 0 0;padding-top:18px;border-top:1px solid #ECE8E0;text-align:center;font-size:14px;color:#56625F}
.au-ft button{display:inline;white-space:nowrap;text-wrap:nowrap;border:0;background:none;padding:0;font:inherit;font-weight:700;color:#172524;text-decoration:underline;cursor:pointer}
.au-av{display:flex;align-items:center;gap:12px;margin:0 0 18px;padding:12px 14px;border-radius:16px;background:#F7F5F0}
.au-av i{width:38px;height:38px;border-radius:99px;background:#1A3A3A;color:#fff;font-style:normal;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.au-av span{font-size:14.5px;font-weight:650;min-width:0;overflow:hidden;text-overflow:ellipsis}
.au-st[hidden]{display:none}
#au-ov .au-c,#au-ov h2{color:#172524}#au-ov .au-al a{color:#172524}#au-ov .au-n a{color:#56625F}#au-ov .sb{color:#56625F}#au-ov .sb b{color:#172524}
@media (max-width:520px){.au-ov{align-items:flex-end;padding:0}.au-c{max-width:none;border-radius:26px 26px 0 0;max-height:92vh}}`;
  const G = '<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.15-3.2-.44-4.7H24v9h12.6c-.55 2.9-2.2 5.3-4.7 7l7.6 5.9c4.4-4.1 7-10.2 7-17.2z"/><path fill="#FBBC05" d="M10.4 28.7A14.6 14.6 0 019.6 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 000 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.5-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.9 2.3-6.4 0-11.7-3.7-13.6-9.1l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';
  const AP = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#172524"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.1-2.8.9-3.5.9s-1.9-.8-3.1-.8c-1.6 0-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-4.3zM14.2 5.4c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.4z"/></svg>';
  const X = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  const BK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  const html = `<div class="au-ov" id="au-ov" hidden><div class="au-c" role="dialog" aria-modal="true" aria-labelledby="au-ttl">
<div class="au-t"><button type="button" class="au-i" id="au-bk" aria-label="Retour" hidden>${BK}</button><b id="au-ttl">Connexion ou inscription</b><button type="button" class="au-i" id="au-x" aria-label="Fermer">${X}</button></div>
<div class="au-b">
<div class="au-st" data-st="email"><h2>Bienvenue sur Deltom</h2><p class="sb">Entrez votre adresse e-mail pour vous connecter ou créer votre compte.</p><label class="au-f"><input type="email" id="au-em" placeholder=" " autocomplete="email" /><span>Adresse e-mail</span></label><p class="au-er">Entrez une adresse e-mail valide.</p><p class="au-n">En continuant, vous acceptez nos <a href="../site-actuel/cgv.html">CGV</a> et notre <a href="../site-actuel/confidentialite.html">politique de confidentialité</a>.</p><button type="button" class="au-go" data-go="email">Continuer</button><div class="au-or">ou</div><div class="au-al"><a href="${CONSOLE}">${G}<span>Continuer avec Google</span><i></i></a><a href="${CONSOLE}">${AP}<span>Continuer avec Apple</span><i></i></a></div></div>
<div class="au-st" data-st="pass" hidden><h2>Bon retour</h2><div class="au-av"><i class="ini">C</i><span class="em"></span></div><label class="au-f"><input type="password" id="au-pw" placeholder=" " autocomplete="current-password" /><span>Mot de passe</span><button type="button" class="eye" id="au-eye">Afficher</button></label><p class="au-er">Mot de passe requis.</p><p class="au-n"></p><button type="button" class="au-go" data-go="pass">Se connecter</button><button type="button" class="au-lk" data-go="tocode">Recevoir un code par e-mail à la place</button><p class="au-ft"><button type="button" data-go="forgot">Mot de passe oublié ?</button></p></div>
<div class="au-st" data-st="code" hidden><h2>Vérifiez votre e-mail</h2><p class="sb">Nous avons envoyé un code à 6 chiffres à <b class="em"></b>.</p><div class="au-cd">${'<input inputmode="numeric" maxlength="1" autocomplete="one-time-code" />'.repeat(6)}</div><button type="button" class="au-go" data-go="code" aria-disabled="true">Continuer</button><button type="button" class="au-lk" data-go="again">Renvoyer le code</button><p class="au-ft cf"></p></div>
</div></div></div>`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  document.body.insertAdjacentHTML('beforeend', html);
  const ov = document.getElementById('au-ov'), $ = s => ov.querySelector(s);
  const em = $('#au-em'), pw = $('#au-pw'), cds = [...ov.querySelectorAll('.au-cd input')], okC = $('[data-go="code"]');
  let mode = 'signup', hist = [], why = 'signup';
  const TT = { email: 'Connexion ou inscription', pass: 'Connexion', code: 'Vérification' };
  const show = (st, push = true) => {
    const cur = ov.querySelector('.au-st:not([hidden])')?.dataset.st;
    if (push && cur && cur !== st) hist.push(cur);
    ov.querySelectorAll('.au-st').forEach(s => s.hidden = s.dataset.st !== st);
    $('#au-ttl').textContent = TT[st]; $('#au-bk').hidden = !hist.length;
    const v = em.value.trim();
    ov.querySelectorAll('.em').forEach(e => e.textContent = v); $('.ini').textContent = (v[0] || 'C').toUpperCase();
    if (st === 'code') {
      $('.cf').innerHTML = why === 'signup' ? 'Vous avez déjà un compte ? <button type="button" data-go="topass">Se connecter avec un mot de passe</button>' : why === 'forgot' ? 'Le code vous permet de choisir un nouveau mot de passe.' : 'Vous préférez ? <button type="button" data-go="topass">Utiliser mon mot de passe</button>';
      cds.forEach(c => c.value = ''); sync(); setTimeout(() => cds[0].focus(), 30);
    }
    if (st === 'pass') setTimeout(() => pw.focus(), 30);
    if (st === 'email') setTimeout(() => em.focus(), 30);
  };
  const sync = () => okC.setAttribute('aria-disabled', String(!cds.every(c => c.value)));
  const open = (m, mail) => {
    mode = m; hist = []; em.value = mail || ''; pw.value = ''; ov.querySelectorAll('.au-f').forEach(f => f.classList.remove('bad'));
    ov.hidden = false; requestAnimationFrame(() => ov.classList.add('on')); document.documentElement.style.overflow = 'hidden';
    if (mail && mail.includes('@')) { why = 'signup'; show('code', false); hist = ['email']; $('#au-bk').hidden = false; } else show('email', false);
  };
  const close = () => { ov.classList.remove('on'); document.documentElement.style.overflow = ''; setTimeout(() => ov.hidden = true, 200); };
  cds.forEach((c, i) => {
    c.addEventListener('input', () => { c.value = c.value.replace(/\D/g, '').slice(-1); if (c.value && i < 5) cds[i + 1].focus(); sync(); if (cds.every(x => x.value)) okC.focus(); });
    c.addEventListener('keydown', e => { if (e.key === 'Backspace' && !c.value && i > 0) cds[i - 1].focus(); });
    c.addEventListener('paste', e => { const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); d.split('').forEach((n, k) => cds[k] && (cds[k].value = n)); sync(); (cds[d.length] || okC).focus(); });
  });
  ov.addEventListener('click', e => {
    if (e.target === ov) return close();
    const t = e.target.closest('button'); if (!t) return;
    if (t.id === 'au-x') return close();
    if (t.id === 'au-bk') { const p = hist.pop(); if (p) show(p, false); return; }
    if (t.id === 'au-eye') { const h = pw.type === 'password'; pw.type = h ? 'text' : 'password'; t.textContent = h ? 'Masquer' : 'Afficher'; return; }
    const g = t.dataset.go; if (!g) return;
    if (g === 'email') {
      const f = em.closest('.au-f'), v = em.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { f.classList.add('bad'); em.focus(); return; }
      f.classList.remove('bad');
      // Démo : ouvert depuis « Se connecter » = compte existant (mot de passe) ; sinon nouveau compte (code puis onboarding).
      if (mode === 'login') show('pass'); else { why = 'signup'; show('code'); }
    }
    if (g === 'pass') { const f = pw.closest('.au-f'); if (!pw.value) { f.classList.add('bad'); pw.focus(); return; } location.href = CONSOLE; }
    if (g === 'tocode') { why = 'login'; show('code'); }
    if (g === 'forgot') { why = 'forgot'; show('code'); }
    if (g === 'topass') { mode = 'login'; show('pass'); }
    if (g === 'again') { cds.forEach(c => c.value = ''); sync(); cds[0].focus(); t.textContent = 'Code renvoyé ✓'; setTimeout(() => t.textContent = 'Renvoyer le code', 2000); }
    if (g === 'code') location.href = why === 'signup' ? ONBOARD + '?email=' + encodeURIComponent(em.value.trim()) : CONSOLE;
  });
  ov.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target === em) { e.preventDefault(); $('[data-go="email"]').click(); }
    if (e.key === 'Enter' && e.target === pw) { e.preventDefault(); $('[data-go="pass"]').click(); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !ov.hidden) close(); });
  const isApp = h => h && /connexion\.html/.test(h);
  document.addEventListener('click', e => {
    const a = e.target.closest('a'); if (!a || ov.contains(a) || !isApp(a.getAttribute('href'))) return;
    e.preventDefault();
    const l = a.textContent.trim().toLowerCase();
    open(/se connecter|espace client/.test(l) ? 'login' : 'signup');
    document.querySelector('.px-mob')?.classList.remove('on');
  });
  document.addEventListener('submit', e => {
    const f = e.target; if (!isApp(f.getAttribute('action'))) return;
    e.preventDefault(); open('signup', (f.querySelector('input[type=email]') || {}).value);
  });
  window.DeltomAuth = { open };
})();
