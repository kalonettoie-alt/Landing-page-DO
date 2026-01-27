import { motion } from 'framer-motion';
import { Smartphone, Users, MessageCircle, Shield } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function Method() {
  const methods = [
    {
      number: '01',
      icon: Smartphone,
      title: 'APP',
      subtitle: 'Technologie & Traçabilité',
      description:
        'Planning, statuts temps réel, rapports photos, alertes incidents.',
    },
    {
      number: '02',
      icon: Users,
      title: 'OPÉRATEURS',
      subtitle: 'Équipes Professionnelles',
      description:
        'Équipes pro, formées aux standards Airbnb. Véhiculés, équipés.',
    },
    {
      number: '03',
      icon: MessageCircle,
      title: 'SERVICE CLIENT LCD',
      subtitle: '8h-23h, 7j/7',
      description:
        'Équipe dédiée 8h-23h pour vos voyageurs. Réactivité = notes 5★.',
    },
    {
      number: '04',
      icon: Shield,
      title: 'SUPERVISION QUALITÉ',
      subtitle: 'Excellence Continue',
      description:
        'Contrôles, inventaires, ménages de fond, formation continue.',
    },
  ];

  return (
    <section id="outils" className="py-20 bg-white relative overflow-hidden">
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
              Notre Méthode
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F3D2E] mb-4">
              Comment opérons-nous
              <br />
              <span className="italic text-[#A8643A]">au quotidien ?</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg">Innovation & Standards</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white p-8 overflow-hidden cursor-pointer"
                >
                  {/* Bordure subtile */}
                  <div className="absolute inset-0 border border-[#0F3D2E]/10 group-hover:border-[#A8643A]/30 transition-colors duration-500" />

                  {/* Numéro décoratif en arrière-plan */}
                  <span className="absolute top-4 right-4 font-serif text-7xl text-[#0F3D2E]/5 group-hover:text-[#A8643A]/10 transition-colors">
                    {method.number}
                  </span>

                  {/* Ligne de progression en bas */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-[#A8643A] group-hover:w-full transition-all duration-700" />

                  {/* Contenu */}
                  <div className="relative">
                    {/* Icône */}
                    <div className="w-12 h-12 bg-[#0F3D2E] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#A8643A] transition-colors duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-bold text-xl text-[#0F3D2E] mb-2">
                      {method.title}
                    </h3>
                    <p className="text-[#A8643A] uppercase tracking-[0.2em] text-xs mb-4">
                      {method.subtitle}
                    </p>
                    <p className="text-[#0F3D2E]/60 leading-relaxed text-sm">
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
