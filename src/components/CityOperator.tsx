import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatternBackground from './PatternBackground';

type TabType = 'operators' | 'cityoperator';

export default function CityOperator() {
  const [activeTab, setActiveTab] = useState<TabType>('operators');

  return (
    <section className="py-20 bg-[#F7F1ED] relative overflow-hidden">
      <PatternBackground />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#A8643A] uppercase tracking-[0.2em] text-sm font-medium">
            Notre équipe
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0F3D2E] mt-4">
            Une infrastructure humaine<br />
            <span className="text-[#A8643A] italic">à votre service</span>
          </h2>
        </motion.div>

        {/* Toggle Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-[#E8DED6]">
            <button
              onClick={() => setActiveTab('operators')}
              className={`
                px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === 'operators'
                  ? 'bg-[#0F3D2E] text-white shadow-md'
                  : 'text-[#0F3D2E]/70 hover:text-[#0F3D2E]'
                }
              `}
            >
              Nos Opérateurs
            </button>
            <button
              onClick={() => setActiveTab('cityoperator')}
              className={`
                px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === 'cityoperator'
                  ? 'bg-[#0F3D2E] text-white shadow-md'
                  : 'text-[#0F3D2E]/70 hover:text-[#0F3D2E]'
                }
              `}
            >
              City Operator
            </button>
          </div>
        </div>

        {/* Contenu animé */}
        <AnimatePresence mode="wait">
          {activeTab === 'operators' ? (
            <OperatorsContent key="operators" />
          ) : (
            <CityOperatorContent key="cityoperator" />
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#tarifs"
            className="inline-flex items-center gap-3 bg-[#0F3D2E] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#A8643A] transition-all group"
          >
            Découvrir nos offres
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   CONTENU : NOS OPÉRATEURS (Nettoyage)
   ============================================ */
function OperatorsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#E8DED6]"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Illustration Opérateur nettoyage */}
        <div className="flex justify-center">
          <div className="relative">
            <svg
              viewBox="0 0 240 340"
              className="w-52 md:w-64 h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ombre */}
              <ellipse cx="120" cy="325" rx="55" ry="12" fill="#0F3D2E" opacity="0.1"/>

              {/* Jambes */}
              <rect x="90" y="220" width="24" height="95" rx="8" fill="#2D2D2D"/>
              <rect x="126" y="220" width="24" height="95" rx="8" fill="#2D2D2D"/>

              {/* Chaussures */}
              <ellipse cx="102" cy="315" rx="16" ry="7" fill="#1a1a1a"/>
              <ellipse cx="138" cy="315" rx="16" ry="7" fill="#1a1a1a"/>

              {/* Corps - T-shirt vert */}
              <path d="M72 120 L65 135 L65 225 L175 225 L175 135 L168 120 L145 130 L120 125 L95 130 Z" fill="#0F3D2E"/>

              {/* Tablier beige */}
              <path d="M85 155 L85 220 L155 220 L155 155 L140 148 L120 152 L100 148 Z" fill="#F7F1ED" stroke="#E8DED6" strokeWidth="2"/>

              {/* Poche tablier */}
              <rect x="102" y="175" width="36" height="30" rx="4" fill="#E8DED6"/>

              {/* Bras gauche avec balai */}
              <path d="M65 135 L45 185 L55 192 L72 145" fill="#F5D0B5"/>
              {/* Manche balai */}
              <rect x="30" y="90" width="8" height="120" rx="4" fill="#8B7355" transform="rotate(-15 34 150)"/>
              {/* Tête balai */}
              <rect x="15" y="195" width="45" height="12" rx="2" fill="#4A7C59" transform="rotate(-15 37 201)"/>

              {/* Bras droit avec seau */}
              <path d="M175 135 L190 180 L183 190 L168 145" fill="#F5D0B5"/>
              {/* Seau */}
              <ellipse cx="195" cy="200" rx="20" ry="8" fill="#4A90D9"/>
              <path d="M175 200 L180 235 L210 235 L215 200" fill="#4A90D9"/>
              <ellipse cx="195" cy="235" rx="15" ry="5" fill="#3A7AB9"/>
              {/* Anse seau */}
              <path d="M180 195 Q195 175 210 195" stroke="#333" strokeWidth="3" fill="none"/>

              {/* Tête */}
              <circle cx="120" cy="75" r="48" fill="#F5D0B5"/>

              {/* Cheveux attachés */}
              <ellipse cx="120" cy="45" rx="42" ry="30" fill="#5C4033"/>
              <circle cx="120" cy="25" r="15" fill="#5C4033"/>
              {/* Chignon */}
              <ellipse cx="120" cy="18" rx="12" ry="10" fill="#4A3728"/>

              {/* Visage souriant */}
              <circle cx="105" cy="70" r="5" fill="#2D2D2D"/>
              <circle cx="135" cy="70" r="5" fill="#2D2D2D"/>
              <path d="M108 95 Q120 108 132 95" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>

              {/* Badge Deltom */}
              <circle cx="90" cy="170" r="12" fill="white" stroke="#0F3D2E" strokeWidth="2"/>
              <text x="90" y="175" textAnchor="middle" fontSize="12" fill="#0F3D2E" fontWeight="bold">D</text>
            </svg>

            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-10 h-10 border-2 border-[#C9A962] rounded-full opacity-40" />
            <div className="absolute -bottom-2 -left-6 w-14 h-14 border-2 border-[#A8643A] rounded-full opacity-25" />
          </div>
        </div>

        {/* Texte */}
        <div>
          <h3 className="font-serif text-3xl md:text-4xl text-[#0F3D2E] mb-6">
            Nos Opérateurs,<br />
            <span className="text-[#A8643A] italic">votre tranquillité.</span>
          </h3>

          <div className="space-y-4 text-[#0F3D2E]/80 leading-relaxed">
            <p>
              Nos <strong className="text-[#0F3D2E]">opérateurs terrain</strong> sont des
              professionnels formés aux standards de la location courte durée :
              check-list Airbnb, rapports photos horodatés, respect des délais.
            </p>

            <p>
              <strong className="text-[#0F3D2E]">Équipés et véhiculés</strong>, ils interviennent
              à chaque rotation avec rigueur et efficacité. Vous n'avez plus à chercher,
              former ou gérer des prestataires.
            </p>

            <p>
              Chaque intervention est <strong className="text-[#0F3D2E]">tracée en temps réel</strong>
              via notre application : vous savez exactement où en est le ménage,
              avec photos à l'appui.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {['Formés LCD', 'Équipés pro', 'Véhiculés', 'Fiables', 'Traçabilité'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#0F3D2E]/10 text-[#0F3D2E] text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   CONTENU : CITY OPERATOR (Offre On opère)
   ============================================ */
function CityOperatorContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0F3D2E] rounded-3xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Cercles décoratifs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#A8643A]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#C9A962]/15 rounded-full blur-2xl" />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">

        {/* Illustration City Operator */}
        <div className="flex justify-center order-1 md:order-none">
          <div className="relative">
            <svg
              viewBox="0 0 240 340"
              className="w-52 md:w-64 h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ombre */}
              <ellipse cx="120" cy="325" rx="55" ry="12" fill="white" opacity="0.1"/>

              {/* Jambes - pantalon chino */}
              <rect x="90" y="220" width="24" height="95" rx="8" fill="#2D2D2D"/>
              <rect x="126" y="220" width="24" height="95" rx="8" fill="#2D2D2D"/>

              {/* Chaussures */}
              <ellipse cx="102" cy="315" rx="16" ry="7" fill="#1a1a1a"/>
              <ellipse cx="138" cy="315" rx="16" ry="7" fill="#1a1a1a"/>

              {/* Corps - Polo beige/crème */}
              <path d="M72 120 L65 135 L65 225 L175 225 L175 135 L168 120 L145 130 L120 125 L95 130 Z" fill="#F7F1ED"/>

              {/* Col polo */}
              <path d="M95 120 L120 115 L145 120 L140 135 L120 130 L100 135 Z" fill="#E8DED6"/>

              {/* Bras gauche */}
              <path d="M65 135 L48 190 L58 198 L72 145" fill="#F5D0B5"/>

              {/* Bras droit avec tablette */}
              <path d="M175 135 L188 185 L180 195 L168 145" fill="#F5D0B5"/>
              {/* Tablette */}
              <rect x="180" y="178" width="35" height="52" rx="5" fill="#333" stroke="#555" strokeWidth="2"/>
              <rect x="185" y="184" width="25" height="38" rx="3" fill="#4A90D9"/>
              {/* Icônes sur tablette */}
              <circle cx="192" cy="195" r="4" fill="#4ADE80"/>
              <rect x="200" y="192" width="8" height="3" rx="1" fill="white" opacity="0.8"/>
              <rect x="186" y="205" width="22" height="2" rx="1" fill="white" opacity="0.5"/>
              <rect x="186" y="210" width="18" height="2" rx="1" fill="white" opacity="0.5"/>

              {/* Tête */}
              <circle cx="120" cy="75" r="48" fill="#F5D0B5"/>

              {/* Cheveux courts */}
              <ellipse cx="120" cy="45" rx="45" ry="32" fill="#2D2D2D"/>
              <path d="M75 65 Q75 30 120 22 Q165 30 165 65" fill="#2D2D2D"/>

              {/* Casquette Deltom */}
              <path d="M72 58 L168 58 L162 40 Q120 28 78 40 Z" fill="#0F3D2E"/>
              <path d="M72 58 L55 64 L72 70 Z" fill="#0A2A1F"/>
              {/* Logo D sur casquette */}
              <circle cx="120" cy="48" r="10" fill="#C9A962"/>
              <text x="120" y="52" textAnchor="middle" fontSize="11" fill="#0F3D2E" fontWeight="bold">D</text>

              {/* Visage */}
              <circle cx="105" cy="70" r="5" fill="#2D2D2D"/>
              <circle cx="135" cy="70" r="5" fill="#2D2D2D"/>
              <path d="M108 95 Q120 108 132 95" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>

              {/* Badge sur polo */}
              <circle cx="90" cy="160" r="12" fill="#0F3D2E"/>
              <text x="90" y="165" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">D</text>

              {/* Texte IDF */}
              <text x="120" y="200" textAnchor="middle" fontSize="14" fill="#0F3D2E" fontWeight="bold" opacity="0.6">IDF</text>
            </svg>

            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-10 h-10 border-2 border-[#C9A962] rounded-full opacity-50" />
            <div className="absolute -bottom-2 -left-6 w-14 h-14 border-2 border-white/30 rounded-full" />
          </div>
        </div>

        {/* Texte */}
        <div className="order-2 md:order-none">
          <div className="inline-block px-4 py-1.5 bg-[#C9A962] text-[#0F3D2E] text-xs rounded-full font-bold uppercase tracking-wider mb-6">
            Offre "On opère"
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Votre City Operator,<br />
            <span className="text-[#C9A962] italic">sans le recruter.</span>
          </h3>

          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Un <strong className="text-white">City Operator</strong> (ou Coordinateur terrain),
              c'est la personne qui gère l'opérationnel au quotidien pour une conciergerie :
              coordination des équipes de ménage, contrôles qualité, gestion des incidents,
              relation avec les voyageurs...
            </p>

            <p>
              <strong className="text-white">Le problème ?</strong> Recruter, former et manager
              cette personne prend du temps, coûte cher, et ne scale pas facilement quand votre
              parc grandit.
            </p>

            <p>
              Avec <span className="text-[#C9A962] font-semibold">Deltom Operator</span>, vous
              externalisez toute cette fonction sur l'<strong className="text-white">Île-de-France</strong>.
              Notre équipe devient votre <strong className="text-white">bras droit opérationnel</strong> :
              on coordonne, on supervise, on gère les imprévus, on répond aux voyageurs.
            </p>
          </div>

          {/* Citation */}
          <div className="mt-8 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-[#C9A962] italic font-medium">
              "Vous développez votre activité en Île-de-France, on gère le terrain.
              Sans embauche, sans formation, sans friction."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
