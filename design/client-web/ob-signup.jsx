// ob-signup.jsx — onboarding client (création de compte), 5 étapes
// Autonome : ne dépend que de React et de Icon (shared.jsx).
// Deux points d'entrée, même parcours : auto-inscription (5 étapes) ou invitation Deltom (démarre à l'étape 3).

const SU_STEPS = ['Vous', 'Vos logements', 'Contrat & prélèvement', 'Récapitulatif'];

const SU_ZONES = ['Paris', 'Hauts-de-Seine', 'Val-de-Marne', 'Seine-Saint-Denis', 'Seine-et-Marne', 'Essonne', 'Yvelines', "Val-d'Oise"];
const SU_PLATEFORMES = ['Airbnb', 'Booking', 'Vrbo', 'Abritel', 'Location directe'];

function SuLogo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="Deltom" style={{ display: 'block', flexShrink: 0 }}>
      <defs><mask id="su-ring"><rect width="512" height="512" fill="#000" /><circle cx="256" cy="256" r="148" fill="#fff" /><circle cx="256" cy="256" r="80" fill="#000" /><circle cx="338" cy="338" r="60" fill="#000" /></mask></defs>
      <rect width="512" height="512" fill="#1a3a36" mask="url(#su-ring)" />
      <circle cx="338" cy="338" r="45" fill="#8C8340" />
    </svg>
  );
}

function SuField({ label, hint, children }) {
  return <label className="oa-f"><span className="lb">{label}</span>{children}{hint && <span className="ht">{hint}</span>}</label>;
}

function SuChoice({ options, value, onChange, multi }) {
  const on = o => multi ? (value || []).includes(o) : value === o;
  const pick = o => {
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

function SuCards({ options, value, onChange }) {
  return (
    <div className="oa-cards one">
      {options.map(([t, sub]) => (
        <div key={t} role="button" tabIndex={0} className={'oa-card' + (value === t ? ' on' : '')}
          onClick={() => onChange(t)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(t); } }}>
          <span className="t">{t}</span><span className="s">{sub}</span>
          {value === t && <span className="ck"><Icon name="check" size={15} /></span>}
        </div>
      ))}
    </div>
  );
}

function SuStepper({ n, onChange, min = 1 }) {
  const b = (d, dis, path) => (
    <button type="button" disabled={dis} onClick={() => onChange(n + d)}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d={path} /></svg>
    </button>
  );
  return <div className="oa-stp">{b(-1, n <= min, 'M2.5 7h9')}<span className="n">{n}</span>{b(1, false, 'M7 2.5v9M2.5 7h9')}</div>;
}

function SuRecapRow({ k, v }) {
  return <div className="oa-rr"><span className="k">{k}</span><span className="v">{v || <i className="su-vide">Non renseigné</i>}</span></div>;
}

/* ── vérification par code ── */
function SuCode({ value, onChange, cible }) {
  const refs = React.useRef([]);
  const set = (i, ch) => {
    const d = ch.replace(/\D/g, '').slice(-1);
    const next = (value + '      ').slice(0, 6).split('');
    next[i] = d || ' ';
    onChange(next.join('').trimEnd());
    if (d && i < 5) refs.current[i + 1] && refs.current[i + 1].focus();
  };
  return (
    <div className="su-verif">
      <div className="su-vh">
        <span className="t">Vérifions que c'est bien vous</span>
        <span className="s">Code à 6 chiffres envoyé à {cible || 'votre adresse'}.</span>
      </div>
      <div className="su-code">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <input key={i} ref={el => refs.current[i] = el} inputMode="numeric" maxLength="1"
            value={(value[i] || '').trim()} onChange={e => set(i, e.target.value)}
            onKeyDown={e => { if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1].focus(); }} />
        ))}
      </div>
      <button type="button" className="su-again">Renvoyer le code</button>
    </div>
  );
}

/* ── étapes ── */
function SuVous({ d, up }) {
  return (
    <>
      <div className="oa-grid2">
        <SuField label="Prénom"><input value={d.prenom} onChange={e => up({ prenom: e.target.value })} placeholder="Camille" /></SuField>
        <SuField label="Nom"><input value={d.nom} onChange={e => up({ nom: e.target.value })} placeholder="Meunier" /></SuField>
      </div>
      <SuField label="Téléphone" hint="Utilisé uniquement pour les urgences sur une intervention.">
        <input type="tel" value={d.tel} onChange={e => up({ tel: e.target.value })} placeholder="06 12 34 56 78" />
      </SuField>
      <SuField label="Vous confiez vos logements en tant que">
        <SuCards value={d.statut} onChange={statut => up({ statut })} options={[
          ['Particulier', 'Vous louez en votre nom propre.'],
          ['Société', 'SCI, SARL, SAS ou autre personne morale.'],
        ]} />
      </SuField>
      {d.statut === 'Société' && (
        <SuField label="Nom de la société" hint="La raison sociale telle qu'elle est enregistrée.">
          <input value={d.raison} onChange={e => up({ raison: e.target.value })} placeholder="Smart Conciergerie" />
        </SuField>
      )}
    </>
  );
}

function SuLogements({ d, up }) {
  return (
    <>
      <div className="oa-f">
        <span className="lb">Combien de logements souhaitez-vous confier ?</span>
        <div className="oa-row">
          <span className="nm">Logements<i> · vous les déclarerez un par un ensuite</i></span>
          <SuStepper n={d.nbLog} onChange={nbLog => up({ nbLog })} />
        </div>
      </div>
      <SuField label="Où se situent-ils ?" hint="Nous vérifions que vos logements sont dans une zone couverte.">
        <SuChoice multi options={SU_ZONES} value={d.zones} onChange={zones => up({ zones })} />
      </SuField>
      {d.zones.length > 0 && (
        <div className="su-note ok">
          <Icon name="check" size={15} />
          <span>Zone couverte. Une équipe intervient déjà sur {d.zones.length > 1 ? 'ces secteurs' : 'ce secteur'}.</span>
        </div>
      )}
      <SuField label="Sur quelles plateformes louez-vous ?" hint="Cela nous permettra de lire vos calendriers de réservation.">
        <SuChoice multi options={SU_PLATEFORMES} value={d.plateformes} onChange={plateformes => up({ plateformes })} />
      </SuField>
    </>
  );
}

function SuContrat({ d, up }) {
  return (
    <>
      <SuField label="Contrat de prestation">
        <div className="su-doc">
          <div className="su-dh">
            <span className="ob-sq"><Icon name="inbox" size={19} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="t">Contrat de prestation de services</div>
              <div className="s">Deltom Groupe SAS · 6 pages · version de septembre 2026</div>
            </div>
            <button type="button" className="ob-btn xs">Lire le contrat</button>
          </div>
          <ul className="su-pts">
            <li>Deltom missionne des prestataires indépendants et facture en leur nom et pour leur compte.</li>
            <li>Facturation hebdomadaire, un prélèvement unique regroupant les factures de la semaine.</li>
            <li>Résiliable à tout moment, sans frais, avec un préavis de sept jours.</li>
          </ul>
        </div>
      </SuField>
    </>
  );
}

function SuRecap({ d }) {
  const ident = [d.prenom, d.nom].filter(Boolean).join(' ');
  return (
    <div className="oa-recap">
      <SuRecapRow k="Identité" v={ident} />
      <SuRecapRow k="Contact" v={[d.email, d.tel].filter(Boolean).join(' · ')} />
      <SuRecapRow k="Statut" v={d.statut === 'Société' ? [d.raison, d.siret && 'SIRET ' + d.siret].filter(Boolean).join(' · ') : d.statut} />
      <SuRecapRow k="Facturation" v="À compléter dans la console, onglet Facturation" />
      <SuRecapRow k="Logements" v={`${d.nbLog} logement${d.nbLog > 1 ? 's' : ''} à déclarer`} />
      <SuRecapRow k="Zones" v={d.zones.join(', ')} />
      <SuRecapRow k="Plateformes" v={d.plateformes.join(', ')} />
    </div>
  );
}

/* ── parcours ── */
function ObSignup({ onClose, onDone }) {
  const [invite, setInvite] = React.useState(false);
  const [i, setI] = React.useState(0);
  const [d, setD] = React.useState({
    prenom: '', nom: '', email: new URLSearchParams(location.search).get('email') || '', tel: '', code: '',
    statut: '', raison: '', siret: '', tvaIntra: '', adresse: '', cp: '', ville: '',
    nbLog: 1, zones: [], plateformes: [],
    contrat: false, titulaire: '', iban: '', sepa: false,
  });
  const up = patch => setD(p => ({ ...p, ...patch }));

  // Invitation : le commercial a déjà saisi identité et profil, le parcours démarre à l'étape 3.
  const toggleInvite = () => {
    const on = !invite;
    setInvite(on);
    if (on) {
      up({ prenom: 'Camille', nom: 'Meunier', email: 'camille@exemple.fr', tel: '06 12 34 56 78', code: '482910',
        statut: 'Société', raison: 'Smart Conciergerie', siret: '904 700 010 00021', adresse: '12 rue de la Roquette', cp: '75011', ville: 'Paris' });
      setI(1);
    } else { setI(0); }
  };

  const first = invite ? 1 : 0;
  const last = i === SU_STEPS.length - 1;
  const ok = [
    d.prenom && d.nom && d.tel && d.statut && (d.statut !== 'Société' || d.raison),
    d.zones.length > 0 && d.plateformes.length > 0,
    true,
    true,
  ][i];

  const titles = [
    ['Bienvenue chez Deltom operator', 'Quelques informations pour ouvrir votre compte. Comptez trois minutes.'],
    ['Vos logements', 'Un aperçu du volume et des secteurs, pour préparer vos équipes.'],
    ['Contrat & prélèvement', 'La dernière étape administrative.'],
    ['Tout est prêt', 'Vérifiez une dernière fois. Tout reste modifiable depuis vos paramètres.'],
  ][i];

  const step = () => [
    <SuVous d={d} up={up} />, <SuLogements d={d} up={up} />, <SuContrat d={d} up={up} />, <SuRecap d={d} />,
  ][i];

  return (
    <div className="oa">
      <header className="oa-top">
        <div className="oa-brand"><SuLogo size={26} /><span className="nm">deltom<span style={{ color: '#8C8340' }}>.</span></span></div>
        <div className="oa-dots">
          {SU_STEPS.map((s, k) => (
            <button key={s} type="button" title={s} aria-label={s} disabled={k < first}
              className={'d' + (k === i ? ' on' : '') + (k < i ? ' done' : '')} onClick={() => k >= first && setI(k)} />
          ))}
        </div>
        <button type="button" className={'su-mode' + (invite ? ' on' : '')} onClick={toggleInvite}>
          <i />{invite ? 'Sur invitation' : 'Auto-inscription'}
        </button>
        {onClose && <button className="ob-round" onClick={onClose}><Icon name="close" size={18} /></button>}
      </header>

      <div className="oa-body">
        <div className="oa-col">
          <div className="oa-kick">Étape {i + 1 - first} sur {SU_STEPS.length - first} · {SU_STEPS[i]}</div>
          <h1 className={titles[0].length > 30 ? 'long' : undefined}>{titles[0]}</h1>
          <p className="oa-sub">{titles[1]}</p>

          {invite && i === first && (
            <div className="su-note">
              <Icon name="check" size={15} />
              <span>Votre identité et votre profil ont été renseignés par votre conseiller Deltom. Vous pouvez les corriger depuis les points de progression.</span>
            </div>
          )}

          <div className="oa-form">{step()}</div>
          <div className="oa-nav">
            <button className="ob-btn sm" onClick={() => i === first ? (onClose && onClose()) : setI(i - 1)}>{i === first ? 'Annuler' : 'Retour'}</button>
            <span style={{ flex: 1 }} />
            <button className="ob-btn" disabled={!ok} onClick={() => last ? onDone(d) : setI(i + 1)}>
              {last ? 'Ouvrir mon compte' : 'Continuer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── écran de fin ── */
function ObSignupDone({ data, onClose, onAddLogement }) {
  const d = data || {};
  return (
    <div className="oa">
      <header className="oa-top">
        <div className="oa-brand"><SuLogo size={26} /><span className="nm">deltom<span style={{ color: '#8C8340' }}>.</span></span></div>
        <span style={{ flex: 1 }} />
        {onClose && <button className="ob-round" onClick={onClose}><Icon name="close" size={18} /></button>}
      </header>
      <div className="oa-body">
        <div className="oa-col">
          <div className="oa-kick">Compte ouvert</div>
          <h1>Bienvenue, {d.prenom || 'Camille'}</h1>
          <p className="oa-sub">Votre compte est actif. Il ne reste qu'à déclarer vos logements pour lancer les premières interventions.</p>

          <div className="oa-fiche">
            <div className="oa-fh">
              <span className="ob-sq"><Icon name="user" size={20} stroke={1.4} /></span>
              <div style={{ flex: 1 }}>
                <div className="t">{d.raison || [d.prenom, d.nom].filter(Boolean).join(' ') || 'Camille Meunier'}</div>
                <div className="s">{d.email || 'camille@exemple.fr'}</div>
              </div>
              <span className="ob-st termine"><i className="k" />Actif</span>
            </div>
            <SuRecapRow k="Prélèvement" v="Mandat SEPA actif · RUM transmis par e-mail" />
            <SuRecapRow k="Facturation" v="Hebdomadaire · un prélèvement le mardi" />
            <SuRecapRow k="Logements" v={`0 sur ${d.nbLog || 1} déclaré${(d.nbLog || 1) > 1 ? 's' : ''}`} />
          </div>

          <div className="su-amorce">
            <div>
              <div className="t">Déclarez votre premier logement</div>
              <div className="s">Adresse, accès, checklist et calendriers. Environ cinq minutes par logement.</div>
            </div>
            <button className="ob-btn" onClick={onAddLogement}>Commencer</button>
          </div>

          <div className="oa-actions">
            <button className="ob-btn sm" onClick={onClose}>Aller à la console</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ObSignup, ObSignupDone, SU_STEPS });
