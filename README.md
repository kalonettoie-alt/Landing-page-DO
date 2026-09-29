# Deltom — site web

Site de **DELTOM GROUPE SAS** : plateforme de mise en relation entre hôtes de
locations courte durée (Airbnb, Booking) et agents de ménage indépendants, en
Île-de-France.

> Deltom ne réalise pas les prestations : elle organise, coordonne et facture pour le
> compte des opérateurs (mandat de facturation).

## Principe

Le site est **généré en HTML statique** à partir des maquettes haute fidélité du
design (handoff Claude Design, « site v4 »). Chaque page sort complète au build :
en-tête, méga-menu, pied de page et textes sont présents **sans JavaScript**
(exigence SEO du handoff). Le JavaScript ne sert qu'aux animations, simulateurs,
menus et formulaires.

```
design/site/          maquettes (source de vérité du contenu) + CSS/JS des pages
  pro.js              navigation (MENU), logo et styles de l'en-tête — lus par le build
  pro-client.js       interactions de l'en-tête (le HTML est rendu au build)
  forms.js            envoi des formulaires vers Formspree
  club-onb.js         onboarding du Club des opérateurs
  connexion.html      page « espace client en maintenance »
design/client-web/    console client affichée en aperçu sur l'accueil
public/               favicons, manifest, pages légales statiques (+ legal.css, polices)
build/build.mjs       génère dist/ (routes, liens, en-tête/pied, formulaires, sitemap)
build/site.mjs        gabarits de l'en-tête et du pied de page (repris de pro.js)
build/demos.mjs       aperçus en iframe (console précompilée, parcours voyageur)
build/serve.mjs       aperçu local avec URL propres
```

### Ce que fait le build

- **Routes** : l'URL de chaque page vient de sa balise `canonical`
  (`menage.html` → `/services/menage`, `guide-x.html` → `/guides/x`, etc.).
  Tous les liens `.html` (HTML et JS) sont réécrits en URL propres.
- **En-tête / pied de page** rendus en HTML depuis `MENU` (dans `pro.js`).
- **Favicons** validés + **balise Google Search Console** sur l'accueil.
- **Sans JavaScript** : les blocs à apparition (`.rv`) restent visibles.
- **Aperçus** : la console client est précompilée (esbuild) avec React production
  servi depuis notre domaine (aucun CDN, pas de Babel dans le navigateur).
- **sitemap.xml / robots.txt** générés (pages `noindex` exclues).
- **Contrôle** : chaque lien interne de `dist/` est vérifié ; le build échoue sinon.

### Mettre à jour depuis un nouveau handoff design

Remplacer les fichiers de `design/site/` par ceux du nouveau `site-v*/`, puis
reporter les ajustements propres à la production (voir l'historique git :
formulaires, SMS retiré de l'onboarding, Lien voyageur à 3,99 €, carte Zones…),
et lancer `npm run build` : les avertissements signalent tout lien cassé.

## Formulaires (Formspree)

Le succès ne s'affiche **que** si Formspree répond OK ; sinon, message d'erreur avec
l'e-mail et le WhatsApp en secours.

| Formulaire | Boîte | Après envoi |
| --- | --- | --- |
| Contact, newsletters, `/connexion` | hôtes `mqeqwkqz` | `/merci-contact` ou confirmation |
| Devenir opérateur (sociétés), onboarding Club, programme Club | opérateurs `mwvgpkna` | `/merci-prestataire`, écran de fin, `/merci-programme` |

Les boutons « Se connecter » / « Créer mon compte » mènent à `/connexion`
(application en maintenance + formulaire), en attendant la console client.

## Pages légales

Trois pages HTML statiques dans `public/` : `/mentions-legales`, `/cgv`
(ancres `#facturation`, `#remboursement`), `/confidentialite`. Contenu juridique
opposable : ne modifier qu'à la demande de DELTOM GROUPE.

## Déploiement

Vercel. Branche de production : `claude/deltom-operator-landing-dmQ0x` → `www.deltomops.com`.
`vercel.json` : `npm run build` → `dist/`, `cleanUrls` (URL sans `.html`).

## Développement

```bash
npm install
npm run build     # génère dist/
npm run preview   # http://localhost:4321
```
