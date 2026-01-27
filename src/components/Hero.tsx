import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F7F1ED] via-[#FDFBF9] to-[#E8DED6] overflow-hidden">
      {/* Motif géométrique subtil en arrière-plan */}
      <PatternBackground />

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
              Infrastructure Opérationnelle LCD
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
            Pilotez votre activité sereinement,
            <br />
            <span className="italic text-[#A8643A]">on s'occupe du reste.</span>
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
            className="text-xl md:text-2xl text-[#0F3D2E]/70 mb-4 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Votre partenaire terrain pour une gestion impeccable de vos
            locations courte durée.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-[#A8643A] mb-12 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Qualité. Traçabilité. Réactivité.
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
