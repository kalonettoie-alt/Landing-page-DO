// ob-facture.jsx — onglet Facturation : une période = un prélèvement = N factures prestataires + 1 facture Deltom

const OB_PERIODES = [
  {
    id: 'p36', titre: 'Semaine du 1er au 7 septembre', court: '1 – 7 sept. 2026',
    etat: 'encours', etatLabel: 'Période en cours', preleve: 'Prélèvement le 9 septembre',
    total: '1 240,00 €', menages: 6, logements: 2,
    factures: [
      {
        id: 'f1', emetteur: 'Sonia Berthier', role: 'Prestataire', ref: 'FA-2609-018', montant: '420,00 €',
        resume: '3 ménages · 1 logement',
        blocs: [
          { logement: 'Studio Marais', lignes: [
            ['Lundi 1 sept. · 09:00', 'Ménage complet · linge fourni', '140,00 €'],
            ['Mercredi 3 sept. · 11:00', 'Ménage complet · linge fourni', '140,00 €'],
            ['Samedi 6 sept. · 10:00', 'Ménage complet · linge fourni', '140,00 €'],
          ] },
        ],
      },
      {
        id: 'f2', emetteur: 'Marc Dievot', role: 'Prestataire', ref: 'FA-2609-019', montant: '395,00 €',
        resume: '3 ménages · 2 logements',
        blocs: [
          { logement: 'Studio Marais', lignes: [
            ['Mardi 2 sept. · 14:00', 'Ménage complet · linge fourni', '140,00 €'],
            ['Jeudi 4 sept. · 09:30', 'Ménage complet · linge fourni', '140,00 €'],
          ] },
          { logement: 'T2 Canal', lignes: [
            ['Vendredi 5 sept. · 16:00', 'Ménage complet · linge client', '115,00 €'],
          ] },
        ],
      },
      {
        id: 'f3', emetteur: 'Deltom', role: 'Commission', ref: 'FA-2609-020', montant: '425,00 €', deltom: true,
        resume: '6 ménages · 2 logements',
        blocs: [
          { logement: 'Studio Marais', lignes: [
            ['5 ménages · Sonia Berthier, Marc Dievot', 'Commission de gestion', '355,00 €'],
          ] },
          { logement: 'T2 Canal', lignes: [
            ['1 ménage · Marc Dievot', 'Commission de gestion', '70,00 €'],
          ] },
        ],
      },
    ],
  },
  {
    id: 'p35', titre: 'Semaine du 25 au 31 août', court: '25 – 31 août 2026',
    etat: 'termine', etatLabel: 'Prélevé', preleve: 'Prélevé le 2 septembre · Visa ····4242',
    total: '980,00 €', menages: 5, logements: 2,
    factures: [
      {
        id: 'g1', emetteur: 'Sonia Berthier', role: 'Prestataire', ref: 'FA-2608-011', montant: '280,00 €',
        resume: '2 ménages · 1 logement',
        blocs: [
          { logement: 'Studio Marais', lignes: [
            ['Mardi 26 août · 09:00', 'Ménage complet · linge fourni', '140,00 €'],
            ['Vendredi 29 août · 09:00', 'Ménage complet · linge fourni', '140,00 €'],
          ] },
        ],
      },
      {
        id: 'g2', emetteur: 'Léa Nkodo', role: 'Prestataire', ref: 'FA-2608-012', montant: '355,00 €',
        resume: '3 ménages · 2 logements',
        blocs: [
          { logement: 'T2 Canal', lignes: [
            ['Lundi 25 août · 13:00', 'Ménage complet · linge client', '115,00 €'],
            ['Jeudi 28 août · 13:00', 'Ménage complet · linge client', '115,00 €'],
          ] },
          { logement: 'Studio Marais', lignes: [
            ['Dimanche 31 août · 10:00', 'Ménage complet · linge fourni', '125,00 €'],
          ] },
        ],
      },
      {
        id: 'g3', emetteur: 'Deltom', role: 'Commission', ref: 'FA-2608-013', montant: '345,00 €', deltom: true,
        resume: '5 ménages · 2 logements',
        blocs: [
          { logement: 'Studio Marais', lignes: [['3 ménages · Sonia Berthier, Léa Nkodo', 'Commission de gestion', '205,00 €']] },
          { logement: 'T2 Canal', lignes: [['2 ménages · Léa Nkodo', 'Commission de gestion', '140,00 €']] },
        ],
      },
    ],
  },
];

function ObInitials({ nom }) {
  const ini = nom.split(' ').map(w => w[0]).slice(0, 2).join('');
  return <span className="ob-fa-av">{ini}</span>;
}

function ObChev({ open }) {
  return (
    <svg className={'ob-fa-chev' + (open ? ' open' : '')} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
  );
}

/* ── aperçu document ── */
function ObFactureDoc({ f, p, onClose }) {
  React.useEffect(() => {
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  const nbLignes = f.blocs.reduce((n, b) => n + b.lignes.length, 0);
  return (
    <div className="ob-fv" role="dialog" aria-modal="true" aria-label={'Facture ' + f.ref}>
      <div className="ob-fv-scrim" onClick={onClose} />
      <div className="ob-fv-panel">
        <div className="ob-fv-top">
          <div className="ob-fv-ttl">
            <span className="t">Facture {f.ref}</span>
            <span className="s">{f.emetteur} · {p.court}</span>
          </div>
          <button className="ob-fv-dl"><Icon name="inbox" size={15} />Télécharger le PDF</button>
          <button className="ob-round" onClick={onClose} aria-label="Fermer"><Icon name="close" size={17} /></button>
        </div>
        <div className="ob-fv-scroll">
          <div className="ob-fv-sheet">
            <div className="ob-fv-mast">
              <div className="em">
                {f.deltom ? <ObLogo size={30} /> : <span className="ob-fa-av">{f.emetteur.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>}
                <span className="nm">{f.emetteur}</span>
              </div>
              <div className="no"><span className="k">Facture</span><span className="v">{f.ref}</span><span className="p">{p.court}</span></div>
            </div>
            <div className="ob-fv-parties">
              <div><div className="ob-fv-lbl">Émetteur</div><div className="n">{f.emetteur}</div><div className="d">{f.deltom ? 'Deltom · commission de gestion' : 'Prestataire indépendant'}</div><div className="d">SIRET · à remplir</div></div>
              <div><div className="ob-fv-lbl">Facturé à</div><div className="n">Camille Meunier</div><div className="d">camille@exemple.fr</div><div className="d">Adresse · à remplir</div></div>
            </div>
            <div className="ob-fv-meta">
              <div><span className="k">Période</span><span className="v">{p.court}</span></div>
              <div><span className="k">Prestations</span><span className="v">{nbLignes} {nbLignes > 1 ? 'lignes' : 'ligne'}</span></div>
              <div><span className="k">Règlement</span><span className="v">Prélèvement</span></div>
            </div>
            <table className="ob-fv-tb">
              <colgroup><col style={{ width: '44%' }} /><col style={{ width: '28%' }} /><col style={{ width: '28%' }} /></colgroup>
              <thead><tr><th>Désignation</th><th>Détail</th><th>Montant</th></tr></thead>
              <tbody>
                {f.blocs.map((b, i) => (
                  <React.Fragment key={i}>
                    <tr className="g"><td colSpan="3"><Icon name="home" size={13} color="#8C8340" />{b.logement}</td></tr>
                    {b.lignes.map((l, j) => (
                      <tr key={j}><td>{l[0]}</td><td className="s">{l[1]}</td><td className="a">{l[2]}</td></tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="ob-fv-tot"><span className="k">Total</span><span className="v">{f.montant}</span></div>
            <div className="ob-fv-note">Cette facture est réglée par le prélèvement unique de la période, {p.preleve.toLowerCase()}.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── une facture (niveau 2) ── */
function ObFacture({ f, p }) {
  const [open, setOpen] = React.useState(false);
  const [apercu, setApercu] = React.useState(false);
  return (
    <div className={'ob-fa-inv' + (open ? ' open' : '')}>
      <button className="ob-fa-invhead" onClick={() => setOpen(!open)}>
        {f.deltom ? <span className="ob-fa-av dt"><ObLogo size={22} /></span> : <ObInitials nom={f.emetteur} />}
        <span className="ob-fa-invid">
          <span className="nm">{f.emetteur}</span>
          <span className="mt">{f.role} · {f.resume}</span>
        </span>
        <span className="ob-fa-ref">{f.ref}</span>
        <span className="ob-fa-amt">{f.montant}</span>
        <ObChev open={open} />
      </button>
      <div className="ob-fa-wrap">
        <div className="ob-fa-clip">
          <div className="ob-fa-body">
            {f.blocs.map((b, i) => (
              <div className="ob-fa-bloc" key={i}>
                <div className="ob-fa-lg"><Icon name="home" size={15} color="#8C8340" />{b.logement}<span className="ct">{b.lignes.length} {b.lignes.length > 1 ? 'lignes' : 'ligne'}</span></div>
                {b.lignes.map((l, j) => (
                  <div className="ob-fa-line" key={j}>
                    <span className="d">{l[0]}</span>
                    <span className="s">{l[1]}</span>
                    <span className="a">{l[2]}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="ob-fa-invfoot">
              <button className="ob-btn xs" onClick={() => setApercu(true)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></svg>Voir la facture</button>
              <span className="tt">Total facture <b>{f.montant}</b></span>
            </div>
          </div>
        </div>
      </div>
      {apercu && <ObFactureDoc f={f} p={p} onClose={() => setApercu(false)} />}
    </div>
  );
}

/* ── une période (niveau 1) ── */
function ObPeriode({ p, defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <section className={'ob-fa-per' + (open ? ' open' : '')}>
      <button className="ob-fa-perhead" onClick={() => setOpen(!open)}>
        <span className="ob-fa-perid">
          <span className="t">{p.titre}</span>
          <span className="s">{p.factures.length} factures · {p.menages} ménages · {p.logements} logements</span>
        </span>
        <span className={'ob-st ' + p.etat}><i className="k" />{p.etatLabel}</span>
        <span className="ob-fa-pertot">{p.total}</span>
        <ObChev open={open} />
      </button>
      <div className="ob-fa-wrap">
        <div className="ob-fa-clip">
          <div className="ob-fa-perbody">
            <div className="ob-fa-note">Un seul prélèvement pour l'ensemble des factures ci-dessous.</div>
            <div className="ob-fa-invs">{p.factures.map(f => <ObFacture key={f.id} f={f} p={p} />)}</div>
            <div className="ob-fa-perfoot">
              <div className="lbl">Prélèvement unique<span>{p.preleve}</span></div>
              <div className="amt">{p.total}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ObFacturation({ goto }) {
  return (
    <div className="ob-col">
      <button className="ob-fa-back" onClick={() => goto && goto('profil')}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>Paramètres</button>
      <h1 className="ob-h1 left" style={{ marginBottom: 12 }}>Facturation</h1>
      <div className="ob-sub left" style={{ marginTop: 0, marginBottom: 30 }}>Une facture par prestataire, une facture Deltom pour la commission. Un seul prélèvement par période.</div>
      <div className="ob-fa-list">
        {OB_PERIODES.map((p, i) => <ObPeriode key={p.id} p={p} defaultOpen={i === 0} />)}
      </div>
      <div className="ob-foot">Les factures restent téléchargeables pendant 10 ans.</div>
    </div>
  );
}

Object.assign(window, { ObFacturation, ObFactureDoc, OB_PERIODES });
