// site.mjs — en-tête, méga-menu, menu mobile et pied de page rendus côté build.
// La navigation (MENU), le logo et les styles sont lus dans design/site/pro.js,
// qui reste la source de vérité fournie par le design. Les gabarits ci-dessous
// reproduisent à l'identique ceux de pro.js, sans JavaScript côté navigateur.
import fs from 'node:fs';

const PRO = fs.readFileSync(new URL('../design/site/pro.js', import.meta.url), 'utf8');

const grab = (re, what) => { const m = PRO.match(re); if (!m) throw new Error(`pro.js : ${what} introuvable`); return m[1]; };
// eslint-disable-next-line no-new-func
const val = src => new Function(`return (${src});`)();

export const LOGO = val(grab(/const LOGO = ('(?:[^'\\]|\\.)*');/, 'LOGO'));
export const APP = val(grab(/const APP = ('(?:[^'\\]|\\.)*');/, 'APP'));
export const MENU = val(grab(/const MENU = (\[[\s\S]*?\n  \]);/, 'MENU'));
const NAV = MENU.filter(m => m[0] !== 'Solutions');

// Styles injectés par pro.js : servis en fichier statique (/assets/pro.css).
const CSS_HEADER = grab(/const css = `([\s\S]*?)`;/, 'css');
const CSS_ANIM = grab(/insertAdjacentHTML\('beforeend', `<style>\n(@keyframes pa-up[\s\S]*?)<\/style>`\)/, 'styles d’animation');
export const PRO_CSS = `/* Généré depuis design/site/pro.js — ne pas modifier à la main. */\n${CSS_HEADER}\n${CSS_ANIM}`;

const chev = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Chaque logo porte un identifiant de masque unique dans la page.
let logoN = 0;
export const resetLogos = () => { logoN = 0; };
export const logo = () => { const id = 'plm' + (logoN++); return LOGO.replace('id="plm"', `id="${id}"`).replace('url(#plm)', `url(#${id})`); };

// `here` : nom du fichier source de la page (ex. « menage.html »), comme dans pro.js.
export function header(here) {
  return `<header id="hd" class="px"><div class="in"><a class="mark" href="Accueil.html">${logo()}<span>deltom<i>.</i></span></a>
      <nav class="px-nav" aria-label="Navigation principale">${NAV.map(([l, v, lb]) => typeof v === 'string'
    ? `<div class="px-it${v === here ? ' on' : ''}"><a href="${v}">${l}</a></div>`
    : `<div class="px-it${v.some(x => x[0] === here) ? ' on' : ''}"><button type="button" aria-expanded="false" aria-haspopup="true">${l}${chev}</button><div class="px-mg"><div class="lb"><b>${lb[0]}</b><span>${lb[1]}</span></div><div class="lk">${v.map(([h, t, s]) => `<a href="${h}" class="${h === here ? 'cur' : ''}"><b>${t}</b><span>${s}</span></a>`).join('')}</div></div></div>`).join('')}</nav>
      <div class="px-r"><a class="b px-l" href="${APP}">Se connecter</a><a class="b px-p" href="${APP}">Créer mon compte</a><button class="px-bg" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="px-mob"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 5h14M2 13h14" stroke="#172524" stroke-width="1.8" stroke-linecap="round"/></svg></button></div></div>
      <div class="px-mob" id="px-mob">${NAV.map(([l, v]) => typeof v === 'string' ? `<a href="${v}">${l}</a>` : `<h5>${l}</h5>${v.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}`).join('')}<a href="${APP}">Se connecter</a><a class="b px-p" href="${APP}">Créer mon compte</a></div></header>`;
}

export function footer() {
  const M = l => MENU.find(m => m[0] === l);
  const col = l => `<div><h4>${M(l)[0]}</h4>${M(l)[1].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>`;
  return `<footer id="ft" class="pf"><div class="in"><div class="top">
      <div><a class="mark" href="Accueil.html">${logo()}<span>deltom<i>.</i></span></a><p class="mt">Pensé par des hôtes, fait par des mains d'experts. Ménage supervisé et linge hôtelier pour la location courte durée en Île-de-France.</p>
      <form class="nl" data-fs="newsletter" data-subject="Inscription newsletter (pied de page)" data-ok="Merci, à très vite." data-err="after"><input type="email" name="email" required placeholder="Votre e-mail" aria-label="E-mail" /><button type="submit">S'abonner</button></form></div>
      ${col('Solutions')}${col('Services')}${col('Ressources')}<div><h4>Prestataires</h4><a href="club-operateurs.html">Le Club des opérateurs</a><a href="devenir-operateur.html">Missions près de chez vous</a><a href="guide-creer-micro-entreprise-menage.html">Créer sa micro-entreprise</a></div><div><h4>Entreprise</h4>${M('Entreprise')[1].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="tarifs.html">Tarifs</a><a href="${APP}">Espace client</a></div>
    </div><div class="bot"><span>© 2026 DELTOM GROUPE SAS · 57 rue du Centre, 94490 Ormesson-sur-Marne · <a href="mailto:contact@deltomops.com">contact@deltomops.com</a> · <a href="tel:+33759037259">+33 7 59 03 72 59</a></span><p class="ml">Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le compte des opérateurs (mandat de facturation).</p><span><a href="../site-actuel/mentions-legales.html">Mentions légales</a><a href="../site-actuel/cgv.html">CGV</a><a href="../site-actuel/confidentialite.html">Confidentialité</a></span></div></div></footer>`;
}
