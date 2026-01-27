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
    <section className="py-32 bg-[#0F3D2E] relative overflow-hidden rounded-t-[3rem] rounded-b-[3rem] mx-4 md:mx-8 lg:mx-16 my-8">
      {/* Texture subtile */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Grande citation en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] text-white/[0.02] pointer-events-none select-none">
        "
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 lowercase">
              une idée concrète de
              <br />
              <span className="italic text-[#C9A962]">notre travail</span>
            </h2>
            <p className="text-white/70 text-lg">
              L'excellence opérationnelle certifiée par nos clients.
            </p>
          </div>

          {/* Grille de témoignages */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 relative group hover:bg-white/10 transition-all duration-500"
              >
                {/* Étoiles */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 fill-[#C9A962] text-[#C9A962]"
                    />
                  ))}
                </div>

                {/* Citation */}
                <blockquote className="font-serif text-xl text-white/90 italic leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>

                {/* Source */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{t.title}</p>
                    <p className="text-white/50 text-sm">Airbnb • Note 5/5</p>
                  </div>
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A962] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                {/* Accent de coin */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#C9A962]/30" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
