import { motion } from 'framer-motion';
import { TrendingUp, Moon } from 'lucide-react';

export default function TargetAudience() {
  const audiences = [
    {
      icon: TrendingUp,
      title: 'Conciergeries',
      subtitle: 'Scalable & Fiable',
      description:
        'Libérez-vous des contraintes du recrutement et de la gestion du personnel. Scalez votre parc sans friction. Passez de 10 à 100 logements.',
    },
    {
      icon: Moon,
      title: 'Propriétaires',
      subtitle: 'Qualité & Tranquillité',
      description:
        'Optimisez vos revenus LCD sans y passer vos week-ends. Une gestion pro pour des voyageurs ravis.',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-deltom-green text-center mb-16">
            Une solution pensée par des hôtes, pour des hôtes.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-deltom-cream p-8 rounded-2xl hover:bg-deltom-green transition-all duration-300 cursor-pointer"
              >
                <audience.icon className="w-12 h-12 text-deltom-copper mb-4 group-hover:text-deltom-cream transition-colors" />
                <h3 className="font-serif text-2xl text-deltom-green mb-2 group-hover:text-white transition-colors">
                  {audience.title}
                </h3>
                <p className="text-deltom-copper font-semibold mb-4 group-hover:text-deltom-cream transition-colors">
                  {audience.subtitle}
                </p>
                <p className="text-deltom-gray group-hover:text-white transition-colors">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
