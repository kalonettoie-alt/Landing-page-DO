import { useState } from 'react';
import type { CSSProperties } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { FORMSPREE_OPERATEUR_ENDPOINT, mailto } from '../lib/config';

const POURQUOI = [
  ['Des missions récurrentes', 'Les mêmes logements reviennent chaque semaine. Vous connaissez les lieux, vous gagnez du temps.'],
  ['Payé toutes les deux semaines', 'Un virement tous les 14 jours, sur la base des factures émises en votre nom.'],
  ['Vous choisissez vos zones', 'Les missions ne sont proposées que dans les communes que vous avez sélectionnées.'],
  ['Libre de refuser, sans pénalité', 'Chaque mission est une proposition. Refuser n’entraîne jamais de sanction.'],
  ['La fiabilité est récompensée', 'Les opérateurs fiables sont prioritaires sur les nouvelles missions et les logements réguliers.'],
  ['Zéro paperasse', 'Vos factures sont établies en votre nom par la plateforme (mandat de facturation). Vous n’avez rien à rédiger.'],
];

const PARCOURS = [
  ['01', 'Vous postulez', '5 minutes, en ligne. Les documents peuvent être complétés après.'],
  ['02', 'Votre dossier est validé', 'Manuellement, sous quelques jours : identité, SIRET, RC pro.'],
  ['03', 'Vous recevez des propositions', 'Uniquement dans vos zones. Vous acceptez ou refusez, librement.'],
  ['04', 'Vous êtes payé', 'Toutes les deux semaines, factures émises en votre nom.'],
];

const FAQ = [
  ['Serai-je payé, et quand ?', 'Oui, toutes les deux semaines, par virement. Le montant de chaque mission est affiché avant que vous l’acceptiez : à partir de 26€ selon la taille du logement.'],
  ['Les missions sont-elles irrégulières ?', 'Les logements en location courte durée tournent chaque semaine. Un opérateur régulier retrouve les mêmes logements, aux mêmes rythmes — c’est ce qui rend le revenu prévisible.'],
  ['Suis-je obligé d’accepter les missions ?', 'Non, jamais. Vous êtes indépendant : chaque mission est une proposition, que vous êtes libre d’accepter ou de refuser sans pénalité.'],
  ['Dois-je déjà avoir un statut ?', 'Un statut d’indépendant (auto-entrepreneur ou société) est nécessaire pour intervenir. Si vous êtes en cours de création — ou si vous souhaitez vous lancer — postulez quand même : nous vous accompagnons.'],
];

const COMMUNES_BASE = ['Créteil', 'Maisons-Alfort', 'Saint-Maur', 'Vincennes', 'Charenton', 'Paris 12e', 'Paris 11e', 'Ivry-sur-Seine'];
const STATUTS: [string, string][] = [
  ['auto', 'Auto-entrepreneur (ou société) déjà immatriculé'],
  ['encours', 'Immatriculation en cours'],
  ['lancer', 'Je souhaite me lancer'],
];
const EXPS: [string, string][] = [
  ['oui', 'Oui, déjà en LCD'],
  ['menage', 'Ménage pro, pas en LCD'],
  ['non', 'Pas encore'],
];
const DOCS: [string, string, string][] = [
  ['id', "Pièce d'identité", "Carte d'identité, passeport ou titre de séjour"],
  ['sirene', 'Avis de situation SIRENE', 'Si vous êtes déjà immatriculé'],
  ['rcpro', 'Attestation RC professionnelle', 'Peut être fournie après validation'],
];

const STATUT_LABEL: Record<string, string> = Object.fromEntries(STATUTS);
const EXP_LABEL: Record<string, string> = Object.fromEntries(EXPS);

const pillBase: CSSProperties = { border: 'none', cursor: 'pointer', borderRadius: 9999, padding: '9px 16px', fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', transition: 'all 150ms ease' };
const rowBase: CSSProperties = { cursor: 'pointer', borderRadius: 12, padding: '14px 18px', fontSize: 14.5, fontWeight: 600, fontFamily: 'inherit', textAlign: 'left', transition: 'all 150ms ease', width: '100%' };

function Candidature() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [statut, setStatut] = useState('');
  const [siret, setSiret] = useState('');
  const [communes, setCommunes] = useState<string[]>([]);
  const [customCommune, setCustomCommune] = useState('');
  const [exp, setExp] = useState('');
  const [files, setFiles] = useState<Record<string, string>>({ id: '', sirene: '', rcpro: '' });
  const [attest, setAttest] = useState(false);

  const addCustomCommune = () => {
    const v = customCommune.trim();
    if (!v) return;
    setCommunes((c) => (c.includes(v) ? c : [...c, v]));
    setCustomCommune('');
    setError('');
  };

  const toggleCommune = (c: string) =>
    setCommunes((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const validate = (): string => {
    if (step === 1) {
      if (!nom.trim()) return 'Indiquez votre nom complet.';
      if (!tel.trim()) return 'Indiquez votre numéro de téléphone.';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return 'Indiquez un email valide.';
    }
    if (step === 2) {
      if (!statut) return 'Sélectionnez votre statut.';
      if (statut === 'auto' && !/^\d{14}$/.test(siret.replace(/\s/g, ''))) return 'Le SIRET comporte 14 chiffres.';
      if (communes.length === 0) return 'Sélectionnez au moins une commune.';
      if (!exp) return 'Indiquez votre expérience en location courte durée.';
    }
    if (step === 3 && !attest) return 'Cette attestation est nécessaire pour postuler en tant qu’indépendant.';
    return '';
  };

  const submit = async () => {
    setSending(true);
    setError('');
    const payload = {
      Nom: nom,
      Téléphone: tel,
      Email: email,
      Statut: STATUT_LABEL[statut] ?? statut,
      SIRET: siret || 'non communiqué',
      Communes: communes.join(', '),
      Expérience: EXP_LABEL[exp] ?? exp,
      Documents: DOCS.map(([k, label]) => `${label} : ${files[k] ? files[k] : 'à fournir'}`).join(' · '),
      _subject: `👷 Nouvelle candidature opérateur — ${nom}`,
    };
    try {
      const res = await fetch(FORMSPREE_OPERATEUR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSubmitted(true);
      else setError('Une erreur est survenue à l’envoi. Réessayez ou écrivez-nous à contact@deltomops.com.');
    } catch {
      setError('Une erreur est survenue à l’envoi. Réessayez ou écrivez-nous à contact@deltomops.com.');
    } finally {
      setSending(false);
    }
  };

  const goNext = () => {
    const err = validate();
    if (err) { setError(err); return; }
    if (step === 3) { void submit(); return; }
    setStep((s) => s + 1);
    setError('');
  };

  const stepLabels = ['Coordonnées', 'Activité et zones', 'Documents et envoi'];

  if (submitted) {
    return (
      <div style={{ background: 'var(--success-bg)', borderRadius: 20, padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--success)' }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Candidature envoyée</h3>
        <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
          Votre dossier sera examiné manuellement sous quelques jours. Vous recevrez une réponse par email à{' '}
          {email.trim() || 'l’adresse indiquée'}. Les documents manquants pourront être ajoutés à ce moment-là.
        </p>
      </div>
    );
  }

  const allCommunes = [...COMMUNES_BASE, ...communes.filter((c) => !COMMUNES_BASE.includes(c))];

  return (
    <div className="card card-lg" style={{ padding: 40 }}>
      {/* Barre de progression */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
        {stepLabels.map((label, i) => (
          <div key={label} style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 9999, background: i < step ? 'var(--primary)' : '#ECEAE5', marginBottom: 8 }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: i + 1 === step ? 'var(--ink)' : 'var(--muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="nom">Nom complet</label>
            <input id="nom" className="field" value={nom} onChange={(e) => { setNom(e.target.value); setError(''); }} placeholder="Prénom et nom" />
          </div>
          <div className="field-2col">
            <div>
              <label className="form-label" htmlFor="tel">Téléphone</label>
              <input id="tel" className="field" value={tel} onChange={(e) => { setTel(e.target.value); setError(''); }} placeholder="06 12 34 56 78" />
            </div>
            <div>
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" className="field" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="vous@exemple.fr" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label className="form-label">Votre statut</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STATUTS.map(([k, label]) => {
                const active = statut === k;
                return (
                  <button key={k} onClick={() => { setStatut(k); setError(''); }} style={{ ...rowBase, background: active ? 'var(--primary)' : '#fff', color: active ? '#fff' : 'var(--ink)', border: `1px solid ${active ? 'var(--primary)' : 'var(--line)'}` }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {statut === 'auto' && (
            <div>
              <label className="form-label" htmlFor="siret">Numéro SIRET</label>
              <input id="siret" className="field field-mono" value={siret} onChange={(e) => { setSiret(e.target.value); setError(''); }} placeholder="14 chiffres" inputMode="numeric" />
            </div>
          )}

          <div>
            <label className="form-label">Communes où vous souhaitez intervenir</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              {allCommunes.map((c) => {
                const active = communes.includes(c);
                return (
                  <button key={c} onClick={() => { toggleCommune(c); setError(''); }} style={{ ...pillBase, background: active ? 'var(--primary)' : 'var(--pill)', color: active ? '#fff' : 'var(--ink)' }}>
                    {c}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="field"
                style={{ flex: 1, height: 42 }}
                value={customCommune}
                onChange={(e) => setCustomCommune(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomCommune(); } }}
                placeholder="Ajouter une autre commune…"
              />
              <button onClick={addCustomCommune} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: 10, padding: '0 16px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Ajouter</button>
            </div>
          </div>

          <div>
            <label className="form-label">Expérience en location courte durée</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EXPS.map(([k, label]) => {
                const active = exp === k;
                return (
                  <button key={k} onClick={() => { setExp(k); setError(''); }} style={{ ...pillBase, background: active ? 'var(--primary)' : 'var(--pill)', color: active ? '#fff' : 'var(--ink)' }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p className="body" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Ces documents sont nécessaires pour valider votre dossier. Vous pouvez les ajouter maintenant, ou{' '}
            <strong style={{ color: 'var(--ink)' }}>les compléter après</strong> votre candidature.
          </p>
          {DOCS.map(([k, label, hint]) => {
            const has = !!files[k];
            return (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, border: '1px solid var(--line)', borderRadius: 14, padding: '16px 20px' }}>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{hint}</div>
                </div>
                <label style={{ cursor: 'pointer', borderRadius: 10, padding: '10px 16px', fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', background: has ? 'var(--success-bg)' : 'var(--pill)', color: has ? 'var(--success)' : 'var(--ink)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {has ? `✓ ${files[k]}` : 'Ajouter'}
                  <input type="file" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setFiles((prev) => ({ ...prev, [k]: f.name })); }} />
                </label>
              </div>
            );
          })}
          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--cream)', borderRadius: 14, padding: '18px 20px', cursor: 'pointer' }}>
            <input type="checkbox" checked={attest} onChange={(e) => { setAttest(e.target.checked); setError(''); }} style={{ marginTop: 3, width: 16, height: 16, accentColor: '#1A3A3A' }} />
            <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>
              Je postule en tant que professionnel indépendant, libre d'accepter ou de refuser chaque mission.
            </span>
          </label>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, background: 'var(--danger-bg)', borderRadius: 10, padding: '12px 16px', fontSize: 13.5, color: 'var(--danger)' }}>{error}</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36 }}>
        {step > 1 ? (
          <button onClick={() => { setStep((s) => s - 1); setError(''); }} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: 12, padding: '13px 22px', fontSize: 15, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Retour</button>
        ) : (
          <span />
        )}
        <button onClick={goNext} disabled={sending} style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 26px', fontSize: 15, fontWeight: 600, cursor: sending ? 'default' : 'pointer', fontFamily: 'inherit', opacity: sending ? 0.6 : 1 }}>
          {step === 3 ? (sending ? 'Envoi…' : 'Envoyer ma candidature') : 'Continuer'}
        </button>
      </div>
    </div>
  );
}

export default function DevenirOperateur() {
  return (
    <>
      <Nav active="operateur" cta="postuler" />

      <header className="container" style={{ padding: '88px var(--pad) 72px' }}>
        <div className="split split-6040">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Devenir opérateur partenaire</div>
            <h1 className="h1-hero" style={{ fontSize: 56, marginBottom: 20 }}>À partir de 26€ par intervention.</h1>
            <p className="lead" style={{ fontSize: 17, maxWidth: 520, marginBottom: 32 }}>
              Selon la taille du logement, payé toutes les deux semaines. Des missions régulières dans les zones
              que vous choisissez, en Île-de-France.
            </p>
            <a href="#candidature" className="btn btn-primary">Postuler — 5 minutes</a>
            <div style={{ marginTop: 16, fontSize: 13.5, color: 'var(--muted)' }}>Réponse sous quelques jours, après examen de votre dossier.</div>
          </div>
          <div style={{ background: 'var(--primary)', borderRadius: 24, padding: 36, color: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Votre quinzaine, en clair</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5 }}>
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>12 interventions réalisées</span>
                <span className="mono" style={{ fontWeight: 700 }}>438,00€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5 }}>
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>Factures émises en votre nom</span>
                <span style={{ color: '#7EE0B8', fontWeight: 600 }}>✓ automatique</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16 }}>
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>Virement</span>
                <span style={{ fontWeight: 700 }}>tous les 14 jours</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Pourquoi */}
      <section className="container" style={{ paddingTop: 24 }}>
        <h2 className="h2-section" style={{ marginBottom: 48 }}>Pourquoi travailler avec Deltom</h2>
        <div className="grid grid-3" style={{ gap: '40px 32px' }}>
          {POURQUOI.map(([t, d]) => (
            <div key={t}>
              <h3 className="h3-card" style={{ marginBottom: 8 }}>{t}</h3>
              <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parcours */}
      <section className="section container">
        <div style={{ background: 'var(--calm)', borderRadius: 28, padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 64px)' }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 40 }}>Comment ça se passe</h2>
          <div className="grid grid-4" style={{ gap: 40 }}>
            {PARCOURS.map(([n, t, d]) => (
              <div key={n}>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>{n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{t}</h3>
                <p className="body" style={{ fontSize: 14, lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container">
        <div className="split" style={{ gridTemplateColumns: '0.8fr 1.2fr' }}>
          <h2 className="h2-section">Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <h3 className="h3-card" style={{ marginBottom: 8 }}>{q}</h3>
                <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidature */}
      <section id="candidature" className="section section-pb container" style={{ scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Candidature</div>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 10 }}>Postuler comme opérateur partenaire</h2>
            <p className="body" style={{ fontSize: 15 }}>5 minutes. Réponse sous quelques jours.</p>
          </div>
          <Candidature />
          <p className="body" style={{ fontSize: 13, textAlign: 'center', marginTop: 20 }}>
            Une question avant de postuler ? <a href={mailto('Question opérateur Deltom')} style={{ fontWeight: 600 }}>Écrivez-nous</a>.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
