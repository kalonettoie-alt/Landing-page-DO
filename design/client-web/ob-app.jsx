// ob-app.jsx — console client, variante « barre en haut »
// Globals attendus: Icon, DC_LOGEMENTS, DC_BRIEF, DC_PLANNING, DC_CONVOS

const OB_LABEL = { termine: 'Terminé', encours: 'En cours', avenir: 'À venir', bloque: 'Bloqué' };
function ObSt({ status = 'avenir' }) {
  return <span className={'ob-st ' + status}><i className="k" />{OB_LABEL[status]}</span>;
}

function ObLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="Deltom" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <mask id="ob-ring">
          <rect width="512" height="512" fill="#000" />
          <circle cx="256" cy="256" r="148" fill="#fff" />
          <circle cx="256" cy="256" r="80" fill="#000" />
          <circle cx="338" cy="338" r="60" fill="#000" />
        </mask>
      </defs>
      <rect width="512" height="512" fill="#1a3a36" mask="url(#ob-ring)" />
      <circle cx="338" cy="338" r="45" fill="#8C8340" />
    </svg>
  );
}

function ObSpark({ size = 22 }) {
  const hand = "M6 11h8.4a3.2 3.2 0 0 1 0 6.4H6z";
  const fing = "M9.2 11.4v5.6M11.8 11.4v5.6M14.2 11.9v4.6";
  return (
    <svg className="ob-spark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="#1a3a36" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-20 12 14) translate(-3 3.2)">
          <path d={hand} fill="rgba(140,131,64,0.3)" />
          <path d={fing} fill="none" />
        </g>
        <g transform="rotate(-20 12 14) translate(3.4 -2.6)">
          <path d={hand} fill="#fff" />
          <path d={fing} fill="none" />
        </g>
      </g>
      <g fill="#8C8340">
        <circle className="s1" cx="17.6" cy="3.8" r="2" />
        <circle className="s2" cx="11.6" cy="5.4" r="1.5" />
        <circle className="s3" cx="21.2" cy="7.6" r="1.2" />
      </g>
    </svg>
  );
}

function ObCup({ size = 30 }) {
  return (
    <svg className="ob-cup" width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <g stroke="#5c5751" strokeWidth="1.6" strokeLinecap="round">
        <path className="st" d="M12 10c1.4-1.3 1.4-2.6 0-4" />
        <path className="st st2" d="M16 9.5c1.6-1.5 1.6-3 0-4.5" />
        <path className="st st3" d="M20 10c1.4-1.3 1.4-2.6 0-4" />
      </g>
      <path d="M6.5 14h16v6.5a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z" fill="none" stroke="#1f1a14" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M22.5 15.5h2.2a2.9 2.9 0 0 1 0 5.8h-2.2" fill="none" stroke="#1f1a14" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 28h17" stroke="#8C8340" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────── Aujourd'hui ───────────── */
function ObToday() {
  const [seg, setSeg] = React.useState("Aujourd'hui");
  const [suivi, setSuivi] = React.useState(null);
  const rows = seg === "Aujourd'hui" ? DC_BRIEF : DC_BRIEF.slice(3);
  return (
    <div className="ob-col">
      <div className="ob-mini" style={{ marginTop: 0, marginBottom: 38 }}>
        <div><div className="l">Interventions ce mois</div><div className="v">28</div></div>
        <div><div className="l">Conformité</div><div className="v">94<small> %</small></div></div>
        <div><div className="l">À facturer</div><div className="v">1 240<small> €</small></div></div>
      </div>

      <h1 className="ob-h1 left" style={{ marginBottom: 26 }}>Le brief du jour<ObCup /></h1>

      <div className="ob-toolbar" style={{ marginBottom: 44 }}>
        <div className="ob-spacer" />
        <div className="ob-pills joined" style={{ margin: '0 auto' }}>
          {["Aujourd'hui", 'À venir'].map(s => (
            <button key={s} className={'ob-pill' + (seg === s ? ' on' : '')} onClick={() => setSeg(s)}>{s}</button>
          ))}
        </div>
        <button className="ob-filter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3 7h18M6 12h12M10 17h4" /></svg></button>
      </div>

      <h1 className="ob-h1">{rows.length} interventions prévu</h1>
      <div className="ob-sub" style={{ marginTop: 12 }}>Vendredi 4 septembre · 6 logements suivis</div>

      <div className="ob-stack" style={{ marginTop: 34 }}>
        {rows.map((r, i) => (
          <button key={i} className="ob-act" onClick={() => setSuivi(r)}>
            <span className="ob-sq"><ObSpark size={22} /></span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="t" style={{ display: 'block' }}>{r.name} · {r.time}</span>
              <span className="s" style={{ display: 'block' }}>Ménage complet · linge fourni</span>
            </span>
            <ObSt status={r.status} />
            <Icon name="chevron-right" size={18} color="#b5b3ae" />
          </button>
        ))}
      </div>

      {suivi && <ObSuivi item={suivi} onClose={() => setSuivi(null)} />}
    </div>
  );
}

/* ───────────── Calendrier ───────────── */
const OB_DAY_START = 9 * 60;
function obSlot(i) {
  const m = OB_DAY_START + i * 90;
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}
function obDayDetail(d) {
  const evs = DC_PLANNING[d] || [];
  const kinds = [];
  evs.forEach(([k]) => {
    if (k === 'more') { for (let j = 0; j < 4; j++) kinds.push('avenir'); return; }
    kinds.push(k === 'termine' ? 'termine' : 'interv');
  });
  return kinds.map((k, i) => ({
    time: obSlot(i),
    name: DC_LOGEMENTS[(d + i) % DC_LOGEMENTS.length].name,
    status: k === 'termine' ? 'termine' : (d === 4 && i === 0 ? 'encours' : 'avenir'),
  }));
}

function ObCal() {
  const dows = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const today = 4;
  const cells = [null];
  for (let d = 1; d <= 31; d++) cells.push(d);
  const [sel, setSel] = React.useState(today);
  const detail = obDayDetail(sel);
  return (
    <div className="ob-wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 8, marginBottom: 18 }}>
        <button className="ob-btn xs" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 9px' }}><Icon name="building" size={15} /></button>
        <button className="ob-btn xs"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="plus" size={13} />Créer une intervention</span></button>
      </div>
      <div className="ob-calwrap">
      <div className="ob-card ob-cal">
        <div className="ob-ch">
          <h2>Septembre 2026</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="ob-nb"><Icon name="arrow-left" size={17} /></button>
            <button className="ob-nb"><Icon name="chevron-right" size={17} /></button>
          </div>
        </div>
        <div className="ob-g7">
          {dows.map(d => <div key={d} className="ob-dow">{d}</div>)}
          {cells.map((d, i) => d === null ? <div key={i} /> : (
            <button key={i} className={'ob-day' + (d === today ? ' today' : '') + (d === sel ? ' sel' : '')} onClick={() => setSel(d)}>
              <div className="dn">{d}</div>
              {(DC_PLANNING[d] || []).slice(0, 3).map(([k, lab], j) => (
                <div key={j} className={'ob-ev' + (k === 'more' ? ' more' : '')}>{k !== 'more' && <i className="k" />}{lab}</div>
              ))}
            </button>
          ))}
        </div>
      </div>
      <div className="ob-dpanel">
        <div className="dt">Détail de la journée</div>
        <h3>{sel} septembre 2026</h3>
        {detail.length === 0
          ? <div className="ob-dempty">Aucune intervention prévue ce jour-là. Vous pouvez demander un créneau depuis le bouton Nouvelle demande.</div>
          : detail.map((r, i) => (
            <div key={i} className="ob-dline">
              <span className="hr">{r.time}</span>
              <span className="nm">{r.name}</span>
              <ObSt status={r.status} />
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}

/* ───────────── Logements ───────────── */
function ObLogements() {
  const [tab, setTab] = React.useState('Tous');
  const [add, setAdd] = React.useState(null); // null | 'form' | data
  const [items, setItems] = React.useState(() => DC_LOGEMENTS.map(l => ({ ...l, data: obDemoLogement(l) })));
  const [open, setOpen] = React.useState(null);
  const cur = open !== null ? items[open] : null;
  const upd = (p) => setItems(l => l.map((x, k) => k === open ? { ...x, ...p } : x));
  if (cur) return (
    <ObFicheLogement key={open} l={cur} onBack={() => setOpen(null)}
      onSave={d => upd({ data: d, kind: d.type })} />
  );
  return (
    <div className="ob-wide">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 26 }}>
        <div>
          <h1 className="ob-h1 left">Logements</h1>
          <div className="ob-sub left"></div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <div className="ob-search">
            <Icon name="search" size={15} />
            <input placeholder="Rechercher un logement" />
          </div>
          <div className="ob-wheelf">
            {(() => { const w = ['Tous', 'Actifs', 'En pause'], k = w.indexOf(tab); return [w[(k + 2) % 3], w[k], w[(k + 1) % 3]]; })().map((t, k) => (
              <button key={t} className={k === 1 ? 'on' : undefined} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <button className="ob-btn sm" onClick={() => setAdd('form')}>Créer un nouveau logement</button>
        </div>
      </div>
      <div className="ob-list" style={{ marginTop: 14 }}>
        {items.filter(l => tab === 'Tous' || (tab === 'Actifs' ? l.status !== 'bloque' : l.status === 'bloque')).map((l, i) => (
          <button key={i} className="ob-lrow" onClick={() => setOpen(items.indexOf(l))}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="ln">{l.name}</span>
              <span className="lo">{l.loc || 'Adresse à compléter'}</span>
            </span>
            <span className="lk">{l.kind}</span>
            <span className={'ob-st ' + (l.status === 'bloque' ? 'bloque' : 'termine')}><i className="k" />{l.status === 'bloque' ? 'En pause' : 'Actif'}</span>
            <span role="button" tabIndex={0} className="ob-ghost ob-lpause"
              onClick={e => { e.stopPropagation(); const k = items.indexOf(l); setItems(p => p.map((x, j) => j === k ? { ...x, status: x.status === 'bloque' ? 'encours' : 'bloque' } : x)); }}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); e.currentTarget.click(); } }}>
              {l.status === 'bloque' ? 'Réactiver' : 'Mettre en pause'}
            </span>
            <Icon name="chevron-right" size={18} color="#b5b3ae" />
          </button>
        ))}
      </div>
      {add === 'form' && <ObAddLogement onClose={() => setAdd(null)} onDone={(d) => {
        setItems(p => [...p, { name: d.adresse || 'Nouveau logement', loc: `${d.type}${d.surface ? ' · ' + d.surface : ''}`, kind: d.type, status: 'encours', data: d }]);
        setAdd(d);
      }} />}
      {add && add !== 'form' && <ObAddDone data={add} onClose={() => setAdd(null)} />}
    </div>
  );
}

/* ───────────── Messages ───────────── */
const OB_CONVOS = [
  { name: 'Loft République', time: '17:18', snippet: 'Vous : Le code d\'accès a été changé, merci de…', meta: 'Intervention en cours · 4 sept. · T3', status: 'encours' },
  { name: 'Studio Voltaire', time: '15:17', snippet: 'Deltom : Rapport transmis, 6 photos jointes', meta: 'Terminée · 4 sept. · Studio', status: 'termine' },
  { name: 'Studio Marais', time: '14:35', snippet: 'Vous : Prévoir le linge pour 4 personnes', meta: 'À venir · 5 sept. · Studio', status: 'avenir' },
  { name: 'Code A', time: '12:58', snippet: 'Deltom : Bien reçu, c\'est noté pour la clé', meta: 'Terminée · 4 sept. · Studio', status: 'termine' },
  { name: 'Guest Proof Lgt', time: 'Hier', snippet: 'Vous : Adresse complétée dans la fiche', meta: 'À venir · 8 sept. · Studio', status: 'avenir' },
  { name: 'Code B', time: 'Hier', snippet: 'Deltom : Créneau confirmé pour lundi matin', meta: 'À venir · 8 sept. · Studio', status: 'avenir' },
];

function ObMessages() {
  const [sel, setSel] = React.useState(0);
  const [flt, setFlt] = React.useState('Tout');
  const c = OB_CONVOS[sel];
  const tref = React.useRef(null);
  React.useEffect(() => { const el = tref.current; if (el) el.scrollTop = el.scrollHeight; }, [sel]);
  return (
    <div className="ob-mail">
      <div className="ob-mcol">
        <div className="ob-mhead">
          <h1>Messages</h1>
        </div>
        <div className="ob-mfilters">
          {['Tout', 'Non lus'].map(f => (
            <button key={f} className={'ob-pill' + (flt === f ? ' on' : '')} onClick={() => setFlt(f)}>{f}</button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="ob-round"><Icon name="search" size={18} /></button>
        </div>
        <div className="ob-mscroll">
          {OB_CONVOS.map((x, i) => (
            <button key={i} className={'ob-mitem' + (sel === i ? ' on' : '')} onClick={() => setSel(i)}>
              <span className="ob-mav"><Icon name="building" size={20} stroke={1.4} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="tp"><span className="nm">{x.name}</span><span className="tm">{x.time}</span></span>
                <span className="sn" style={{ display: 'block' }}>{x.snippet}</span>
                <span className="mt" style={{ display: 'block' }}>{x.meta}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="ob-thread">
        <div className="ob-thead">
          <span className="ob-mav" style={{ borderRadius: 99 }}><Icon name="building" size={20} stroke={1.4} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="nm">{c.name}</div>
            <div className="sub">{c.meta}</div>
          </div>
          <button className="ob-round"><Icon name="chevron-right" size={18} /></button>
        </div>
        <div className="ob-tscroll" ref={tref}>
          <div className="ob-tinner">
            <div className="ob-tmeta">Intervention prévue de 10:00 à 12:00 · ménage complet</div>
            <div className="ob-tmeta">Prestataire affecté · linge fourni <a>Voir la fiche</a></div>
            <div className="ob-btime">09:42</div>
            <div className="ob-bub them">Bonjour, le prestataire arrive à 10:00. Le code d'accès enregistré dans la fiche est bien à jour ?</div>
            <div className="ob-btime me">{c.time}</div>
            <div className="ob-bub me">{`Bonjour,\n\nLe code a été changé hier : 4821B. Je viens de le mettre à jour dans la fiche du logement.\n\nLe linge est dans le placard de l'entrée, deux jeux complets.\n\nMerci,\nCamille`}</div>
            <div className="ob-bnote">Lu par Deltom</div>
          </div>
        </div>
        <div className="ob-comp">
          <div className="ob-compbox">
            <textarea placeholder="Écrire un message…" />
            <div className="ob-comprow">
              <span className="sp" />
              <button className="ob-btn sm"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><Icon name="send" size={15} />Envoyer</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Profil ───────────── */
const OB_SETS = [
  ['Compte', [
    ['user', 'Informations personnelles', 'Nom, e-mail, téléphone', false, 'infos'],
    ['lock', 'Sécurité', 'Mot de passe, double authentification', false, 'securite'],
    ['bell', 'Notifications', 'E-mail et push', false, 'notifs'],
  ]],
  ['Facturation', [
    ['inbox', 'Informations de facturation', 'Adresse, SIRET, TVA', false, 'billing'],
    ['box', 'Moyens de paiement', 'Visa ····4242'],
    ['inbox', 'Factures', 'Historique et téléchargement', false, 'facture'],
    ['star', 'Abonnement', 'Formule Standard', true],
  ]],
];

function ObBilling({ onBack }) {
  const [d, setD] = React.useState({ statut: 'Société', raison: 'Smart Conciergerie', siret: '', tvaIntra: '', adresse: '', cp: '', ville: '' });
  const up = p => setD(v => ({ ...v, ...p }));
  const F = ({ label, hint, children }) => <label className="oa-f"><span className="lb">{label}</span>{children}{hint && <span className="ht">{hint}</span>}</label>;
  return (
    <div className="ob-col">
      <div className="oa-kick">Facturation</div>
      <h1 style={{ margin: '4px 0 6px', fontSize: 25, letterSpacing: '-.035em' }}>Informations de facturation</h1>
      <p className="oa-sub">Ce qui figurera sur vos factures. Modifiable à tout moment.</p>
      <div className="oa-form">
        {d.statut === 'Société' && (
          <div className="oa-grid2">
            <F label="SIRET" hint="14 chiffres."><input value={d.siret} onChange={e => up({ siret: e.target.value })} placeholder="000 000 000 00000" /></F>
            <F label="TVA intracommunautaire" hint="Facultatif."><input value={d.tvaIntra} onChange={e => up({ tvaIntra: e.target.value })} placeholder="FR00 000000000" /></F>
          </div>
        )}
        <F label="Adresse de facturation" hint="Elle figurera sur vos factures.">
          <input value={d.adresse} onChange={e => up({ adresse: e.target.value })} placeholder="Numéro et rue" />
        </F>
        <div className="oa-grid2">
          <F label="Code postal"><input value={d.cp} onChange={e => up({ cp: e.target.value })} placeholder="75011" /></F>
          <F label="Ville"><input value={d.ville} onChange={e => up({ ville: e.target.value })} placeholder="Paris" /></F>
        </div>
      </div>
      <div className="oa-nav">
        <button className="ob-btn sm" onClick={onBack}>Retour</button>
        <span style={{ flex: 1 }} />
        <button className="ob-btn" disabled={!(d.adresse && d.cp && d.ville)} onClick={onBack}>Enregistrer</button>
      </div>
    </div>
  );
}

const ObF = ({ label, hint, children }) => <label className="oa-f"><span className="lb">{label}</span>{children}{hint && <span className="ht">{hint}</span>}</label>;

function ObSubHead({ kick, title, sub }) {
  return (
    <>
      <div className="oa-kick">{kick}</div>
      <h1 style={{ margin: '4px 0 6px', fontSize: 25, letterSpacing: '-.035em' }}>{title}</h1>
      <p className="oa-sub">{sub}</p>
    </>
  );
}

function ObToggle({ label, hint, on, onChange }) {
  return (
    <button className={'ob-tg' + (on ? ' on' : '')} onClick={() => onChange(!on)} role="switch" aria-checked={on}>
      <span className="tx"><span className="t">{label}</span><span className="s">{hint}</span></span>
      <span className="sw"><i /></span>
    </button>
  );
}

function ObInfos({ onBack }) {
  const [d, setD] = React.useState({ prenom: 'Camille', nom: 'Meunier', email: 'camille@exemple.fr', tel: '06 12 34 56 78', langue: 'Français' });
  const up = p => setD(v => ({ ...v, ...p }));
  return (
    <div className="ob-col">
      <ObSubHead kick="Compte" title="Informations personnelles" sub="Utilisées pour vous identifier et vous contacter." />
      <div className="oa-form">
        <div className="oa-grid2">
          <ObF label="Prénom"><input value={d.prenom} onChange={e => up({ prenom: e.target.value })} /></ObF>
          <ObF label="Nom"><input value={d.nom} onChange={e => up({ nom: e.target.value })} /></ObF>
        </div>
        <ObF label="Adresse e-mail" hint="Sert d'identifiant de connexion."><input value={d.email} onChange={e => up({ email: e.target.value })} /></ObF>
        <ObF label="Téléphone" hint="La supervision vous appelle sur ce numéro en cas d'imprévu."><input value={d.tel} onChange={e => up({ tel: e.target.value })} /></ObF>
      </div>
      <div className="oa-nav">
        <button className="ob-btn sm" onClick={onBack}>Retour</button>
        <span style={{ flex: 1 }} />
        <button className="ob-btn" disabled={!(d.prenom && d.nom && d.email)} onClick={onBack}>Enregistrer</button>
      </div>
    </div>
  );
}

function ObSecurite({ onBack }) {
  const [pw, setPw] = React.useState({ actuel: '', neuf: '', conf: '' });
  const up = p => setPw(v => ({ ...v, ...p }));
  const ok = pw.actuel && pw.neuf.length >= 8 && pw.neuf === pw.conf;
  return (
    <div className="ob-col">
      <ObSubHead kick="Compte" title="Sécurité" sub="Modifiez le mot de passe de votre compte." />
      <div className="oa-form">
        <ObF label="Mot de passe actuel" hint="Modifié il y a 2 mois."><input type="password" value={pw.actuel} onChange={e => up({ actuel: e.target.value })} placeholder="••••••••" /></ObF>
        <div className="oa-grid2">
          <ObF label="Nouveau mot de passe" hint="8 caractères minimum."><input type="password" value={pw.neuf} onChange={e => up({ neuf: e.target.value })} placeholder="••••••••" /></ObF>
          <ObF label="Confirmation"><input type="password" value={pw.conf} onChange={e => up({ conf: e.target.value })} placeholder="••••••••" /></ObF>
        </div>
      </div>
      <div className="oa-nav">
        <button className="ob-btn sm" onClick={onBack}>Retour</button>
        <span style={{ flex: 1 }} />
        <button className="ob-btn" disabled={!ok} onClick={onBack}>Mettre à jour</button>
      </div>
    </div>
  );
}

function ObNotifs({ onBack }) {
  const [v, setV] = React.useState({ mailInter: true, mailRapport: true, mailFact: true, pushRoute: true, pushFin: false, pushSignal: true });
  const up = k => n => setV(s => ({ ...s, [k]: n }));
  return (
    <div className="ob-col">
      <ObSubHead kick="Compte" title="Notifications" sub="Ce que vous recevez, et par quel canal." />
      <div className="oa-form">
        <div>
          <div className="ob-gl">E-mail</div>
          <ObToggle label="Intervention planifiée" hint="Dès qu'un ménage est assigné à un opérateur." on={v.mailInter} onChange={up('mailInter')} />
          <ObToggle label="Rapport d'intervention" hint="Photos et checklist, à la fin de chaque passage." on={v.mailRapport} onChange={up('mailRapport')} />
          <ObToggle label="Factures" hint="Facture mensuelle et avis de prélèvement." on={v.mailFact} onChange={up('mailFact')} />
        </div>
        <div>
          <div className="ob-gl">Push</div>
          <ObToggle label="Opérateur en route" hint="Au départ vers le logement." on={v.pushRoute} onChange={up('pushRoute')} />
          <ObToggle label="Intervention terminée" hint="À la clôture du passage." on={v.pushFin} onChange={up('pushFin')} />
          <ObToggle label="Signalement" hint="Objet oublié, dégât, accès impossible." on={v.pushSignal} onChange={up('pushSignal')} />
        </div>
      </div>
      <div className="oa-nav">
        <button className="ob-btn sm" onClick={onBack}>Retour</button>
        <span style={{ flex: 1 }} />
        <button className="ob-btn" onClick={onBack}>Enregistrer</button>
      </div>
    </div>
  );
}

function ObProfil({ goto }) {
  const [sub, setSub] = React.useState(null);
  const back = () => setSub(null);
  if (sub === 'billing') return <ObBilling onBack={back} />;
  if (sub === 'infos') return <ObInfos onBack={back} />;
  if (sub === 'securite') return <ObSecurite onBack={back} />;
  if (sub === 'notifs') return <ObNotifs onBack={back} />;
  return (
    <div className="ob-col">
      <div className="ob-phero">
        <span className="big">CM</span>
        <div className="nm">Camille Meunier</div>
        <div className="em">camille@exemple.fr</div>
        <div className="ob-chips"><span className="ob-chip">Client · Paris</span><span className="ob-chip">6 logements</span></div>
      </div>
      {OB_SETS.map(([grp, rows]) => (
        <div key={grp}>
          <div className="ob-gl">{grp}</div>
          {rows.map(([ic, t, s, soon, go], i) => (
            <button key={i} className={'ob-set' + (soon ? ' soon' : '')} onClick={() => ['billing', 'infos', 'securite', 'notifs'].includes(go) ? setSub(go) : go && goto(go)}>
              <span className="ob-sq"><Icon name={ic} size={18} /></span>
              <span style={{ minWidth: 0 }}>
                <span className="t" style={{ display: 'block' }}>{t}</span>
                <span className="s" style={{ display: 'block' }}>{s}</span>
              </span>
              {soon ? <span className="tag">Bientôt</span> : <Icon name="chevron-right" size={17} color="#b5b3ae" />}
            </button>
          ))}
        </div>
      ))}
      <div className="ob-foot">Deltom · console client · variante barre haute</div>
    </div>
  );
}

/* ───────────── Shell ───────────── */
const OB_TABS = [
  { id: 'cal', label: 'Calendrier' },
  { id: 'logements', label: 'Logements' },
  { id: 'messages', label: 'Messages', dot: true },
  { id: 'upsell', label: 'Upsell', soon: !/[?&]demo/.test(location.search) },
];

const OB_UPS = [
  ['Arrivée anticipée', 'Dès 13:00 au lieu de 16:00', 25, true],
  ['Départ tardif', "Jusqu'à 14:00 au lieu de 11:00", 25, true],
  ['Ménage en cours de séjour', 'Linge changé inclus', 45, false],
  ['Linge supplémentaire', 'Parure et serviettes en plus', 15, false],
];

function ObUpsell() {
  const [ups, setUps] = React.useState(OB_UPS.map(([t, s, p, on]) => ({ t, s, p, on })));
  const [copied, setCopied] = React.useState(false);
  const up = (k, v) => setUps(l => l.map((x, j) => j === k ? { ...x, ...v } : x));
  return (
    <div className="ob-col">
      <h1 className="ob-h1 left">Upsell</h1>
      <div className="ob-sub left">Proposez des options à vos voyageurs. Vous fixez les prix, Deltom réalise, vous encaissez.</div>
      <div className="ob-list" style={{ marginTop: 28 }}>
        {ups.map((u, k) => (
          <div key={u.t} className="ob-lrow" style={{ cursor: 'default' }}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="ln">{u.t}</span>
              <span className="lo">{u.s}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 650 }}>
              <input value={u.p} onChange={e => up(k, { p: e.target.value.replace(/\D/g, '') })} aria-label={'Prix ' + u.t}
                style={{ width: 56, padding: '8px 10px', border: '1px solid rgba(31,26,20,.18)', borderRadius: 10, font: 'inherit', textAlign: 'right' }} />€
            </span>
            <button className={'ob-tg' + (u.on ? ' on' : '')} role="switch" aria-checked={u.on} onClick={() => up(k, { on: !u.on })}
              style={{ width: 'auto', padding: 0, border: 0 }}><span className="sw"><i /></span></button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, padding: '18px 20px', borderRadius: 16, background: '#f3f3f1', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 14.5, fontWeight: 650 }}>Votre lien voyageur</span>
          <span style={{ display: 'block', fontSize: 13.5, color: '#8c8c88', marginTop: 3 }}>deltom.fr/s/loft-republique · {ups.filter(u => u.on).length} option{ups.filter(u => u.on).length > 1 ? 's' : ''} active{ups.filter(u => u.on).length > 1 ? 's' : ''}</span>
        </span>
        <button className="ob-btn" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}>{copied ? 'Lien copié' : 'Copier le lien'}</button>
      </div>
    </div>
  );
}

function ObApp() {
  const [tab, setTab] = React.useState('today');
  const [menu, setMenu] = React.useState(false);
  const [dem, setDem] = React.useState(false);
  const Screen = { today: ObToday, cal: ObCal, logements: ObLogements, messages: ObMessages, upsell: ObUpsell, facture: ObFacturation, profil: ObProfil }[tab];
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef(null);
  const nav = (t, instant) => {
    setMenu(false);
    if (t === tab) return;
    clearTimeout(timer.current);
    setTab(t);
    if (instant) { setLoading(false); return; }
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), 650);
  };
  const goto = nav;
  return (
    <div className="ob">
      <header className="ob-bar">
        <div className="ob-brand" onClick={() => nav('today')} style={{ cursor: 'pointer' }}>
          <ObLogo size={38} />
          <span className="nm">deltom<span style={{ color: '#8C8340' }}>.</span></span>
        </div>
        <nav className="ob-tabs">
          {OB_TABS.map(t => (
            <button key={t.id} className={'ob-tab' + (t.id === tab ? ' on' : '') + (t.soon ? ' soon' : '')} onClick={() => !t.soon && nav(t.id)} title={t.soon ? 'Bientôt disponible' : undefined}>
              {t.label}{t.dot && <span className="nd" />}{t.soon && <span className="sn">Bientôt</span>}
            </button>
          ))}
        </nav>
        <div className="ob-right">
          <button className="ob-ghost" onClick={() => setDem(true)}>Demander une intervention</button>
          <button className="ob-gear" onClick={() => nav('profil', true)} title="Paramètres" aria-label="Paramètres">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </button>
        </div>
      </header>

      <main className={'ob-page' + (tab === 'messages' ? ' bare' : '')}>
        {loading
          ? <div className="ob-load" role="status" aria-label="Chargement"><i /><i /><i /></div>
          : <div key={tab} className="ob-enter">{Screen ? <Screen goto={goto} /> : null}</div>}
      </main>

      {dem && <ObDemande onClose={() => setDem(false)} />}

      {menu && (
        <>
          <div className="ob-scrim" onClick={() => setMenu(false)} />
          <aside className="ob-drawer">
            <div className="ob-dtop">
              <button className="ob-round" onClick={() => setMenu(false)}><Icon name="close" size={18} /></button>
            </div>
            <div className="ob-dbody">
              <div className="ob-dlist">
                <button className="ob-dlink" onClick={() => goto('profil')}><Icon name="user" size={20} />Paramètres du compte</button>
                <button className="ob-dlink"><Icon name="bell" size={20} />Notifications</button>
                <button className="ob-dlink" onClick={() => goto('facture')}><Icon name="inbox" size={20} />Factures</button>
                <button className="ob-dlink"><Icon name="box" size={20} />Moyens de paiement</button>
                <div className="ob-dsep" />
                <button className="ob-dlink" onClick={() => goto('messages')}><Icon name="chat" size={20} />Contacter Deltom</button>
                <button className="ob-dlink"><Icon name="key" size={20} />Codes d'accès</button>
                <button className="ob-dlink"><Icon name="lock" size={20} />Sécurité</button>
                <div className="ob-dsep" />
                <button className="ob-dlink">Se déconnecter</button>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

Object.assign(window, { ObApp, ObSt, ObLogo });
