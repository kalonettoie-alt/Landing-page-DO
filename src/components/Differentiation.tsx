import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Differentiation() {
  const comparisons = [
    {
      classic: 'Exécution ponctuelle',
      deltom: 'Infrastructure continue',
    },
    {
      classic: 'Qualité variable',
      deltom: 'Process standardisés',
    },
    {
      classic: 'Pas de visibilité',
      deltom: 'Traçabilité temps réel',
    },
    {
      classic: 'Vous gérez les problèmes',
      deltom: 'On anticipe et on résout',
    },
    {
      classic: 'Difficile à scaler',
      deltom: 'Conçu pour la croissance',
    },
  ];

  return (
    <section className="py-20 bg-[#0F3D2E] rounded-t-[3rem] rounded-b-[3rem] mx-4 md:mx-8 lg:mx-16 my-8 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white text-center mb-4">
            Bien plus qu'un prestataire ménage.
          </h2>
          <p className="text-[#C9A962] italic text-center text-xl mb-12">
            Nous sommes votre infrastructure opérationnelle.
          </p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="mb-10">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
                Un prestataire ménage vous envoie quelqu'un.
              </p>
              <p className="text-white font-semibold text-xl md:text-2xl">
                Nous, on pilote toute la chaîne opérationnelle.
              </p>
            </div>

            {/* Tableau comparatif */}
            <div className="space-y-6">
              {/* En-têtes */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 pb-4 border-b border-white/20">
                <div className="text-center">
                  <span className="text-white/50 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Prestataire classique
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[#C9A962] uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Deltom Operator
                  </span>
                </div>
              </div>

              {/* Lignes de comparaison */}
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="grid grid-cols-2 gap-4 md:gap-8 py-4 border-b border-white/10"
                >
                  <div className="text-white/50 text-sm md:text-base">
                    {item.classic}
                  </div>
                  <div className="text-white font-medium text-sm md:text-base">
                    {item.deltom}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <a
                href="#tarifs"
                className="inline-flex items-center gap-2 bg-[#C9A962] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A8643A] transition-all hover:scale-105 shadow-lg"
              >
                Découvrir nos offres
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
