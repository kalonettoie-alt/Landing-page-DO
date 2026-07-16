# Deltom — site vitrine

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

### Pages légales

Le juridique est **rapatrié sur le site** (aucun lien vers `legal.deltomops.com`).
Ce sont **trois vraies pages HTML statiques** (aucun React, aucun JS, aucun rewrite) —
le contenu est présent dans le HTML brut, robuste pour Stripe et les crawlers même
sans exécution de JavaScript. Fichiers dans `public/`, servis en URLs propres par
`cleanUrls` (Vercel) :

- `public/mentions-legales.html` → `/mentions-legales`
- `public/cgv.html` → `/cgv` (ancres réelles `#facturation`, `#remboursement`)
- `public/confidentialite.html` → `/confidentialite`

Feuille de style dédiée `public/legal.css` + polices auto-hébergées dans
`public/fonts/`. Contenu juridique **définitif** (DELTOM GROUPE SAS) — ne pas reformuler.

## Configuration à connaître

- **`public/prices.json`** — source unique des tarifs (ménage, blanchisserie, consommables).
  Éditable sans rebuild : Tarifs **et** l'estimateur de l'accueil le lisent au runtime.
- **`src/lib/config.ts`** — email de contact, WhatsApp, mentions société, et
  **`FORMSPREE_OPERATEUR_ENDPOINT`** : endpoint Formspree dédié aux candidatures
  opérateurs (distinct de la boîte « demandes hôtes »).
- **Balise Google Search Console** : conservée dans `index.html` (`google-site-verification`).

## Déploiement

Vercel. Branche de production : `claude/deltom-operator-landing-dmQ0x` → `www.deltomops.com`.
Config de build auto-détectée (Vite → `dist/`). `vercel.json` active `cleanUrls`
(URLs sans `.html`) — aucun rewrite.

## Développement

```bash
npm install
npm run dev      # serveur de dev
npm run build    # tsc -b && vite build → dist/
npm run preview  # prévisualiser le build
```
