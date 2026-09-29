// forms.js — envoi réel des formulaires vers Formspree.
// Règle : le succès ne s'affiche QUE si Formspree répond OK. Sinon, message d'erreur
// avec l'e-mail et le WhatsApp en secours. Jamais de faux « Merci ».
//
// Usage dans le HTML :
//   <form data-fs="contact|prestataire|newsletter" data-subject="…" data-next="/merci-contact">
//   - data-next  : page de remerciement après succès (sinon la classe `sent` est ajoutée au formulaire)
//   - data-ok    : texte qui remplace le formulaire après succès (newsletter du pied de page)
(function () {
  const EP = {
    contact: 'https://formspree.io/f/mqeqwkqz',      // demandes hôtes
    newsletter: 'https://formspree.io/f/mqeqwkqz',   // même boîte, sujet distinct
    prestataire: 'https://formspree.io/f/mwvgpkna',  // candidatures opérateurs
  };
  const MAIL = 'contact@deltomops.com', WA = 'https://wa.me/33759037259';

  async function send(kind, data) {
    const r = await fetch(EP[kind], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r;
  }

  const errOf = form => form.dataset.err === 'after' ? (form.nextElementSibling && form.nextElementSibling.classList.contains('fs-err') ? form.nextElementSibling : null) : form.querySelector('.fs-err');
  function errBox(form, msg) {
    let e = errOf(form);
    if (!e) {
      e = document.createElement('p');
      e.className = 'fs-err'; e.setAttribute('role', 'alert');
      e.style.cssText = 'grid-column:1/-1;flex-basis:100%;margin:8px 0 0;padding:12px 16px;border-radius:14px;background:#FBEAE8;color:#8E2A20;font-size:14px;line-height:1.5;max-width:340px';
      const btn = form.querySelector('[type=submit]');
      if (form.dataset.err === 'after') form.after(e);
      else if (btn && btn.parentNode === form) form.insertBefore(e, btn);
      else form.appendChild(e);
    }
    e.innerHTML = msg;
    return e;
  }
  const failMsg = () => 'L’envoi n’a pas abouti. Réessayez, ou écrivez-nous à <a href="mailto:' + MAIL + '" style="color:inherit;font-weight:700;text-decoration:underline">' + MAIL + '</a> ou sur <a href="' + WA + '" target="_blank" rel="noopener" style="color:inherit;font-weight:700;text-decoration:underline">WhatsApp</a>.';

  // Contrôle des champs requis (y compris pour les formulaires en novalidate).
  function invalid(form) {
    const req = [...form.querySelectorAll('[required]')].filter(el => !el.closest('[hidden]'));
    for (const el of req) {
      const v = el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
      const bad = !v || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()))
        || (el.type === 'tel' && el.value.replace(/\D/g, '').length < 9);
      if (bad) return el;
    }
    return null;
  }

  function collect(form) {
    const d = {};
    new FormData(form).forEach((v, k) => { if (k && String(v).trim()) d[k] = String(v).trim(); });
    // Champ e-mail sans attribut name (newsletters)
    if (!d.email) { const em = form.querySelector('input[type=email]'); if (em && em.value.trim()) d.email = em.value.trim(); }
    // Groupes de boutons (choix unique / multiple) du formulaire opérateur
    form.querySelectorAll('.sg').forEach(g => { const on = g.querySelector('button.on'); if (on) d[g.dataset.name || 'statut'] = on.textContent.trim(); });
    form.querySelectorAll('.ch').forEach(g => { const on = [...g.querySelectorAll('button.on')].map(b => b.textContent.trim()); if (on.length) d[g.dataset.name || 'disponibilites'] = on.join(', '); });
    d.page = location.pathname;
    return d;
  }

  // Les bascules (.sg) et puces (.ch) sont gérées par la page ; on lit juste leur état à l'envoi.

  document.querySelectorAll('form[data-fs]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const old = errOf(form); if (old) old.remove();
      const bad = invalid(form);
      if (bad) {
        errBox(form, bad.type === 'checkbox' ? 'Merci de cocher la case pour continuer.' : 'Merci de compléter ce champ : ' + ((bad.closest('label') || {}).textContent || bad.placeholder || '').trim().split('\n')[0] + '.');
        bad.focus(); return;
      }
      const btn = form.querySelector('[type=submit]');
      const label = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.style.opacity = '.6'; btn.textContent = 'Envoi…'; }
      const data = collect(form);
      data._subject = form.dataset.subject || 'Formulaire du site Deltom';
      try {
        await send(form.dataset.fs, data);
        if (form.dataset.next) { location.href = form.dataset.next; return; }
        if (form.dataset.ok) { form.innerHTML = '<span style="padding:10px 14px;color:#fff">' + form.dataset.ok + '</span>'; return; }
        form.classList.add('sent');
        if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.innerHTML = label; }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.innerHTML = label; }
        errBox(form, failMsg());
      }
    });
  });

  window.DeltomForms = { send, failMsg };
})();
