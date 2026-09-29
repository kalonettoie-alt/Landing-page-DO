// shared.jsx — atoms used across OPERATOR screens
// Globals: StatusPill, CoverPattern, InterventionCard, KPICard,
//          BottomNav, Pill, Counter, Chip, Toggle, ProgressBar,
//          WizardShell, Icon, ListRow, Avatar

const COVER_PRESETS = {
  saumon:  { c1: '#f4cdb8', c2: '#e3a98e', label: 'STUDIO' },
  sauge:   { c1: '#c2cda4', c2: '#98a87a', label: 'LOFT' },
  carton:  { c1: '#d6bd8e', c2: '#ad9462', label: 'APPART' },
  olive:   { c1: '#c5cc97', c2: '#9aa46d', label: 'T2' },
  framboise: { c1: '#e7a4b1', c2: '#c75a72', label: 'STUDIO' },
};

function CoverPattern({ tone = 'saumon', label, style, children, rounded = 0 }) {
  const p = COVER_PRESETS[tone] || COVER_PRESETS.saumon;
  return (
    <div style={{
      position: 'relative',
      background: `linear-gradient(135deg, ${p.c1}, ${p.c2})`,
      borderRadius: rounded,
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 8px, transparent 8px 16px)',
        mixBlendMode: 'overlay',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 78% 28%, rgba(255,255,255,0.35), transparent 65%)',
      }} />
      {children}
      {label && (
        <div className="mono" style={{
          position: 'absolute', left: 8, bottom: 6, fontSize: 9,
          color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em',
          textShadow: '0 1px 0 rgba(0,0,0,0.12)',
        }}>{label}</div>
      )}
    </div>
  );
}

const STATUS_MAP = {
  termine:    { bg: '#4d6a3a', fg: '#ffffff', label: 'Terminé' },
  encours:    { bg: '#c75a72', fg: '#ffffff', label: 'En cours' },
  avenir:     { bg: '#8a6a3a', fg: '#fbf0d8', label: 'À venir' },
  programme:  { bg: '#7a8a4a', fg: '#ffffff', label: 'Programmé' },
  bloque:     { bg: '#b9ad99', fg: '#ffffff', label: 'Bloqué' },
};

function StatusPill({ status = 'avenir', size = 'md' }) {
  const s = STATUS_MAP[status];
  const padX = size === 'sm' ? 8 : 11;
  const padY = size === 'sm' ? 3 : 5;
  const fs = size === 'sm' ? 10.5 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: `${padY}px ${padX}px`,
      background: s.bg, color: s.fg,
      borderRadius: 999, fontSize: fs, fontWeight: 600,
      letterSpacing: '-0.005em', whiteSpace: 'nowrap',
    }}>
      {status === 'encours' && <span style={{
        width: 5, height: 5, borderRadius: 99, background: '#fff',
        boxShadow: '0 0 0 3px rgba(255,255,255,0.25)',
      }} />}
      {s.label}
    </span>
  );
}

function InterventionCard({ time, name, presta, status, tone, compact = true, note }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: 'var(--bg-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <CoverPattern tone={tone} style={{ width: 14, alignSelf: 'stretch' }} />
      <div style={{ flex: 1, padding: compact ? '12px 14px' : '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{time}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{name}</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 2 }}>
            {presta}{note ? ` · ${note}` : ''}
          </div>
        </div>
        <StatusPill status={status} size="sm" />
      </div>
    </div>
  );
}

function KPICard({ children, style }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 16,
      padding: '14px 16px 12px',
      boxShadow: 'var(--shadow-soft)',
      ...style,
    }}>{children}</div>
  );
}

function ProgressBar({ value = 0.5, color = 'var(--framboise)', track = 'rgba(42,37,32,0.08)', height = 6 }) {
  return (
    <div style={{ background: track, borderRadius: 99, height, width: '100%', overflow: 'hidden' }}>
      <div style={{ background: color, width: `${value*100}%`, height: '100%', borderRadius: 99 }} />
    </div>
  );
}

function Pill({ active, children, onClick, dark }) {
  return (
    <button onClick={onClick} style={{
      border: 'none', cursor: 'pointer',
      padding: '7px 14px', borderRadius: 999,
      background: active ? (dark ? '#1a1410' : 'var(--ink)') : 'transparent',
      color: active ? '#fff' : 'var(--ink-soft)',
      fontFamily: 'inherit', fontSize: 13.5, fontWeight: active ? 600 : 500,
      letterSpacing: '-0.005em',
    }}>{children}</button>
  );
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex', padding: 3,
      background: 'rgba(42,37,32,0.06)', borderRadius: 999,
    }}>
      {options.map(o => (
        <Pill key={o.value} active={o.value === value} onClick={() => onChange?.(o.value)}>
          {o.label}
        </Pill>
      ))}
    </div>
  );
}

function Counter({ value, onChange, min = 0 }) {
  const btn = (sym, dis, on) => (
    <button onClick={on} disabled={dis} style={{
      width: 30, height: 30, borderRadius: 99,
      background: dis ? 'rgba(42,37,32,0.04)' : 'var(--framboise)',
      border: 'none', color: dis ? 'var(--ink-faint)' : '#fff',
      fontSize: 16, fontWeight: 500, lineHeight: 1, cursor: dis ? 'default' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dis ? 'none' : '0 1px 2px rgba(199,90,114,0.3)',
    }}>{sym}</button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {btn('−', value <= min, () => onChange?.(Math.max(min, value-1)))}
      <span className="mono" style={{ minWidth: 18, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{value}</span>
      {btn('+', false, () => onChange?.(value+1))}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      border: active ? '1.5px solid var(--framboise)' : '1.5px solid var(--hairline-strong)',
      background: active ? 'var(--framboise-tint)' : 'transparent',
      color: active ? 'var(--framboise-deep)' : 'var(--ink-soft)',
      padding: '7px 13px', borderRadius: 999, fontSize: 13, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      {active && <span style={{ width: 14, height: 14, display: 'inline-flex' }}><Icon name="check" size={14} /></span>}
      {children}
    </button>
  );
}

function Toggle({ on, onChange, color = 'var(--saumon-deep)' }) {
  return (
    <button onClick={() => onChange?.(!on)} style={{
      width: 44, height: 26, borderRadius: 99, padding: 2,
      background: on ? color : 'rgba(42,37,32,0.15)',
      border: 'none', position: 'relative', cursor: 'pointer',
      transition: 'background 160ms',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 99, background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
        transform: on ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 160ms',
      }} />
    </button>
  );
}

function Avatar({ initial = 'L', tone = 'framboise', size = 36, badge }) {
  const bg = tone === 'framboise' ? 'var(--framboise)' :
             tone === 'sauge' ? 'var(--sauge-deep)' :
             tone === 'carton' ? 'var(--carton-deep)' :
             tone === 'saumon' ? 'var(--saumon-deep)' : 'var(--ink)';
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: 99,
        background: bg, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.42, fontWeight: 600,
        boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.08)',
      }}>{initial}</div>
      {badge && (
        <div style={{
          position: 'absolute', top: -2, right: -2,
          minWidth: 18, height: 18, padding: '0 5px',
          background: 'var(--framboise)', color: '#fff',
          borderRadius: 99, fontSize: 10.5, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--bg-page)',
        }}>{badge}</div>
      )}
    </div>
  );
}

// fine-line icons
function Icon({ name, size = 18, color = 'currentColor', stroke = 1.6 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'arrow-left': return <svg {...p}><path d="M15 18l-6-6 6-6" /></svg>;
    case 'arrow-right': return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case 'arrow-up': return <svg {...p}><path d="M6 15l6-6 6 6" /></svg>;
    case 'arrow-down': return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case 'minus': return <svg {...p}><path d="M5 12h14" /></svg>;
    case 'check': return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case 'bell': return <svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M9.5 21a2.5 2.5 0 0 0 5 0" /></svg>;
    case 'home': return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>;
    case 'cal': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
    case 'inbox': return <svg {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s8-7.6 8-13a8 8 0 1 0-16 0c0 5.4 8 13 8 13z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case 'photo': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 17l-5-5-7 7" /></svg>;
    case 'video': return <svg {...p}><polygon points="7,5 19,12 7,19" fill={color} stroke="none" /></svg>;
    case 'play-tri': return <svg width={size} height={size} viewBox="0 0 24 24"><polygon points="7,5 19,12 7,19" fill={color} /></svg>;
    case 'wifi': return <svg {...p}><path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="0.6" fill={color} stroke={color} /></svg>;
    case 'key': return <svg {...p}><circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M16 7l3 3" /></svg>;
    case 'box': return <svg {...p}><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 10h6M12 14v3" /></svg>;
    case 'chat': return <svg {...p}><path d="M21 12a8 8 0 0 1-12.5 6.6L3 20l1.4-5.5A8 8 0 1 1 21 12z" /></svg>;
    case 'phone': return <svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z" /></svg>;
    case 'star': return <svg {...p}><polygon points="12,3 14.5,9 21,9.5 16,14 17.5,20.5 12,17 6.5,20.5 8,14 3,9.5 9.5,9" /></svg>;
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case 'building': return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></svg>;
    case 'user-pin': return <svg {...p}><circle cx="12" cy="9" r="3" /><path d="M5 21c0-3 3-5 7-5s7 2 7 5" /></svg>;
    case 'door': return <svg {...p}><path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" /><path d="M3 21h18M14 12h.5" /></svg>;
    case 'qr': return <svg {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3M21 14v3M17 17v4M14 17h0M21 21h-2" /></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" /></svg>;
    case 'broom': return <svg {...p}><path d="M14 4l6 6M16 6l-9 9-3 6 6-3 9-9M4 20l3-3" /></svg>;
    case 'shirt': return <svg {...p}><path d="M4 7l4-3 2 2h4l2-2 4 3-2 4h-3v9H9v-9H6z" /></svg>;
    case 'plus-circle': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case 'chevron-right': return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case 'chevron-down': return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case 'pencil': return <svg {...p}><path d="M16 3l5 5L8 21H3v-5z" /></svg>;
    case 'send': return <svg {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>;
    case 'coffee': return <svg {...p}><path d="M4 9h13v4.5a4.5 4.5 0 0 1-4.5 4.5H8.5A4.5 4.5 0 0 1 4 13.5z" /><path d="M17 10.5h1.6a2.4 2.4 0 0 1 0 4.8H17" /><path d="M8 6c.7-.8.7-1.7 0-2.5M12.5 6c.7-.8.7-1.7 0-2.5" /></svg>;
    default: return null;
  }
}

function WizardShell({ step, total = 9, title, subtitle, onBack, children, footer }) {
  return (
    <div className="ios-body" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: 'var(--bg-page)' }}>
      <div style={{ paddingTop: 56 }} />
      {/* header */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{
            width: 38, height: 38, borderRadius: 99,
            border: '1px solid var(--hairline)', background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><Icon name="arrow-left" size={18} /></button>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.06em' }}>
            ÉTAPE {step}/{total}
          </div>
          <span style={{ width: 38 }} />
        </div>
        {/* progress */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 99,
              background: i < step ? 'var(--framboise)' : 'rgba(42,37,32,0.10)',
            }} />
          ))}
        </div>
        <h1 className="h-2" style={{ margin: '20px 0 4px' }}>{title}</h1>
        {subtitle && <p className="body" style={{ margin: 0 }}>{subtitle}</p>}
      </div>

      <div style={{ flex: 1, padding: '18px 20px 24px', overflow: 'auto' }}>
        {children}
      </div>

      {footer && (
        <div style={{
          padding: '14px 20px 26px', background: 'var(--bg-page)',
          borderTop: '1px solid var(--hairline)',
        }}>{footer}</div>
      )}
    </div>
  );
}

function CTAButton({ children, onClick, kind = 'primary', full = true }) {
  const styles = {
    primary: { background: 'var(--framboise)', color: '#fff', boxShadow: '0 6px 14px rgba(199,90,114,0.30)' },
    ghost: { background: 'var(--bg-card)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)' },
    dark: { background: 'var(--ink)', color: '#fff' },
  };
  return (
    <button onClick={onClick} style={{
      border: 'none', borderRadius: 99,
      padding: '15px 22px', fontFamily: 'inherit',
      fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.005em',
      cursor: 'pointer', width: full ? '100%' : undefined,
      ...styles[kind],
    }}>{children}</button>
  );
}

function StickyTotal({ label, value }) {
  return (
    <div style={{
      background: 'var(--ink)', color: '#fff',
      borderRadius: 14, padding: '14px 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 6px 18px rgba(42,37,32,0.18)',
    }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      <span className="mono" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>{value}</span>
    </div>
  );
}

function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Accueil' },
    { id: 'cal', icon: 'cal', label: 'Planning' },
    { id: 'plus', icon: 'plus', label: '', cta: true },
    { id: 'inbox', icon: 'inbox', label: 'Inbox' },
    { id: 'user', icon: 'user', label: 'Profil' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 22, paddingTop: 8,
      background: 'linear-gradient(to top, var(--bg-page) 70%, rgba(244,235,216,0))',
    }}>
      <div style={{
        margin: '0 14px', padding: '8px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        background: 'rgba(255,253,247,0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--hairline)',
        borderRadius: 22,
        boxShadow: 'var(--shadow-soft)',
      }}>
        {items.map(it => {
          if (it.cta) return (
            <button key={it.id} style={{
              width: 46, height: 46, borderRadius: 99, border: 'none',
              background: 'var(--framboise)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(199,90,114,0.35)',
              cursor: 'pointer',
            }}><Icon name="plus" size={22} stroke={2} color="#fff" /></button>
          );
          const isActive = it.id === active;
          return (
            <button key={it.id} style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', minWidth: 44,
              color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
            }}>
              <Icon name={it.icon} size={22} stroke={isActive ? 1.9 : 1.5} />
              <span style={{ fontSize: 10.5, fontWeight: isActive ? 600 : 500 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Card({ children, style, padded = true }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 16,
      padding: padded ? '14px 16px' : 0,
      boxShadow: 'var(--shadow-soft)',
      ...style,
    }}>{children}</div>
  );
}

function RadioCard({ active, onClick, children, style }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      background: active ? 'var(--saumon)' : 'var(--bg-card)',
      borderRadius: 14, padding: '14px 16px',
      boxShadow: active ? 'inset 0 0 0 2px var(--framboise), 0 6px 14px rgba(199,90,114,0.16)' : 'inset 0 0 0 1px var(--hairline-strong)',
      color: active ? 'var(--ink)' : 'var(--ink-soft)',
      ...style,
    }}>{children}</button>
  );
}

function Checkbox({ on, onChange, label, sub, price }) {
  return (
    <button onClick={() => onChange?.(!on)} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      padding: '12px 14px', borderRadius: 12, fontFamily: 'inherit',
      background: on ? 'var(--framboise-tint)' : 'transparent',
      border: on ? '1px solid var(--framboise-soft)' : '1px solid var(--hairline)',
      cursor: 'pointer', textAlign: 'left',
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        background: on ? 'var(--framboise)' : 'transparent',
        border: on ? 'none' : '1.5px solid var(--ink-faint)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {on && <Icon name="check" size={14} color="#fff" stroke={2.5} />}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 1 }}>{sub}</div>}
      </div>
      {price && <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{price}</span>}
    </button>
  );
}

Object.assign(window, {
  CoverPattern, StatusPill, InterventionCard, KPICard, ProgressBar,
  Pill, SegmentedControl, Counter, Chip, Toggle, Avatar, Icon,
  WizardShell, CTAButton, StickyTotal, BottomNav, Card, RadioCard, Checkbox,
  STATUS_MAP, COVER_PRESETS,
});
