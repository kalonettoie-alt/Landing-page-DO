import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { usePrices, type PriceItem } from '../lib/prices';
import { mailto } from '../lib/config';

export default function Tarifs() {
  const prices = usePrices();

  const menage = prices?.menage ?? [];
  const blanchisserie = prices?.blanchisserie;
  const consommables = prices?.consommables ?? [];
  const blocs = blanchisserie ? [...blanchisserie.formules, blanchisserie.serviettes] : [];

  return (
    <>
      <Nav active="tarifs" />

      <header className="container" style={{ padding: '88px var(--pad) 64px' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Tarifs</div>
        <h1 className="h1-page" style={{ maxWidth: 760, marginBottom: 20 }}>Des prix fixes, TTC, connus avant de commencer.</h1>
        <p className="lead" style={{ fontSize: 17, maxWidth: 620 }}>
          Sans engagement, sans frais cachés. Facturation groupée toutes les deux semaines, détaillée et conforme :
          la prestation est facturée au nom de l'opérateur (mandat de facturation), la commission Deltom est
          séparée et visible.
        </p>
      </header>

      {/* Ménage */}
      <section className="container">
        <h2 className="h2-block" style={{ marginBottom: 8 }}>Ménage</h2>
        <p className="body" style={{ fontSize: 15, marginBottom: 36 }}>Par intervention, entre deux voyageurs. Checklist complète, photos, rapport.</p>
        <div className="grid grid-5">
          {menage.map((m: PriceItem) => (
            <div key={m.label} className="card" style={{ padding: 26 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--body)', marginBottom: 10 }}>{m.label}</div>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{m.prix}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>
                {m.prix === 'Sur devis' ? 'nous contacter' : 'TTC / intervention'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blanchisserie */}
      <section className="container" style={{ paddingTop: 88 }}>
        <h2 className="h2-block" style={{ marginBottom: 8 }}>Blanchisserie</h2>
        <p className="body" style={{ fontSize: 15, marginBottom: 36 }}>
          {blanchisserie?.intro} Barème révisé annuellement par notre partenaire.
        </p>
        <div className="grid grid-3">
          {blocs.map((bloc) => (
            <div key={bloc.titre} style={{ background: 'var(--cream)', borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{bloc.titre}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>{bloc.sousTitre}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bloc.items.map((it) => (
                  <div key={it.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line-cream)', paddingBottom: 12 }}>
                    <span style={{ fontSize: 14.5, color: 'var(--ink)' }}>{it.label}</span>
                    <span className="mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{it.prix}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consommables */}
      <section className="container" style={{ paddingTop: 88 }}>
        <h2 className="h2-block" style={{ marginBottom: 8 }}>Consommables</h2>
        <p className="body" style={{ fontSize: 15, marginBottom: 36 }}>À la demande, réapprovisionnés lors des interventions.</p>
        <div className="grid grid-5">
          {consommables.map((c: PriceItem) => (
            <div key={c.label} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 14, color: 'var(--body)', marginBottom: 8 }}>{c.label}</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{c.prix}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facturation / Annulation */}
      <section className="container" style={{ paddingTop: 88 }}>
        <div style={{ background: 'var(--calm)', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>Comment vous êtes facturé</h2>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>
              Une facture groupée toutes les deux semaines, détaillée intervention par intervention. Chaque prestation
              est facturée au nom de l'opérateur qui l'a réalisée (mandat de facturation) ; les frais de gestion Deltom
              apparaissent sur une ligne séparée, toujours visible.{' '}
              <a href="/cgv#facturation" style={{ fontWeight: 600 }}>Le détail du fonctionnement →</a>
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>Annulation et remboursement</h2>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>
              Une intervention peut être annulée sans frais jusqu'à la veille. Une prestation non conforme est reprise
              ou déduite de la facture suivante.{' '}
              <a href="/cgv#remboursement" style={{ fontWeight: 600 }}>Les conditions complètes →</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-pb container">
        <div className="cta-band compact">
          <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 12 }}>Estimez votre coût en 30 secondes.</h2>
          <p className="cta-sub">Aucun compte requis pour estimer.</p>
          <div className="cta-row">
            <a href={mailto()} className="btn btn-on-dark">Nous contacter</a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
