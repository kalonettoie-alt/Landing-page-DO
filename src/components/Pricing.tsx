import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import PatternBackground from './PatternBackground';

type PropertyType = 'Studio' | 'T2' | 'T3' | 'T4';

export default function Pricing() {
  const [selectedType, setSelectedType] = useState<PropertyType>('T2');
  const [includeLaundry, setIncludeLaundry] = useState(false);

  const pricing = {
    Studio: { execute: 43, laundry: 14, operate: 55 },
    T2: { execute: 55, laundry: 16, operate: 65 },
    T3: { execute: 67, laundry: 18, operate: 75 },
    T4: { execute: 79, laundry: 20, operate: 85 },
  };

  const currentPricing = pricing[selectedType];
  const executeTotal = includeLaundry
    ? currentPricing.execute + currentPricing.laundry
    : currentPricing.execute;

  const propertyTypes: PropertyType[] = ['Studio', 'T2', 'T3', 'T4'];

  const executeFeatures = [
    'Nettoyage professionnel LCD',
    'Opérateurs formés aux standards Airbnb',
    'App de suivi temps réel',
    'Rapports photos horodatés',
    'Check-list Airbnb/Booking',
  ];

  const operateFeatures = [
    'Supervision qualité continue',
    'Gestion incidents & dégâts',
    'Service client voyageurs (8h-23h)',
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
            {/* Carte ON EXÉCUTE - sobre, minimaliste */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-[#E8DED6] rounded-2xl p-8 md:p-10"
            >
              <span className="text-[#A8643A] uppercase tracking-[0.2em] text-xs font-medium">
                Nettoyage
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#0F3D2E] mt-2 mb-2">
                On exécute
              </h3>
              <p className="text-[#A0A0A0] text-sm mb-6">
                Exécution terrain fiable et traçable
              </p>

              {/* Prix */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-serif text-5xl md:text-6xl text-[#0F3D2E]">
                  {executeTotal}€
                </span>
                <span className="text-[#A0A0A0]">/ passage</span>
              </div>

              {/* Features avec style simple */}
              <div className="space-y-3 mb-8">
                {executeFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#A8643A] flex-shrink-0 mt-0.5" />
                    <span className="text-[#0F3D2E]/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Option blanchisserie */}
              <div className="p-4 bg-[#F7F1ED] rounded-xl mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLaundry}
                    onChange={(e) => setIncludeLaundry(e.target.checked)}
                    className="w-5 h-5 accent-[#A8643A] rounded"
                  />
                  <span className="text-[#0F3D2E]">
                    Blanchisserie <span className="text-[#A8643A] font-semibold">+{currentPricing.laundry}€</span>
                  </span>
                </label>
              </div>

              {/* CTA simple */}
              <a
                href="#contact"
                className="block w-full text-center border-2 border-[#0F3D2E] text-[#0F3D2E] py-4 rounded-xl font-semibold hover:bg-[#0F3D2E] hover:text-white transition-all uppercase tracking-wider text-sm"
              >
                Choisir On exécute
              </a>
            </motion.div>

            {/* Carte ON OPÈRE - premium, mise en avant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0F3D2E] rounded-2xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[#C9A962] text-[#0F3D2E] px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Idéal pour scaler
              </div>

              {/* Cercles décoratifs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#A8643A]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#C9A962]/10 rounded-full blur-2xl" />

              <div className="relative">
                <span className="text-[#C9A962] uppercase tracking-[0.2em] text-xs font-medium">
                  City Operator 2.0
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white mt-2 mb-2">
                  On opère
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Votre bras droit opérationnel externalisé
                </p>

                {/* Prix mis en avant */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-serif text-5xl md:text-6xl text-white">
                    {currentPricing.operate}€
                  </span>
                  <span className="text-white/50">/ passage</span>
                </div>

                {/* Highlight : ce qui est inclus de "On exécute" */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                  <div className="flex items-center gap-2 text-[#C9A962] font-semibold mb-2">
                    <Check className="w-5 h-5" />
                    <span>Tout "On exécute" inclus</span>
                  </div>
                  <p className="text-white/60 text-sm pl-7">
                    Nettoyage + App + Rapports photos
                  </p>
                </div>

                {/* Features premium */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <span className="text-white font-semibold">Blanchisserie INCLUSE</span>
                  </div>
                  {operateFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA premium */}
                <a
                  href="#contact"
                  className="block w-full text-center bg-[#C9A962] text-[#0F3D2E] py-4 rounded-xl font-bold hover:bg-white transition-all uppercase tracking-wider text-sm"
                >
                  Choisir On opère
                </a>
              </div>
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
