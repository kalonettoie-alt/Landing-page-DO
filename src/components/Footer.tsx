export default function Footer() {
  const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Méthode', href: '#outils' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Notre Histoire', href: '#histoire' },
  ];

  return (
    <footer className="bg-[#0A2A1F] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille principale */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Colonne Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0F3D2E] rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl text-white">DELTOM</span>
                <span className="text-[#A8643A] text-[10px] uppercase tracking-[0.3em]">
                  Operator
                </span>
              </div>
            </div>
          </div>

          {/* Colonne Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#C9A962] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@deltom-operator.com"
                  className="text-white/70 hover:text-[#C9A962] transition-colors text-sm"
                >
                  contact@deltom-operator.com
                </a>
              </li>
              <li className="text-white/70 text-sm">Île-de-France</li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2025 Deltom Operator. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/50 hover:text-[#C9A962] transition-colors text-sm"
              >
                Mentions légales
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-[#C9A962] transition-colors text-sm"
              >
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
