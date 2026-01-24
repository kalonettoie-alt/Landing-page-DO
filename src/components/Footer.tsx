export default function Footer() {
  return (
    <footer className="bg-white border-t border-deltom-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Deltom Operator" className="h-10" />
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#"
              className="text-deltom-gray hover:text-deltom-copper transition-colors"
            >
              Légal
            </a>
            <a
              href="#"
              className="text-deltom-gray hover:text-deltom-copper transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="#"
              className="text-deltom-gray hover:text-deltom-copper transition-colors"
            >
              Recrutement
            </a>
          </div>

          {/* Copyright */}
          <div className="text-deltom-gray text-sm">
            © 2025 Deltom Operator. Built for excellence.
          </div>
        </div>
      </div>
    </footer>
  );
}
