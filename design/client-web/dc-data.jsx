// dc-data.jsx — données fidèles aux captures + petits atomes
// Globals attendus: Icon, CoverPattern, Avatar
// Expose: DC_NAV, DC_LOGEMENTS, DC_BRIEF, DC_PLANNING, DC_CONVOS, DcPill, DcCover

// ── navigation (exactement les rubriques des captures) ──
const DC_NAV = {
  pilotage: [
    { id: 'accueil',   icon: 'home',     label: 'Accueil' },
    { id: 'logements', icon: 'building', label: 'Mes logements' },
    { id: 'planning',  icon: 'cal',      label: 'Planning' },
    { id: 'support',   icon: 'chat',     label: 'Support' },
    { id: 'inbox',     icon: 'inbox',    label: 'Inbox', soon: true },
  ],
  compte: [
    { id: 'profil',    icon: 'user',     label: 'Profil & compte' },
  ],
};

// ── logements (tone = couleur de couverture) ──
const DC_LOGEMENTS = [
  { name: 'Loft République', loc: 'Paris 10e', kind: 'T3',     tone: 'carton',    status: 'encours', line: 'T3 · On opere · blanchisserie', wm: 'T3' },
  { name: 'Studio Voltaire', loc: 'Paris 11e', kind: 'Studio', tone: 'sauge',     status: 'bloque',  line: 'Studio · On execute',           wm: 'STUDIO' },
  { name: 'Studio Marais',   loc: 'Paris 4e',  kind: 'Studio', tone: 'framboise', status: 'encours', line: 'Studio · On execute',           wm: 'STUDIO' },
  { name: 'Guest Proof Lgt', loc: null,        kind: 'Studio', tone: 'saumon',    status: 'avenir',  line: 'Studio · On execute',           wm: 'STUDIO' },
  { name: 'Code A',          loc: null,        kind: 'Studio', tone: 'olive',     status: 'avenir',  line: 'Studio · On execute',           wm: 'STUDIO' },
  { name: 'Code B',          loc: null,        kind: 'Studio', tone: 'saumon',    status: 'avenir',  line: 'Studio · On execute',           wm: 'STUDIO' },
];

// ── brief du jour / planning day list (6 interventions) ──
const DC_BRIEF = [
  { time: '02:00', name: 'Studio Voltaire', tone: 'sauge',     status: 'termine' },
  { time: '02:29', name: 'Code A',          tone: 'olive',     status: 'termine' },
  { time: '04:48', name: 'Studio Marais',   tone: 'framboise', status: 'avenir'  },
  { time: '10:00', name: 'Loft République', tone: 'carton',    status: 'encours' },
  { time: '13:00', name: 'Studio Marais',   tone: 'framboise', status: 'encours' },
  { time: '19:00', name: 'Loft République', tone: 'carton',    status: 'avenir'  },
];

// ── planning · juillet 2026 (événements par jour) ──
const DC_PLANNING = {
  4:  [['interv', 'Intervention']],
  5:  [['termine', 'Terminé'], ['termine', 'Terminé'], ['more', '+4']],
  7:  [['interv', 'Intervention']],
  8:  [['interv', 'Intervention']],
  15: [['interv', 'Intervention']],
  16: [['interv', 'Intervention']],
  17: [['interv', 'Intervention']],
  20: [['interv', 'Intervention']],
  21: [['interv', 'Intervention']],
  25: [['interv', 'Intervention'], ['interv', 'Intervention']],
  26: [['interv', 'Intervention'], ['interv', 'Intervention']],
  27: [['interv', 'Intervention'], ['interv', 'Intervention']],
};

// ── support · conversations ──
const DC_CONVOS = [
  { name: 'Loft République', meta: '07/07 04:28 · À venir' },
  { name: 'Studio Voltaire', meta: '05/07 02:00 · Terminée' },
];

// ── pill de statut (fidèle aux captures) ──
const DC_PILL_LABEL = { termine: 'Terminé', encours: 'En cours', avenir: 'À venir', bloque: 'Bloqué' };
function DcPill({ status = 'avenir' }) {
  return (
    <span className={'dc-pill ' + status}>
      {status === 'encours' && <span className="pd" />}
      {DC_PILL_LABEL[status] || status}
    </span>
  );
}

// couverture rayée (réutilise CoverPattern du système)
function DcCover({ tone, style, children }) {
  return <CoverPattern tone={tone} style={style}>{children}</CoverPattern>;
}

const DC_TONE_DOT = {
  saumon: 'var(--saumon-deep)', sauge: 'var(--sauge-deep)', carton: 'var(--carton-deep)',
  olive: 'var(--olive-deep)', framboise: 'var(--framboise)',
};

Object.assign(window, { DC_NAV, DC_LOGEMENTS, DC_BRIEF, DC_PLANNING, DC_CONVOS, DcPill, DcCover, DC_TONE_DOT });
