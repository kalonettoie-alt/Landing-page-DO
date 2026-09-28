(function () {
  // simulateur
  const host = document.getElementById('simu');
  if (host) host.innerHTML = `<div class="simu" id="simu-form">
    <div class="simu-hd"><span class="tag"><span class="dot"></span>Prix fixe, sans surprise</span><span class="mu">Estimation instantanée</span></div>
    <div class="sg"><div class="sl">Taille du logement</div><div class="seg4">${['Studio','T2','T3','T4+'].map(t => `<button type="button" data-t="${t}">${t}</button>`).join('')}</div></div>
    <div class="sg two">
      <div><div class="sl">Lits doubles</div><div class="stp"><button type="button" data-inc="d" data-v="-1" aria-label="Moins">−</button><b id="sd"></b><button type="button" data-inc="d" data-v="1" aria-label="Plus">+</button></div></div>
      <div><div class="sl">Lits simples</div><div class="stp"><button type="button" data-inc="s" data-v="-1" aria-label="Moins">−</button><b id="ss"></b><button type="button" data-inc="s" data-v="1" aria-label="Plus">+</button></div></div>
    </div>
    <div class="sg"><div class="sl">Linge</div><div class="seg3">
      <button type="button" data-l="deltom">Deltom fournit<em>tout compris</em></button>
      <button type="button" data-l="vous">Vos draps<em>lavés par nous</em></button>
      <button type="button" data-l="aucun">Sans linge<em>ménage seul</em></button></div></div>
    <button type="button" class="stog" id="sc" role="switch"><span class="sw"><i></i></span><span><b>Kit consommables</b><span>Papier toilette, savon, café, sacs poubelle</span></span></button>
    <div class="sg"><div class="sl">Séjours par mois <b class="num" id="sn"></b></div><input id="sr" type="range" min="1" max="25" value="8" /></div>
    <div class="sres">
      <div class="ln"><span>Ménage</span><b class="num" id="r-m"></b></div>
      <div class="ln" id="r-lrow"><span>Linge hôtelier</span><b class="num" id="r-l"></b></div>
      <div class="ln"><span>Consommables</span><b class="num" id="r-c"></b></div>
      <div class="tot"><span>Par intervention<em>TTC</em></span><b class="num" id="r-t"></b></div>
      <div class="mo">Soit environ <b class="num" id="r-mo"></b> par mois</div>
    </div>
    <a class="b bp simu-go" href="../site-actuel/connexion.html">Créer mon compte gratuitement <span class="ar">→</span></a>
  </div>`;
  const S = document.getElementById('simu-form');
  if (S) {
    const P = { Studio: 40, T2: 50, T3: 60, 'T4+': 70 };
    const eur = n => n.toFixed(2).replace('.', ',') + ' €';
    const st = { t: 'T2', d: 1, s: 0, linge: 'deltom', conso: true, nuits: 8 };
    const out = id => document.getElementById(id);
    const render = () => {
      S.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', b.dataset.t === st.t));
      S.querySelectorAll('[data-l]').forEach(b => b.classList.toggle('on', b.dataset.l === st.linge));
      out('sd').textContent = st.d; out('ss').textContent = st.s;
      const cons = S.querySelector('#sc'); cons.classList.toggle('on', st.conso); cons.setAttribute('aria-checked', st.conso);
      out('sn').textContent = st.nuits;
      const m = P[st.t];
      const dt = st.linge === 'deltom';
      const kits = st.linge === 'aucun' ? 0 : st.d * (dt ? 13.99 : 10.9) + st.s * (dt ? 9.99 : 7.9);
      const beds = st.d * 2 + st.s;
      const serv = st.linge === 'aucun' ? 0 : beds * (1 + 0.75) + 0.75;
      const co = st.conso ? 6.3 : 0;
      const tot = m + kits + serv + co;
      out('r-m').textContent = eur(m); out('r-l').textContent = eur(kits + serv); out('r-c').textContent = eur(co);
      out('r-t').textContent = eur(tot);
      out('r-mo').textContent = Math.round(tot * st.nuits).toLocaleString('fr-FR') + ' €';
      out('r-lrow').style.opacity = st.linge === 'aucun' ? .45 : 1;
    };
    S.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.t) st.t = b.dataset.t;
      if (b.dataset.l) st.linge = b.dataset.l;
      if (b.dataset.inc) { const k = b.dataset.inc; st[k] = Math.max(k === 'd' ? 0 : 0, Math.min(6, st[k] + +b.dataset.v)); if (st.d + st.s === 0) st.d = 1; }
      if (b.id === 'sc') st.conso = !st.conso;
      render();
    });
    out('sr').addEventListener('input', e => { st.nuits = +e.target.value; render(); });
    render();
  }
})();
