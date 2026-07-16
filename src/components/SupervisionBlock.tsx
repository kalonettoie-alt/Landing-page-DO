export default function SupervisionBlock({
  paragraph,
  bullets,
}: {
  paragraph: string;
  bullets: string[];
}) {
  return (
    <section className="section container">
      <div
        style={{
          background: 'var(--calm)',
          borderRadius: 28,
          padding: 'clamp(32px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <div className="eyebrow">La supervision</div>
          <h2 className="h2-block" style={{ marginBottom: 20, textWrap: 'pretty' }}>
            L'automatisation gère le volume. Des humains gèrent l'exception.
          </h2>
          <p className="body" style={{ fontSize: 15.5, lineHeight: 1.6, marginBottom: 28 }}>
            {paragraph}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14.5, color: 'var(--ink)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ background: 'var(--primary)', borderRadius: 20, padding: 28, color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Console supervision</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                temps réel
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ConsoleRow who="T2 · Créteil" time="J-1 · 18:04" text="Pas de confirmation de l'opérateur à J-1 — alerte" color="#FBBF77" />
              <ConsoleRow who="Léa · supervision" time="18:07" text="Prend en charge, relance et cherche un remplacement" color="rgba(255,255,255,0.75)" />
              <ConsoleRow who="Awa T. · opératrice" time="18:26" text="Assignée et confirmée — intervention maintenue" color="#7EE0B8" />
            </div>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '16px 4px 0', lineHeight: 1.6 }}>
            Le double filet : remplacement automatique, puis reprise humaine si nécessaire.
          </p>
        </div>
      </div>
    </section>
  );
}

function ConsoleRow({ who, time, text, color }: { who: string; time: string; text: string; color: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>{who}</span>
        <span className="mono" style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)' }}>{time}</span>
      </div>
      <div style={{ fontSize: 13, color }}>{text}</div>
    </div>
  );
}
