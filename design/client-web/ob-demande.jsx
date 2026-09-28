// ob-demande.jsx — modale « demander une intervention »
// Globals attendus: Icon, DC_LOGEMENTS

const OD_TYPES = [
  ['Intervention de nettoyage', 'Remise en état complète entre deux séjours'],
  ['Urgence', 'Sous 4 h, selon les prestataires disponibles'],
  ['Faire appel à notre service de maintenance', 'Plomberie, électricité, serrurerie, petits travaux'],
];

const OD_CRENEAUX = ['08:00 – 11:00', '11:00 – 14:00', '14:00 – 17:00', '17:00 – 20:00'];

const OD_MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const OD_JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function OdCalendrier({ value, onChange }) {
  const base = new Date(2026, 8, 1);
  const [mois, setMois] = React.useState(8);
  const annee = 2026;
  const premier = new Date(annee, mois, 1);
  const decalage = (premier.getDay() + 6) % 7;
  const nb = new Date(annee, mois + 1, 0).getDate();
  const cases = [...Array(decalage).fill(null), ...Array.from({ length: nb }, (_, k) => k + 1)];
  return (
    <div className="od-cal">
      <div className="hd">
        <button type="button" onClick={() => setMois(m => Math.max(8, m - 1))} disabled={mois <= 8} aria-label="Mois précédent"><Icon name="arrow-left" size={16} /></button>
        <span>{OD_MOIS[mois]} {annee}</span>
        <button type="button" onClick={() => setMois(m => Math.min(11, m + 1))} disabled={mois >= 11} aria-label="Mois suivant"><Icon name="chevron-right" size={16} /></button>
      </div>
      <div className="gr">
        {OD_JOURS.map((j, k) => <span key={k} className="dw">{j}</span>)}
        {cases.map((n, k) => n === null
          ? <span key={'v' + k} />
          : <button key={n} type="button" className={'dj' + (value === `${n} ${OD_MOIS[mois]}` ? ' on' : '')} onClick={() => onChange(`${n} ${OD_MOIS[mois]}`)}>{n}</button>)}
      </div>
    </div>
  );
}

function ObDemande({ onClose }) {
  const [envoye, setEnvoye] = React.useState(false);
  const [logement, setLogement] = React.useState(DC_LOGEMENTS[0].name);
  const [type, setType] = React.useState(OD_TYPES[0][0]);
  const [date, setDate] = React.useState('');
  const [creneau, setCreneau] = React.useState('');
  const [note, setNote] = React.useState('');
  const [q, setQ] = React.useState('');
  const pret = logement && type && date && creneau;

  return (
    <>
      <div className="ob-scrim" onClick={onClose} />
      <div className="od" role="dialog" aria-label="Demander une intervention">
        <header className="od-top">
          <span className="t">{envoye ? 'Demande envoyée' : 'Demander une intervention'}</span>
          <button className="ob-round" onClick={onClose} aria-label="Fermer"><Icon name="close" size={18} /></button>
        </header>

        {envoye ? (
          <div className="od-body">
            <p className="od-lead">Deltom cherche un prestataire disponible et vous confirme le créneau sous deux heures. Vous recevrez une notification et un message dans la conversation du logement.</p>
            <div className="od-recap">
              <div className="ln"><span className="k">Logement</span><span className="v">{logement}</span></div>
              <div className="ln"><span className="k">Intervention</span><span className="v">{type}</span></div>
              <div className="ln"><span className="k">Date</span><span className="v">{date} · {creneau}</span></div>
              {note && <div className="ln"><span className="k">Précisions</span><span className="v">{note}</span></div>}
            </div>
          </div>
        ) : (
          <div className="od-body">
            <div className="od-f">
              <span className="od-lg">Logement</span>
              <div className="od-search">
                <Icon name="search" size={15} />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un logement" />
              </div>
              <div className="od-rows">
                {DC_LOGEMENTS.filter(l => (l.name + ' ' + l.loc).toLowerCase().includes(q.trim().toLowerCase())).map(l => (
                  <button key={l.name} type="button" className={'od-row' + (logement === l.name ? ' on' : '')} onClick={() => setLogement(l.name)}>
                    <span className="nm">{l.name}<i>{l.loc} · {l.kind}</i></span>
                    {logement === l.name && <Icon name="check" size={16} />}
                  </button>
                ))}
                {!DC_LOGEMENTS.some(l => (l.name + ' ' + l.loc).toLowerCase().includes(q.trim().toLowerCase())) && <p className="od-vide">Aucun logement ne correspond à « {q} ».</p>}
              </div>
            </div>

            <div className="od-f">
              <span className="od-lg">Type d'intervention</span>
              <div className="od-cards">
                {OD_TYPES.map(([t, s]) => (
                  <button key={t} type="button" className={'od-card' + (type === t ? ' on' : '')} onClick={() => setType(t)}>
                    <span className="t">{t}</span><span className="s">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="od-f">
              <span className="od-lg">Date souhaitée</span>
              <OdCalendrier value={date} onChange={setDate} />
            </div>

            <div className="od-f">
              <span className="od-lg">Créneau</span>
              <div className="od-pills">
                {OD_CRENEAUX.map(c => (
                  <button key={c} type="button" className={'od-pill' + (creneau === c ? ' on' : '')} onClick={() => setCreneau(c)}>{c}</button>
                ))}
              </div>
            </div>

            <label className="od-f">
              <span className="od-lg">Précisions <i>· facultatif</i></span>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Les voyageurs partent tard, prévoir un passage après 15 h." />
            </label>
          </div>
        )}

        <footer className="od-foot">
          {envoye
            ? <button className="ob-btn" onClick={onClose}>Fermer</button>
            : <>
                <button className="ob-btn sm" onClick={onClose}>Annuler</button>
                <span style={{ flex: 1 }} />
                <button className="ob-btn" disabled={!pret} onClick={() => setEnvoye(true)}>Envoyer la demande</button>
              </>}
        </footer>
      </div>
    </>
  );
}

Object.assign(window, { ObDemande });
