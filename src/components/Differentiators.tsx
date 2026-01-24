import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Differentiators() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const items = [
    {
      title: 'Une application de suivi',
      content:
        'Planning, statuts en temps réel (à venir / en cours / terminée) et preuves de passage : tout est centralisé. Chaque intervention génère un rapport (check-list + photos avant/après) et tout incident est signalé pendant la mission.',
    },
    {
      title: 'Une supervision pensée par des hôtes',
      content:
        'Notre supervision qualité repose sur 5 bases : contrôle après intervention, inventaire, programmation de ménage de fond, formation continue des équipes, et analyse des commentaires voyageurs — objectif : maintenir la note de 5★.',
    },
    {
      title: 'Des opérateurs formés',
      content:
        'Des équipes pro, formées aux standards Airbnb : rotations serrées, check-out/check-in, attentes voyageurs, inventaire, réassort. Véhiculés, équipés, briefés : ils appliquent un process, pas de l\'impro.',
    },
    {
      title: 'Service client dédié (8h–23h)',
      content:
        'Une équipe dédiée gère vos échanges voyageurs en temps réel (check-in, accès, Wi-Fi, équipements), répond rapidement pour protéger la performance de l\'annonce, et coordonne les imprévus. Objectif : une expérience voyageur fluide et des avis 5★.',
    },
  ];

  return (
    <section id="outils" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#A8643A] uppercase tracking-wide text-sm font-semibold text-center mb-3">
            Innovation & Standard
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0F3D2E] text-center mb-12">
            Comment opérons-nous au quotidien ?
          </h2>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border border-[#F7F1ED] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-[#F7F1ED] hover:bg-[#0F3D2E]/5 transition-colors"
                >
                  <span className="font-serif text-xl text-[#0F3D2E] font-semibold pr-4">
                    {item.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#A8643A] flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white">
                        <p className="text-[#A0A0A0] leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
