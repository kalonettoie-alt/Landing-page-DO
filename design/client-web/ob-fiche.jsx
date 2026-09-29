// ob-fiche.jsx — fiche logement plein écran : cartes récapitulatives à gauche, édition de la carte choisie à droite.
// Reprend les champs du parcours de création (ObAddLogement en mode embed). Expose: ObFicheLogement, obDemoLogement

function obDemoLogement(l) {
  const type = { Studio: 'Studio', T2: 'T2', T3: 'T3' }[l.kind] || 'T2';
  return {
    adresse: l.addr || `${l.name}, ${l.loc || 'Paris'}`, etage: '3e avec ascenseur', appart: 'Appartement 32',
    type, surface: type === 'Studio' ? '24 m²' : type === 'T2' ? '38 m²' : '62 m²',
    checkout: '11:00', checkin: '16:00',
    acces: ['Boîte à clés', 'Digicode'], codes: { 'Boîte à clés': '4812', 'Digicode': 'B2917' },
    etapes: ['Entrer par la porte cochère', 'Boîte à clés à gauche des boîtes aux lettres'], porte: 'Bâtiment B, porte droite', lienAcces: '',
    checklist: OA_CHECKLIST.map(([n, it]) => [n, [...it]]),
    points: ['Poubelles un jour précis', 'Matériel fourni sur place'],
    erreurs: 'Lit refait sans changer les draps.', plaintes: 'Cheveux dans la douche.',
    consignes: "Linge dans le placard de l'entrée, deux jeux complets.",
    couchages: { double: 1, simple: 0, canape1: 0, canape2: type === 'Studio' ? 0 : 1 },
    blanchisserie: true, draps: 'Deltom fournit le linge',
    kits: { kdouble: type === 'Studio' ? 1 : 2, ksimple: 0 },
    eponge: { grande: 2, serviette: 2, tapis: 1 },
    conso: { pq: 1, savon: 1, vaisselle: 0, cafe: 1, sacs: 1 },
    freq: 'Après chaque séjour', creneau: '11:00 – 14:00', ical: {}, sync: 'Maintenant',
    cals: [{ p: 'Airbnb', url: 'https://www.airbnb.fr/calendar/ical/4829.ics' }, { p: 'Booking', url: 'https://admin.booking.com/ical/77120.ics' }],
    annonces: ['https://www.airbnb.fr/rooms/4829'],
  };
}

function lfCalc(d) {
  const dtm = d.draps === 'Deltom fournit le linge';
  const couchages = OA_COUCHAGES.reduce((s, [k, , , w]) => s + (d.couchages[k] || 0) * w, 0);
  const prix = OA_PRIX_MENAGE[d.type];
  const linge = d.blanchisserie ? OA_KITS.reduce((s, [k, , p1, p2]) => s + (d.kits[k] || 0) * (dtm ? p2 : p1), 0) + OA_EPONGE.reduce((s, [k, , p]) => s + (d.eponge[k] || 0) * p, 0) : 0;
  const conso = OA_CONSO.reduce((s, [k, , p]) => s + (d.conso[k] || 0) * p, 0);
  return { couchages, prix, linge, conso, total: (prix || 0) + linge + conso };
}

// [id, titre, sous-titre panneau, étape du parcours, résumé(d, calc) → lignes]
const LF_CARDS = {
  logement: [
    ['adresse', 'Adresse', "L'adresse et l'étage.", 0, d => [d.adresse, [d.etage, d.appart].filter(Boolean).join(' · ')]],
    ['acces', 'Accès', "Type d'accès, étapes et repères sur place.", 0, d => [d.acces.join(' · ') || 'À compléter', d.etapes.filter(Boolean).length ? `${d.etapes.filter(Boolean).length} étape(s) d'accès` : d.porte]],
    ['horaires', 'Horaires des voyageurs', "Départ et arrivée fixent la plage d'intervention.", 1, d => [`Départ ${d.checkout} · Arrivée ${d.checkin}`]],
    ['checklist', 'Checklist', 'Ce qui est fait à chaque passage.', 1, d => [d.checklist.length ? `${d.checklist.reduce((s, p) => s + p[1].length, 0)} tâches · ${d.checklist.length} pièces` : 'Checklist standard Deltom']],
    ['consignes', 'Consignes', 'Ce qui rend ce logement particulier.', 1, d => [(d.points || []).join(' · ') || 'Aucune', d.consignes], true],
    ['cals', 'Calendriers', 'Deltom écoute vos réservations.', 3, d => [d.cals.filter(c => c.url).map(c => c.p).join(' · ') || 'Aucun calendrier connecté', d.cals.filter(c => c.url).length ? 'Synchronisé il y a 12 min' : '']],
    ['annonces', 'Annonces', 'Les liens de vos annonces.', 3, d => [d.annonces.filter(Boolean).length ? `${d.annonces.filter(Boolean).length} lien(s)` : 'Aucun lien']],
  ],
  prestations: [
    ['taille', 'Taille du logement', 'Elle fixe le prix du ménage.', 2, (d, c) => [[d.type, d.surface].filter(Boolean).join(' · '), c.prix ? `Ménage ${oaEur(c.prix)} TTC` : 'Sur devis']],
    ['couchages', 'Couchages', 'Les kits de linge en découlent.', 2, (d, c) => [`${c.couchages} couchage${c.couchages > 1 ? 's' : ''}`, OA_COUCHAGES.filter(([k]) => d.couchages[k]).map(([k, nm]) => `${d.couchages[k]} ${nm.toLowerCase()}`).join(', ')]],
    ['linge', 'Linge & blanchisserie', 'Draps et serviettes, par passage.', 2, (d, c) => [d.blanchisserie ? d.draps : 'Non souscrite', d.blanchisserie ? `${oaEur(c.linge)} par passage` : '']],
    ['conso', 'Consommables', 'Le kit déposé à chaque passage.', 2, (d, c) => [c.conso ? `${oaEur(c.conso)} par passage` : 'Aucun', OA_CONSO.filter(([k]) => d.conso[k]).map(([, nm]) => nm.split(' (')[0]).join(' · ')], true],
    ['prix', "Prix d'une intervention", 'Le détail recalculé en direct.', 2, (d, c) => [c.prix ? `${oaEur(c.total)} TTC` : `${oaEur(c.total)} + devis`, 'Ménage, linge et consommables']],
  ],
};

function ObFicheLogement({ l, onBack, onSave, onToggle }) {
  const [tab, setTab] = React.useState('logement');
  const [sel, setSel] = React.useState('adresse');
  const [draft, setDraft] = React.useState(l.data);
  const [gen, setGen] = React.useState(0);
  const [mob, setMob] = React.useState(false);
  const pane = React.useRef(null);
  const c = lfCalc(draft);
  const cards = LF_CARDS[tab];
  const card = [...LF_CARDS.logement, ...LF_CARDS.prestations].find(x => x[0] === sel);
  const dirty = JSON.stringify(draft) !== JSON.stringify(l.data);
  const actif = l.status !== 'bloque';
  const pick = (id) => { setSel(id); setMob(true); if (pane.current) pane.current.scrollTop = 0; };
  const switchTab = (t) => { setTab(t); pick(LF_CARDS[t][0][0]); setMob(false); };
  React.useEffect(() => {
    const k = e => { if (e.key === 'Escape') onBack(); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, []);

  return (
    <div className={'lf2' + (mob ? ' mob' : '')}>
      <aside className="lf2-l">
        <div className="lf2-lh">
          <button className="lf2-rd" onClick={onBack} aria-label="Retour aux logements">
            <span style={{ display: 'flex', transform: 'rotate(180deg)' }}><Icon name="chevron-right" size={18} /></span>
          </button>
          <div style={{ minWidth: 0 }}>
            <h1>{l.name}</h1>
            <div className="lf2-st"><span className={'ob-st ' + (actif ? 'termine' : 'bloque')}><i className="k" />{actif ? 'Actif' : 'En pause'}</span></div>
          </div>
        </div>
        <div className="lf2-tabs">
          <div className="lf2-seg">
            {[['logement', 'Le logement'], ['prestations', 'Prestations']].map(([k, lb]) => (
              <button key={k} className={tab === k ? 'on' : undefined} onClick={() => switchTab(k)}>{lb}</button>
            ))}
          </div>
        </div>
        <div className="lf2-cards proto-scroll">
          {cards.map(([id, t, , , sum, clamp]) => {
            const lines = sum(draft, c).filter(Boolean);
            return (
              <button key={id} className={'lf2-card' + (sel === id ? ' on' : '')} onClick={() => pick(id)}>
                <span className="t">{t}</span>
                {lines.map((x, k) => <span key={k} className={'s' + (clamp && k === lines.length - 1 ? ' cl' : '')}>{x}</span>)}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="lf2-r" ref={pane}>
        <div className="lf2-rc">
          <button className="lf2-back" onClick={() => setMob(false)}>
            <span style={{ display: 'flex', transform: 'rotate(180deg)' }}><Icon name="chevron-right" size={15} /></span>{l.name}
          </button>
          <h2>{card[1]}</h2>
          <p className="lf2-sub">{card[2]}</p>
          <div key={sel + ':' + gen}>
            <ObAddLogement embed only={sel} startStep={card[3]} initial={draft} onChange={setDraft} />
          </div>
        </div>
        {dirty && (
          <div className="lf2-save">
            <div className="lf2-rc row">
              <span className="k">Modifications non enregistrées</span>
              <span style={{ flex: 1 }} />
              <button className="ob-ghost" onClick={() => { setDraft(l.data); setGen(g => g + 1); }}>Annuler</button>
              <button className="ob-btn" onClick={() => onSave(draft)}>Enregistrer</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

Object.assign(window, { ObFicheLogement, obDemoLogement });
