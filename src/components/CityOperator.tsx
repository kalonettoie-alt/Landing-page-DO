import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function CityOperator() {
  return (
    <section className="py-20 bg-[#F7F1ED] relative overflow-hidden">
      <PatternBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Illustration à gauche - AMÉLIORÉE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <svg
                viewBox="0 0 320 420"
                className="w-72 md:w-96 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ombre portée */}
                <ellipse cx="160" cy="400" rx="80" ry="18" fill="#0F3D2E" opacity="0.15"/>

                {/* Jambes avec détails */}
                <rect x="130" y="290" width="28" height="100" rx="10" fill="#2D2D2D"/>
                <rect x="162" y="290" width="28" height="100" rx="10" fill="#2D2D2D"/>

                {/* Genoux (détail) */}
                <ellipse cx="144" cy="330" rx="16" ry="8" fill="#1a1a1a" opacity="0.3"/>
                <ellipse cx="176" cy="330" rx="16" ry="8" fill="#1a1a1a" opacity="0.3"/>

                {/* Chaussures de sécurité */}
                <ellipse cx="144" cy="390" rx="22" ry="10" fill="#1a1a1a"/>
                <ellipse cx="176" cy="390" rx="22" ry="10" fill="#1a1a1a"/>
                <rect x="134" y="385" width="20" height="4" rx="2" fill="#555"/>
                <rect x="166" y="385" width="20" height="4" rx="2" fill="#555"/>

                {/* Ceinture */}
                <rect x="95" y="285" width="130" height="8" rx="2" fill="#1a1a1a"/>
                <circle cx="160" cy="289" r="6" fill="#888"/>

                {/* Polo Deltom avec détails */}
                <path d="M100 190 L85 210 L85 290 L225 290 L225 210 L210 190 L180 200 L160 195 L140 200 Z" fill="#0F3D2E"/>

                {/* Coutures du polo */}
                <line x1="160" y1="195" x2="160" y2="280" stroke="#0A2A1F" strokeWidth="2" opacity="0.3"/>

                {/* Col polo détaillé */}
                <path d="M140 190 L160 185 L180 190 L175 205 L160 200 L145 205 Z" fill="#0A2A1F"/>
                <path d="M155 187 L165 187 L165 195 L155 195 Z" fill="#0A2A1F"/>

                {/* Manches courtes */}
                <path d="M85 210 L70 235 L85 240 L100 220" fill="#0F3D2E"/>
                <path d="M225 210 L240 235 L225 240 L210 220" fill="#0F3D2E"/>

                {/* Bras gauche */}
                <path d="M85 210 L55 270 L70 280 L100 230" fill="#F5D0B5"/>
                <circle cx="62" cy="275" r="8" fill="#E8C4A8"/>

                {/* Bras droit avec tablette */}
                <path d="M225 210 L245 260 L235 270 L215 230" fill="#F5D0B5"/>
                <circle cx="240" cy="265" r="8" fill="#E8C4A8"/>

                {/* Tablette/Téléphone dans la main - AMÉLIORÉE */}
                <g transform="translate(228, 255)">
                  <rect x="0" y="0" width="40" height="60" rx="5" fill="#1a1a1a" stroke="#333" strokeWidth="3"/>
                  <rect x="3" y="3" width="34" height="50" rx="3" fill="#2d3748"/>

                  {/* Écran avec interface */}
                  <rect x="5" y="8" width="30" height="40" rx="2" fill="#4A90D9"/>

                  {/* Interface de l'app */}
                  <rect x="8" y="12" width="24" height="4" rx="1" fill="#fff" opacity="0.9"/>
                  <rect x="8" y="19" width="18" height="3" rx="1" fill="#fff" opacity="0.7"/>
                  <rect x="8" y="24" width="20" height="3" rx="1" fill="#fff" opacity="0.7"/>
                  <circle cx="30" cy="42" r="3" fill="#48bb78"/>

                  {/* Bouton home */}
                  <circle cx="20" cy="56" r="2" fill="#555"/>
                </g>

                {/* Cou */}
                <rect x="145" y="165" width="30" height="25" rx="5" fill="#F5D0B5"/>

                {/* Tête */}
                <circle cx="160" cy="140" r="58" fill="#F5D0B5"/>

                {/* Oreilles */}
                <ellipse cx="110" cy="140" rx="12" ry="18" fill="#E8C4A8"/>
                <ellipse cx="210" cy="140" rx="12" ry="18" fill="#E8C4A8"/>

                {/* Cheveux détaillés */}
                <ellipse cx="160" cy="100" rx="55" ry="38" fill="#2D2D2D"/>
                <path d="M105 115 Q105 75 160 70 Q215 75 215 115" fill="#2D2D2D"/>
                <path d="M120 85 Q130 75 140 85" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
                <path d="M180 85 Q170 75 160 85" stroke="#1a1a1a" strokeWidth="2" fill="none"/>

                {/* Visage avec expressions */}
                <circle cx="140" cy="135" r="6" fill="#2D2D2D"/>
                <circle cx="180" cy="135" r="6" fill="#2D2D2D"/>
                <circle cx="142" cy="133" r="2" fill="#fff" opacity="0.8"/>
                <circle cx="182" cy="133" r="2" fill="#fff" opacity="0.8"/>

                {/* Sourcils */}
                <path d="M130 125 Q140 122 148 125" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M172 125 Q180 122 190 125" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>

                {/* Nez */}
                <path d="M160 145 L155 155 M160 145 L165 155" stroke="#E8C4A8" strokeWidth="2" strokeLinecap="round"/>

                {/* Sourire confiant */}
                <path d="M145 160 Q160 172 175 160" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none"/>

                {/* Badge Deltom sur le polo - AMÉLIORÉ */}
                <circle cx="120" cy="230" r="16" fill="#F7F1ED" stroke="#0F3D2E" strokeWidth="2"/>
                <text x="120" y="236" textAnchor="middle" fontSize="14" fill="#0F3D2E" fontWeight="bold" fontFamily="serif">D</text>

                {/* Casquette professionnelle */}
                <path d="M100 105 L220 105 L215 88 Q160 78 105 88 Z" fill="#0F3D2E"/>
                <ellipse cx="160" cy="105" rx="60" ry="8" fill="#0A2A1F"/>
                <path d="M100 105 L80 112 L100 116 Z" fill="#0A2A1F"/>

                {/* Logo sur la casquette */}
                <circle cx="160" cy="96" r="8" fill="#C9A962"/>
                <text x="160" y="100" textAnchor="middle" fontSize="8" fill="#0F3D2E" fontWeight="bold">D</text>

                {/* Badge "Île-de-France" */}
                <rect x="140" y="260" width="40" height="12" rx="6" fill="#A8643A"/>
                <text x="160" y="268" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">IDF</text>
              </svg>

              {/* Éléments décoratifs améliorés */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 border-2 border-[#C9A962] rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -left-6 w-14 h-14 border-2 border-[#A8643A] rounded-full opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-[#C9A962] rounded-full opacity-20" />
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
                toute cette fonction <strong className="text-[#0F3D2E]">sur toute l'Île-de-France</strong>.
                Notre équipe devient votre <strong className="text-[#0F3D2E]">bras droit opérationnel</strong> :
                on coordonne, on supervise, on gère les imprévus, on répond aux voyageurs.
              </p>

              <div className="mt-8 p-6 bg-white/60 rounded-2xl border border-[#0F3D2E]/10">
                <p className="text-[#A8643A] font-semibold italic text-lg">
                  "Vous développez votre activité en Île-de-France, on gère le terrain. Sans embauche,
                  sans formation, sans friction."
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
