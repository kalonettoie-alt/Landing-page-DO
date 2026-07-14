import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CleaningLottie from '../components/CleaningLottie';
import SupervisionBlock from '../components/SupervisionBlock';
import { mailto } from '../lib/config';

export default function CommentCaMarche() {
  return (
    <>
      <Nav active="comment" />

      <header className="container" style={{ padding: '88px var(--pad) 72px' }}>
        <div className="split split-6040">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Comment ça marche</div>
            <h1 className="h1-page" style={{ marginBottom: 20 }}>Du départ du voyageur à la facture. Sans vous.</h1>
            <p className="lead" style={{ fontSize: 17, maxWidth: 540 }}>
              Vous connectez vos calendriers une fois. Ensuite, la plateforme détecte, planifie et coordonne —
              et des humains supervisent chaque intervention, 7j/7.
            </p>
          </div>
          <div style={{ background: 'var(--cream)', borderRadius: 24, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CleaningLottie size={220} />
          </div>
        </div>
      </header>

      <section className="container" style={{ paddingTop: 24 }}>
        {/* 01 */}
        <div className="step-row">
          <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold)' }}>01</div>
          <div>
            <h2 className="h2-block" style={{ fontSize: 24, marginBottom: 10 }}>Connectez vos calendriers</h2>
            <p className="body" style={{ fontSize: 15, lineHeight: 1.65 }}>
              Collez le lien iCal de vos annonces Airbnb ou Booking. C'est la seule chose qu'on vous demande —
              pas d'installation, pas de changement dans vos habitudes.
            </p>
          </div>
          <div style={{ background: 'var(--calm)', borderRadius: 16, padding: '20px 24px', overflow: 'hidden' }} className="mono">
            <div style={{ color: 'var(--muted)', marginBottom: 8, fontSize: 12.5 }}>// lien iCal</div>
            <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: 12.5, color: 'var(--body)' }}>airbnb.fr/calendar/ical/2841…ics</div>
            <div style={{ marginTop: 12, color: 'var(--success)', fontWeight: 700, fontSize: 12.5 }}>✓ 2 logements synchronisés</div>
          </div>
        </div>

        {/* 02 */}
        <div className="step-row">
          <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold)' }}>02</div>
          <div>
            <h2 className="h2-block" style={{ fontSize: 24, marginBottom: 10 }}>La plateforme planifie</h2>
            <p className="body" style={{ fontSize: 15, lineHeight: 1.65 }}>
              Chaque départ détecté crée automatiquement une intervention, calée entre le check-out et le prochain
              check-in. Vous pouvez ajuster les créneaux, ou ne rien faire.
            </p>
          </div>
          <div style={{ background: 'var(--calm)', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 10 }}>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Départ sam. 11:00</span><span className="muted">T2 · Vincennes</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>Ménage 11:30 → 13:30</span><span className="muted">arrivée 16:00</span>
            </div>
          </div>
        </div>

        {/* 03 */}
        <div className="step-row">
          <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold)' }}>03</div>
          <div>
            <h2 className="h2-block" style={{ fontSize: 24, marginBottom: 10 }}>Un opérateur est assigné</h2>
            <p className="body" style={{ fontSize: 15, lineHeight: 1.65 }}>
              La mission est proposée en priorité aux opérateurs les plus fiables et à ceux qui connaissent déjà
              votre logement. Chaque opérateur est validé un par un avant sa première mission : identité, SIRET, RC pro.
            </p>
          </div>
          <div style={{ background: 'var(--calm)', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>AT</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Awa T.</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>a déjà fait ce logement 12 fois</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>Mission acceptée et confirmée</div>
          </div>
        </div>

        {/* 04 */}
        <div className="step-row">
          <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold)' }}>04</div>
          <div>
            <h2 className="h2-block" style={{ fontSize: 24, marginBottom: 10 }}>Une facture, pas des SMS</h2>
            <p className="body" style={{ fontSize: 15, lineHeight: 1.65 }}>
              Toutes les deux semaines, une facture groupée, détaillée et conforme. La prestation est facturée au nom
              de l'opérateur (mandat de facturation) ; les frais de gestion Deltom sont séparés et visibles.{' '}
              <a href="/cgv#facturation" style={{ fontWeight: 600 }}>Le détail →</a>
            </p>
          </div>
          <div style={{ background: 'var(--calm)', borderRadius: 16, padding: '20px 24px', fontSize: 13.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--body)' }}>6 interventions · Awa T.</span><span className="mono" style={{ color: 'var(--ink)', fontWeight: 600 }}>300,00€</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--body)' }}>Blanchisserie (6 kits)</span><span className="mono" style={{ color: 'var(--ink)', fontWeight: 600 }}>71,40€</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 8 }}>
              <span style={{ color: 'var(--body)' }}>Frais de gestion Deltom</span><span style={{ color: 'var(--ink)', fontWeight: 600 }}>séparés, visibles</span>
            </div>
          </div>
        </div>
      </section>

      <SupervisionBlock
        paragraph="Un algorithme seul lâche le jour où ça sort du cadre. Toute intervention en risque — opérateur silencieux, retard, imprévu sur place — remonte à l'équipe de supervision, qui la traite jusqu'à résolution."
        bullets={[
          'Chaque intervention suivie en temps réel : proposée → acceptée → confirmée → réalisée',
          'Remplacement automatique en cas de désistement, puis reprise humaine',
          'Documentation systématique : checklist, photos, rapport',
          'Canal direct avec le support, qui agit',
        ]}
      />

      <section className="section section-pb container">
        <div className="cta-band compact">
          <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 12 }}>Une expérience vaut mieux que mille mots.</h2>
          <p className="cta-sub">Demandez un essai gratuit sur votre premier logement.</p>
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
