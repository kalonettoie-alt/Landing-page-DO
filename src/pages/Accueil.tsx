import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CleaningLottie from '../components/CleaningLottie';
import SupervisionBlock from '../components/SupervisionBlock';
import { usePrices } from '../lib/prices';
import { mailto } from '../lib/config';

const KPIS = [
  { n: '68', l: 'logements coordonnés' },
  { n: '+300', l: 'interventions en juin 2026' },
  { n: '7j/7', l: 'supervision qualité' },
  { n: '14 j', l: 'paiement des opérateurs' },
];

const STEPS = [
  { n: '01', t: 'Connectez vos calendriers', d: 'Un lien iCal Airbnb ou Booking suffit. Les départs sont détectés automatiquement.' },
  { n: '02', t: 'La plateforme planifie', d: 'Chaque départ crée une intervention, calée sur vos horaires d’arrivée.' },
  { n: '03', t: 'Un opérateur est assigné', d: 'Priorité aux opérateurs fiables et qui connaissent déjà votre logement.' },
  { n: '04', t: 'Une facture, pas des SMS', d: 'Facturation groupée toutes les deux semaines, conforme, commission séparée et visible.' },
];

const TEASER = [
  { label: 'Studio', prix: '40€' },
  { label: 'T2', prix: '50€' },
  { label: 'T3', prix: '60€' },
  { label: 'T4 et plus', prix: '70€' },
];

const EST_KEYS = ['Studio', 'T2', 'T3', 'T4 et plus'];
const EST_SHORT = ['Studio', 'T2', 'T3', 'T4+'];

function Estimateur() {
  const prices = usePrices();
  const [sel, setSel] = useState(1); // T2 par défaut
  const menage = prices?.menage ?? [];
  const priceFor = (i: number) => menage.find((m) => m.label === EST_KEYS[i])?.prix ?? TEASER[i].prix;

  return (
    <div className="card card-lg" id="estimateur" style={{ padding: 32, scrollMarginTop: 96 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Estimez, sans compte</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {EST_SHORT.map((label, i) => {
          const active = i === sel;
          return (
            <button
              key={label}
              onClick={() => setSel(i)}
              style={{
                border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 8px',
                textAlign: 'center', fontFamily: 'inherit', transition: 'all 150ms ease',
                background: active ? 'var(--primary)' : '#F5F4F1',
                color: active ? '#fff' : 'var(--ink)',
              }}
              aria-pressed={active}
            >
              <span style={{ fontSize: 14.5, fontWeight: 600, display: 'block' }}>{label}</span>
              <span style={{ fontSize: 12.5, color: active ? 'rgba(255,255,255,0.7)' : 'var(--muted)', display: 'block', marginTop: 2 }}>
                {priceFor(i)}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{priceFor(sel)}</span>
        <span style={{ fontSize: 14.5, color: 'var(--body)' }}>TTC par intervention, tout compris</span>
      </div>
      <a href={mailto('Confier mon premier logement')} className="btn btn-primary btn-block" style={{ padding: '14px 22px', borderRadius: 10, fontSize: 15 }}>
        Confier mon premier logement
      </a>
      <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--muted)' }}>
        Aucun compte requis pour estimer. La connexion de calendrier arrive bientôt.
      </div>
    </div>
  );
}

export default function Accueil() {
  return (
    <>
      <Nav active={null} />

      {/* Hero */}
      <header className="container" style={{ padding: '88px var(--pad) 72px' }}>
        <div className="split split-hero">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              Plateforme de coordination · supervision humaine 7j/7 · Île-de-France
            </div>
            <h1 className="h1-hero" style={{ marginBottom: 24 }}>Votre équipe opérationnelle. Sans embaucher.</h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 32 }}>
              Des opérateurs indépendants formés, une supervision qualité 7j/7, la blanchisserie et une
              facturation propre. Deltom coordonne tout, vous ne touchez à rien.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <a href={mailto()} className="btn btn-primary">Nous contacter</a>
              <a href={mailto('Demande de démonstration Deltom')} className="btn btn-secondary">Demander une démonstration</a>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 13.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
              <span>Sans engagement</span><span>·</span><span>Prix fixes TTC</span><span>·</span><span>Facture groupée toutes les deux semaines</span>
            </div>
          </div>
          <Estimateur />
        </div>
      </header>

      {/* KPI */}
      <div className="kpi-band">
        <div className="kpi-grid">
          {KPIS.map((k) => (
            <div key={k.l}>
              <div className="kpi-num">{k.n}</div>
              <div className="kpi-label">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dream team */}
      <section className="section container">
        <div className="eyebrow">La dream team, sans l'embaucher</div>
        <h2 className="h2-section" style={{ marginBottom: 48, maxWidth: 720, textWrap: 'pretty' }}>
          Sur chaque maillon de l'opérationnel, les meilleurs de leur domaine.
        </h2>
        <div className="grid grid-4">
          {/* Opérateurs (Lottie) */}
          <div>
            <div style={{ background: 'var(--cream)', borderRadius: 16, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, overflow: 'hidden' }}>
              <CleaningLottie size={150} />
            </div>
            <h3 className="h3-card" style={{ marginBottom: 8 }}>Opérateurs sélectionnés, formés, équipés</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>Validés un par un : identité, SIRET, RC pro. Checklist à chaque passage.</p>
          </div>

          {/* Rapport d'intervention */}
          <div>
            <div style={{ background: 'var(--calm)', borderRadius: 16, height: 180, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>Rapport d'intervention</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>14:32</span>
              </div>
              {['Checklist complète — 24/24', '6 photos jointes', 'Linge changé, kit complet'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 12.5, color: 'var(--body)' }}>{t}</span>
                </div>
              ))}
              <span style={{ alignSelf: 'flex-start', background: 'var(--success-bg)', color: 'var(--success)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 9999, padding: '4px 10px' }}>Validé par la supervision</span>
            </div>
            <h3 className="h3-card" style={{ marginBottom: 8 }}>Supervision qualité 7j/7</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>Sur le terrain et en ligne. Chaque intervention est suivie jusqu'à sa validation.</p>
          </div>

          {/* Kit linge */}
          <div>
            <div style={{ background: 'var(--cream)', borderRadius: 16, height: 180, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>Kit linge · T2</span>
                <span style={{ background: '#fff', color: 'var(--ink)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 9999, padding: '4px 10px', boxShadow: '0 1px 3px rgba(22,48,47,0.08)' }}>Prêt</span>
              </div>
              {[['Parure lit double', '×1'], ['Grandes serviettes', '×2'], ['Tapis de bain', '×1']].map(([a, b]) => (
                <div key={a} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--body)' }}>
                  <span>{a}</span><span className="mono" style={{ fontSize: 11 }}>{b}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line-cream)', paddingTop: 8, fontSize: 11.5, color: 'var(--muted)' }}>Pressing professionnel, niveau hôtelier</div>
            </div>
            <h3 className="h3-card" style={{ marginBottom: 8 }}>Blanchisserie premium au prix coûtant</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>Niveau hôtelier, + 1€ de gestion par kit. Rien de plus.</p>
          </div>

          {/* Mini-chat */}
          <div>
            <div style={{ background: 'var(--calm)', borderRadius: 16, height: 180, padding: 18, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', fontSize: 13, color: 'var(--ink)', boxShadow: '0 1px 3px rgba(22,48,47,0.08)', maxWidth: '85%' }}>
                Le voyageur signale une tache sur le canapé.
              </div>
              <div style={{ alignSelf: 'flex-end', background: 'var(--primary)', color: '#fff', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', fontSize: 13, maxWidth: '85%' }}>
                Un opérateur repasse à 15h. Photos à l'appui.
              </div>
            </div>
            <h3 className="h3-card" style={{ marginBottom: 8 }}>Un support qui traite, pas qui constate</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>Messagerie directe avec l'équipe. Une question, une action.</p>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section container">
        <div className="eyebrow">Comment ça marche</div>
        <h2 className="h2-section" style={{ marginBottom: 48 }}>Quatre étapes. Aucune ne vous demande rien.</h2>
        <div className="grid grid-4" style={{ gap: 40 }}>
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>{s.n}</div>
              <h3 className="h3-card" style={{ marginBottom: 8 }}>{s.t}</h3>
              <p className="body" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <a href="/comment-ca-marche" className="textlink">Voir le fonctionnement en détail →</a>
        </div>
      </section>

      {/* Supervision */}
      <SupervisionBlock
        paragraph="Un algorithme seul lâche le jour où ça sort du cadre. Chez Deltom, toute intervention en risque remonte à l'équipe de supervision, qui la traite."
        bullets={[
          'Supervision en temps réel : proposée → acceptée → confirmée → réalisée',
          'Validation manuelle de chaque opérateur avant la première mission',
          'Documentation systématique : checklist, photos, rapport',
          'Canal direct avec le support, qui agit',
        ]}
      />

      {/* Tarifs teaser */}
      <section className="section container">
        <div className="eyebrow">Tarifs</div>
        <h2 className="h2-section" style={{ marginBottom: 12 }}>Des prix fixes, TTC, par intervention.</h2>
        <p className="body" style={{ fontSize: 15.5, marginBottom: 40 }}>Ménage complet entre deux voyageurs. Sans engagement.</p>
        <div className="grid grid-4" style={{ gap: 24, marginBottom: 24 }}>
          {TEASER.map((t) => (
            <div key={t.label} className="card">
              <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--body)', marginBottom: 8 }}>{t.label}</div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
                {t.prix} <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>TTC</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p className="body" style={{ fontSize: 14 }}>
            T5 et grandes surfaces : sur devis. Blanchisserie : pressing professionnel au prix coûtant, + 1€ de gestion par kit.
          </p>
          <a href="/tarifs" className="textlink">Voir tous les tarifs →</a>
        </div>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--cream)', borderRadius: 14, padding: '16px 20px', flexWrap: 'wrap' }}>
          <span className="badge-soon">Bientôt</span>
          <span style={{ fontSize: 14, color: 'var(--body)' }}>Upsells voyageurs — early check-in et late check-out, revenus reversés aux hôtes.</span>
        </div>
      </section>

      {/* Opérateurs */}
      <section className="section container">
        <div className="card-outline" style={{ padding: '48px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 48, flexWrap: 'wrap', borderRadius: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Vous faites du ménage professionnel ?</div>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14 }}>
              Des missions régulières, à partir de 26€ par intervention.
            </h2>
            <p className="body" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>
              Vous choisissez vos zones, vous êtes libre d'accepter ou de refuser chaque mission, vous êtes payé
              toutes les deux semaines. Vos factures sont émises en votre nom.
            </p>
          </div>
          <a href="/devenir-operateur" className="btn btn-primary" style={{ flexShrink: 0 }}>Devenir opérateur partenaire</a>
        </div>
      </section>

      {/* CTA final */}
      <section className="section section-pb container">
        <div className="cta-band">
          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 14 }}>Aucun ménage oublié.</h2>
          <p className="cta-sub">C'est un mécanisme vérifiable, pas un slogan.</p>
          <div className="cta-row">
            <a href={mailto()} className="btn btn-on-dark">Nous contacter</a>
            <a href={mailto('Demande de démonstration Deltom')} className="btn btn-ghost-dark">Demander une démonstration</a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
