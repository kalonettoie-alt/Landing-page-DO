// pro.js — en-tête avec méga-menus, pied de page complet, apparitions, onglets, simulateur.
(function () {
  const LOGO = '<svg width="30" height="30" viewBox="0 0 512 512" aria-hidden="true"><defs><mask id="plm"><rect width="512" height="512" fill="#000"/><circle cx="256" cy="256" r="148" fill="#fff"/><circle cx="256" cy="256" r="80" fill="#000"/><circle cx="338" cy="338" r="60" fill="#000"/></mask></defs><rect width="512" height="512" fill="currentColor" mask="url(#plm)"/><circle cx="338" cy="338" r="45" fill="#8B7D3C"/></svg>';
  const APP = '../site-actuel/connexion.html';
  const MENU = [
    ['Ménages', 'gestion-menages.html'],
    ['Solutions', [
      ['proprietaires.html', 'Propriétaires', 'Des avis 5 étoiles sans y passer vos week-ends'],
      ['conciergeries.html', 'Conciergeries', 'Votre équipe terrain, sans recruter'],
      ['gestionnaires.html', 'Gestionnaires multi-logements', 'Tout votre parc sur un seul écran'],
      ['hotels.html', 'Hôtels & apparthotels', 'Du renfort formé aux gestes hôteliers'],
      ['investisseurs.html', 'Investisseurs', 'Un coût par séjour connu d’avance'],
    ], ['Pour qui', 'Un logement ou deux cents, le même niveau d’exigence.']],
    ['Services', [
      ['menage.html', 'Intervention', 'Checklist par pièce, photos avant et après'],
      ['blanchisserie.html', 'Blanchisserie hôtelière', 'Lavé, séché, repassé, plié'],
      ['supervision.html', 'Supervision & qualité', 'Chaque passage vérifié, 7j/7'],
      ['lien-voyageur.html', 'Upsell et lien voyageur', 'Vos voyageurs achètent, vous encaissez'],
      ['espace-client.html', 'Espace client', 'Suivi en direct, rapports, factures'],
    ], ['Nos services', 'Pensé par des hôtes, fait par des mains d’experts.']],
    ['Tarifs', 'tarifs.html'],
    ['Ressources', [
      ['comment-ca-marche.html', 'Comment ça marche', 'De l’inscription au premier rapport'],
      ['guides.html', 'Guides pour hôtes', 'Conseils pour la location courte durée'],
      ['zones.html', 'Zones desservies', 'Paris et toute l’Île-de-France'],
      ['faq.html', 'Questions fréquentes', 'Tarifs, linge, planification'],
    ], ['Ressources', 'Tout pour bien louer en courte durée.']],
    ['Entreprise', [
      ['a-propos.html', 'À propos', 'Notre histoire et nos engagements'],
      ['contact.html', 'Contact', 'Une question, un devis, un partenariat'],
    ], ['Deltom', 'Une équipe d’hôtes et d’experts de l’hôtellerie.']],
  ];
  const NAV = MENU.filter(m => m[0] !== 'Solutions');
  const here = decodeURIComponent(location.pathname.split('/').pop() || 'Accueil.html');
  const css = `
.px{position:sticky;top:0;z-index:60;background:rgba(255,255,255,.92);backdrop-filter:saturate(1.4) blur(14px);transition:box-shadow .2s}
.px.sc{box-shadow:0 1px 0 #ECE8E0}
.px-nav>.px-it>a,.px-nav>.px-it>button,.px-nav>a{white-space:nowrap}
.px .in{width:100%;box-sizing:border-box;max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px);display:flex;align-items:center;gap:20px;height:76px}
.px .mark{color:#1A3A3A;display:inline-flex;align-items:center;gap:6px;flex-shrink:0;line-height:1}.px .mark svg{width:36px;height:36px;flex-shrink:0;display:block}.px .mark span{display:block;line-height:1}
.px-nav{display:flex;gap:0;margin-left:10px;min-width:0}
.px-it{position:relative}
.px-it>a,.px-it>button{display:flex;align-items:center;gap:6px;height:42px;padding:0 14px;border:0;background:none;border-radius:99px;font:inherit;font-size:15px;font-weight:600;color:#4A5654;cursor:pointer;white-space:nowrap}
.px-it>a:hover,.px-it>button:hover,.px-it.op>button{background:#F5F3EE;color:#172524}
.px-it.on>a,.px-it.on>button{color:#172524}
.px-it>button svg{transition:transform .2s}.px-it.op>button svg{transform:rotate(180deg)}
.px-mg{position:absolute;top:calc(100% + 10px);left:-20px;display:grid;grid-template-columns:230px minmax(0,1fr);width:680px;background:#fff;border-radius:26px;box-shadow:0 24px 60px rgba(23,37,36,.16),0 0 0 1px rgba(23,37,36,.05);padding:10px;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .18s,transform .18s,visibility .18s}
.px-it.op .px-mg{opacity:1;visibility:visible;transform:none}
.px-it:nth-last-child(-n+2) .px-mg{left:auto;right:-20px}
.px-mg .lb{border-radius:18px;background:#DDE8DF;padding:24px 22px;display:flex;flex-direction:column;gap:10px}
.px-mg .lb b{font-size:18px;letter-spacing:-.03em;color:#172524}
.px-mg .lb span{font-size:14px;line-height:1.5;color:#43504E}
.px-mg .lk{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:6px}
.px-mg .lk a{display:block;padding:12px 14px;border-radius:14px}
.px-mg .lk a:hover{background:#F7F5F0}
.px-mg .lk a b{display:block;font-size:14.5px;font-weight:650;color:#172524;letter-spacing:-.015em}
.px-mg .lk a span{display:block;margin-top:3px;font-size:13px;line-height:1.4;color:#6A7472}
.px-mg .lk a.cur b{color:#8B7D3C}
.px-r{margin-left:auto;display:flex;gap:8px;align-items:center}
.px-r .b{height:44px;font-size:15px;padding:0 20px}
.px-l{background:#F5F3EE;color:#172524}.px-l:hover{background:#ECE8DF}
.px-p{background:#1A3A3A;color:#fff}.px-p:hover{background:#24504E}
.px-bg{display:none;width:44px;height:44px;border:0;border-radius:99px;background:#F5F3EE;cursor:pointer;align-items:center;justify-content:center}
.px-mob{display:none}
@media (max-width:1320px){.px-it>a,.px-it>button{padding:0 10px;font-size:14.5px}.px .in{gap:14px}.px-r .b{padding:0 16px;font-size:14.5px}.px-r .px-l{background:none;padding:0 10px}}
@media (max-width:1180px){.px-nav{display:none}.px-bg{display:flex}
.px-mob.on{display:block;max-height:calc(100vh - 76px);overflow:auto;border-top:1px solid #ECE8E0;background:#fff;padding:8px clamp(20px,4vw,48px) 28px}
.px-mob h5{margin:20px 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8B7D3C}
.px-mob a{display:block;padding:11px 0;font-size:16.5px;font-weight:600;color:#172524;border-bottom:1px solid #F1EEE7}
.px-mob .b{margin-top:20px;width:100%;color:#fff}}
@media (max-width:520px){.px-r .px-p{display:none}}
.pf{background:#10211F;color:rgba(255,255,255,.66);padding:clamp(64px,8vw,96px) 0 34px;font-size:14.5px;margin-top:clamp(10px,1.5vw,20px)}
.pf .in{max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}
.pf .top{display:grid;grid-template-columns:1.5fr repeat(5,1fr);gap:32px}
.pf .ml{flex-basis:100%;margin:6px 0 0;font-size:12.5px;line-height:1.5;opacity:.7}
.pf .mark{color:#fff}
.pf .mt{margin-top:18px;max-width:300px;line-height:1.6}
.pf .nl{display:flex;gap:6px;margin-top:24px;background:rgba(255,255,255,.08);border-radius:99px;padding:5px;max-width:340px}
.pf .nl input{flex:1;min-width:0;border:0;background:transparent;color:#fff;font:inherit;font-size:14.5px;padding:0 14px;outline:none}
.pf .nl input::placeholder{color:rgba(255,255,255,.45)}
.pf .nl button{height:40px;padding:0 16px;border:0;border-radius:99px;background:#fff;color:#1A3A3A;font:inherit;font-weight:650;font-size:14px;cursor:pointer}
.pf h4{margin:0 0 14px;color:#fff;font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:700}
.pf a{display:block;padding:5px 0;color:rgba(255,255,255,.66)}.pf a:hover{color:#fff}
.pf .bot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;margin-top:56px;padding-top:24px;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.45)}
.pf .bot span a{display:inline-block;white-space:nowrap;margin-left:18px;color:rgba(255,255,255,.45)}
.pf .bot span:first-child{white-space:nowrap}
@media (max-width:980px){.pf .top{grid-template-columns:1fr 1fr}.pf .top>div:first-child{grid-column:1/-1}}
.px-cl{position:relative;display:flex;align-items:center;height:42px;padding:0 16px 0 10px;margin-right:6px;font-size:15px;font-weight:600;color:#6A7472;white-space:nowrap}
.px-cl:hover{color:#172524}
.px-cl::after{content:"";position:absolute;right:0;top:50%;width:1px;height:20px;margin-top:-10px;background:#E4E0D8}
.px-mob .px-mcl{margin-top:14px;padding-top:16px;border-top:1px solid #DCD7CC;color:#6A7472}
@media (max-width:1320px){.px-cl{font-size:14.5px;padding:0 12px 0 6px;margin-right:4px}}
@media (max-width:1180px){.px-cl{display:none}}
/* Place pour « Devenir agent de ménage » : espacements resserrés (polices et couleurs inchangées). */
@media (min-width:1321px){.px .in{gap:12px}.px-nav{margin-left:4px}.px-it>a,.px-it>button{padding:0 9px}.px-r .b{padding:0 16px}.px-cl{padding:0 12px 0 4px;margin-right:2px}}
@media (max-width:1240px){.px .in{gap:10px}.px-nav{margin-left:4px}.px-it>a,.px-it>button{padding:0 8px}.px-cl{padding:0 10px 0 2px;margin-right:0}}`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  const chev = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const hd = document.getElementById('hd');
  if (hd) {
    hd.className = 'px';
    hd.innerHTML = `<div class="in"><a class="mark" href="Accueil.html">${LOGO}<span>deltom<i>.</i></span></a>
      <nav class="px-nav">${NAV.map(([l, v, lb]) => typeof v === 'string'
        ? `<div class="px-it${v === here ? ' on' : ''}"><a href="${v}">${l}</a></div>`
        : `<div class="px-it${v.some(x => x[0] === here) ? ' on' : ''}"><button type="button" aria-expanded="false" aria-haspopup="true">${l}${chev}</button><div class="px-mg"><div class="lb"><b>${lb[0]}</b><span>${lb[1]}</span></div><div class="lk">${v.map(([h, t, s]) => `<a href="${h}" class="${h === here ? 'cur' : ''}"><b>${t}</b><span>${s}</span></a>`).join('')}</div></div></div>`).join('')}</nav>
      <div class="px-r"><a class="px-cl" href="club-operateurs.html">Devenir agent de ménage</a><a class="b px-l" href="${APP}">Se connecter</a><a class="b px-p" href="${APP}">Créer mon compte</a><button class="px-bg" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="px-mob"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 5h14M2 13h14" stroke="#172524" stroke-width="1.8" stroke-linecap="round"/></svg></button></div></div>
      <div class="px-mob" id="px-mob">${NAV.map(([l, v]) => typeof v === 'string' ? `<a href="${v}">${l}</a>` : `<h5>${l}</h5>${v.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}`).join('')}<a class="px-mcl" href="club-operateurs.html">Devenir agent de ménage</a><a href="${APP}">Se connecter</a><a class="b px-p" href="${APP}">Créer mon compte</a></div>`;
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
    const setMob = o => { mob.classList.toggle('on', o); bg.setAttribute('aria-expanded', o); bg.setAttribute('aria-label', o ? 'Fermer le menu' : 'Ouvrir le menu'); };
    bg.onclick = () => setMob(!mob.classList.contains('on'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mob.classList.contains('on')) { setMob(false); bg.focus(); } });
    const sc = () => hd.classList.toggle('sc', scrollY > 6); addEventListener('scroll', sc, { passive: true }); sc();
  }
  const ft = document.getElementById('ft');
  if (ft) {
    ft.className = 'pf';
    const M = l => MENU.find(m => m[0] === l);
    const col = l => `<div><h4>${M(l)[0]}</h4>${M(l)[1].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>`;
    ft.innerHTML = `<div class="in"><div class="top">
      <div><a class="mark" href="Accueil.html">${LOGO}<span>deltom<i>.</i></span></a><p class="mt">Pensé par des hôtes, fait par des mains d'experts. Ménage supervisé et linge hôtelier pour la location courte durée en Île-de-France.</p>
      <form class="nl" onsubmit="event.preventDefault();this.innerHTML='<span style=&quot;padding:10px 14px;color:#fff&quot;>Merci, à très vite.</span>'"><input type="email" required placeholder="Votre e-mail" aria-label="E-mail" /><button>S'abonner</button></form></div>
      ${col('Solutions')}${col('Services')}${col('Ressources')}<div><h4>Agents de ménage</h4><a href="club-operateurs.html">Devenir agent de ménage</a><a href="devenir-operateur.html">Missions près de chez vous</a><a href="guide-creer-micro-entreprise-menage.html">Créer sa micro-entreprise</a></div><div><h4>Entreprise</h4>${M('Entreprise')[1].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="tarifs.html">Tarifs</a><a href="${APP}">Espace client</a></div>
    </div><div class="bot"><span>© 2026 DELTOM GROUPE SAS · 57 rue du Centre, 94490 Ormesson-sur-Marne · <a href="mailto:contact@deltomops.com">contact@deltomops.com</a></span><p class="ml">Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le compte des opérateurs (mandat de facturation).</p><span><a href="../site-actuel/mentions-legales.html">Mentions légales</a><a href="../site-actuel/cgv.html">CGV</a><a href="../site-actuel/confidentialite.html">Confidentialité</a></span></div></div>`;
  }
  let lgN = 0; document.querySelectorAll('.mark').forEach(m => { if (!m.querySelector('svg')) { const id = 'plm' + (lgN++); m.innerHTML = LOGO.replace('id="plm"', 'id="' + id + '"').replace('url(#plm)', 'url(#' + id + ')') + '<span>' + m.innerHTML + '</span>'; } });
  // animations légères
  document.head.insertAdjacentHTML('beforeend', `<style>
@keyframes pa-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes pa-pop{0%{opacity:0;transform:rotate(-6deg) scale(.85)}70%{transform:rotate(0) scale(1.04)}100%{opacity:1;transform:rotate(-1.5deg) scale(1)}}
@keyframes pa-zoom{from{transform:scale(1.06)}to{transform:scale(1)}}
.hero h1,.ph-hero h1{animation:pa-up .8s cubic-bezier(.2,.8,.2,1) both}
.hero h1 span,.ph-hero h1 span{animation:pa-pop .7s cubic-bezier(.2,.8,.2,1) .45s both}
.hero p,.ph-hero .ld,.ph-hero .eb,.ph-hero .crumb{animation:pa-up .8s cubic-bezier(.2,.8,.2,1) .12s both}
.hero .ask,.hero .res,.ph-hero .ctas{animation:pa-up .8s cubic-bezier(.2,.8,.2,1) .24s both}
.hero .imgs .m,.ph-hero .img{animation:pa-up .9s cubic-bezier(.2,.8,.2,1) .18s both;overflow:hidden}
.hero .imgs .m image-slot,.ph-hero .img image-slot{animation:pa-zoom 1.6s cubic-bezier(.2,.8,.2,1) both}
.chip{animation:pa-up .7s cubic-bezier(.2,.8,.2,1) both,fl 5s ease-in-out 1s infinite}
.chip.c1{animation-delay:.55s,1s}.chip.c2{animation-delay:.75s,1.2s}.chip.c3{animation-delay:.95s,1.4s}
.bx,.tm,.cd,.lv,.pr>div,.post,.zn>div,.steps>div{transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,opacity .7s cubic-bezier(.2,.8,.2,1)}
.bx:hover,.tm:hover,.cd:hover,.lv:hover,.pr>div:hover,.zn>div:hover,.steps>div:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(23,37,36,.09)}
.tm .ph image-slot,.bx .ph image-slot,.sp .im image-slot,.post .im image-slot,.cd .ph image-slot{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.tm:hover .ph image-slot,.bx:hover .ph image-slot,.post:hover .im image-slot,.cd:hover .ph image-slot{transform:scale(1.04)}
.b{transition:transform .15s,background .15s,box-shadow .2s}.b:hover{transform:translateY(-1px)}
.vs .r{transition:background .2s}.vs .r:not(.hr):hover{background:rgba(255,255,255,.55)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
html,body{overflow-x:clip}img,svg,video{max-width:100%}
.px{padding-top:env(safe-area-inset-top,0px)}.px .in{padding-left:max(clamp(20px,4vw,48px),env(safe-area-inset-left,0px));padding-right:max(clamp(20px,4vw,48px),env(safe-area-inset-right,0px))}.pf{padding-bottom:calc(34px + env(safe-area-inset-bottom,0px))}
@media (max-width:640px){
.pf a{padding:11px 0;min-height:44px;box-sizing:border-box}.pf .bot span a{padding:10px 0;margin-left:14px}.pf .top{gap:8px 24px}.pf h4{margin-top:18px}
.mark{min-height:44px;display:inline-flex;align-items:center}
.bx-go{min-height:44px;display:inline-flex!important;align-items:center}
.px .in{height:64px}.px-mob.on{max-height:calc(100vh - 64px)}
input,select,textarea{font-size:16px!important}
.b{min-height:48px}
.ph-hero{border-radius:28px;margin:6px 8px 0;padding-top:24px!important;padding-bottom:22px!important}.ph-hero .img{height:clamp(170px,48vw,200px)!important;border-radius:22px}
.ph-hero .img:has(.an){height:212px!important}.ph-hero .img .an{padding:6px}.ph-hero .img .an .an-c{transform:scale(.62);transform-origin:center}.ph-hero .img .an .an-toast{transform:translate(-50%,0) scale(.8)}
.ph-hero .img:has(.lvp){display:none}
.ph-hero .w{gap:18px}
.ph-hero .eb{height:28px;font-size:12px;padding:0 12px}
.ph-hero h1{margin-top:12px;font-size:clamp(29px,8.2vw,36px);line-height:1.06;letter-spacing:-.045em;text-wrap:balance}
.ph-hero h1 span{display:inline;padding:0 .14em;border-radius:10px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transform:none;line-height:1.25}
.ph-hero p.ld{margin-top:10px;font-size:15px;line-height:1.5}
.ph-hero .ctas{margin-top:16px;flex-wrap:nowrap;gap:8px}.ph-hero .ctas .b{flex:1 1 0;min-width:0;min-height:46px;padding-left:10px;padding-right:10px;font-size:14.5px}
.end,.nl,.ar-h{border-radius:28px;margin-left:8px;margin-right:8px}
.sec:not(.t0){padding-top:clamp(48px,12vw,72px)}.sec{padding-bottom:clamp(48px,12vw,72px)}
.sp .im{height:clamp(280px,84vw,380px);border-radius:24px}
.ctas{gap:10px}.ctas .b{flex:1 1 auto;justify-content:center}
.faq summary{padding-top:18px;padding-bottom:18px}
h1,h2,h3{text-wrap:balance;overflow-wrap:break-word;hyphens:auto}
.b{white-space:normal;max-width:100%;text-align:center;line-height:1.25;padding-top:10px;padding-bottom:10px;height:auto}
.ex{font-size:12px}
.tb th,.tb td{padding:13px 14px;font-size:14.5px}.tb th{font-size:12px}
a.mo,.su-alt,a.mo:link{display:inline-flex;align-items:center;min-height:44px}
.gm-f a{height:44px}
table{max-width:100%}
.pr a,.tb a,.zn a{display:inline-flex;align-items:center;min-height:44px}
.pr em,.tb em,.sres em{font-size:12.5px!important}
.stp button,.sstep button,[class*=step] button{min-width:44px;min-height:44px}
}
</style>`);
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
  if (!window.DeltomAuth) document.body.appendChild(Object.assign(document.createElement('script'), { src: 'auth.js' }));
})();
