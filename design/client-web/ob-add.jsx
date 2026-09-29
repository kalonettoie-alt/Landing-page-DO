// ob-add.jsx — parcours « ajouter un logement » (plein écran, 7 étapes courtes)
// Globals attendus: Icon, ObLogo

const OA_STEPS = ['Logement & accès', 'Checklist & consignes', 'Taille & prestations', 'Calendriers', 'Récapitulatif'];

const OA_CONSO = [
  ['pq', 'Papier toilette (rouleau)', 2.5],
  ['savon', 'Savon mains', 1.8],
  ['vaisselle', 'Liquide vaisselle', 3.2],
  ['cafe', 'Dosettes café (×10)', 4.5],
  ['sacs', 'Sacs poubelle (rouleau)', 2],
];

const OA_ACCES = [
  ['Boîte à clés', 'Boîtier à code sur place'],
  ['Digicode', "Code à l'entrée de l'immeuble"],
  ['Serrure connectée', 'Ouverture à distance ou code temporaire'],
  ['Conciergerie immeuble', 'Clé retirée à la loge'],
  ['Clé chez voisin / commerce', 'Retrait auprès d’un tiers'],
];

const OA_CODE = ['Boîte à clés', 'Digicode', 'Serrure connectée'];
const OA_PLATEFORMES = ['Airbnb', 'Booking', 'Vrbo', 'Autre'];
const eur = (n) => n.toFixed(2).replace('.', ',') + ' €';

const OA_CHECKLIST = [
  ['État des lieux', ['Photo de chaque pièce avant le nettoyage', 'Signaler une dégradation ou une casse', 'Relever les objets oubliés par les voyageurs']],
  ['Entrée & séjour', ['Aérer, vider les poubelles', 'Dépoussiérer les surfaces', 'Aspirer et laver les sols', 'Ranger canapé et coussins']],
  ['Cuisine', ['Vider et lancer le lave-vaisselle', 'Nettoyer plan de travail et évier', 'Dégraisser plaques et hotte', 'Vider et essuyer le réfrigérateur']],
  ['Chambres', ['Changer les draps', 'Faire les lits', 'Dépoussiérer et aspirer', 'Vérifier les placards']],
  ['Salle de bain & WC', ['Détartrer douche et robinetterie', 'Nettoyer lavabo et miroir', 'Désinfecter les WC', 'Poser le linge de bain propre']],
  ['Vérification de fin de nettoyage', ['Photo de chaque pièce après le nettoyage', 'Vérifier le réassort des consommables', 'Fermer les fenêtres, couper lumières et chauffage', 'Verrouiller et reposer les clés']],
];

const OA_COUCHAGES = [
  ['double', 'Lits doubles', '2 couchages', 2],
  ['simple', 'Lits simples', '1 couchage', 1],
  ['canape1', 'Canapé-lit 1 place', '1 couchage', 1],
  ['canape2', 'Canapé-lit 2 places', '2 couchages', 2],
];

const OA_KITS = [
  ['kdouble', 'Parure lit double', 10.9, 13.99],
  ['ksimple', 'Parure lit simple', 7.9, 9.99],
];

const OA_EPONGE = [
  ['grande', 'Grande serviette', 1.5],
  ['serviette', 'Serviette de toilette', 1],
  ['tapis', 'Tapis de bain', 1.5],
];

const OA_TAILLES = [
  ['Studio', '40 € TTC / intervention'],
  ['T2', '50 € TTC / intervention'],
  ['T3', '60 € TTC / intervention'],
  ['T4 et plus', '70 € TTC / intervention'],
  ['T5 et grandes surfaces', 'Sur devis — nous contacter'],
];
const OA_PRIX_MENAGE = { 'Studio': 40, 'T2': 50, 'T3': 60, 'T4 et plus': 70, 'T5 et grandes surfaces': null };

const OA_OFFRES = [
  ['Essentiel', 'Ménage complet et changement du linge à chaque départ.'],
  ['Confort', 'Essentiel, plus la blanchisserie et le réassort des consommables.'],
  ['Sur mesure', 'Vous composez la prestation passage par passage.'],
];

function OaField({ label, hint, children }) {
  return (
    <label className="oa-f">
      <span className="lb">{label}</span>
      {children}
      {hint && <span className="ht">{hint}</span>}
    </label>
  );
}

function OaChoice({ options, value, onChange, multi }) {
  const on = (o) => multi ? (value || []).includes(o) : value === o;
  const pick = (o) => {
    if (!multi) return onChange(o);
    const v = value || [];
    onChange(v.includes(o) ? v.filter(x => x !== o) : [...v, o]);
  };
  return (
    <div className="oa-choices">
      {options.map(o => (
        <button key={o} type="button" className={'oa-ch' + (on(o) ? ' on' : '')} onClick={() => pick(o)}>
          {o}{on(o) && <Icon name="check" size={14} />}
        </button>
      ))}
    </div>
  );
}

function OaStepper({ n, onChange, min = 0 }) {
  const b = (d, dis, path) => (
    <button type="button" disabled={dis} onClick={() => onChange(n + d)}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d={path} /></svg>
    </button>
  );
  return (
    <div className="oa-stp">
      {b(-1, n <= min, 'M2.5 7h9')}
      <span className={'n' + (n === 0 ? ' z' : '')}>{n}</span>
      {b(1, false, 'M7 2.5v9M2.5 7h9')}
    </div>
  );
}

function OaCountRow({ nm, note, price, n, onChange }) {
  return (
    <div className="oa-row">
      <span className="nm">{nm}{note && <i> · {note}</i>}{price && <span className="pr">{price}</span>}</span>
      <OaStepper n={n} onChange={onChange} />
    </div>
  );
}

function OaChecklist({ value, onChange }) {
  const [add, setAdd] = React.useState(null);
  const [txt, setTxt] = React.useState('');
  const pieces = value || [];
  const commit = (pi) => {
    const t = txt.trim();
    if (t) onChange(pieces.map((p, k) => k === pi ? [p[0], [...p[1], t]] : p));
    setTxt(''); setAdd(null);
  };
  if (!pieces.length) return (
    <div className="oa-f">
      <button type="button" className="oa-dash" onClick={() => onChange(OA_CHECKLIST.map(([n, it]) => [n, [...it]]))}>Charger la checklist standard</button>
      <button type="button" className="oa-dash" onClick={() => onChange([['Nouvelle pièce', []]])}>+ Ajouter une pièce</button>
    </div>
  );
  return (
    <div className="oa-f">
      {pieces.map(([nom, items], pi) => (
        <div key={pi} className="oa-piece">
          <div className="hd"><span className="t">{nom}</span><span className="c">{items.length} item{items.length > 1 ? 's' : ''}</span></div>
          {items.map((it, ii) => (
            <div key={ii} className="oa-it">
              <span className="tx">{it}</span>
              <button type="button" className="x" aria-label="Retirer"
                onClick={() => onChange(pieces.map((p, k) => k === pi ? [p[0], p[1].filter((_, j) => j !== ii)] : p))}>
                <Icon name="close" size={15} />
              </button>
            </div>
          ))}
          {add === pi ? (
            <div className="oa-it">
              <input autoFocus value={txt} placeholder="Nouvel item…" onChange={e => setTxt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') commit(pi); if (e.key === 'Escape') { setTxt(''); setAdd(null); } }}
                onBlur={() => commit(pi)} />
            </div>
          ) : (
            <div className="oa-it"><button type="button" className="oa-dash sm" onClick={() => setAdd(pi)}>+ Ajouter un item</button></div>
          )}
        </div>
      ))}
      <button type="button" className="oa-dash sm" onClick={() => onChange([...pieces, ['Nouvelle pièce', []]])}>+ Ajouter une pièce</button>
    </div>
  );
}

const OA_HEURES = (() => { const a = []; for (let h = 7; h <= 21; h++) for (const m of ['00', '30']) a.push(`${String(h).padStart(2, '0')}:${m}`); return a; })();

function OaWheel({ label, value, onChange }) {
  const ref = React.useRef(null);
  const H = 36;
  React.useEffect(() => {
    const k = OA_HEURES.indexOf(value);
    if (ref.current && k >= 0) ref.current.scrollTop = k * H;
  }, []);
  return (
    <div className="oa-wh">
      <span className="lb">{label}</span>
      <div className="oa-wheel" ref={ref} onScroll={e => {
        const k = Math.round(e.currentTarget.scrollTop / H);
        if (OA_HEURES[k] && OA_HEURES[k] !== value) onChange(OA_HEURES[k]);
      }}>
        <div className="pad" />
        {OA_HEURES.map(o => (
          <div key={o} className={'r' + (o === value ? ' on' : '')}
            onClick={() => { onChange(o); ref.current.scrollTo({ top: OA_HEURES.indexOf(o) * H, behavior: 'smooth' }); }}>{o}</div>
        ))}
        <div className="pad" />
      </div>
      <span className="band" />
    </div>
  );
}

function OaAcces({ value, codes, onToggle, onCode }) {
  return (
    <div className="oa-cards one">
      {OA_ACCES.map(([t, sub]) => {
        const on = value.includes(t);
        return (
          <div key={t} role="button" tabIndex={0} className={'oa-card' + (on ? ' on' : '')}
            onClick={() => onToggle(t)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(t); } }}>
            <span className="t">{t}</span>
            <span className="s">{sub}</span>
            {on && <span className="ck"><Icon name="check" size={15} /></span>}
            {on && OA_CODE.includes(t) && (
              <div className="oa-incode" onClick={e => e.stopPropagation()}>
                <input value={codes[t] || ''} placeholder={t === 'Boîte à clés' ? 'Code de la boîte à clés' : t === 'Digicode' ? 'Code de la porte' : 'Code de la serrure'}
                  onChange={e => onCode(t, e.target.value)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OaCards({ options, value, onChange, one }) {
  return (
    <div className={'oa-cards' + (one ? ' one' : '')}>
      {options.map(([t, s]) => (
        <button key={t} type="button" className={'oa-card' + (value === t ? ' on' : '')} onClick={() => onChange(t)}>
          <span className="t">{t}</span>
          {s && <span className="s">{s}</span>}
          {value === t && <span className="ck"><Icon name="check" size={15} /></span>}
        </button>
      ))}
    </div>
  );
}

function OaCalSync({ seed }) {
  const demo = [
    { min: 7, res: 2, prog: 1, far: 1 },
    { min: 12, res: 3, prog: 2, far: 1 },
  ][seed % 2];
  const [st, setSt] = React.useState({ ago: `il y a ${demo.min} min`, busy: false, forcedAt: null, warn: false });
  const force = () => {
    if (st.busy) return;
    if (st.forcedAt && Date.now() - st.forcedAt < 5 * 60 * 1000) { setSt(s => ({ ...s, warn: true })); return; }
    setSt(s => ({ ...s, busy: true, warn: false }));
    setTimeout(() => setSt(s => ({ ...s, busy: false, ago: 'à l’instant', forcedAt: Date.now() })), 1300);
  };
  return (
    <div className="oa-sync">
      <div className="tx">
        <div className="l1">
          {st.busy ? <><span className="spin" />Synchronisation en cours…</> : <><i className="ok" />Synchronisé {st.ago}</>}
          <span className="oa-info" tabIndex={0} aria-label="Détail de la synchronisation">i
            <span className="tip" role="tooltip">{demo.res} réservations synchronisées · {demo.prog} ménage{demo.prog > 1 ? 's' : ''} programmé{demo.prog > 1 ? 's' : ''} · {demo.far} au-delà de 30 jours (programmée plus tard)</span>
          </span>
        </div>
        {st.warn && <div className="l3">Déjà forcée il y a moins de 5 min</div>}
      </div>
      <button type="button" className="ob-ghost sm" disabled={st.busy} onClick={force}>Forcer</button>
    </div>
  );
}

function OaRecapRow({ k, v }) {
  return <div className="oa-rr"><span className="k">{k}</span><span className="v">{v || '—'}</span></div>;
}

function ObAddLogement({ onClose, onDone, initial, startStep = 0, edit, embed, only, onChange }) {
  const Seg = ({ a, children }) => (!only || only === a) ? <>{children}</> : null;
  const [i, setI] = React.useState(startStep);
  const [d, setD] = React.useState(() => initial ? JSON.parse(JSON.stringify(initial)) : {
    adresse: '', etage: '',
    type: 'Studio', surface: '', checkout: '11:00', checkin: '16:00',
    acces: ['Boîte à clés'], codes: {}, porte: '',
    checklist: [],
    conso: { pq: 0, savon: 0, vaisselle: 0, cafe: 0, sacs: 0 },
    appart: '', lienAcces: '', erreurs: '', plaintes: '',
    etapes: [], cals: [], annonces: [],
    freq: 'Après chaque séjour', creneau: '11:00 – 14:00',
    ical: { Airbnb: '', Booking: '' }, sync: 'Maintenant',
    couchages: { double: 1, simple: 0, canape1: 0, canape2: 0 },
    blanchisserie: true, draps: 'Vous fournissez vos draps',
    kits: { kdouble: 0, ksimple: 0 },
    eponge: { grande: 0, serviette: 0, tapis: 0 },
    consignes: '', points: [],
  });
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  React.useEffect(() => { if (onChange) onChange(d); }, [d]);
  const setIn = (g, k, v) => setD(p => ({ ...p, [g]: { ...p[g], [k]: Math.max(0, v) } }));
  const couchages = OA_COUCHAGES.reduce((s, [k, , , w]) => s + d.couchages[k] * w, 0);
  const totalConso = OA_CONSO.reduce((s, [k, , p]) => s + d.conso[k] * p, 0);
  const dtm = d.draps === 'Deltom fournit le linge';
  const totalKits = OA_KITS.reduce((s, [k, , p1, p2]) => s + d.kits[k] * (dtm ? p2 : p1), 0);
  const totalEponge = OA_EPONGE.reduce((s, [k, , p]) => s + d.eponge[k] * p, 0);
  const totalLinge = totalKits + totalEponge;
  const prixMenage = OA_PRIX_MENAGE[d.type];
  const devisRef = React.useRef(null);
  const [devisVu, setDevisVu] = React.useState(false);
  React.useEffect(() => {
    setDevisVu(false);
    if (i !== 2 || !devisRef.current) return;
    const io = new IntersectionObserver(([e]) => setDevisVu(e.isIntersecting), { threshold: 0.3 });
    io.observe(devisRef.current);
    return () => io.disconnect();
  }, [i]);
  const totalPassage = (prixMenage || 0) + totalLinge + totalConso;
  const last = i === OA_STEPS.length - 1;
  const canNext = i === 0 ? !!(d.adresse.trim() && d.acces.length)
    : i === 1 ? !!(d.checkout && d.checkin)
    : i === 2 ? !!(d.type && couchages > 0)
    : true;

  const secLogement = (
    <>
      <Seg a="adresse">
      <OaField label="Adresse complète" hint="Visible uniquement par vous et le prestataire affecté"><input value={d.adresse} onChange={e => set('adresse', e.target.value)} placeholder="12 rue de la Fontaine, 75010 Paris" /></OaField>
      <OaField label="Étage et accès à l'immeuble"><input value={d.etage} onChange={e => set('etage', e.target.value)} placeholder="3e avec ascenseur" /></OaField>
      <OaField label="Numéro d'appartement"><input value={d.appart} onChange={e => set('appart', e.target.value)} placeholder="Appartement 32" /></OaField>
      </Seg>
      <Seg a="acces">
      <div className="oa-h2">Comment on entre ?<span>Type d'accès, étapes et repères sur place.</span></div>
      <div className="oa-f">
        <span className="oa-legend">Type d'accès</span>
        <OaAcces value={d.acces} codes={d.codes}
          onToggle={t => set('acces', d.acces.includes(t) ? d.acces.filter(x => x !== t) : [...d.acces, t])}
          onCode={(t, v) => setD(p => ({ ...p, codes: { ...p.codes, [t]: v } }))} />
      </div>
      <div className="oa-f">
        <span className="oa-legend">Étapes d'accès <span className="op">· descriptives</span></span>
        {d.etapes.map((t, k) => (
          <div key={k} className="oa-cal">
            <input value={t} placeholder={`Étape ${k + 1}`} onChange={e => set('etapes', d.etapes.map((x, j) => j === k ? e.target.value : x))} />
            <button type="button" className="x" aria-label="Retirer" onClick={() => set('etapes', d.etapes.filter((_, j) => j !== k))}><Icon name="close" size={16} /></button>
          </div>
        ))}
        <button type="button" className="oa-dash" onClick={() => set('etapes', [...d.etapes, ''])}>+ Ajouter une étape</button>
      </div>
      <OaField label="Porte / repère"><input value={d.porte} onChange={e => set('porte', e.target.value)} placeholder="Bâtiment B, porte droite" /></OaField>
      <OaField label="Lien d'aide à l'accès" hint="Facultatif — vidéo, plan ou page qui montre le chemin"><input value={d.lienAcces} onChange={e => set('lienAcces', e.target.value)} placeholder="https://…" /></OaField>
      </Seg>
    </>
  );

  const secConsignes = (
    <>
      <Seg a="checklist"><OaChecklist value={d.checklist} onChange={v => set('checklist', v)} /></Seg>
      <Seg a="consignes">
      <div className="oa-h2">Les consignes<span>Ce qui rend ce logement particulier.</span></div>
      <OaField label="À signaler au prestataire"><OaChoice multi options={['Bip garage', 'Animaux', 'Poubelles un jour précis', 'Voisinage sensible', 'Matériel fourni sur place', 'Parking difficile']} value={d.points} onChange={v => set('points', v)} /></OaField>
      <OaField label="Quelles erreurs vos anciens prestataires de ménage faisaient-ils ?" hint="Facultatif — ce que Deltom doit éviter dès le premier passage"><textarea value={d.erreurs} onChange={e => set('erreurs', e.target.value)} placeholder="Lit refait sans changer les draps, poussière sur les plinthes…" /></OaField>
      <OaField label="Quelles plaintes recevez-vous le plus des voyageurs sur le nettoyage ?" hint="Facultatif"><textarea value={d.plaintes} onChange={e => set('plaintes', e.target.value)} placeholder="Cheveux dans la douche, odeur de renfermé…" /></OaField>
      <OaField label="Consignes libres"><textarea value={d.consignes} onChange={e => set('consignes', e.target.value)} placeholder="Linge dans le placard de l'entrée, deux jeux complets." /></OaField>
      </Seg>
      <Seg a="horaires">
      <div className="oa-h2">Horaires des voyageurs<span>Les heures départ et l'arrivée fixe la plage horaire durant laquelle nos équipes d'opérateurs peuvent intervenir ; notre plage horaire optimale : 10h – 16h.</span></div>
      <div className="oa-f">
        <div className="oa-wheels">
          <OaWheel label="Départ (check-out)" value={d.checkout} onChange={v => set('checkout', v)} />
          <OaWheel label="Arrivée (check-in)" value={d.checkin} onChange={v => set('checkin', v)} />
        </div>
      </div>
      </Seg>
    </>
  );

  const secTaille = (
    <>
      <Seg a="taille">
      <div className="oa-f">
        <span className="oa-legend">Taille du logement</span>
        <OaCards options={OA_TAILLES} value={d.type} onChange={v => set('type', v)} />
      </div>
      <OaField label="Surface" hint="Facultatif — une estimation suffit"><input value={d.surface} onChange={e => set('surface', e.target.value)} placeholder="42 m²" /></OaField>
      </Seg>
      <Seg a="couchages">
      <div className="oa-h2">Composez le logement<span>Couchages, puis linge et blanchisserie — les kits en découlent.</span></div>
      <div className="oa-f">
        <div className="oa-list">
          {OA_COUCHAGES.map(([k, nm, note]) => (
            <OaCountRow key={k} nm={nm} note={note} n={d.couchages[k]} onChange={v => setIn('couchages', k, v)} />
          ))}
        </div>
        <div className="oa-total"><span className="nm">Couchages (total)</span><span className="v">{couchages}</span></div>
        <p className="oa-note">Calculé automatiquement depuis les types de couchage.</p>
      </div>
      </Seg>
      <Seg a="linge">
      <div className="oa-f">
        <span className="oa-legend">Linge &amp; blanchisserie <span className="op">· à la carte</span></span>
        <button type="button" className={'oa-tog' + (d.blanchisserie ? ' on' : '')} onClick={() => setD(p => p.blanchisserie
          ? { ...p, blanchisserie: false, kits: { kdouble: 0, ksimple: 0 }, eponge: { grande: 0, serviette: 0, tapis: 0 } }
          : { ...p, blanchisserie: true })}>
          <span className="sw"><i /></span>
          <span><span className="t">Blanchisserie Deltom</span><span className="s">Pressing professionnel au prix coûtant, + 1 € de gestion par kit.</span></span>
        </button>
      </div>
      {d.blanchisserie && (
        <>
          <div className="oa-f">
            <span className="oa-legend">Linge <span className="op">· par passage</span></span>
            <div className="oa-tbl">
              <div className="hd">
                <span>Article</span>
                {[['Vous fournissez vos draps', 'Vous fournissez', 'lavage seul'], ['Deltom fournit le linge', 'Deltom fournit', 'tout compris']].map(([v, l1, l2]) => (
                  <button key={v} type="button" className={'ofc' + (d.draps === v ? ' on' : '')} onClick={() => set('draps', v)}>{l1}<em>{l2}</em></button>
                ))}
                <span className="q">Quantité</span>
              </div>
              <div className="sec">Draps</div>
              {OA_KITS.map(([k, nm, p1, p2]) => (
                <div key={k} className="rw">
                  <span className="nm">{nm}</span>
                  <span className={'pz' + (dtm ? '' : ' on')}>{eur(p1)}</span>
                  <span className={'pz' + (dtm ? ' on' : '')}>{eur(p2)}</span>
                  <OaStepper n={d.kits[k]} onChange={v => setIn('kits', k, v)} />
                </div>
              ))}
              <div className="sec">Serviettes <i>· toujours fournies par Deltom</i></div>
              {OA_EPONGE.map(([k, nm, p]) => (
                <div key={k} className="rw">
                  <span className="nm">{nm}</span>
                  <span className={'pz' + (dtm ? '' : ' on')}>{eur(p)}</span>
                  <span className={'pz' + (dtm ? ' on' : '')}>{eur(p)}</span>
                  <OaStepper n={d.eponge[k]} onChange={v => setIn('eponge', k, v)} />
                </div>
              ))}
              <div className="ft"><span>Linge / passage</span><b>{eur(totalLinge)}</b></div>
            </div>
          </div>
        </>
      )}
      </Seg>

      <Seg a="conso">
      <div className="oa-h2">Consommables<span>Réassort à la carte — le kit déposé à chaque passage.</span></div>
      <div className="oa-f">
        <span className="oa-legend">Kit consommables (par passage) <span className="it">à composer selon vos besoins</span></span>
        <div className="oa-list">
          {OA_CONSO.map(([k, nm, p]) => (
            <OaCountRow key={k} nm={nm} price={`${eur(p)} / passage`} n={d.conso[k]} onChange={v => setIn('conso', k, v)} />
          ))}
        </div>
        <div className="oa-bar"><span className="nm">Consommables / passage</span><span className="v">{eur(totalConso)}</span></div>
      </div>
      </Seg>

      <Seg a="prix">
      <div className="oa-h2">Le prix de votre intervention<span>Le détail de ce qui est sélectionné, recalculé en direct.</span></div>
      <div className="oa-devis" ref={devisRef}>
      <div className="oa-somme">
        <div className="ln"><span className="k">Ménage · {d.type}</span><span className="v">{prixMenage ? eur(prixMenage) : 'Sur devis'}</span></div>
        {d.blanchisserie && OA_KITS.filter(([k]) => d.kits[k]).map(([k, nm, p1, p2]) => (
          <div key={k} className="ln"><span className="k">{nm}<i> × {d.kits[k]} · {eur(dtm ? p2 : p1)}</i></span><span className="v">{eur(d.kits[k] * (dtm ? p2 : p1))}</span></div>
        ))}
        {d.blanchisserie && OA_EPONGE.filter(([k]) => d.eponge[k]).map(([k, nm, p]) => (
          <div key={k} className="ln"><span className="k">{nm}<i> × {d.eponge[k]} · {eur(p)}</i></span><span className="v">{eur(d.eponge[k] * p)}</span></div>
        ))}
        {OA_CONSO.filter(([k]) => d.conso[k]).map(([k, nm, p]) => (
          <div key={k} className="ln"><span className="k">{nm}<i> × {d.conso[k]} · {eur(p)}</i></span><span className="v">{eur(d.conso[k] * p)}</span></div>
        ))}
      </div>
        <div className="oa-ft"><span>Total par intervention</span><b>{prixMenage ? eur(totalPassage) : `${eur(totalPassage)} + devis`}</b></div>
      </div>
      </Seg>
    </>
  );

  const secCalendriers = (
    <>
      <Seg a="cals">
      <div className="oa-f">
        {d.cals.map((c, k) => (
          <div key={k} className="oa-calw">
          <div className="oa-cal">
            <select value={c.p} onChange={e => set('cals', d.cals.map((x, j) => j === k ? { ...x, p: e.target.value } : x))}>
              {OA_PLATEFORMES.map(p => <option key={p}>{p}</option>)}
            </select>
            <input value={c.url} placeholder="https://…/calendar.ics" onChange={e => set('cals', d.cals.map((x, j) => j === k ? { ...x, url: e.target.value } : x))} />
            <button type="button" className="x" aria-label="Retirer" onClick={() => set('cals', d.cals.filter((_, j) => j !== k))}><Icon name="close" size={16} /></button>
          </div>
          {embed && c.url && <OaCalSync seed={k} />}
          </div>
        ))}
        <button type="button" className="oa-dash" onClick={() => set('cals', [...d.cals, { p: 'Airbnb', url: '' }])}>+ Ajouter un calendrier</button>
        <p className="oa-note">Le calendrier est lu dès la création, puis régulièrement. Deltom ne publie aucun calendrier sortant.</p>
      </div>
      </Seg>
      <Seg a="annonces">
      <div className="oa-f">
        <span className="oa-legend">Liens de vos annonces <span className="op">· facultatif</span></span>
        {d.annonces.map((t, k) => (
          <div key={k} className="oa-cal">
            <input value={t} placeholder="https://www.airbnb.fr/rooms/…" onChange={e => set('annonces', d.annonces.map((x, j) => j === k ? e.target.value : x))} />
            <button type="button" className="x" aria-label="Retirer" onClick={() => set('annonces', d.annonces.filter((_, j) => j !== k))}><Icon name="close" size={16} /></button>
          </div>
        ))}
        <button type="button" className="oa-dash sm" onClick={() => set('annonces', [...d.annonces, ''])}>+ Ajouter un lien d'annonce</button>
        <p className="oa-note">Les photos et le descriptif de l'annonce aident le prestataire à remettre le logement en état.</p>
      </div>
      </Seg>
    </>
  );

  const step = () => {
    switch (i) {
      case 0: return secLogement;
      case 1: return secConsignes;
      case 2: return secTaille;
      case 3: return secCalendriers;
      default: return (
        <div className="oa-recap">
          <OaRecapRow k="Adresse" v={d.adresse} />
          <OaRecapRow k="Accès" v={[...d.acces, ...d.etapes.filter(Boolean), d.porte].filter(Boolean).join(' · ')} />
          <OaRecapRow k="Checklist" v={(d.checklist || []).length ? `${d.checklist.reduce((s, p) => s + p[1].length, 0)} items sur ${d.checklist.length} pièces` : 'Aucune checklist'} />
          <OaRecapRow k="Consignes" v={[...(d.points || []), d.consignes].filter(Boolean).join(' · ')} />
          <OaRecapRow k="Points de vigilance" v={[d.erreurs, d.plaintes].filter(Boolean).join(' · ')} />
          <OaRecapRow k="Logement" v={[d.type, d.surface, d.etage, d.appart].filter(Boolean).join(' · ')} />
          <OaRecapRow k="Ménage" v={prixMenage ? `${eur(prixMenage)} TTC / intervention` : 'Sur devis'} />
          <OaRecapRow k="Horaires voyageurs" v={d.checkout && d.checkin ? `Départ ${d.checkout} · Arrivée ${d.checkin}` : ''} />
          <OaRecapRow k="Composition" v={`${couchages} couchages · ${OA_COUCHAGES.filter(([k]) => d.couchages[k]).map(([k, nm]) => `${d.couchages[k]} ${nm.toLowerCase()}`).join(', ')}`} />
          <OaRecapRow k="Blanchisserie" v={d.blanchisserie ? `${d.draps} · ${eur(totalLinge)} par passage` : 'Non souscrite'} />
          <OaRecapRow k="Consommables" v={totalConso ? `${eur(totalConso)} par passage` : 'Aucun'} />
          <OaRecapRow k="Calendriers" v={d.cals.filter(c => c.url).map(c => c.p).join(', ') || 'Aucun lien renseigné'} />
          <OaRecapRow k="Annonces" v={d.annonces.filter(Boolean).length ? `${d.annonces.filter(Boolean).length} lien(s)` : 'Aucun'} />
          <OaRecapRow k="Prix par intervention" v={prixMenage ? `${eur(totalPassage)} TTC` : `${eur(totalPassage)} TTC + devis`} />
        </div>
      );
    }
  };

  const nav = (
    <>
      <button className="ob-btn sm" onClick={() => i === 0 ? onClose() : setI(i - 1)}>{i === 0 ? 'Annuler' : 'Retour'}</button>
      <span style={{ flex: 1 }} />
      {i === 2 && !devisVu && <span className="oa-fto"><i>Total par intervention</i><b>{prixMenage ? eur(totalPassage) : `${eur(totalPassage)} + devis`}</b></span>}
      {i === 3 && !d.cals.length && <button className="ob-btn sm" onClick={() => setI(i + 1)}>Plus tard</button>}
      <button className="ob-btn" disabled={!canNext} onClick={() => last ? onDone(d) : setI(i + 1)}>
        {last ? (edit ? 'Enregistrer les modifications' : 'Créer le logement') : 'Continuer'}
      </button>
    </>
  );

  const titles = [
    ['Le logement', "L'adresse, l'étage, et comment on entre."],
    ['Checklist & consignes', 'Ce qui est fait à chaque passage, et dans quelle fenêtre.'],
    ['Déterminons ensemble le prix d\'une intervention', 'La taille, la composition et le kit consommables.'],
    ['Calendriers', 'Collez vos liens iCal, Deltom écoute vos réservations.'],
    ['Récapitulatif', 'Vérifiez, tout reste modifiable ensuite.'],
  ][i];

  if (embed) return <div className="oa-form lf2-form">{step()}</div>;

  return (
    <div className="oa">
      <header className="oa-top">
        <div className="oa-brand"><ObLogo size={26} /><span className="nm">deltom<span style={{ color: '#8C8340' }}>.</span></span></div>
        <div className="oa-dots">
          {OA_STEPS.map((s, k) => (
            <button key={s} type="button" title={s} aria-label={s}
              className={'d' + (k === i ? ' on' : '') + (k < i ? ' done' : '')}
              onClick={() => setI(k)} />
          ))}
        </div>
        <button className="ob-round" onClick={onClose}><Icon name="close" size={18} /></button>
      </header>

      <div className="oa-body">
        <div className="oa-col">
          <div className="oa-kick">Étape {i + 1} sur {OA_STEPS.length} · {OA_STEPS[i]}</div>
          <h1 className={titles[0].length > 30 ? 'long' : undefined}>{titles[0]}</h1>
          <p className="oa-sub">{titles[1]}</p>
          <div className="oa-form">{step()}</div>
          {i !== 2 && <div className="oa-nav">{nav}</div>}
        </div>
      </div>

      {i === 2 && <footer className="oa-foot">
        <div className="oa-col row">
          {nav}
        </div>
      </footer>}
    </div>
  );
}

function ObAddDone({ data, onClose }) {
  return (
    <div className="oa">
      <header className="oa-top">
        <div className="oa-brand"><ObLogo size={26} /><span className="nm">deltom<span style={{ color: '#8C8340' }}>.</span></span></div>
        <span style={{ flex: 1 }} />
        <button className="ob-round" onClick={onClose}><Icon name="close" size={18} /></button>
      </header>
      <div className="oa-body">
        <div className="oa-col">
          <div className="oa-cele">
            <div className="oa-cele-lg">
              <svg width="96" height="96" viewBox="0 0 512 512" role="img" aria-label="Deltom" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                  <mask id="dm-cele">
                    <rect width="512" height="512" fill="#000" />
                    <circle cx="256" cy="256" r="148" fill="#fff" />
                    <circle cx="256" cy="256" r="80" fill="#000" />
                    <circle className="orb" cx="338" cy="338" r="60" fill="#000" />
                  </mask>
                </defs>
                <rect className="ring" width="512" height="512" fill="#1a3a36" mask="url(#dm-cele)" />
                <circle className="orb" cx="338" cy="338" r="45" fill="#8C8340" />
              </svg>
            </div>
            <h1 className="oa-cele-t">Votre logement est bien créé</h1>
            <p className="oa-cele-s">{data.adresse || 'Nouveau logement'} est prêt. {(data.cals || []).some(c => c.url) ? 'Deltom lit vos calendriers et planifiera les prochains passages automatiquement.' : 'Connectez un calendrier pour que Deltom planifie les passages automatiquement.'}</p>
          </div>
          <div className="oa-cele-in">
          <div className="oa-kick">Récapitulatif</div>
          <div className="oa-fiche">
            <div className="oa-fh">
              <span className="ob-mav"><Icon name="building" size={20} stroke={1.4} /></span>
              <div style={{ flex: 1 }}>
                <div className="t">{data.type}{data.surface ? ' · ' + data.surface : ''}{data.etage ? ' · ' + data.etage : ''}</div>
                <div className="s">{data.checkout && data.checkin ? `Départ ${data.checkout} · Arrivée ${data.checkin}` : 'Horaires à compléter'}</div>
              </div>
              <span className="ob-st termine"><i className="k" />Actif</span>
            </div>
            <OaRecapRow k="Horaires voyageurs" v={data.checkout && data.checkin ? `Départ ${data.checkout} · Arrivée ${data.checkin}` : ''} />
            <OaRecapRow k="Accès" v={[...(data.acces || []), data.porte].filter(Boolean).join(' · ')} />
            <OaRecapRow k="Checklist" v={(data.checklist || []).length ? `${data.checklist.reduce((s, p) => s + p[1].length, 0)} items` : 'Aucune'} />
            <OaRecapRow k="Calendriers" v={(data.cals || []).filter(c => c.url).map(c => c.p).join(', ') || 'À connecter'} />
            <OaRecapRow k="Consignes" v={[...(data.points || []), data.consignes].filter(Boolean).join(' · ')} />
          </div>
          <div className="oa-actions" style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="ob-btn" onClick={onClose}>Retour aux logements</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ObAddLogement, ObAddDone, OaRecapRow, OA_CONSO, OA_KITS, OA_EPONGE, OA_COUCHAGES, OA_PRIX_MENAGE, OA_CHECKLIST, oaEur: eur });
