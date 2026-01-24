import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] bg-deltom-cream flex items-center overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-deltom-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-deltom-copper/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Titre principal */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-deltom-green mb-6 leading-tight">
            Pilotez votre activité sereinement,
            <br />
            <span className="italic">on s'occupe du reste.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-deltom-gray mb-10 max-w-2xl">
            Votre partenaire terrain : qualité, traçabilité, réactivité.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-deltom-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-deltom-copper transition-all hover:scale-105 shadow-lg"
            >
              Demander un devis
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-deltom-green text-deltom-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-deltom-green hover:text-white transition-all"
            >
              Réserver un appel
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
