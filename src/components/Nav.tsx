import { useState } from 'react';
import Wordmark from './Wordmark';
import { mailto } from '../lib/config';

type PageKey = 'comment' | 'tarifs' | 'operateur' | 'apropos' | null;

const LINKS: { key: Exclude<PageKey, null>; href: string; label: string }[] = [
  { key: 'comment', href: '/comment-ca-marche', label: 'Comment ça marche' },
  { key: 'tarifs', href: '/tarifs', label: 'Tarifs' },
  { key: 'operateur', href: '/devenir-operateur', label: 'Devenir opérateur' },
  { key: 'apropos', href: '/a-propos', label: 'À propos' },
];

/**
 * @param active  page courante (souligné or)
 * @param cta     bouton de droite : 'contact' (défaut) ou 'postuler' (page opérateur)
 */
export default function Nav({ active = null, cta = 'contact' }: { active?: PageKey; cta?: 'contact' | 'postuler' }) {
  const [open, setOpen] = useState(false);

  const ctaEl =
    cta === 'postuler' ? (
      <a href="#candidature" className="nav-cta">Postuler</a>
    ) : (
      <a href={mailto()} className="nav-cta">Nous contacter</a>
    );

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 28 }} aria-label="Accueil Deltom Operator">
            <Wordmark />
          </a>
          <div className="nav-links-desktop">
            {LINKS.map((l) => (
              <a key={l.key} href={l.href} className={`nav-link${active === l.key ? ' active' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-spacer" />
          {cta === 'postuler' && (
            <a href={mailto()} className="nav-link nav-cta-desktop" style={{ marginRight: 4 }}>Nous contacter</a>
          )}
          <span className="nav-cta-desktop">{ctaEl}</span>

          <button
            className="nav-burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={mailto()} className="nav-cta" onClick={() => setOpen(false)}>Nous contacter</a>
        </div>
      )}
    </>
  );
}
