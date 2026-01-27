import { motion } from 'framer-motion';
import { TrendingUp, Moon } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function TargetAudience() {
  const audiences = [
    {
      icon: TrendingUp,
      title: 'Conciergeries',
      subtitle: 'Scalable & Fiable',
      description:
        'Libérez-vous du recrutement et de la gestion terrain. Passez de 10 à 100 logements sans friction.',
      number: '01',
    },
    {
      icon: Moon,
      title: 'Propriétaires',
      subtitle: 'Qualité & Tranquillité',
      description:
        'Optimisez vos revenus LCD sans y passer vos week-ends. Une gestion pro pour des voyageurs ravis.',
      number: '02',
    },
  ];

  return (
    <section id="solutions" className="py-32 bg-white relative overflow-hidden">
      <PatternBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <span className="inline-block text-[#A8643A] uppercase tracking-[0.4em] text-xs mb-6">
              Solutions
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F3D2E]">
              Une solution pensée par des hôtes,
              <br />
              <span className="italic text-[#A8643A]">pour des hôtes.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white hover:bg-[#0F3D2E] p-10 overflow-hidden cursor-pointer transition-colors duration-500"
              >
                {/* Bordure subtile */}
                <div className="absolute inset-0 border border-[#0F3D2E]/10 group-hover:border-[#A8643A]/30 transition-colors duration-500" />

                {/* Accent doré en coin */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#C9A962]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ligne de progression */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#A8643A] group-hover:w-full transition-all duration-700" />

                {/* Numéro décoratif */}
                <span className="absolute top-6 right-6 font-serif text-6xl text-[#0F3D2E]/5 group-hover:text-[#A8643A]/10 transition-colors">
                  {audience.number}
                </span>

                {/* Contenu */}
                <div className="relative">
                  <div className="w-12 h-12 border border-[#A8643A]/30 rounded-full flex items-center justify-center mb-6 group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                    <audience.icon className="w-5 h-5 text-[#A8643A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0F3D2E] group-hover:text-white mb-3 transition-colors duration-300">
                    {audience.title}
                  </h3>
                  <p className="text-[#A8643A] group-hover:text-[#C9A962] uppercase tracking-[0.2em] text-xs mb-4 transition-colors duration-300">
                    {audience.subtitle}
                  </p>
                  <p className="text-[#0F3D2E]/60 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                    {audience.description}
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
