// Données partagées des 3 directions du lien voyageur : textes FR / EN / ES + contenu du séjour.
window.LV = (function () {
  const T = {
    fr: {
      hello: 'Bonjour Camille', stay: 'Votre séjour', at: 'Studio Marais · Paris 4e',
      dates: 'Ven. 18 → Lun. 21 sept.', guests: '3 nuits · 2 voyageurs',
      m_avant: 'Avant', m_pendant: 'Pendant', m_depart: 'Départ',
      tab_home: 'Séjour', tab_access: 'Accès', tab_guide: 'Quartier', tab_help: 'Aide',
      prep_t: 'Votre logement se prépare', prep_s: 'Le ménage est en cours. Nous vous prévenons dès que tout est prêt.',
      ready_t: 'Votre logement est prêt', ready_s: 'Ménage terminé et vérifié à 13:58. Linge propre posé.',
      in_t: 'Arrivée aujourd’hui dès 16:00', in_s: 'Arrivée autonome, pas besoin d’attendre quelqu’un.',
      st1: 'Ménage terminé', st2: 'Contrôle qualité', st3: 'Linge et consommables posés',
      during_t: 'Bon séjour', during_s: 'Tout ce qu’il vous faut pendant votre séjour.',
      out_t: 'Départ demain avant 11:00', out_today: 'Départ aujourd’hui avant 11:00', out_s: 'Pas besoin de faire le ménage, notre équipe passe après vous.',
      access: 'Accès au logement', address: '12 rue des Rosiers, 75004 Paris', maps: 'Itinéraire',
      a1: 'Porte bleue, à droite de la boulangerie', a2: 'Digicode à gauche de la porte', a3: 'Boîte à clés au 3e étage, porte 32',
      door: 'Digicode', keybox: 'Boîte à clés', wifi: 'Wifi', copy: 'Copier', copied: 'Copié',
      up_early: 'Arrivée anticipée', up_early_s: 'Entrez dès 13:00 au lieu de 16:00',
      up_clean: 'Ménage pendant le séjour', up_clean_s: 'Draps et serviettes changés',
      up_late: 'Départ tardif', up_late_s: 'Profitez jusqu’à 14:00',
      book: 'Réserver', booked: 'Demandé', offer: 'Pour vous',
      guide: 'Le quartier', g1: 'Boulangerie', g1s: '2 min à pied · dès 7:00', g2: 'Café pour travailler', g2s: '5 min à pied · wifi rapide', g3: 'Musée Picasso', g3s: '8 min à pied',
      rules: 'Règles de la maison', r1: 'Non-fumeur', r2: 'Pas de fête', r3: 'Calme après 22:00',
      check: 'Avant de partir', c1: 'Serviettes utilisées dans la baignoire', c2: 'Lave-vaisselle lancé', c3: 'Fenêtres fermées', c4: 'Clés reposées dans la boîte',
      review: 'Comment s’est passé votre séjour ?', review_s: 'Votre avis aide votre hôte et notre équipe.', review_b: 'Laisser un avis',
      contact: 'Contacter l’hôte', contact_s: 'Réponse 7j/7', help: 'Besoin d’aide ?',
      by: 'Séjour préparé par', lang: 'Langue',
      ask: 'Que souhaitez-vous ?', now: 'Maintenant', eta: 'Prêt dans ~40 min',
    },
    en: {
      hello: 'Hello Camille', stay: 'Your stay', at: 'Studio Marais · Paris 4th',
      dates: 'Fri 18 → Mon 21 Sept', guests: '3 nights · 2 guests',
      m_avant: 'Before', m_pendant: 'During', m_depart: 'Check-out',
      tab_home: 'Stay', tab_access: 'Access', tab_guide: 'Area', tab_help: 'Help',
      prep_t: 'Your place is being prepared', prep_s: 'Cleaning is in progress. We’ll let you know as soon as it’s ready.',
      ready_t: 'Your place is ready', ready_s: 'Cleaned and checked at 1:58 pm. Fresh linen in place.',
      in_t: 'Check-in today from 4:00 pm', in_s: 'Self check-in, no need to wait for anyone.',
      st1: 'Cleaning done', st2: 'Quality check', st3: 'Linen and supplies in place',
      during_t: 'Enjoy your stay', during_s: 'Everything you need during your stay.',
      out_t: 'Check-out tomorrow by 11:00 am', out_today: 'Check-out today by 11:00 am', out_s: 'No need to clean, our team comes after you.',
      access: 'Getting in', address: '12 rue des Rosiers, 75004 Paris', maps: 'Directions',
      a1: 'Blue door, right of the bakery', a2: 'Keypad on the left of the door', a3: 'Key box on the 3rd floor, door 32',
      door: 'Door code', keybox: 'Key box', wifi: 'Wi-Fi', copy: 'Copy', copied: 'Copied',
      up_early: 'Early check-in', up_early_s: 'Get in from 1:00 pm instead of 4:00 pm',
      up_clean: 'Mid-stay cleaning', up_clean_s: 'Fresh sheets and towels',
      up_late: 'Late check-out', up_late_s: 'Stay until 2:00 pm',
      book: 'Book', booked: 'Requested', offer: 'For you',
      guide: 'The neighbourhood', g1: 'Bakery', g1s: '2 min walk · from 7 am', g2: 'Café to work from', g2s: '5 min walk · fast Wi-Fi', g3: 'Picasso Museum', g3s: '8 min walk',
      rules: 'House rules', r1: 'No smoking', r2: 'No parties', r3: 'Quiet after 10 pm',
      check: 'Before you leave', c1: 'Used towels in the bathtub', c2: 'Dishwasher running', c3: 'Windows closed', c4: 'Keys back in the box',
      review: 'How was your stay?', review_s: 'Your feedback helps your host and our team.', review_b: 'Leave a review',
      contact: 'Contact your host', contact_s: 'Replies 7 days a week', help: 'Need help?',
      by: 'Stay prepared by', lang: 'Language',
      ask: 'What would you like?', now: 'Now', eta: 'Ready in ~40 min',
    },
    es: {
      hello: 'Hola Camille', stay: 'Su estancia', at: 'Studio Marais · París 4',
      dates: 'Vie 18 → Lun 21 sept.', guests: '3 noches · 2 huéspedes',
      m_avant: 'Antes', m_pendant: 'Durante', m_depart: 'Salida',
      tab_home: 'Estancia', tab_access: 'Acceso', tab_guide: 'Barrio', tab_help: 'Ayuda',
      prep_t: 'Estamos preparando su alojamiento', prep_s: 'La limpieza está en curso. Le avisaremos en cuanto esté listo.',
      ready_t: 'Su alojamiento está listo', ready_s: 'Limpio y revisado a las 13:58. Ropa de cama limpia.',
      in_t: 'Llegada hoy desde las 16:00', in_s: 'Llegada autónoma, sin esperar a nadie.',
      st1: 'Limpieza terminada', st2: 'Control de calidad', st3: 'Ropa y consumibles listos',
      during_t: 'Disfrute de su estancia', during_s: 'Todo lo que necesita durante su estancia.',
      out_t: 'Salida mañana antes de las 11:00', out_today: 'Salida hoy antes de las 11:00', out_s: 'No hace falta limpiar, nuestro equipo pasa después.',
      access: 'Cómo entrar', address: '12 rue des Rosiers, 75004 París', maps: 'Cómo llegar',
      a1: 'Puerta azul, a la derecha de la panadería', a2: 'Teclado a la izquierda de la puerta', a3: 'Caja de llaves en el 3.º, puerta 32',
      door: 'Código', keybox: 'Caja de llaves', wifi: 'Wifi', copy: 'Copiar', copied: 'Copiado',
      up_early: 'Llegada anticipada', up_early_s: 'Entre desde las 13:00 en vez de las 16:00',
      up_clean: 'Limpieza durante la estancia', up_clean_s: 'Sábanas y toallas nuevas',
      up_late: 'Salida tardía', up_late_s: 'Quédese hasta las 14:00',
      book: 'Reservar', booked: 'Solicitado', offer: 'Para usted',
      guide: 'El barrio', g1: 'Panadería', g1s: '2 min a pie · desde las 7:00', g2: 'Café para trabajar', g2s: '5 min a pie · wifi rápido', g3: 'Museo Picasso', g3s: '8 min a pie',
      rules: 'Normas de la casa', r1: 'No fumar', r2: 'No fiestas', r3: 'Silencio después de las 22:00',
      check: 'Antes de salir', c1: 'Toallas usadas en la bañera', c2: 'Lavavajillas en marcha', c3: 'Ventanas cerradas', c4: 'Llaves en la caja',
      review: '¿Qué tal su estancia?', review_s: 'Su opinión ayuda a su anfitrión y a nuestro equipo.', review_b: 'Dejar una opinión',
      contact: 'Contactar al anfitrión', contact_s: 'Respuesta 7 días', help: '¿Necesita ayuda?',
      by: 'Estancia preparada por', lang: 'Idioma',
      ask: '¿Qué desea?', now: 'Ahora', eta: 'Listo en ~40 min',
    },
  };
  const UPS = { avant: [['up_early', '25 €']], pendant: [['up_clean', '45 €'], ['up_late', '20 €']], depart: [['up_late', '20 €']] };
  const CODES = { door: 'A23B', keybox: '4471', wifi: 'rosiers2042', ssid: 'Marais_Guest' };
  const LANGS = [['fr', 'FR'], ['en', 'EN'], ['es', 'ES']];
  let lang = localStorage.getItem('lv-lang') || 'fr';
  const t = k => (T[lang] && T[lang][k]) || T.fr[k] || k;
  const setLang = (l, keep = true) => { lang = l; if (keep) localStorage.setItem('lv-lang', l); };
  const qL = new URLSearchParams(location.search).get('l'); if (qL && T[qL]) lang = qL;
  const getLang = () => lang;
  const copy = (btn, val) => { navigator.clipboard && navigator.clipboard.writeText(val).catch(() => {}); const o = btn.innerHTML; btn.classList.add('ok'); btn.textContent = t('copied'); setTimeout(() => { btn.classList.remove('ok'); btn.innerHTML = o; }, 1300); };
  const logo = (c1 = '#1a3a36', c2 = '#8C8340', s = 20) => `<svg viewBox="0 0 512 512" width="${s}" height="${s}" aria-hidden="true"><defs><mask id="lvm${s}${c1.slice(1)}"><rect width="512" height="512" fill="#000"/><circle cx="256" cy="256" r="148" fill="#fff"/><circle cx="256" cy="256" r="80" fill="#000"/><circle cx="338" cy="338" r="60" fill="#000"/></mask></defs><rect width="512" height="512" fill="${c1}" mask="url(#lvm${s}${c1.slice(1)})"/><circle cx="338" cy="338" r="45" fill="${c2}"/></svg>`;
  return { T, t, UPS, CODES, LANGS, setLang, getLang, copy, logo };
})();
