import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Outils', href: '#outils' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Notre Histoire', href: '#histoire' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobileMenuOpen) {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      setIsMobileMenuOpen(false);

      // Attendre la fermeture du menu avant de scroller
      setTimeout(() => {
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            const navbarHeight = 96; // h-24 = 96px
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 300); // Correspond à la durée de l'animation de fermeture
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(15,61,46,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo avec animation premium */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0F3D2E] rounded-full flex items-center justify-center group-hover:bg-[#A8643A] transition-colors duration-300">
              <span className="text-white font-serif text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-[#0F3D2E] tracking-wide">
                DELTOM
              </span>
              <span className="text-[#A8643A] text-[10px] uppercase tracking-[0.3em]">
                Operator
              </span>
            </div>
          </a>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[#0F3D2E]/70 hover:text-[#0F3D2E] transition-colors text-sm uppercase tracking-[0.15em] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#A8643A] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#0F3D2E] text-white px-6 py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#A8643A] transition-all duration-300"
          >
            <span className="w-2 h-2 bg-[#C9A962] rounded-full" />
            Devis gratuit
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0F3D2E]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-[#0F3D2E]/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e)}
                  className="block text-[#0F3D2E]/70 hover:text-[#A8643A] transition-colors uppercase tracking-[0.15em] text-sm py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e)}
                className="block w-full text-center bg-[#0F3D2E] text-white px-6 py-3 uppercase tracking-[0.15em] text-sm hover:bg-[#A8643A] transition-all"
              >
                Devis gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
