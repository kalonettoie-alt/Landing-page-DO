// ill.js — dessins au trait des guides, injectés dans [data-ill]
(function () {
  const V = '#1A3A3A', O = '#8B7D3C', s = (d, c = V, w = 2.2) => `<path d="${d}" stroke="${c}" stroke-width="${w}"></path>`;
  const r = (x, y, w, h, rx, c = V, f) => f ? `<rect class="fl" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"></rect>` : `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" stroke="${c}" stroke-width="2.2"></rect>`;
  const c = (x, y, R, col = V, f) => f ? `<circle class="fl" cx="${x}" cy="${y}" r="${R}" fill="${f}"></circle>` : `<circle cx="${x}" cy="${y}" r="${R}" stroke="${col}" stroke-width="2.2"></circle>`;
  const I = {
    juridique: ['#F4E6DA', r(40, 18, 58, 74, 7, 0, '#fff') + r(40, 18, 58, 74, 7) + s('M50 34 H88 M50 44 H88 M50 54 H80 M50 72 H66') + s('M70 76 q6-10 12 0 q6 10 12 0', O, 2) + s('M118 30 l22 22 M112 36 l14-14 M134 58 l14-14 M125 45 L102 68', V) + s('M92 90 H130', V)],
    linge: ['#F1EAD9', r(34, 60, 92, 22, 6, 0, '#fff') + r(42, 40, 76, 20, 6, 0, '#DDE8DF') + r(50, 22, 60, 18, 6, 0, '#fff') + r(34, 60, 92, 22, 6) + r(42, 40, 76, 20, 6) + r(50, 22, 60, 18, 6) + s('M34 71 H126 M42 50 H118 M50 31 H110', V, 1.4) + s('M132 20 v10 M127 25 h10 M22 36 v8 M18 40 h8', O, 2)],
    planning: ['#DFE7EE', c(70, 52, 32, 0, '#fff') + c(70, 52, 32) + s('M70 32 V52 L84 60') + s('M70 22 v4 M100 52 h-4 M70 82 v-4 M40 52 h4', V, 2) + s('M112 34 a28 28 0 0 1 10 22 M118 60 l4-5 5 4', O) + s('M28 70 a28 28 0 0 1-4-18 M22 48 l2 5-5 2', O)],
    revenus: ['#DDE8DF', r(46, 28, 60, 44, 10, 0, '#F1EAD9') + s('M46 38 a10 10 0 0 1 10-10 H96 l20 22 -20 22 H56 a10 10 0 0 1-10-10 Z') + c(100, 50, 4) + s('M78 40 a10 10 0 1 0 0 20 M64 47 h12 M64 53 h12', V, 2) + s('M124 26 v12 M118 32 h12 M30 64 v10 M25 69 h10', O, 2)],
    qualite: ['#F7E3D3', r(38, 16, 56, 76, 7, 0, '#fff') + r(38, 16, 56, 76, 7) + s('M48 34 l3 3 6-6 M62 34 H84 M48 52 l3 3 6-6 M62 52 H84 M48 70 l3 3 6-6 M62 70 H80', V, 2) + s('M122 30 l5 11 12 1 -9 8 3 12 -11-6 -11 6 3-12 -9-8 12-1 Z', O)],
    reglementation: ['#DDE8DF', r(30, 36, 64, 52, 4, 0, '#fff') + s('M24 40 L62 16 L100 40 Z') + s('M30 88 H94 M40 48 V80 M56 48 V80 M72 48 V80 M86 48 V80') + c(122, 58, 16, 0, '#F1EAD9') + c(122, 58, 16, O) + s('M114 58 l6 6 10-11', O, 2.4)],
    calendriers: ['#DFE7EE', r(22, 26, 52, 50, 7, 0, '#F7E3D3') + r(22, 26, 52, 50, 7) + s('M22 40 H74 M36 20 V30 M60 20 V30') + r(92, 30, 52, 50, 7, 0, '#fff') + r(92, 30, 52, 50, 7) + s('M92 44 H144 M106 24 V34 M130 24 V34') + s('M76 50 H90 M86 46 l4 4 -4 4 M90 60 H76 M80 56 l-4 4 4 4', O, 2)],
    maison: ['#F1EAD9', r(44, 44, 56, 44, 3, 0, '#fff') + s('M34 50 L72 18 L110 50 M44 42 V88 H100 V42') + s('M64 88 V68 H80 V88') + s('M72 52 c-3-5-10-3-8 3 c1 3 8 7 8 7 s7-4 8-7 c2-6-5-8-8-3 Z', '#C75A72', 2) + c(128, 60, 6, O) + s('M132 64 L146 78 M141 73 l4-4', O) + s('M20 30 v10 M15 35 h10 M130 22 v8 M126 26 h8', O, 2)],
    christine: ['#F7E3D3', c(80, 50, 30, 0, '#fff') + c(80, 50, 30) + s('M72 42 a8 8 0 1 1 16 0 v2 M66 70 c2-10 26-10 28 0', V) + c(122, 30, 10, O) + s('M129 37 l10 10', O) + s('M34 62 c-3-5-10-3-8 3 c1 3 8 7 8 7 s7-4 8-7 c2-6-5-8-8-3 Z', '#C75A72', 2)],
    adama: ['#DDE8DF', r(52, 20, 56, 70, 7, 0, '#fff') + r(52, 20, 56, 70, 7) + r(68, 14, 24, 12, 4) + s('M62 40 l3 3 6-6 M76 40 H98 M62 56 l3 3 6-6 M76 56 H98 M62 72 l3 3 6-6 M76 72 H94', V, 2) + c(130, 62, 12, O) + s('M130 54 V62 L136 66', O, 2)],
    armand: ['#DFE7EE', r(40, 24, 80, 54, 7, 0, '#fff') + r(40, 24, 80, 54, 7) + s('M68 86 H92 M80 78 V86') + s('M50 66 L64 54 L76 60 L96 40 M88 40 H96 V48', O) + s('M132 30 l8 8 -8 8 M24 58 l-8 8 8 8', V, 2)],
    grace: ['#F1EAD9', s('M34 30 H98 a8 8 0 0 1 8 8 V62 a8 8 0 0 1-8 8 H62 L48 82 V70 H34 a8 8 0 0 1-8-8 V38 a8 8 0 0 1 8-8 Z') + s('M42 44 H90 M42 56 H78', V, 2) + s('M118 44 l18-10 V78 l-18-10 Z M118 48 v16', O) + s('M144 50 h8 M143 40 l6-4 M143 62 l6 4', O, 2)],
  };
  document.head.insertAdjacentHTML('beforeend', `<style>
[data-ill]{display:flex;align-items:center;justify-content:center;background:var(--ib)}
[data-ill] svg{width:78%;max-width:260px;height:auto;overflow:visible}
[data-ill] [stroke]{stroke-dasharray:420;stroke-dashoffset:420;transition:stroke-dashoffset 1.6s cubic-bezier(.4,.1,.2,1)}
[data-ill] .fl{opacity:0;transition:opacity .6s .8s}
[data-ill].dw [stroke]{stroke-dashoffset:0}[data-ill].dw .fl{opacity:1}
.post:hover [data-ill] svg{transform:translateY(-3px) rotate(-1deg)}[data-ill] svg{transition:transform .35s cubic-bezier(.2,.8,.2,1)}
@media (prefers-reduced-motion:reduce){[data-ill] [stroke]{stroke-dashoffset:0}[data-ill] .fl{opacity:1}}
</style>`);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dw'); io.unobserve(e.target); } }), { threshold: .35 });
  document.querySelectorAll('[data-ill]').forEach(el => {
    const d = I[el.dataset.ill]; if (!d) return;
    el.style.setProperty('--ib', d[0]);
    el.innerHTML = `<svg viewBox="0 0 160 100" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d[1]}</svg>`;
    io.observe(el);
  });
})();
