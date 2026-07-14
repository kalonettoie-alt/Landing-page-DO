import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CONTACT_EMAIL } from '../lib/config';

const PATH_TO_SECTION: Record<string, string> = {
  '/mentions-legales': 'mentions',
  '/cgv': 'cgu',
  '/confidentialite': 'confidentialite',
};

const SIDEBAR: { id: string; label: string; sub?: boolean }[] = [
  { id: 'mentions', label: 'Mentions légales' },
  { id: 'cgu', label: 'CGU / CGV' },
  { id: 'facturation', label: 'Facturation et commission', sub: true },
  { id: 'remboursement', label: 'Annulation et remboursement', sub: true },
  { id: 'confidentialite', label: 'Politique de confidentialité' },
];

export default function Legal() {
  const [active, setActive] = useState('mentions');

  // Au chargement : scroll vers la section ciblée par le hash ou par l'URL propre.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const target = hash || PATH_TO_SECTION[window.location.pathname] || '';
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }));
        setActive(target);
      }
    }
  }, []);

  // Scrollspy : surligne la section visible dans la sidebar.
  useEffect(() => {
    const ids = SIDEBAR.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav active={null} />

      <div className="legal-layout">
        <aside className="legal-aside">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Informations légales</div>
          {SIDEBAR.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`legal-navlink${s.sub ? ' sub' : ''}${active === s.id ? ' active' : ''}`}>
              {s.label}
            </a>
          ))}
        </aside>

        <main className="legal-main">
          {/* Mentions légales */}
          <section id="mentions" className="legal-section">
            <h1>Mentions légales</h1>
            <div className="legal-prose">
              <p><strong>Éditeur du site.</strong> DELTOM GROUPE, société par actions simplifiée (SAS) au capital de 1 000 €, immatriculée le 2 mai 2026, dont le siège social est situé 57 rue du Centre, 94490 Ormesson-sur-Marne. SIREN 104 550 603 · SIRET du siège 104 550 603 00013 · Code APE 96.09Z. RCS Créteil 104 550 603. N° de TVA intracommunautaire : FR75104550603.</p>
              <p><strong>Directrice de la publication.</strong> La présidente de DELTOM GROUPE.</p>
              <p><strong>Contact.</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <p><strong>Hébergement.</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com</p>
              <p><strong>Nature de l'activité.</strong> Deltom est une plateforme technologique de mise en relation entre hôtes de locations de courte durée et opérateurs de ménage indépendants, en Île-de-France. Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le compte des opérateurs, dans le cadre d'un mandat de facturation.</p>
              <p><strong>Données personnelles.</strong> Le traitement des données personnelles est décrit dans la <a href="#confidentialite" style={{ fontWeight: 600 }}>politique de confidentialité</a>.</p>
            </div>
          </section>

          {/* CGU / CGV */}
          <section id="cgu" className="legal-section divided">
            <h2>Conditions générales d'utilisation et de vente</h2>
            <div className="legal-prose">
              <p><strong>Article 1 — Objet.</strong> Les présentes conditions encadrent l'utilisation de la plateforme Deltom par les hôtes de locations de courte durée (les « clients ») et par les opérateurs de ménage indépendants (les « partenaires »).</p>
              <p><strong>Article 2 — Rôle de la plateforme.</strong> Deltom met en relation, planifie et coordonne. Les prestations de ménage sont réalisées par des opérateurs indépendants, professionnels inscrits sur la plateforme après vérification de leur immatriculation (SIRET) et de leur assurance responsabilité civile professionnelle, libres d'accepter ou de refuser chaque mission. Deltom ne réalise pas les prestations de ménage.</p>
              <p><strong>Article 3 — Engagement des hôtes.</strong> Le service est sans engagement de durée. Les prix sont fixes, TTC, et communiqués avant toute intervention (voir la page <a href="/tarifs" style={{ fontWeight: 600 }}>Tarifs</a>).</p>
              <p><strong>Article 4 — Engagement des opérateurs.</strong> Les opérateurs interviennent en qualité de professionnels indépendants. Ils choisissent leurs zones d'intervention, restent libres d'accepter ou de refuser chaque mission sans pénalité, et sont payés toutes les deux semaines.</p>
              <p><strong>Article 4 bis — Qualité et reprise.</strong> L'opérateur est responsable de la conformité de son intervention à la checklist. Lorsqu'une intervention est signalée non conforme par l'hôte dans le délai de contestation (article 7 bis) et que l'équipe de supervision constate un manquement au vu de la documentation (checklist, photos, rapport d'intervention), l'opérateur : reprend l'intervention sans rémunération complémentaire, ou voit la rémunération correspondante déduite de son versement suivant. L'opérateur est informé de tout signalement le concernant et peut apporter ses observations avant décision. L'équipe de supervision statue au vu des éléments documentés et des observations reçues.</p>
              <p><strong>Article 5 — Qualité et supervision.</strong> Chaque intervention suit une checklist et fait l'objet d'une documentation (photos, rapport). Toute anomalie signalée est examinée par l'équipe de supervision de la plateforme, qui apporte une réponse sous 48 heures ouvrées.</p>

              <div id="facturation" className="legal-section" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p><strong>Article 6 — Facturation et commission.</strong> Deltom ne vend pas de prestations de ménage : elle facture pour le compte des opérateurs qui les réalisent, dans le cadre d'un mandat de facturation (article 289 I-2 du Code général des impôts). La rémunération de Deltom est une commission de mise en relation et de coordination, distincte du prix de la prestation.</p>
                <div style={{ background: 'var(--cream)', borderRadius: 16, padding: '24px 28px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Deux émetteurs distincts apparaissent sur votre facturation :</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>1</span>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Ce qui est facturé au nom de l'opérateur (mandat de facturation)</div>
                        <div style={{ fontSize: 14.5, color: 'var(--ink)' }}>La prestation de ménage, réalisée par l'opérateur indépendant.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>2</span>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Ce que Deltom facture en son nom propre</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14.5, color: 'var(--ink)' }}>
                          <span>Les frais de gestion Deltom (commission de mise en relation et de coordination) — <strong>séparés et visibles</strong>, jamais fondus dans le prix.</span>
                          <span>Le lavage du linge confié à notre partenaire blanchisserie.</span>
                          <span>Le lavage des serviettes.</span>
                          <span>La location-entretien de linge, le cas échéant.</span>
                          <span>Les consommables, le cas échéant.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>Chaque prestation apparaît sur une ligne distincte, avec sa dénomination précise, conformément aux exigences de facturation françaises.</p>
                <p><strong>Rythme de facturation.</strong> Les hôtes reçoivent une facturation groupée toutes les deux semaines, détaillée intervention par intervention.</p>
                <p><strong>Paiement des opérateurs.</strong> Chaque opérateur est payé toutes les deux semaines, sur la base des factures émises en son nom.</p>
                <p><strong>Lavage du linge confié à notre partenaire.</strong> Le lavage des parures est refacturé au prix coûtant de notre partenaire blanchisserie, majoré d'1€ de frais de gestion par parure.</p>
                <p><strong>Lavage des serviettes, location-entretien de linge et consommables.</strong> Facturés selon le barème figurant sur la page <a href="/tarifs" style={{ fontWeight: 600 }}>Tarifs</a>.</p>
              </div>

              <div id="remboursement" className="legal-section" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p><strong>Article 7 — Annulation.</strong></p>
                <p><strong>Par l'hôte.</strong> Une intervention planifiée peut être annulée sans frais jusqu'à la veille de la date prévue. Une annulation le jour même peut donner lieu à une indemnité de déplacement de l'opérateur, indiquée avant confirmation.</p>
                <p><strong>Côté opérateur.</strong> En cas d'indisponibilité d'un opérateur, la plateforme propose automatiquement la mission à un autre opérateur ; l'équipe de supervision reprend la main si nécessaire. L'hôte n'a rien à faire.</p>
                <p><strong>Article 7 bis — Remboursements.</strong></p>
                <p><strong>Intervention non réalisée.</strong> Toute intervention planifiée qui n'a pas été réalisée n'est pas facturée. Si elle a déjà été facturée, elle fait l'objet d'un avoir sur la facturation suivante.</p>
                <p><strong>Intervention non conforme.</strong> Après examen par l'équipe de supervision (sur la base de la checklist, des photos et du rapport d'intervention), et selon la gravité constatée : reprise de l'intervention sans surcoût, ou avoir partiel ou total sur la facturation suivante.</p>
                <p><strong>Modalités.</strong> Les régularisations prennent la forme d'un avoir conforme aux exigences comptables françaises, déduit de la facturation suivante. Lorsque la relation prend fin et qu'aucune facturation ultérieure n'est prévue, l'avoir donne lieu à un remboursement par virement dans un délai de 30 jours.</p>
                <p><strong>Délai de contestation.</strong> Toute contestation d'une intervention doit être signalée dans un délai de 7 jours suivant sa réalisation, accompagnée des éléments justificatifs. Passé ce délai, l'intervention est réputée acceptée.</p>
              </div>

              <p><strong>Article 8 — Responsabilité.</strong> Les opérateurs sont couverts par leur propre assurance responsabilité civile professionnelle, vérifiée lors de leur inscription.</p>
              <p><strong>Article 9 — Réclamations.</strong> Toute réclamation s'adresse à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ; réponse sous 48 heures ouvrées.</p>
              <p><strong>Article 10 — Droit applicable et litiges.</strong> Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, tout litige relève des tribunaux compétents.</p>
            </div>
          </section>

          {/* Politique de confidentialité */}
          <section id="confidentialite" className="legal-section divided">
            <h2>Politique de confidentialité</h2>
            <div className="legal-prose">
              <p><strong>Responsable de traitement.</strong> DELTOM GROUPE, 57 rue du Centre, 94490 Ormesson-sur-Marne — <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
              <p><strong>Données collectées.</strong></p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 4 }}>
                <p><strong>Hôtes :</strong> identité, coordonnées, adresses des logements, calendriers de réservation (via la connexion iCal Airbnb/Booking), historique des interventions, données de facturation.</p>
                <p><strong>Opérateurs :</strong> identité, coordonnées, SIRET, documents justificatifs (pièce d'identité, extrait SIRENE, attestation RC professionnelle), zones d'intervention, historique des missions.</p>
                <p><strong>Visiteurs du site :</strong> données transmises via les formulaires de contact ou de candidature.</p>
              </div>
              <p><strong>Finalités.</strong> Coordination des interventions, mise en relation, facturation, support, respect des obligations légales et comptables.</p>
              <p><strong>Base légale.</strong> Exécution du contrat, obligation légale, intérêt légitime.</p>
              <p><strong>Durée de conservation.</strong> Les données sont conservées pendant la durée de la relation contractuelle, puis pendant les délais légaux applicables (10 ans pour les documents comptables).</p>
              <p><strong>Destinataires.</strong> Prestataires techniques (hébergement, traitement des paiements) et partenaire blanchisserie, dans la limite strictement nécessaire à l'exécution du service. Aucune donnée n'est vendue à des tiers.</p>
              <p><strong>Vos droits.</strong> Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition, à exercer par email à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
              <p><strong>Transferts hors Union européenne.</strong> Le site est hébergé par Vercel Inc. (États-Unis). Les transferts de données vers les États-Unis sont encadrés par les clauses contractuelles types adoptées par la Commission européenne et par le cadre de protection des données UE–États-Unis (EU-U.S. Data Privacy Framework), auquel Vercel Inc. adhère (certification active).</p>
              <p><strong>Réclamation.</strong> Vous pouvez saisir la Commission nationale de l'informatique et des libertés (CNIL), www.cnil.fr.</p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
