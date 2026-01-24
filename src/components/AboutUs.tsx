import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <section id="histoire" className="py-20 bg-[#0F3D2E] relative overflow-hidden">
      {/* Titre décoratif en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <h2 className="font-serif text-8xl md:text-9xl text-white">
          Qui sommes-nous ?
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white italic text-center mb-12">
            Une histoire de famille
          </h2>

          <div className="space-y-6 text-white/90 text-lg leading-relaxed">
            <p>
              Nous sommes <strong className="text-white">Christine, Adams</strong> et{' '}
              <strong className="text-white">Armand</strong>, une famille unie par une même
              passion pour l'immobilier et le sens du service.
            </p>

            <p>
              Après plus de 8 ans dans la gestion de logements en location courte durée, nous
              avons <strong className="text-white">constaté</strong> le même{' '}
              <strong className="text-white">problème</strong> partout : des prestations de
              ménage inconstantes qui impactent directement la qualité de service des
              conciergeries et la satisfaction des voyageurs.
            </p>

            <p>
              <strong className="text-white">Deltom Operator</strong> est né pour{' '}
              <strong className="text-white">répondre</strong> à ce besoin, avec une{' '}
              <strong className="text-white">solution</strong> pensée{' '}
              <strong className="text-white">par des professionnels</strong> du terrain,{' '}
              <strong className="text-white">pour les conciergeries</strong> professionnelles et
              les <strong className="text-white">hôtes</strong> : des équipes fiables, des
              interventions traçables et un suivi transparent en temps réel.
            </p>

            <div className="border-l-4 border-[#A8643A] pl-6 mt-10">
              <p className="text-[#A8643A] italic text-xl">
                Nous visons des partenariats durables, bâtis sur la confiance et l'efficacité.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
