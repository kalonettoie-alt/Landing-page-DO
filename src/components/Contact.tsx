import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PatternBackground from './PatternBackground';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'T2',
    propertyCount: '1 bien',
    city: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-[#F7F1ED] relative overflow-hidden">
        <PatternBackground />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 shadow-2xl text-center"
          >
            <CheckCircle className="w-20 h-20 text-[#0F3D2E] mx-auto mb-6" />
            <h3 className="font-serif text-3xl text-[#0F3D2E] mb-4">
              Merci pour votre demande !
            </h3>
            <p className="text-[#A0A0A0] text-lg mb-8">
              Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs
              délais.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#0F3D2E] text-white px-8 py-3 rounded-lg hover:bg-[#A8643A] transition-all"
            >
              Envoyer une nouvelle demande
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-[#F7F1ED] relative overflow-hidden">
      <PatternBackground />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0F3D2E] text-center mb-4">
            Prêt à changer de dimension ?
          </h2>
          <p className="text-[#A0A0A0] text-center text-lg mb-12">
            Remplissez ce formulaire pour recevoir votre étude opérationnelle gratuite.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Email professionnel *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A]"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A]"
              />
            </div>

            <div>
              <label
                htmlFor="propertyType"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Type de bien
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A] bg-white"
              >
                <option value="Studio">Studio</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
                <option value="T5+">T5+</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="propertyCount"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Nombre de biens
              </label>
              <select
                id="propertyCount"
                name="propertyCount"
                value={formData.propertyCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A] bg-white"
              >
                <option value="1 bien">1 bien</option>
                <option value="2-5 biens">2-5 biens</option>
                <option value="6-10 biens">6-10 biens</option>
                <option value="11-20 biens">11-20 biens</option>
                <option value="21-50 biens">21-50 biens</option>
                <option value="50+ biens">50+ biens</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Ville d'exploitation
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[#0F3D2E] font-semibold mb-2"
              >
                Décrivez votre besoin...
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#F7F1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8643A] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F3D2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A8643A] transition-all hover:scale-105 shadow-lg"
            >
              Obtenir ma proposition maintenant
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
