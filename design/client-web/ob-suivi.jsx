// ob-suivi.jsx — modale « suivi d'intervention » : live pendant, rapport après.
// Globals attendus : Icon. Expose : ObSuivi.

const SV_STEPS = [
  ['Mission assignée', '07:12', 'Karim B. · opérateur validé'],
  ['Opérateur en route', '08:34', 'Arrivée estimée 09:00'],
  ['Arrivée sur place', '09:02', 'Accès par boîte à clés'],
  ['Ménage en cours', '09:08', '4 pièces · linge fourni'],
  ['Intervention terminée', '10:46', 'Rapport transmis'],
];
const SV_PIECES = [
  ['Séjour', 'sauge', true], ['Cuisine', 'olive', true],
  ['Chambre', 'carton', true], ['Salle de bain', 'saumon', true],
];
const SV_TACHES = [
  ['Sols aspirés et lavés', true], ['Sanitaires désinfectés', true],
  ['Lits refaits, linge propre', true], ['Cuisine et électroménager', true],
  ['Poubelles sorties', true], ['Vitres intérieures', false],
];
const SV_PRIX = [
  ['Ménage complet · 2 h', '78,00 €'],
  ['Linge et consommables', '24,00 €'],
  ['Total TTC', '102,00 €'],
];
const SV_CONSO = [
  ['Draps 2 places', '2 jeux'], ['Housses de couette', '2'],
  ['Serviettes de bain', '4'], ['Tapis de bain', '2'],
  ['Kit accueil', '1'], ['Produits ménagers', 'Standard'],
];
const SvAlert = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5562c" strokeWidth="1.7" strokeLinecap="round"><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></svg>;
const SvDlG = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v11M7.5 10L12 14.5 16.5 10M4 19h16" /></svg>;
const SV_TONE = { sauge: '#B7C4A8', olive: '#8C8340', carton: '#D6C3A5', saumon: '#D9A48F' };

function SvSquare({ tone, label, note }) {
  return (
    <div className="sv-ph">
      <span className="im" style={{ background: SV_TONE[tone] || '#E6E3DC' }}>
        <Icon name="photo" size={16} color="rgba(255,255,255,.9)" />
      </span>
      {label && <span className="lb">{label}</span>}
      {note && <span className="nt">{note}</span>}
    </div>
  );
}

function SvBlock({ title, extra, children }) {
  return (
    <section className="sv-bl">
      <div className="sv-bh"><h3>{title}</h3>{extra}</div>
      {children}
    </section>
  );
}

function ObSuivi({ item, onClose }) {
  const it = item || {};
  const done = it.status === 'termine';
  const live = it.status === 'encours';
  const [tab, setTab] = React.useState(done ? 'rapport' : 'suivi');
  React.useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const cur = done ? SV_STEPS.length : live ? 3 : 1;
  const statut = done ? 'Terminée' : live ? 'En cours' : 'À venir';

  return (
    <div className="sv-ov" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sv-card" role="dialog" aria-modal="true" aria-label={'Intervention ' + (it.name || '')}>
        <header className="sv-top">
          <span className={'sv-dot ' + (done ? 'ok' : live ? 'live' : 'soon')} />
          <div className="sv-id">
            <div className="t">{it.name || 'Studio Voltaire'}</div>
            <div className="s">Ménage complet · vendredi 4 septembre · {it.time || '02:00'}</div>
          </div>
          <span className={'sv-badge ' + (done ? 'ok' : live ? 'live' : 'soon')}>{statut}</span>
          <button className="sv-x" onClick={onClose} aria-label="Fermer">
            <Icon name="close" size={16} color="#8c8c88" />
          </button>
        </header>

        <div className="sv-tabs">
          {['suivi', 'rapport'].map(t => (
            <button key={t} className={'sv-tab' + (tab === t ? ' on' : '')}
              disabled={t === 'rapport' && !done}
              onClick={() => setTab(t)}>
              {t === 'suivi' ? 'Suivi' : 'Rapport'}
              {t === 'rapport' && !done && <span className="sv-soon">bientôt</span>}
            </button>
          ))}
        </div>

        <div className="sv-body">
          {tab === 'suivi' ? (
            <>
              <SvBlock title="Déroulé">
                <ol className="sv-tl">
                  {SV_STEPS.map(([lb, hh, nt], i) => {
                    const st = i < cur ? 'ok' : i === cur ? 'now' : 'idle';
                    return (
                      <li key={lb} className={'sv-st ' + st}>
                        <span className="pt">{st === 'ok' && <Icon name="check" size={11} color="#fff" />}</span>
                        <div className="tx">
                          <div className="l">{lb}</div>
                          <div className="n">{st === 'idle' ? '—' : nt}</div>
                        </div>
                        <div className="h">{st === 'idle' ? '' : hh}</div>
                      </li>
                    );
                  })}
                </ol>
              </SvBlock>

              <SvBlock title="Photos en direct" extra={<span className="sv-cnt">{done ? '6 photos' : live ? '3 photos · mise à jour continue' : 'en attente'}</span>}>
                {cur >= 3 ? (
                  <div className="sv-grid4">
                    {SV_PIECES.slice(0, done ? 4 : 3).map(([lb, tn]) => <SvSquare key={lb} tone={tn} label={lb} />)}
                    {!done && <div className="sv-ph wait"><span className="im pending" /><span className="lb">En attente</span></div>}
                  </div>
                ) : (
                  <p className="sv-none">Les photos apparaîtront dès le début de l'intervention.</p>
                )}
              </SvBlock>

              <SvBlock title="Signalements" extra={<span className="sv-cnt">{done ? '1' : live ? '1 en cours' : '0'}</span>}>
                {cur >= 3 ? (
                  <div className="sv-flag">
                    <span className="ic"><SvAlert /></span>
                    <div>
                      <div className="t">Objet oublié · chargeur de téléphone</div>
                      <div className="s">Signalé à 09:41 dans la chambre. Mis de côté, photo jointe. La supervision a prévenu le voyageur.</div>
                    </div>
                  </div>
                ) : (
                  <p className="sv-none">Aucun imprévu signalé.</p>
                )}
              </SvBlock>
            </>
          ) : (
            <>
              <SvBlock title="Photos avant" extra={<span className="sv-cnt">4 photos</span>}>
                <div className="sv-grid4">
                  {SV_PIECES.map(([lb, tn]) => <SvSquare key={lb} tone={tn} />)}
                </div>
              </SvBlock>

              <SvBlock title="Photos après" extra={<span className="sv-cnt">4 photos</span>}>
                <div className="sv-grid4">
                  {SV_PIECES.map(([lb, tn]) => <SvSquare key={lb} tone={tn} />)}
                </div>
              </SvBlock>

              <SvBlock title="Checklist" extra={<span className="sv-cnt">5 / 6</span>}>
                <ul className="sv-chk">
                  {SV_TACHES.map(([lb, ok]) => (
                    <li key={lb} className={ok ? 'ok' : 'no'}>
                      <span className="bx">{ok ? <Icon name="check" size={12} color="#fff" /> : <Icon name="close" size={11} color="#8c8c88" />}</span>
                      <span className="l">{lb}</span>
                      {!ok && <span className="r">Non applicable · signalé</span>}
                    </li>
                  ))}
                </ul>
              </SvBlock>

              <SvBlock title="Prix de l'intervention">
                <div className="sv-kv">
                  {SV_PRIX.map(([k, v]) => (
                    <div key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
                  ))}
                </div>
              </SvBlock>

              <SvBlock title="Consommables et linge">
                <div className="sv-kv">
                  {SV_CONSO.map(([k, v]) => (
                    <div key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
                  ))}
                </div>
              </SvBlock>

              <SvBlock title="Objets oubliés et anomalies" extra={<span className="sv-cnt">2</span>}>
                <div className="sv-flag">
                  <span className="ic"><SvAlert /></span>
                  <div>
                    <div className="t">Chargeur de téléphone · chambre</div>
                    <div className="s">Mis de côté dans le tiroir de l'entrée. Voyageur prévenu par la supervision.</div>
                  </div>
                </div>
                <div className="sv-flag">
                  <span className="ic"><SvAlert /></span>
                  <div>
                    <div className="t">Joint de douche encrassé · salle de bain</div>
                    <div className="s">Nettoyage impossible sans traitement. Devis maintenance proposé.</div>
                  </div>
                </div>
              </SvBlock>
            </>
          )}
        </div>

        <footer className="sv-foot">
          {tab === 'suivi' ? (
            <>
              <div className="sv-fi">Supervision Deltom · 7j/7, réponse sous 15 min</div>
              <button className="ob-ghost">Contacter la supervision</button>
            </>
          ) : (
            <>
              <div className="sv-fi">Total TTC · 102,00 €</div>
              <button className="ob-ghost strong"><SvDlG />Télécharger le PDF</button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { ObSuivi });
