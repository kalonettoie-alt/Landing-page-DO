import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CONTACT_EMAIL, FORMSPREE_CONTACT_ENDPOINT, PHONE_DISPLAY, PHONE_TEL, mailto } from '../lib/config';

const COUNT_OPTIONS = ['1 bien', '2-5 biens', '6-10 biens', '11-20 biens', '21-50 biens', '50+ biens'];

// Pré-remplissage selon le CTA d'origine (?objet=…)
const PREFILL: Record<string, { intro: string; message: string }> = {
  demo: {
    intro: 'Demandez une démonstration sur votre premier logement.',
    message: 'Je souhaite une démonstration de Deltom sur un de mes logements.',
  },
  logement: {
    intro: 'Confiez votre premier logement, sans engagement.',
    message: 'Je souhaite confier mon premier logement à Deltom.',
  },
};

function getObjet(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('objet') ?? '';
}

export default function Contact() {
  const prefill = PREFILL[getObjet()];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [count, setCount] = useState(COUNT_OPTIONS[0]);
  const [city, setCity] = useState('');
  const [message, setMessage] = useState(prefill?.message ?? '');

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validate = (): string => {
    if (!name.trim()) return 'Indiquez votre nom complet.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return 'Indiquez un email valide.';
    if (!phone.trim()) return 'Indiquez votre numéro de téléphone.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSending(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nom: name,
          Email: email,
          Téléphone: phone,
          'Nombre de logements': count,
          'Commune(s)': city || 'non communiqué',
          Message: message || 'non communiqué',
          _subject: `🏠 Demande de contact Deltom — ${name} (${count})`,
        }),
      });
      // Succès UNIQUEMENT si Formspree répond OK. Jamais de faux succès.
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('fail');
      }
    } catch {
      setError('fail');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Nav active={null} />
        <section className="section section-pb container">
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <div style={{ background: 'var(--success-bg)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 44, color: 'var(--success)', marginBottom: 12 }}>✓</div>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Merci, c'est envoyé.</h1>
              <p className="body" style={{ fontSize: 15.5, maxWidth: 460, margin: '0 auto 28px' }}>
                Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => { setSubmitted(false); setName(''); setEmail(''); setPhone(''); setCount(COUNT_OPTIONS[0]); setCity(''); setMessage(''); }}
                className="btn btn-primary"
              >
                Envoyer une autre demande
              </button>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Nav active={null} />

      <section className="section section-pb container">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Contact</div>
            <h1 className="h1-page" style={{ fontSize: 40, marginBottom: 12 }}>Parlons de vos logements.</h1>
            <p className="body" style={{ fontSize: 16 }}>
              {prefill?.intro ?? 'Décrivez votre besoin en une minute — nous revenons vers vous rapidement.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card card-lg" style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
            <div>
              <label className="form-label" htmlFor="name">Nom complet *</label>
              <input id="name" className="field" value={name} onChange={(e) => { setName(e.target.value); setError(''); }} placeholder="Prénom et nom" autoComplete="name" />
            </div>
            <div className="field-2col">
              <div>
                <label className="form-label" htmlFor="email">Email *</label>
                <input id="email" type="email" className="field" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="vous@exemple.fr" autoComplete="email" />
              </div>
              <div>
                <label className="form-label" htmlFor="phone">Téléphone *</label>
                <input id="phone" type="tel" className="field" value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }} placeholder="06 12 34 56 78" autoComplete="tel" />
              </div>
            </div>
            <div className="field-2col">
              <div>
                <label className="form-label" htmlFor="count">Nombre de logements</label>
                <select id="count" className="field" value={count} onChange={(e) => setCount(e.target.value)}>
                  {COUNT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="city">Commune(s)</label>
                <input id="city" className="field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex. Créteil, Vincennes…" />
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="message">Votre message</label>
              <textarea id="message" className="field" style={{ height: 'auto', minHeight: 120, padding: '12px 16px', resize: 'vertical' }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre besoin…" />
            </div>

            {error && (
              <div style={{ background: 'var(--danger-bg)', borderRadius: 10, padding: '12px 16px', fontSize: 13.5, color: 'var(--danger)' }}>
                {error === 'fail' ? (
                  <>
                    L'envoi a échoué. Réessayez, ou écrivez-nous directement à{' '}
                    <a href={mailto('Demande de contact Deltom')} style={{ color: 'var(--danger)', fontWeight: 700, textDecoration: 'underline' }}>{CONTACT_EMAIL}</a>.
                  </>
                ) : error}
              </div>
            )}

            <button type="submit" disabled={sending} className="btn btn-primary btn-block" style={{ opacity: sending ? 0.6 : 1, cursor: sending ? 'default' : 'pointer' }}>
              {sending ? 'Envoi…' : 'Envoyer ma demande'}
            </button>
            <p className="body" style={{ fontSize: 12.5, textAlign: 'center', color: 'var(--muted)' }}>
              Par téléphone : <a href={`tel:${PHONE_TEL}`} style={{ fontWeight: 600 }}>{PHONE_DISPLAY}</a>
              {' · '}email : <a href={mailto()} style={{ fontWeight: 600 }}>{CONTACT_EMAIL}</a>
              {' · '}ou WhatsApp
            </p>
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
