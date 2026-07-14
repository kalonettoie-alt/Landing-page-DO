# Deltom Operator — site vitrine

Site vitrine de **DELTOM GROUPE SAS** — plateforme de coordination entre hôtes de
locations courte durée (Airbnb, Booking) et opérateurs de ménage indépendants, en
Île-de-France.

> Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le
> compte des opérateurs (mandat de facturation).

## Stack

- **React 19** + **TypeScript**
- **Vite 7** — build **multi-pages (MPA)**, une vraie URL par page (pas de routing client)
- **CSS maison** avec design system (tokens dans `src/styles/site.css`)
- **Polices auto-hébergées** via `@fontsource` (Plus Jakarta Sans + JetBrains Mono) — aucune requête Google Fonts (RGPD)
- **lottie-react** pour l'animation produit (bundlée, pas de CDN externe)

## Pages

| URL | Fichier HTML | Composant |
| --- | --- | --- |
| `/` | `index.html` | `src/pages/Accueil.tsx` (estimateur interactif) |
| `/comment-ca-marche` | `comment-ca-marche.html` | `src/pages/CommentCaMarche.tsx` |
| `/tarifs` | `tarifs.html` | `src/pages/Tarifs.tsx` (charge `public/prices.json`) |
| `/devenir-operateur` | `devenir-operateur.html` | `src/pages/DevenirOperateur.tsx` (formulaire 3 étapes) |
| `/a-propos` | `a-propos.html` | `src/pages/APropos.tsx` |
| `/legal` | `legal.html` | `src/pages/Legal.tsx` |

### Pages légales

Le juridique est **rapatrié sur le site** (aucun lien vers `legal.deltomops.com`).
`legal.html` est une page unique (sidebar + 3 sections). Trois URLs propres pointent
dessus via des rewrites (`vercel.json`) et scrollent à la bonne section :

- `/mentions-legales` → section « Mentions légales »
- `/cgv` → section « CGU / CGV » (ancres `#facturation`, `#remboursement`)
- `/confidentialite` → section « Politique de confidentialité »

## Configuration à connaître

- **`public/prices.json`** — source unique des tarifs (ménage, blanchisserie, consommables).
  Éditable sans rebuild : Tarifs **et** l'estimateur de l'accueil le lisent au runtime.
- **`src/lib/config.ts`** — email de contact, WhatsApp, mentions société, et
  **`FORMSPREE_OPERATEUR_ENDPOINT`** : endpoint Formspree dédié aux candidatures
  opérateurs (distinct de la boîte « demandes hôtes »).
- **Balise Google Search Console** : conservée dans `index.html` (`google-site-verification`).

## Déploiement

Vercel. Branche de production : `claude/deltom-operator-landing-dmQ0x` → `www.deltomops.com`.
Config de build auto-détectée (Vite → `dist/`). `vercel.json` gère `cleanUrls` et les
rewrites des pages légales.

## Développement

```bash
npm install
npm run dev      # serveur de dev
npm run build    # tsc -b && vite build → dist/
npm run preview  # prévisualiser le build
```
