import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type PropertyType = 'Studio' | 'T2' | 'T3' | 'T4';

export default function Pricing() {
  const [selectedType, setSelectedType] = useState<PropertyType>('T2');
  const [essentielLaundry, setEssentielLaundry] = useState(false);

  const pricing = {
    Studio: { essentiel: 29, premium: 59, laundry: 14 },
    T2: { essentiel: 39, premium: 69, laundry: 16 },
    T3: { essentiel: 49, premium: 79, laundry: 18 },
    T4: { essentiel: 59, premium: 89, laundry: 20 },
  };

  const currentPricing = pricing[selectedType];
  const essentielTotal = essentielLaundry
    ? currentPricing.essentiel + currentPricing.laundry
    : currentPricing.essentiel;

  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-deltom-green text-center mb-4">
            Tarification transparente.
          </h2>
          <p className="text-deltom-gray text-center text-lg mb-12">
            Prix par passage, tout compris, sans surprise.
          </p>

          {/* Property Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-deltom-cream rounded-lg p-1">
              {(['Studio', 'T2', 'T3', 'T4'] as PropertyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-deltom-green text-white'
                      : 'text-deltom-green hover:bg-deltom-green/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Essentiel Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-deltom-cream rounded-2xl p-8 border-2 border-deltom-cream"
            >
              <h3 className="font-serif text-2xl text-deltom-green mb-2">
                Essentiel
              </h3>
              <p className="text-deltom-copper font-semibold mb-6">
                Base Opérationnelle
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-deltom-green">
                  {essentielTotal}€
                </span>
                <span className="text-deltom-gray ml-2">/ passage</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-copper flex-shrink-0 mt-0.5" />
                  <span className="text-deltom-gray">Nettoyage professionnel</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-copper flex-shrink-0 mt-0.5" />
                  <span className="text-deltom-gray">Application de suivi</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-copper flex-shrink-0 mt-0.5" />
                  <span className="text-deltom-gray">
                    Supervision à chaque intervention
                  </span>
                </div>
              </div>

              {/* Laundry Option */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-deltom-green/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={essentielLaundry}
                    onChange={(e) => setEssentielLaundry(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-deltom-copper"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-deltom-green">
                      Option Blanchisserie
                    </span>
                    <span className="text-deltom-copper ml-2">
                      +{currentPricing.laundry}€
                    </span>
                  </div>
                </label>
              </div>

              <a
                href="#contact"
                className="block w-full text-center bg-deltom-green text-white px-6 py-4 rounded-lg font-semibold hover:bg-deltom-copper transition-all"
              >
                Choisir l'Essentiel
              </a>
            </motion.div>

            {/* Premium Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-deltom-green rounded-2xl p-8 relative border-2 border-deltom-copper transform md:scale-105"
            >
              {/* Recommended Badge */}
              <div className="absolute -top-4 right-8 bg-deltom-copper text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommandé
              </div>

              <h3 className="font-serif text-2xl text-white mb-2">Premium</h3>
              <p className="text-deltom-cream font-semibold mb-6">
                Full Opérationnel
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">
                  {currentPricing.premium}€
                </span>
                <span className="text-white/70 ml-2">/ passage</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">Nettoyage professionnel</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">
                    Blanchisserie complète INCLUSE
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">Application de suivi</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">Supervision</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">
                    Support d'assistance messages voyageurs
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">Ménage de fond récurrent</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">
                    Priorité (arrivée et départ anticipés)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-deltom-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white">
                    Intendance incluse (gestion des dégâts, réparations)
                  </span>
                </div>
              </div>

              <a
                href="#contact"
                className="block w-full text-center bg-deltom-copper text-white px-6 py-4 rounded-lg font-semibold hover:bg-deltom-cream hover:text-deltom-green transition-all"
              >
                Choisir le Premium
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
