// Constantes partagées du site.

export const CONTACT_EMAIL = 'contact@deltomops.com';
export const WHATSAPP_URL = 'https://wa.me/33625299321';

// Mentions société (footer, légal).
export const SOCIETE = {
  raisonSociale: 'DELTOM GROUPE SAS',
  siege: '57 rue du Centre, 94490 Ormesson-sur-Marne',
  siret: '104 550 603 00013',
};

// Endpoint Formspree DÉDIÉ aux candidatures opérateurs.
// (distinct de l'endpoint « demandes hôtes » — on ne mélange pas les deux boîtes)
export const FORMSPREE_OPERATEUR_ENDPOINT = 'https://formspree.io/f/mwvgpkna';

// Endpoint Formspree des DEMANDES HÔTES (formulaire de contact /contact).
export const FORMSPREE_CONTACT_ENDPOINT = 'https://formspree.io/f/mqeqwkqz';

export function mailto(subject?: string): string {
  return subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
}
