import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function CityOperator() {
  return (
    <section className="py-20 bg-[#F7F1ED] relative overflow-hidden">
      <PatternBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Illustration à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {/* Illustration SVG d'un opérateur Deltom */}
            <div className="relative">
              <svg
                viewBox="0 0 300 400"
                className="w-64 md:w-80 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Corps */}
                <ellipse cx="150" cy="380" rx="60" ry="15" fill="#0F3D2E" opacity="0.1"/>

                {/* Jambes */}
                <rect x="120" y="280" width="25" height="90" rx="8" fill="#2D2D2D"/>
                <rect x="155" y="280" width="25" height="90" rx="8" fill="#2D2D2D"/>

                {/* Chaussures */}
                <ellipse cx="132" cy="370" rx="18" ry="8" fill="#1a1a1a"/>
                <ellipse cx="168" cy="370" rx="18" ry="8" fill="#1a1a1a"/>

                {/* T-shirt / Polo Deltom */}
                <path d="M100 180 L90 200 L90 280 L210 280 L210 200 L200 180 L175 190 L150 185 L125 190 Z" fill="#0F3D2E"/>

                {/* Col polo */}
                <path d="M125 180 L150 175 L175 180 L170 195 L150 190 L130 195 Z" fill="#0A2A1F"/>

                {/* Bras gauche */}
                <path d="M90 200 L60 260 L75 270 L100 220" fill="#F5D0B5"/>

                {/* Bras droit avec tablette */}
                <path d="M210 200 L230 250 L220 260 L200 220" fill="#F5D0B5"/>

                {/* Tablette/Téléphone dans la main */}
                <rect x="215" y="245" width="35" height="50" rx="4" fill="#333" stroke="#555" strokeWidth="2"/>
                <rect x="220" y="250" width="25" height="35" rx="2" fill="#4A90D9"/>

                {/* Tête */}
                <circle cx="150" cy="130" r="55" fill="#F5D0B5"/>

                {/* Cheveux */}
                <ellipse cx="150" cy="95" rx="50" ry="35" fill="#2D2D2D"/>
                <path d="M100 110 Q100 70 150 65 Q200 70 200 110" fill="#2D2D2D"/>

                {/* Visage */}
                <circle cx="130" cy="125" r="5" fill="#2D2D2D"/>
                <circle cx="170" cy="125" r="5" fill="#2D2D2D"/>
                <path d="M140 150 Q150 160 160 150" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>

                {/* Badge Deltom sur le polo */}
                <circle cx="115" cy="220" r="12" fill="#F7F1ED"/>
                <text x="115" y="224" textAnchor="middle" fontSize="10" fill="#0F3D2E" fontWeight="bold">D</text>

                {/* Casquette/Visière */}
                <path d="M95 100 L205 100 L200 85 Q150 75 100 85 Z" fill="#0F3D2E"/>
                <path d="M95 100 L80 105 L95 108 Z" fill="#0A2A1F"/>
              </svg>

              {/* Éléments décoratifs autour */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#C9A962] rounded-full opacity-50" />
              <div className="absolute -bottom-2 -left-6 w-12 h-12 border-2 border-[#A8643A] rounded-full opacity-30" />
            </div>
          </motion.div>

          {/* Texte à droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0F3D2E] mb-6">
              Votre City Operator,<br />
              <span className="text-[#A8643A] italic">sans le recruter.</span>
            </h2>

            <div className="space-y-4 text-[#0F3D2E]/80 leading-relaxed">
              <p>
                Un <strong className="text-[#0F3D2E]">City Operator</strong> (ou Coordinateur terrain),
                c'est la personne qui gère l'opérationnel au quotidien pour une conciergerie :
                coordination des équipes de ménage, contrôles qualité, gestion des incidents,
                relation avec les voyageurs...
              </p>

              <p>
                <strong className="text-[#0F3D2E]">Le problème ?</strong> Recruter, former et manager
                cette personne prend du temps, coûte cher, et ne scale pas facilement quand votre
                parc grandit.
              </p>

              <p>
                Avec <strong className="text-[#A8643A]">Deltom Operator</strong>, vous externalisez
                toute cette fonction. Notre équipe devient votre <strong className="text-[#0F3D2E]">bras
                droit opérationnel</strong> : on coordonne, on supervise, on gère les imprévus,
                on répond aux voyageurs.
              </p>

              <div className="mt-8 p-6 bg-white/60 rounded-2xl border border-[#0F3D2E]/10">
                <p className="text-[#A8643A] font-semibold italic text-lg">
                  "Vous développez votre activité, on gère le terrain. Sans embauche, sans formation,
                  sans friction."
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#tarifs"
                className="inline-flex items-center gap-2 bg-[#0F3D2E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#A8643A] transition-all group"
              >
                Découvrir l'offre "On opère"
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
