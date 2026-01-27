import { motion } from 'framer-motion';
import PatternBackground from './PatternBackground';

export default function Benefits() {
  const benefits = [
    {
      title: 'Réduire votre charge',
      subtitle: 'Opérationnelle',
      description:
        'Éliminez le stress du recrutement, de la formation et de la gestion quotidienne. On s\'occupe de tout.',
      icon: (
        <svg
          className="w-full h-full"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#C9A962]"
          />
          <path
            d="M20 32L28 40L44 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0F3D2E]"
          />
        </svg>
      ),
      number: '01',
    },
    {
      title: 'Augmenter votre CA',
      subtitle: 'Par intervention',
      description:
        'Des prestations de qualité = des notes élevées = plus de visibilité = plus de réservations à des prix optimisés.',
      icon: (
        <svg
          className="w-full h-full"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 48L24 36L32 42L52 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0F3D2E]"
          />
          <path
            d="M42 22H52V32"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#C9A962]"
          />
        </svg>
      ),
      number: '02',
    },
    {
      title: 'Expérience 5★',
      subtitle: 'À chaque séjour',
      description:
        'Un niveau de propreté irréprochable et une attention aux détails qui transforment chaque séjour en expérience mémorable.',
      icon: (
        <svg
          className="w-full h-full"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 12L36.8 26.4L52 28L40 38.8L43.6 54L32 46L20.4 54L24 38.8L12 28L27.2 26.4L32 12Z"
            fill="currentColor"
            className="text-[#C9A962]"
          />
          <path
            d="M32 12L36.8 26.4L52 28L40 38.8L43.6 54L32 46L20.4 54L24 38.8L12 28L27.2 26.4L32 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0F3D2E]"
          />
        </svg>
      ),
      number: '03',
    },
    {
      title: 'Développer votre activité',
      subtitle: 'Sans friction',
      description:
        'Scalez de 1 à 100 logements sans vous soucier de la capacité opérationnelle. On grandit avec vous.',
      icon: (
        <svg
          className="w-full h-full"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="14"
            y="38"
            width="10"
            height="14"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#0F3D2E]"
          />
          <rect
            x="27"
            y="28"
            width="10"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#C9A962]"
          />
          <rect
            x="40"
            y="18"
            width="10"
            height="34"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#0F3D2E]"
          />
        </svg>
      ),
      number: '04',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-[#F7F1ED] via-[#FDFBF9] to-[#E8DED6] relative overflow-hidden">
      {/* Motif "+" en arrière-plan */}
      <PatternBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Grille de bénéfices */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 backdrop-blur-sm p-8 overflow-hidden cursor-pointer"
              >
                {/* Bordure */}
                <div className="absolute inset-0 border border-[#0F3D2E]/10 group-hover:border-[#A8643A]/30 transition-colors duration-500" />

                {/* Numéro décoratif en arrière-plan */}
                <span className="absolute top-4 right-4 font-serif text-6xl text-[#0F3D2E]/5 group-hover:text-[#A8643A]/10 transition-colors">
                  {benefit.number}
                </span>

                {/* Ligne de progression en bas */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#A8643A] group-hover:w-full transition-all duration-700" />

                {/* Contenu */}
                <div className="relative">
                  {/* Icône SVG */}
                  <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {benefit.icon}
                  </div>

                  <h3 className="font-serif text-2xl text-[#0F3D2E] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#A8643A] uppercase tracking-[0.2em] text-xs mb-4">
                    {benefit.subtitle}
                  </p>
                  <p className="text-[#0F3D2E]/60 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
