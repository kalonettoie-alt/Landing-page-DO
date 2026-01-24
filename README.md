# Deltom Operator - Landing Page

Landing page professionnelle pour **Deltom Operator**, une entreprise familiale spécialisée dans les services opérationnels pour la location courte durée (Airbnb, Booking).

## 🚀 Technologies

- **React 18** avec TypeScript
- **Vite** comme bundler
- **Tailwind CSS v4** pour le styling
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes

## 🎨 Design

### Palette de couleurs

```js
{
  'deltom-green': '#0F3D2E',   // Vert foncé principal
  'deltom-cream': '#F7F1ED',   // Beige/crème (fond)
  'deltom-copper': '#A8643A',  // Cuivre (accent)
  'deltom-gray': '#A0A0A0',    // Gris (texte secondaire)
}
```

### Typographies

- **Titres** : Playfair Display (serif)
- **Corps** : Inter (sans-serif)

## 📄 Structure

La landing page est composée de **10 sections** :

1. **Navbar** - Navigation fixe avec menu hamburger mobile
2. **Hero** - Section d'accueil avec CTA
3. **Target Audience** - Solutions pour Conciergeries et Propriétaires
4. **Advantages Switcher** - Avantages avec système d'onglets
5. **Differentiators** - Accordéon pour les différenciateurs
6. **Proof Grid** - Témoignages clients Airbnb
7. **Pricing** - Tarification dynamique (Studio, T2, T3, T4)
8. **About Us** - Histoire de l'entreprise
9. **Contact** - Formulaire de contact avec validation
10. **Footer** - Pied de page avec liens

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📦 Structure des fichiers

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TargetAudience.tsx
│   ├── AdvantagesSwitcher.tsx
│   ├── Differentiators.tsx
│   ├── ProofGrid.tsx
│   ├── Pricing.tsx
│   ├── AboutUs.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── App.tsx
├── index.css
└── main.tsx
```

## ✨ Fonctionnalités

- ✅ Responsive mobile-first
- ✅ Animations scroll reveal avec Framer Motion
- ✅ Smooth scroll avec compensation navbar
- ✅ Formulaire de contact avec validation
- ✅ Système de tarification dynamique
- ✅ Accordéon pour les différenciateurs
- ✅ Tabs switcher pour les avantages
- ✅ Bouton WhatsApp flottant
- ✅ SEO optimisé avec meta tags
- ✅ Menu mobile avec fermeture automatique

## 🎯 SEO

Le site est optimisé pour le référencement avec :
- Meta tags descriptifs
- Open Graph pour les réseaux sociaux
- Structure sémantique HTML
- Images optimisées
- Texte alternatif pour l'accessibilité

## 📱 Responsive

Le design est entièrement responsive avec des breakpoints adaptés :
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

## 🌐 Déploiement

Le projet peut être déployé sur :
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

Pour déployer, il suffit de :
1. Build le projet : `npm run build`
2. Déployer le dossier `dist/`

## 📝 License

© 2025 Deltom Operator. Built for excellence.

---

**Développé avec ❤️ pour Deltom Operator**
