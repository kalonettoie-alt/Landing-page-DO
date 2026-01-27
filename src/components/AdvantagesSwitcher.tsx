import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Shield, TrendingUp, CheckCircle, Camera, Star } from 'lucide-react';

export default function AdvantagesSwitcher() {
  const [activeTab, setActiveTab] = useState<'conciergeries' | 'proprietaires'>('conciergeries');

  const conciergiesAdvantages = [
    {
      icon: Clock,
      title: 'TEMPS',
      subtitle: 'Récupérez votre semaine',
      description:
        'Moins de coordination, plus de développement. On gère l\'exécution terrain, fini WhatsApp 24/7.',
    },
    {
      icon: Shield,
      title: 'FIABILITÉ',
      subtitle: 'Standardisation des processus',
      description:
        'Qualité constante via check-lists + opérateurs formés LCD + supervision. Traçabilité totale avec rapports photos horodatés.',
    },
    {
      icon: TrendingUp,
      title: 'SCALE',
      subtitle: 'Développer votre activité',
      description:
        'Vous pouvez prendre plus de logements sans chaos. On absorbe la charge opérationnelle à mesure que vous grandissez.',
    },
  ];

  const proprietairesAdvantages = [
    {
      icon: CheckCircle,
      title: 'Passivité Totale',
      subtitle: 'Zéro gestion opérationnelle',
      description:
        'On gère tout le cycle opérationnel : linge, ménage, kits.',
    },
    {
      icon: Camera,
      title: 'Preuve de Passage',
      subtitle: 'Traçabilité complète',
      description:
        'Rapport photo avant/après pour chaque mission via l\'app.',
    },
    {
      icon: Star,
      title: 'Valorisation',
      subtitle: 'Excellence reconnue',
      description:
        'Des notes de propreté 5/5 sur Airbnb et Booking.',
    },
  ];

  const currentAdvantages = activeTab === 'conciergeries' ? conciergiesAdvantages : proprietairesAdvantages;

  return (
    <section className="py-20 bg-[#0F3D2E] rounded-t-[3rem] rounded-b-[3rem] mx-4 md:mx-8 lg:mx-16 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('conciergeries')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'conciergeries'
                    ? 'bg-white text-[#0F3D2E]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Conciergeries
              </button>
              <button
                onClick={() => setActiveTab('proprietaires')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'proprietaires'
                    ? 'bg-white text-[#0F3D2E]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Propriétaires
              </button>
            </div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white text-center mb-4">
            Ce que vous gagnez concrètement
          </h2>
          <p className="text-[#A8643A] italic text-center text-lg md:text-xl mb-16 max-w-4xl mx-auto">
            Le temps d'une équipe interne, la fiabilité d'un process standardisé, l'agilité d'un partenaire scalable.
          </p>

          {/* Advantages Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {currentAdvantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/95 p-8 rounded-2xl"
                >
                  <advantage.icon className="w-12 h-12 text-[#A8643A] mb-4" />
                  <h3 className="font-bold text-xl text-[#0F3D2E] mb-2">
                    {advantage.title}
                  </h3>
                  <p className="font-semibold text-[#A8643A] mb-3">
                    {advantage.subtitle}
                  </p>
                  <p className="text-[#A0A0A0]">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
