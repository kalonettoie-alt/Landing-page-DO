/* analytics.js — Vercel Web Analytics (sans cookie) + événements de conversion.
   - Le script Vercel n'est chargé qu'en production (www.deltomops.com / deltomops.com) :
     sur les Preview et en local, rien n'est envoyé ; les événements sont seulement
     affichés dans la console, pour vérification.
   - Événements (Vercel : offres Pro et Enterprise) :
       signup_hote  : clic sur « Créer mon compte… » côté hôtes (liens vers /connexion)
       signup_agent : clic sur un bouton qui ouvre l'inscription au Club
     avec la propriété « emplacement » (header, burger, hero, footer, barre_mobile,
     formulaire, bas_de_page, section_<id> ou contenu). */
(function () {
  var PROD = /^(www\.)?deltomops\.com$/.test(location.hostname);
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  if (PROD) {
    var s = document.createElement('script');
    s.src = '/_vercel/insights/script.js';
    s.defer = true;
    document.head.appendChild(s);
  }

  function send(name, emplacement) {
    var data = { emplacement: emplacement };
    if (PROD) window.va('event', { name: name, data: data });
    else console.info('[Vercel Analytics · aperçu, non envoyé] ' + name, data);
  }

  function emplacement(el) {
    if (el.closest('#px-mob, .px-mob')) return 'burger';
    if (el.closest('header.px, header.nv, #hd, #nv')) return 'header';
    if (el.closest('footer, .pf')) return 'footer';
    if (el.closest('#stk-b, .stk')) return 'barre_mobile';
    if (el.closest('.hero, .hr, .ph-hero')) return 'hero';
    if (el.closest('form')) return 'formulaire';
    if (el.closest('.end')) return 'bas_de_page';
    var sec = el.closest('section[id]');
    return sec ? 'section_' + sec.id : 'contenu';
  }

  function texte(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    // Côté hôtes : « Créer mon compte », « Créer mon compte gratuit » → /connexion
    if (/\/connexion$/.test(href) && /^Créer mon compte/i.test(texte(el))) return send('signup_hote', emplacement(el));
    // Côté Club : boutons qui ouvrent l'inscription, et envoi du formulaire « Rejoindre »
    if (el.hasAttribute('data-onb') || /club-operateurs#rejoindre$/.test(href) || el.closest('#rejoindre form#fm') && el.type === 'submit')
      return send('signup_agent', emplacement(el));
  }, true);
})();
