import type { ReactNode } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { mailto } from '../lib/config';

export default function APropos() {
  return (
    <>
      <Nav active="apropos" />

      <header className="container" style={{ padding: '88px var(--pad) 72px' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>À propos</div>
        <h1 className="h1-page" style={{ maxWidth: 820, textWrap: 'pretty' }}>
          Pensée par des hôtes, construite par des gens qui ont vécu le problème.
        </h1>
      </header>

      {/* Récit */}
      <section className="container split split-5050">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 16, lineHeight: 1.7, color: 'var(--body)' }}>
          <p style={{ margin: 0 }}>
            Deltom est née d'une expérience directe. La présidente de la société est elle-même hôte Airbnb — comme
            les trois associés. Les ménages annulés à la dernière minute, les voyageurs qui arrivent dans un
            logement pas prêt, les heures passées à coordonner par SMS : ils l'ont vécu, logement après logement,
            saison après saison.
          </p>
          <p style={{ margin: 0 }}>
            Le constat était simple. Ce qui manque aux hôtes, ce n'est pas une personne de ménage de plus — c'est
            un mécanisme fiable : détection automatique des départs, opérateurs professionnels validés un par un,
            supervision humaine quand quelque chose sort du cadre, et une facturation propre à la fin.
          </p>
          <p style={{ margin: 0 }}>
            C'est ce mécanisme que Deltom construit depuis le Val-de-Marne, pour l'Île-de-France : une plateforme
            qui met en relation les hôtes et des opérateurs de ménage indépendants, et qui coordonne tout le reste.
          </p>
        </div>
        <div style={{ background: 'var(--cream)', borderRadius: 20, minHeight: 380, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--gold)', lineHeight: 1, marginBottom: 16 }}>«</div>
          <p style={{ fontSize: 23, fontWeight: 600, lineHeight: 1.45, letterSpacing: '-0.015em', color: 'var(--ink)', margin: '0 0 24px', textWrap: 'pretty' }}>
            Nous avons construit l'outil que nous cherchions nous-mêmes comme hôtes — et que personne ne proposait.
          </p>
          <div style={{ fontSize: 14, color: 'var(--body)' }}>
            <strong style={{ color: 'var(--ink)' }}>Christine</strong>, présidente de Deltom —{' '}
            <span className="muted">hôte Airbnb depuis 10 ans</span>
          </div>
        </div>
      </section>

      {/* Convictions */}
      <section className="section container">
        <h2 className="h2-section" style={{ marginBottom: 48 }}>Ce en quoi nous croyons</h2>
        <div className="grid grid-3">
          <Conviction titre="Aucun ménage oublié">
            Chaque intervention est suivie de sa proposition à sa réalisation. Quand quelque chose déraille, un humain
            reprend la main — c'est vérifiable, pas un slogan.
          </Conviction>
          <Conviction titre="Un opérateur bien traité fait du bon travail">
            Rémunération claire annoncée avant chaque mission, paiement toutes les deux semaines, liberté de refuser
            sans pénalité. La qualité vient de là.
          </Conviction>
          <Conviction titre="Un hôte doit pouvoir oublier le problème">
            Connecter un calendrier une fois, puis ne plus y penser. Si un hôte doit relancer, c'est que la plateforme
            a échoué.
          </Conviction>
        </div>
        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card-outline">
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>Transparents sur l'argent</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>
              Les prestations sont facturées au nom des opérateurs qui les réalisent (mandat de facturation) ; les
              frais de gestion Deltom sont séparés et visibles. La blanchisserie est refacturée au prix coûtant.{' '}
              <a href="/cgv#facturation" style={{ fontWeight: 600 }}>Le détail →</a>
            </p>
          </div>
          <div className="card-outline">
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>Ancrés en Île-de-France</h3>
            <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>
              Basés à Ormesson-sur-Marne (94). 68 logements coordonnés, +300 interventions en juin 2026, une
              supervision présente sur le terrain 7j/7 — pas une plateforme hors-sol.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-pb container">
        <div className="cta-band compact">
          <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 12 }}>Parlez-nous de vos logements.</h2>
          <p className="cta-sub">Ou estimez directement, sans compte.</p>
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

function Conviction({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div className="card-cream">
      <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{titre}</h3>
      <p className="body" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}
