// build.mjs — génère le site statique (dist/) à partir des maquettes du design.
//
//   design/site/*.html   pages (maquettes hifi, source de vérité du contenu)
//   design/site/*.css|js styles et scripts des pages
//   design/client-web/   console client affichée en aperçu sur l'accueil
//   public/              favicons, manifest, pages légales statiques
//
// Chaque page sort en HTML complet : en-tête, menus, pied de page et textes sont
// présents sans JavaScript (exigence SEO du handoff). Le JS ne fait qu'animer.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { header, footer, logo, resetLogos, PRO_CSS } from './site.mjs';
import { buildDemos } from './demos.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(ROOT, 'design/site');
const OUT = path.join(ROOT, 'dist');
const PUB = path.join(ROOT, 'public');
const SITE = 'https://www.deltomops.com';
const TODAY = new Date().toISOString().slice(0, 10);

const FORMSPREE = {
  contact: 'https://formspree.io/f/mqeqwkqz',     // demandes hôtes
  newsletter: 'https://formspree.io/f/mqeqwkqz',
  prestataire: 'https://formspree.io/f/mwvgpkna', // candidatures opérateurs
};
// Branchement des formulaires des maquettes (comportement dans design/site/forms.js).
const FORMS = [
  { page: 'contact.html', sel: '#ecrire', fs: 'contact', subject: 'Demande de contact (site)', next: '/merci-contact' },
  { page: 'devenir-operateur.html', sel: '#fm', fs: 'prestataire', subject: 'Inscription société de ménage (site)', next: '/merci-prestataire' },
  { page: 'club-operateurs.html', sel: 'form.fm2', fs: 'prestataire', subject: 'Demande du programme de formation (Club)', next: '/merci-programme' },
  { page: '*', sel: 'form.nlf', fs: 'newsletter', subject: 'Inscription newsletter (guides)' },
];

const FAVICONS = `<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;
const GSC = '<meta name="google-site-verification" content="2HT3Jg52HwU-FlTonByby0Y9nKa0MwTZbHjh1h6IaJI" />';
// Sans JavaScript, les blocs à apparition (.rv) restent visibles.
const NOSCRIPT = '<noscript><style>.rv{opacity:1!important;transform:none!important}</style></noscript>';

const warn = [];
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// --- 1. Nettoyage + fichiers publics --------------------------------------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(PUB, OUT, { recursive: true });

// --- 2. Carte des routes (depuis la balise canonical de chaque page) --------
const pages = fs.readdirSync(SRC).filter(f => f.endsWith('.html')).sort();
const ROUTE = {};
for (const f of pages) {
  const m = read(path.join(SRC, f)).match(/<link rel="canonical" href="([^"]+)"/);
  if (!m) throw new Error(`${f} : balise canonical manquante`);
  const u = new URL(m[1]);
  if (u.origin !== SITE) throw new Error(`${f} : canonical hors domaine (${m[1]})`);
  ROUTE[f] = u.pathname;
}
const outFile = r => path.join(OUT, r === '/' ? 'index.html' : r.slice(1) + '.html');

// Réécrit les références vers les pages (.html → URL propre), dans le HTML comme dans le JS.
const byLength = Object.keys(ROUTE).sort((a, b) => b.length - a.length);
const PAGE_RE = new RegExp(`(?<=["'(=\\s\`])(?:\\./)?(${byLength.map(escRe).join('|')})(?=[#?"'\`)\\s])`, 'g');
function rewriteRefs(s) {
  return s
    .replace(/\.\.\/site-actuel\/(connexion|mentions-legales|cgv|confidentialite)\.html/g, '/$1')
    .replace(PAGE_RE, (_, f) => ROUTE[f]);
}

// --- 3. Styles, scripts, polices, images ------------------------------------
const A = path.join(OUT, 'assets');
const SKIP = new Set(['pro.js', 'auth.js', 'dir.js']); // pro.js → pro-client.js ; auth.js remplacé par /connexion
for (const f of fs.readdirSync(SRC)) {
  if (!/\.(css|js)$/.test(f) || SKIP.has(f)) continue;
  const s = read(path.join(SRC, f));
  write(path.join(A, f), f.endsWith('.js') ? rewriteRefs(s) : s);
}
write(path.join(A, 'pro.css'), PRO_CSS);
fs.cpSync(path.join(SRC, 'fonts'), path.join(A, 'fonts'), { recursive: true });
fs.cpSync(path.join(SRC, 'og'), path.join(OUT, 'og'), { recursive: true });

// --- 4. Pages ------------------------------------------------------------------
const toAsset = v => (!v || /^(https?:|\/|#|data:|mailto:|tel:)/.test(v)) ? v : '/assets/' + v.replace(/^\.\//, '');
const sitemap = [];

for (const f of pages) {
  const route = ROUTE[f];
  const { document } = parseHTML(rewriteRefs(read(path.join(SRC, f))));
  const head = document.head;
  resetLogos();

  // En-tête : favicons validés, feuilles de style, police préchargée.
  const icon = head.querySelector('link[rel="icon"]');
  const favs = parseHTML(`<html><head>${FAVICONS}</head></html>`).document.head.children;
  if (icon) { for (const el of [...favs]) icon.before(el); icon.remove(); }
  else for (const el of [...favs]) head.append(el);
  if (route === '/') head.querySelector('meta[name="viewport"]').after(parseHTML(`<html><head>${GSC}</head></html>`).document.head.firstElementChild);
  head.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]').forEach(l => l.setAttribute('href', toAsset(l.getAttribute('href'))));

  // En-tête et pied de page rendus ici (plus d'injection JavaScript).
  const usesPro = !!document.querySelector('script[src="pro.js"]');
  const hd = document.getElementById('hd'), ft = document.getElementById('ft');
  if (hd) hd.outerHTML = rewriteRefs(header(f));
  if (ft) ft.outerHTML = rewriteRefs(footer());
  if (usesPro) {
    head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="/assets/pro.css" />');
    document.querySelectorAll('.mark').forEach(m => { if (!m.querySelector('svg')) m.innerHTML = logo() + '<span>' + m.innerHTML + '</span>'; });
  }
  head.insertAdjacentHTML('beforeend', NOSCRIPT);
  // Zones tactiles ≥ 44 px sur mobile (chargée en dernier, voir design/site/mobile.css).
  head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="/assets/mobile.css" />');

  // Aperçus en iframe.
  document.querySelectorAll('iframe[src]').forEach(fr => {
    const src = fr.getAttribute('src');
    const q = src.includes('?') ? src.slice(src.indexOf('?')) : '';
    if (src.includes('client-web/Console')) fr.setAttribute('src', '/demo/console' + q);
    else if (src.startsWith('voyageur/')) fr.setAttribute('src', '/demo/voyageur' + q);
    if (!fr.hasAttribute('loading')) fr.setAttribute('loading', 'lazy');
  });

  // Formulaires : envoi réel (et repli sans JavaScript vers Formspree).
  for (const c of FORMS.filter(c => c.page === f || c.page === '*')) {
    document.querySelectorAll(c.sel).forEach(form => {
      form.setAttribute('data-fs', c.fs);
      form.setAttribute('data-subject', c.subject);
      if (c.next) form.setAttribute('data-next', c.next);
      form.setAttribute('action', FORMSPREE[c.fs]);
      form.setAttribute('method', 'post');
      const em = form.querySelector('input[type="email"]:not([name])'); if (em) em.setAttribute('name', 'email');
    });
  }
  const st = document.getElementById('fm-st'); if (st) st.setAttribute('data-name', 'statut');
  const dispo = document.getElementById('fm-dispo'); if (dispo) dispo.setAttribute('data-name', 'disponibilites');

  // Scripts : chemins /assets, pro.js → pro-client.js, sans auth.js.
  document.querySelectorAll('script[src]').forEach(s => {
    const src = s.getAttribute('src');
    if (src === 'pro.js') s.setAttribute('src', '/assets/pro-client.js');
    else if (src === 'auth.js' || src === 'dir.js') s.remove();
    else if (src === 'image-slot.js' && !document.querySelector('image-slot')) s.remove();
    else s.setAttribute('src', toAsset(src));
  });
  if (document.querySelector('form[data-fs]')) document.body.insertAdjacentHTML('beforeend', '<script src="/assets/forms.js"></script>');

  const html = document.toString();
  if (/\.\.\/site-actuel|client-web\/|unpkg\.com|href="[A-Za-z-]+\.html/.test(html)) warn.push(`${f} : référence non réécrite`);
  write(outFile(route), html);
  const robots = head.querySelector('meta[name="robots"]');
  if (!(robots && /noindex/.test(robots.getAttribute('content')))) sitemap.push(route);
}

// --- 5. Aperçus (console client, parcours voyageur) -------------------------
await buildDemos(ROOT, OUT);

// --- 6. sitemap.xml + robots.txt -------------------------------------------
for (const r of ['/mentions-legales', '/cgv', '/confidentialite']) sitemap.push(r);
const prio = r => r === '/' ? '1.0' : /^\/(tarifs|contact|club-operateurs|devenir-operateur|gestion-menages)$/.test(r) ? '0.9' : /^\/(mentions-legales|cgv|confidentialite)$/.test(r) ? '0.3' : '0.7';
write(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(r => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc><lastmod>${TODAY}</lastmod><priority>${prio(r)}</priority></url>`).join('\n')}
</urlset>
`);
write(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /connexion
Disallow: /demo/

Sitemap: ${SITE}/sitemap.xml
`);

// --- 7. Contrôle des liens internes -------------------------------------------
const exists = p => {
  const clean = p.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (clean === '/') return fs.existsSync(path.join(OUT, 'index.html'));
  return fs.existsSync(path.join(OUT, clean.slice(1))) || fs.existsSync(path.join(OUT, clean.slice(1) + '.html'));
};
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
let links = 0;
const idsOf = f => new Set([...read(f).matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
for (const file of walk(OUT).filter(x => x.endsWith('.html') && !x.includes(`${path.sep}demo${path.sep}`))) {
  const html = read(file), ids = idsOf(file), rel = path.relative(OUT, file);
  for (const [, v] of html.matchAll(/(?:href|src|action)="(\/[^"]*)"/g)) {
    links++;
    if (!exists(v)) { warn.push(`${rel} → lien interne cassé : ${v}`); continue; }
    const [p, anchor] = v.split('#');
    if (anchor) {
      const clean = p.split('?')[0].replace(/\/$/, '') || '/';
      const target = clean === '/' ? path.join(OUT, 'index.html') : path.join(OUT, clean.slice(1) + '.html');
      if (fs.existsSync(target) && !idsOf(target).has(anchor)) warn.push(`${rel} → ancre inexistante : ${v}`);
    }
  }
  for (const [, a] of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(a)) warn.push(`${rel} → ancre inexistante : #${a}`);
}

console.log(`✓ ${pages.length} pages, ${sitemap.length} URL dans le sitemap, ${links} liens internes vérifiés`);
if (warn.length) { console.log(`⚠️  ${warn.length} avertissement(s) :\n  ` + [...new Set(warn)].join('\n  ')); process.exitCode = 1; }
