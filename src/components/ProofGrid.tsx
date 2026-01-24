import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';

export default function ProofGrid() {
  const testimonials = [
    {
      title: 'Chic & Cozy • Aux Portes de Paris',
      rating: 5,
      badge: 'Note de propreté 5/5',
      quote: 'Excellent séjour. Conforme en tout point au détail du site. Merci.',
      link: 'https://www.airbnb.fr/rooms/1278780558559172214',
    },
    {
      title: 'Appartement cosy proche Paris & Disneyland',
      rating: 5,
      badge: 'Note de propreté 5/5',
      quote:
        'Très bon séjour. Logement propre, conforme à l\'annonce et hôte réactif. Je recommande.',
      link: 'https://www.airbnb.fr/rooms/1542945864275702208',
    },
  ];

  return (
    <section className="py-20 bg-deltom-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white text-center mb-4 lowercase">
            une idée concrète de notre travail
          </h2>
          <p className="text-white/90 text-center text-lg mb-16">
            L'excellence opérationnelle certifiée par nos clients.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h3 className="font-serif text-xl text-deltom-green mb-4">
                  {testimonial.title}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-deltom-copper text-deltom-copper"
                    />
                  ))}
                </div>

                {/* Badge */}
                <div className="inline-block bg-deltom-cream text-deltom-green px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {testimonial.badge}
                </div>

                {/* Quote */}
                <blockquote className="text-deltom-gray italic mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Link */}
                <a
                  href={testimonial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-deltom-copper hover:text-deltom-green transition-colors font-semibold"
                >
                  Voir l'annonce Airbnb
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
