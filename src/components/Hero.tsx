import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F7F1ED] via-[#FDFBF9] to-[#E8DED6] overflow-hidden">
      {/* Motif géométrique subtil en arrière-plan */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F3D2E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Cercle décoratif avec blur premium */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#A8643A]/20 to-[#C9A962]/10 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0F3D2E]/10 to-transparent rounded-full blur-[100px]" />

      {/* Ligne dorée décorative */}
      <div className="absolute top-20 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A962]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl"
        >
          {/* Badge premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-8 h-px bg-[#C9A962]" />
            <span className="text-[#A8643A] uppercase tracking-[0.3em] text-xs font-medium">
              Excellence Opérationnelle
            </span>
            <span className="w-8 h-px bg-[#C9A962]" />
          </motion.div>

          {/* Titre avec animation staggered */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#0F3D2E] mb-8 leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Pilotez votre activité
            <br />
            <span className="italic text-[#A8643A]">sereinement.</span>
          </motion.h1>

          {/* Séparateur élégant */}
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-[#C9A962] to-transparent mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Sous-titre */}
          <motion.p
            className="text-xl md:text-2xl text-[#0F3D2E]/70 mb-12 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Votre partenaire terrain pour une gestion{' '}
            <span className="text-[#0F3D2E] font-medium">impeccable</span> de vos
            locations.
          </motion.p>

          {/* CTA avec style premium */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center bg-[#0F3D2E] text-white px-10 py-5 overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#A8643A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative flex items-center gap-3 uppercase tracking-[0.2em] text-sm font-medium">
                Demander un devis
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center border border-[#0F3D2E]/30 text-[#0F3D2E] px-10 py-5 hover:border-[#A8643A] hover:text-[#A8643A] transition-all duration-300"
            >
              <span className="uppercase tracking-[0.2em] text-sm font-medium">
                Réserver un appel
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur scroll élégant */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[#0F3D2E]/40 uppercase tracking-[0.2em] text-[10px]">
          Découvrir
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#C9A962] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
