export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F7F1ED] py-12">
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
              className="text-[#A0A0A0] hover:text-[#A8643A] transition-colors"
            >
              Légal
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#A8643A] transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#A8643A] transition-colors"
            >
              Recrutement
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#A0A0A0] text-sm">
            © 2025 Deltom Operator. Built for excellence.
          </div>
        </div>
      </div>
    </footer>
  );
}
