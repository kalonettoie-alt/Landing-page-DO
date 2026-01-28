import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import PatternBackground from './PatternBackground';

type PropertyType = 'Studio' | 'T2' | 'T3' | 'T4';

export default function Pricing() {
  const [selectedType, setSelectedType] = useState<PropertyType>('T2');
  const [includeLaundry, setIncludeLaundry] = useState(false);

  const pricing = {
    Studio: { execute: 43, laundry: 14, operate: 59 },
    T2: { execute: 55, laundry: 16, operate: 69 },
    T3: { execute: 67, laundry: 18, operate: 79 },
    T4: { execute: 79, laundry: 20, operate: 89 },
  };

  const currentPricing = pricing[selectedType];
  const executeTotal = includeLaundry
    ? currentPricing.execute + currentPricing.laundry
    : currentPricing.execute;

  const propertyTypes: PropertyType[] = ['Studio', 'T2', 'T3', 'T4'];

  const executeFeatures = [
    'Nettoyage professionnel LCD',
    'Opérateurs formés',
    'App de suivi temps réel',
    'Rapports photos horodatés',
    'Check-list Airbnb/Booking',
  ];

  const operateFeatures = [
    'Tout "On exécute" inclus',
    'Blanchisserie INCLUSE',
    'Supervision qualité',
    'Gestion incidents & dégâts',
    'Service client 8h-23h',
    'Ménage de fond récurrent',
    'Coordination réparations',
    'Priorité check-in/out',
  ];

  return (
    <section id="tarifs" className="py-20 bg-white relative overflow-hidden">
      <PatternBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-[#A8643A] uppercase tracking-[0.4em] text-xs mb-6">
              Tarifs
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F3D2E] mb-4">
              Tarification
              <br />
              <span className="italic text-[#A8643A]">transparente.</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg">
              Prix par passage, tout compris, sans surprise.
            </p>
          </div>

          {/* Sélecteur de type de bien */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#F7F1ED] rounded-xl p-2 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-[#0F3D2E] text-white shadow-lg'
                      : 'bg-transparent text-[#0F3D2E] hover:bg-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Deux cartes d'offres */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Carte ON EXÉCUTE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-[#0F3D2E]/20 rounded-2xl p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F3D2E] mb-2">
                  ON EXÉCUTE
                </h3>
                <p className="text-[#A8643A] text-sm uppercase tracking-wider">
                  Nettoyage
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-serif font-bold text-[#0F3D2E]">
                    {executeTotal}€
                  </span>
                  <span className="text-[#A0A0A0]">/ passage</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {executeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0F3D2E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#0F3D2E]/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Checkbox blanchisserie */}
              <div className="border-t border-[#0F3D2E]/10 pt-6 mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includeLaundry}
                    onChange={(e) => setIncludeLaundry(e.target.checked)}
                    className="w-5 h-5 text-[#0F3D2E] rounded focus:ring-2 focus:ring-[#A8643A]"
                  />
                  <span className="text-[#0F3D2E] font-medium">
                    Blanchisserie +{currentPricing.laundry}€
                  </span>
                </label>
              </div>

              <a
                href="#contact"
                className="block w-full text-center bg-white border-2 border-[#0F3D2E] text-[#0F3D2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0F3D2E] hover:text-white transition-all"
              >
                Choisir On exécute
              </a>
            </motion.div>

            {/* Carte ON OPÈRE (Recommandée) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0F3D2E] rounded-2xl p-8 relative overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Badge Idéal pour scaler */}
              <div className="absolute top-4 right-4 bg-[#C9A962] text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Idéal pour scaler
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  ON OPÈRE
                </h3>
                <p className="text-[#C9A962] text-sm uppercase tracking-wider">
                  City Operator 2.0
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-serif font-bold text-white">
                    {currentPricing.operate}€
                  </span>
                  <span className="text-white/70">/ passage</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {operateFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block w-full text-center bg-[#C9A962] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A8643A] transition-all hover:scale-105 shadow-lg"
              >
                Choisir On opère
              </a>
            </motion.div>
          </div>

          {/* Kits additionnels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-[#F7F1ED] rounded-xl p-8 max-w-2xl mx-auto"
          >
            <h4 className="font-semibold text-[#0F3D2E] text-lg mb-4 text-center">
              KITS ADDITIONNELS
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[#0F3D2E]">Kit lavant</span>
                <span className="font-bold text-[#A8643A]">3€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#0F3D2E]">
                  Kit propreté & bienvenue
                </span>
                <span className="font-bold text-[#A8643A]">4€</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
