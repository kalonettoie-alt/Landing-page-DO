import Wordmark from './Wordmark';
import { CONTACT_EMAIL, SOCIETE, mailto } from '../lib/config';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Wordmark size={19} />
          <p className="footer-legal">
            Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le
            compte des opérateurs (mandat de facturation). {SOCIETE.raisonSociale} — siège social :{' '}
            {SOCIETE.siege} · SIRET {SOCIETE.siret}.
          </p>
        </div>

        <div>
          <div className="foot-head">Produit</div>
          <div className="foot-col-links">
            <a href="/comment-ca-marche" className="foot-link">Comment ça marche</a>
            <a href="/tarifs" className="foot-link">Tarifs</a>
            <a href="/devenir-operateur" className="foot-link">Devenir opérateur</a>
            <a href="/a-propos" className="foot-link">À propos</a>
          </div>
        </div>

        <div>
          <div className="foot-head">Légal</div>
          <div className="foot-col-links">
            <a href="/mentions-legales" className="foot-link">Mentions légales</a>
            <a href="/cgv" className="foot-link">CGU / CGV</a>
            <a href="/cgv#facturation" className="foot-link">Facturation et commission</a>
            <a href="/cgv#remboursement" className="foot-link">Remboursement et annulation</a>
            <a href="/confidentialite" className="foot-link">Politique de confidentialité</a>
          </div>
        </div>

        <div>
          <div className="foot-head">Contact</div>
          <div className="foot-col-links">
            <a href="/contact" className="foot-link">Nous contacter</a>
            <a href={mailto()} className="foot-link">{CONTACT_EMAIL}</a>
            <span className="foot-link muted">Ormesson-sur-Marne, Île-de-France</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
