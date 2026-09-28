// anim.js — petites « vidéos » d'interface Deltom, en boucle, dans les emplacements [data-anim].
(function () {
  const css = `
.an{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:18px;background:linear-gradient(160deg,#F4F1EA,#E9EFE8);overflow:hidden;font-family:inherit;color:#172524}
.an.pk{background:linear-gradient(160deg,#FBEFE4,#F3E1D1)}.an.sk{background:linear-gradient(160deg,#EAF0F5,#DCE5EC)}.an.sd{background:linear-gradient(160deg,#F6F0E2,#EDE3CC)}
.an-c{width:100%;max-width:340px;background:#fff;border-radius:20px;box-shadow:0 1px 2px rgba(23,37,36,.05),0 18px 40px rgba(23,37,36,.12);padding:14px 16px;font-size:13px;line-height:1.35}
.an-h{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.an-h b{font-size:14px;letter-spacing:-.015em}.an-h .s{margin-left:auto;font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;white-space:nowrap}
.an-live{background:rgba(199,90,114,.12);color:#A4415A}.an-ok{background:#DDE8DF;color:#1A3A3A}
.an-pulse{width:7px;height:7px;border-radius:99px;background:#C75A72;display:inline-block;margin-right:5px;animation:an-p 1.4s infinite}
@keyframes an-p{0%{box-shadow:0 0 0 0 rgba(199,90,114,.5)}80%,100%{box-shadow:0 0 0 7px rgba(199,90,114,0)}}
.an-row{display:flex;align-items:center;gap:10px;padding:7px 0;transition:opacity .3s,color .3s}
.an-row+.an-row{border-top:1px solid #F1EEE7}
.an-d{width:16px;height:16px;border-radius:99px;flex-shrink:0;box-shadow:inset 0 0 0 1.5px #DAD5C9;display:flex;align-items:center;justify-content:center;transition:all .3s}
.an-row.done .an-d{background:#1A3A3A;box-shadow:none}.an-row.done .an-d::after{content:"";width:6px;height:3px;border:solid #fff;border-width:0 0 1.6px 1.6px;transform:rotate(-45deg) translate(1px,-1px)}
.an-row.cur .an-d{box-shadow:inset 0 0 0 2px #C75A72,0 0 0 4px rgba(199,90,114,.14)}
.an-row.fut{color:#A7A294}
.an-row time{margin-left:auto;font-size:11.5px;color:#6F7B78;font-variant-numeric:tabular-nums}
.an-bar{height:6px;border-radius:99px;background:#F1EEE7;overflow:hidden;margin:8px 0 10px}.an-bar i{display:block;height:100%;background:#1A3A3A;border-radius:99px;transition:width .6s cubic-bezier(.2,.8,.2,1)}
.an-ph{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}
.an-ph i{aspect-ratio:1;border-radius:9px;background:#F1EEE7;transform:scale(.6);opacity:0;transition:all .4s cubic-bezier(.2,.8,.2,1)}
.an-ph i.on{transform:none;opacity:1}
.an-ph i:nth-child(4n+1).on{background:linear-gradient(135deg,#E6E1D6,#D6DDD4)}.an-ph i:nth-child(4n+2).on{background:linear-gradient(135deg,#EFE3D6,#E1D2C1)}.an-ph i:nth-child(4n+3).on{background:linear-gradient(135deg,#DCE5E8,#CCD8DD)}.an-ph i:nth-child(4n+4).on{background:linear-gradient(135deg,#E8E4D6,#D9D3BE)}
.an-toast{position:absolute;left:50%;bottom:16px;transform:translate(-50%,20px);opacity:0;background:#172524;color:#fff;border-radius:99px;padding:8px 14px;font-size:12.5px;font-weight:650;white-space:nowrap;transition:all .4s cubic-bezier(.2,.8,.2,1);box-shadow:0 10px 24px rgba(0,0,0,.2)}
.an-toast.on{transform:translate(-50%,0);opacity:1}
.an-cal{display:grid;grid-template-columns:62px repeat(7,1fr);gap:4px;align-items:center;font-size:11px}
.an-cal .lb{font-weight:700;color:#56625F}.an-cal .dy{text-align:center;color:#6F7B78;font-weight:600}
.an-cal .cell{height:22px;border-radius:6px;background:#F7F5F0;position:relative}
.an-bk{position:absolute;inset:3px 0;border-radius:5px;transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.an-bk.on{transform:none}.an-bk.ab{background:#F4B8B0}.an-bk.bk{background:#AFC4E6}
.an-mn{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border-radius:99px;background:#1A3A3A;transform:scale(0);transition:transform .35s cubic-bezier(.2,.8,.2,1)}.an-mn.on{transform:scale(1)}
.an-leg{display:flex;gap:12px;margin-top:10px;font-size:11.5px;color:#56625F}.an-leg span::before{content:"";display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:5px;vertical-align:-1px;background:var(--c)}
.an-chk .an-row span{transition:color .3s}.an-chk .an-row.done span{color:#6F7B78;text-decoration:line-through}
.an-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .15s}.an-flash.on{opacity:.8}
.an-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.an-steps div{border-radius:12px;padding:12px 6px;text-align:center;background:#F7F5F0;font-weight:650;font-size:12.5px;transition:all .35s;color:#6F7B78}
.an-steps div b{display:block;font-size:10.5px;letter-spacing:.08em;color:#B8B2A3;margin-bottom:3px}
.an-steps div.on{background:#1A3A3A;color:#fff;transform:translateY(-3px)}.an-steps div.on b{color:#D8CB92}.an-steps div.ok{background:#DDE8DF;color:#1A3A3A}
.an-kit{margin-top:12px;display:flex;flex-direction:column;gap:6px}
.an-kit div{display:flex;justify-content:space-between;padding:8px 10px;border-radius:10px;background:#F7F5F0;font-size:12.5px}.an-kit b{font-variant-numeric:tabular-nums}
.an-stars{color:#E6DFC9;font-size:18px;letter-spacing:2px}.an-stars i{font-style:normal;transition:color .25s}.an-stars i.on{color:#8B7D3C}
.an-ba{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}
.an-ba div{aspect-ratio:4/3;border-radius:10px;position:relative;overflow:hidden;background:linear-gradient(135deg,#D9D2C3,#C8BFAE)}
.an-ba div:last-child{background:linear-gradient(135deg,#EEF2EC,#DCE6DB)}
.an-ba span{position:absolute;left:6px;top:6px;font-size:10px;font-weight:800;background:rgba(255,255,255,.9);border-radius:6px;padding:2px 6px}
.an-ba div:last-child::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);transform:translateX(-100%);animation:an-sh 2.4s infinite}
@keyframes an-sh{to{transform:translateX(100%)}}
.an-strm{width:100%;max-width:320px;height:100%;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(transparent,#000 18%,#000 82%,transparent)}
.an-strm .tr{display:flex;flex-direction:column;gap:8px;animation:an-up 16s linear infinite}
@keyframes an-up{to{transform:translateY(-50%)}}
.an-nt{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.9);border-radius:16px;padding:10px 12px;box-shadow:0 6px 16px rgba(23,37,36,.08);font-size:12.5px}
.an-nt .i{width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0}
.an-nt b{display:block;font-size:13px}.an-nt span{color:#6A7472}.an-nt em{margin-left:auto;font-style:normal;font-weight:800;color:#1A3A3A;white-space:nowrap}
.an-st{font-size:10.5px;font-weight:700;padding:3px 8px;border-radius:99px;white-space:nowrap;transition:all .3s}
.an-st.a{background:#F1EEE7;color:#6A7472}.an-st.l{background:rgba(199,90,114,.12);color:#A4415A}.an-st.t{background:#DDE8DF;color:#1A3A3A}
.an-kp{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}
.an-kp div{border-radius:12px;background:#F7F5F0;padding:9px 10px}.an-kp b{display:block;font-size:19px;font-weight:800;letter-spacing:-.04em;font-variant-numeric:tabular-nums}.an-kp span{font-size:10.5px;color:#6A7472}
.an-rm{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.an-rm div{border-radius:10px;padding:10px 0;text-align:center;font-size:12px;font-weight:700;background:#F7F5F0;color:#6F7B78;transition:all .35s}
.an-rm div.l{background:rgba(199,90,114,.12);color:#A4415A}.an-rm div.t{background:#1A3A3A;color:#fff}
.an-ch{display:flex;align-items:flex-end;gap:8px;height:110px;margin:8px 0 6px;padding-top:10px}
.an-ch div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:2px;height:100%}
.an-ch i{display:block;border-radius:6px 6px 2px 2px;transition:height .7s cubic-bezier(.2,.8,.2,1);height:0}
.an-ch i.c{background:#1A3A3A}.an-ch i.u{background:#D8CB92}
.an-ch span{font-size:10px;color:#6F7B78;text-align:center;margin-top:4px}
.an-op{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#F7F5F0;transition:all .4s cubic-bezier(.2,.8,.2,1)}
.an-op .av{width:34px;height:34px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0;transition:all .4s}
.an-op>div{min-width:0}.an-op b{display:block;font-size:13.5px}.an-op small{display:block;font-size:11.5px;color:#6A7472;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.an-op .an-st{margin-left:auto}
.an-op.out{opacity:.45;transform:scale(.97)}.an-op.out b{text-decoration:line-through}
.an-op.in{box-shadow:inset 0 0 0 1.5px #1A3A3A;background:#fff}
.an-sub{height:0;overflow:hidden;opacity:0;transition:height .45s cubic-bezier(.2,.8,.2,1),opacity .35s,margin .45s}.an-sub.on{height:58px;opacity:1;margin-top:8px}
.an-in{height:38px;border-radius:11px;box-shadow:inset 0 0 0 1.5px #E4DFD4;display:flex;align-items:center;padding:0 12px;font-size:13px;background:#fff}.an-in .ph{color:#A7A294}.an-in .cu{width:1.5px;height:16px;background:#1A3A3A;margin-left:1px;animation:an-bl 1s steps(1) infinite}@keyframes an-bl{50%{opacity:0}}
.an-btn{margin:8px 0 6px;height:38px;border-radius:99px;background:#1A3A3A;color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;transition:transform .15s,background .15s}.an-btn.pr{transform:scale(.95);background:#24504E}
.an-f{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #F1EEE7;font-size:12.5px}.an-f>span{color:#6F7B78;width:74px;flex-shrink:0}.an-f b{font-weight:650;opacity:0;transform:translateX(-6px);transition:all .35s}.an-f b.on{opacity:1;transform:none}
.an-seg{display:flex;gap:4px}.an-seg i{font-style:normal;font-weight:700;font-size:11.5px;padding:4px 10px;border-radius:99px;background:#F7F5F0;color:#6F7B78;transition:all .3s}.an-seg i.on{background:#1A3A3A;color:#fff}
.an-pr{display:flex;justify-content:space-between;align-items:baseline;margin-top:6px;padding:10px 12px;border-radius:12px;background:#F3EAD2}.an-pr span{font-size:12px;font-weight:650;color:#6A5F2C}.an-pr b{font-size:22px;font-weight:800;letter-spacing:-.04em;color:#1A3A3A;font-variant-numeric:tabular-nums;transition:transform .25s}.an-pr b.bump{transform:scale(1.15)}
.an-lk{font-size:12px;color:#3B5A7A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.an-rs{display:flex;flex-direction:column;gap:6px;margin-top:4px}
.an-rs>div{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:#F7F5F0;font-size:12px;opacity:0;transform:translateY(8px);transition:all .4s cubic-bezier(.2,.8,.2,1)}.an-rs>div.on{opacity:1;transform:none}
.an-rs .dt{width:34px;text-align:center;line-height:1.1;flex-shrink:0}.an-rs .dt b{display:block;font-size:15px;font-weight:800}.an-rs .dt small{font-size:9.5px;color:#6F7B78;text-transform:uppercase;font-weight:700}
.an-rs .an-st{margin-left:auto}
.an-cv{display:flex;flex-direction:column;justify-content:flex-end;gap:7px;height:196px;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 22px);mask-image:linear-gradient(transparent,#000 22px)}.an-cv>*{flex-shrink:0}
.an-m{max-width:84%;padding:8px 11px;border-radius:14px;font-size:12.5px;opacity:0;transform:translateY(8px) scale(.97);transition:all .35s cubic-bezier(.2,.8,.2,1)}.an-m.on{opacity:1;transform:none}
.an-m.sy{align-self:center;max-width:100%;background:transparent;color:#6F7B78;font-size:11.5px;font-weight:650;padding:2px 0}
.an-m.me{align-self:flex-end;background:#1A3A3A;color:#fff;border-bottom-right-radius:5px}
.an-m.th{align-self:flex-start;background:#F1EEE7;border-bottom-left-radius:5px}.an-m.th small{display:block;font-size:10.5px;font-weight:700;color:#8B7D3C;margin-bottom:2px}
.an-m.pic{padding:5px;display:grid;grid-template-columns:1fr 1fr;gap:4px;width:120px}.an-m.pic i{aspect-ratio:1;border-radius:9px;background:linear-gradient(135deg,#DCE5E8,#CCD8DD)}.an-m.pic i+i{background:linear-gradient(135deg,#EEF2EC,#DCE6DB)}
.an-typ{align-self:flex-start;display:flex;gap:3px;padding:9px 11px;border-radius:14px;background:#F1EEE7;opacity:0;transition:opacity .2s}.an-typ.on{opacity:1}.an-typ i{width:5px;height:5px;border-radius:99px;background:#A7A294;animation:an-ty 1s infinite}.an-typ i:nth-child(2){animation-delay:.15s}.an-typ i:nth-child(3){animation-delay:.3s}@keyframes an-ty{0%,60%,100%{transform:none}30%{transform:translateY(-3px)}}
.an-doc .an-ph{grid-template-columns:repeat(6,1fr);margin:0 0 8px}
.an-ln{display:flex;align-items:center;gap:8px;padding:7px 0;border-top:1px solid #F1EEE7;font-size:12.5px;opacity:0;transform:translateX(-6px);transition:all .35s}.an-ln.on{opacity:1;transform:none}
.an-ln .tg{font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:99px;flex-shrink:0}.an-ln span:last-child{margin-left:auto;color:#6A7472;font-size:11.5px;white-space:nowrap}
.an-meta{display:flex;justify-content:space-between;font-size:12px;color:#6A7472;margin:-4px 0 10px}
@media (prefers-reduced-motion:reduce){.an *{animation:none!important;transition:none!important}}`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  const LOOP = [];
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const R = {
    live(el) {
      const st = [['Opérateur en route', '10:34'], ['Arrivée sur place', '11:02'], ['Ménage en cours', '11:08'], ['Intervention terminée', '12:46']];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Loft République</b><span class="s an-live"><span class="an-pulse"></span>En cours</span></div><div class="an-bar"><i style="width:0"></i></div>${st.map(([t, h]) => `<div class="an-row fut"><span class="an-d"></span><span>${t}</span><time>${h}</time></div>`).join('')}<div class="an-ph">${'<i></i>'.repeat(4)}</div></div><div class="an-toast">Rapport envoyé à l’hôte ✓</div>`;
      const rows = el.querySelectorAll('.an-row'), ph = el.querySelectorAll('.an-ph i'), bar = el.querySelector('.an-bar i'), tst = el.querySelector('.an-toast'), bd = el.querySelector('.s');
      return async () => {
        rows.forEach(r => r.className = 'an-row fut'); ph.forEach(p => p.classList.remove('on')); bar.style.width = '0'; tst.classList.remove('on'); bd.className = 's an-live'; bd.innerHTML = '<span class="an-pulse"></span>En cours';
        for (let k = 0; k < rows.length; k++) {
          rows.forEach((r, j) => r.className = 'an-row ' + (j < k ? 'done' : j === k ? 'cur' : 'fut'));
          bar.style.width = (k / (rows.length - 1) * 100) + '%';
          if (k === 2) for (let p = 0; p < ph.length; p++) { ph[p].classList.add('on'); await wait(260); }
          await wait(1100);
        }
        rows.forEach(r => r.className = 'an-row done'); bd.className = 's an-ok'; bd.textContent = 'Terminé'; tst.classList.add('on'); await wait(2400);
      };
    },
    swap(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>T2 Bastille · 11:00</b><span class="s an-ok">Planifié</span></div><div class="an-meta"><span>Ménage complet + linge</span><span>50 €</span></div><div class="an-op o1"><span class="av" style="background:#DDE8DF;color:#1A3A3A">K</span><div><b>Karim</b><small>Formé Deltom</small></div><span class="an-st t">Confirmé</span></div><div class="an-sub"><div class="an-op o2"><span class="av" style="background:#FBEFE4;color:#A0562F">S</span><div><b>Sofia</b><small>Formée Deltom · 1,2 km</small></div><span class="an-st t">Confirmée</span></div></div></div><div class="an-toast">Remplacement trouvé · rien à faire de votre côté</div>`;
      const o1 = el.querySelector('.o1'), st1 = o1.querySelector('.an-st'), sub = el.querySelector('.an-sub'), o2 = el.querySelector('.o2'), s = el.querySelector('.s'), tst = el.querySelector('.an-toast');
      return async () => {
        o1.className = 'an-op o1'; st1.className = 'an-st t'; st1.textContent = 'Confirmé'; sub.classList.remove('on'); o2.classList.remove('in'); s.className = 's an-ok'; s.textContent = 'Planifié'; tst.classList.remove('on');
        await wait(1600);
        st1.className = 'an-st l'; st1.textContent = 'Absent'; s.className = 's an-live'; s.innerHTML = '<span class="an-pulse"></span>Réaffectation'; await wait(1300);
        o1.classList.add('out'); sub.classList.add('on'); await wait(900);
        o2.classList.add('in'); s.className = 's an-ok'; s.textContent = 'Planifié'; await wait(500);
        tst.classList.add('on'); await wait(2800);
      };
    },
    cal(el) {
      const dy = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      const ab = [0, 1, 4, 5], bk = [2, 3, 6];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Calendriers</b><span class="s an-ok">Synchronisé</span></div><div class="an-cal"><span></span>${dy.map(d => `<span class="dy">${d}</span>`).join('')}<span class="lb">Airbnb</span>${dy.map((_, i) => `<span class="cell">${ab.includes(i) ? '<i class="an-bk ab"></i>' : ''}</span>`).join('')}<span class="lb">Booking</span>${dy.map((_, i) => `<span class="cell">${bk.includes(i) ? '<i class="an-bk bk"></i>' : ''}</span>`).join('')}<span class="lb">Ménages</span>${dy.map((_, i) => `<span class="cell">${[1, 3, 5, 6].includes(i) ? '<i class="an-mn"></i>' : ''}</span>`).join('')}</div><div class="an-leg"><span style="--c:#F4B8B0">Airbnb</span><span style="--c:#AFC4E6">Booking</span><span style="--c:#1A3A3A">Ménage</span></div></div><div class="an-toast">4 ménages programmés automatiquement</div>`;
      const bks = el.querySelectorAll('.an-bk'), mns = el.querySelectorAll('.an-mn'), tst = el.querySelector('.an-toast'), s = el.querySelector('.s');
      return async () => {
        bks.forEach(b => b.classList.remove('on')); mns.forEach(m => m.classList.remove('on')); tst.classList.remove('on'); s.textContent = 'Synchronisation…'; s.className = 's an-live';
        await wait(500); for (const b of bks) { b.classList.add('on'); await wait(260); }
        s.textContent = 'Synchronisé'; s.className = 's an-ok'; await wait(400);
        for (const m of mns) { m.classList.add('on'); await wait(320); }
        tst.classList.add('on'); await wait(2600);
      };
    },
    check(el) {
      const it = ['Détartrer la douche', 'Nettoyer lavabo et miroir', 'Désinfecter les WC', 'Poser le linge propre', 'Réassortir les consommables', 'Photo après ménage'];
      el.innerHTML = `<div class="an-c an-chk"><div class="an-h"><b>Salle de bain</b><span class="s an-ok"><span class="n">0</span>/6</span></div>${it.map(t => `<div class="an-row"><span class="an-d"></span><span>${t}</span></div>`).join('')}</div><div class="an-flash"></div>`;
      const rows = el.querySelectorAll('.an-row'), n = el.querySelector('.n'), fl = el.querySelector('.an-flash');
      return async () => {
        rows.forEach(r => r.className = 'an-row'); n.textContent = 0; await wait(500);
        for (let k = 0; k < rows.length; k++) { rows[k].className = 'an-row done'; n.textContent = k + 1; if (k === rows.length - 1) { fl.classList.add('on'); await wait(140); fl.classList.remove('on'); } await wait(650); }
        await wait(2000);
      };
    },
    linge(el) {
      const st = ['Lavé', 'Séché', 'Repassé', 'Plié'];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Kit linge · Loft République</b><span class="s an-live">Blanchisserie</span></div><div class="an-steps">${st.map((t, i) => `<div><b>0${i + 1}</b>${t}</div>`).join('')}</div><div class="an-kit"><div><span>Parures lit double</span><b>× 2</b></div><div><span>Grandes serviettes</span><b>× 4</b></div><div><span>Tapis de bain</span><b>× 1</b></div></div></div><div class="an-toast">Kit prêt · livré au prochain passage</div>`;
      const ds = el.querySelectorAll('.an-steps div'), tst = el.querySelector('.an-toast'), s = el.querySelector('.s');
      return async () => {
        ds.forEach(d => d.className = ''); tst.classList.remove('on'); s.className = 's an-live'; s.textContent = 'Blanchisserie';
        for (let k = 0; k < ds.length; k++) { ds.forEach((d, j) => d.className = j < k ? 'ok' : j === k ? 'on' : ''); await wait(1000); }
        ds.forEach(d => d.className = 'ok'); s.className = 's an-ok'; s.textContent = 'Prêt'; tst.classList.add('on'); await wait(2400);
      };
    },
    report(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Rapport d’intervention</b><span class="s an-ok">Terminé</span></div><div class="an-ba"><div><span>AVANT</span></div><div><span>APRÈS</span></div></div><div class="an-row done"><span class="an-d"></span><span>Checklist</span><time>24/24</time></div><div class="an-row done"><span class="an-d"></span><span>Linge et consommables</span><time>posés</time></div><div class="an-row" style="border-top:1px solid #F1EEE7"><span style="font-size:12px;color:#6A7472">Avis voyageur</span><span class="an-stars" style="margin-left:auto">${'<i>★</i>'.repeat(5)}</span></div></div>`;
      const stars = el.querySelectorAll('.an-stars i');
      return async () => { stars.forEach(x => x.classList.remove('on')); await wait(900); for (const x of stars) { x.classList.add('on'); await wait(220); } await wait(2600); };
    },
    stream(el) {
      const N = [['✓', '#DDE8DF', '#1A3A3A', 'Ménage terminé', 'Studio Voltaire', ''], ['€', '#F3EAD2', '#8B7D3C', 'Arrivée anticipée vendue', 'Loft République', '+25 €'], ['◉', '#EAF0F5', '#3B5A7A', 'Photos contrôlées', '12 photos · Léa', ''], ['★', '#FBEFE4', '#A0562F', 'Avis voyageur', '« Impeccable »', '5/5'], ['↻', '#DDE8DF', '#1A3A3A', 'Ménage programmé', 'Demain 11:00', ''], ['✓', '#DDE8DF', '#1A3A3A', 'Linge livré', '2 parures, 4 serviettes', ''], ['€', '#F3EAD2', '#8B7D3C', 'Départ tardif vendu', 'Studio Marais', '+25 €']];
      const one = N.map(([i, bg, c, t, s, e]) => `<div class="an-nt"><span class="i" style="background:${bg};color:${c}">${i}</span><div><b>${t}</b><span>${s}</span></div>${e ? `<em>${e}</em>` : ''}</div>`).join('');
      el.innerHTML = `<div class="an-strm"><div class="tr">${one}${one}</div></div>`;
      return null;
    },
    parc(el) {
      const L = ['Loft République', 'Studio Voltaire', 'T2 Bastille', 'Studio Marais', 'T3 Boulogne'];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Mes logements</b><span class="s an-ok">5 actifs</span></div>${L.map(l => `<div class="an-row"><span>${l}</span><span class="an-st a" style="margin-left:auto">À venir</span></div>`).join('')}</div>`;
      const sts = el.querySelectorAll('.an-st'), lab = { a: 'À venir', l: 'En cours', t: 'Terminé' };
      const set = (e, k) => { e.className = 'an-st ' + k; e.textContent = lab[k]; };
      return async () => { sts.forEach(e => set(e, 'a')); await wait(600); for (let k = 0; k < sts.length; k++) { set(sts[k], 'l'); await wait(500); if (k > 0) set(sts[k - 1], 't'); } set(sts[sts.length - 1], 't'); await wait(2400); };
    },
    brief(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Le brief du jour</b><span class="s an-live"><span class="an-pulse"></span>En direct</span></div><div class="an-kp"><div><b data-to="18">0</b><span>ménages</span></div><div><b data-to="7">0</b><span>terminés</span></div><div><b data-to="3">0</b><span>en cours</span></div></div><div class="an-bar"><i style="width:0"></i></div><div class="an-row done"><span class="an-d"></span><span>T2 Bastille</span><time>10:42</time></div><div class="an-row fut"><span class="an-d"></span><span>Studio Voltaire</span><time>11:30</time></div></div>`;
      const ks = el.querySelectorAll('[data-to]'), bar = el.querySelector('.an-bar i');
      return async () => { ks.forEach(k => k.textContent = 0); bar.style.width = '0'; await wait(300); for (let s = 1; s <= 20; s++) { ks.forEach(k => k.textContent = Math.round(k.dataset.to * s / 20)); await wait(40); } bar.style.width = '39%'; await wait(3200); };
    },
    rooms(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Étage 2 · chambres</b><span class="s an-ok"><span class="n">0</span>/12 prêtes</span></div><div class="an-rm">${Array.from({ length: 12 }, (_, i) => `<div>2${String(i + 1).padStart(2, '0')}</div>`).join('')}</div></div>`;
      const cs = el.querySelectorAll('.an-rm div'), n = el.querySelector('.n');
      return async () => { cs.forEach(c => c.className = ''); n.textContent = 0; await wait(400); for (let k = 0; k < cs.length; k++) { cs[k].className = 'l'; await wait(220); if (k > 0) cs[k - 1].className = 't'; n.textContent = k; } cs[cs.length - 1].className = 't'; n.textContent = 12; await wait(2400); };
    },
    invest(el) {
      const m = [['Avr', 58, 12], ['Mai', 64, 18], ['Juin', 70, 26], ['Juil', 76, 34], ['Août', 80, 40]];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Coût et revenus d’options</b><span class="s an-ok">T2 · Boulogne</span></div><div class="an-ch">${m.map(([l]) => `<div><i class="u"></i><i class="c"></i><span>${l}</span></div>`).join('')}</div><div class="an-leg"><span style="--c:#1A3A3A">Ménages</span><span style="--c:#D8CB92">Options vendues</span></div></div>`;
      const cols = el.querySelectorAll('.an-ch div');
      return async () => { cols.forEach(c => c.querySelectorAll('i').forEach(i => i.style.height = '0')); await wait(400); cols.forEach((c, k) => { const [, a, b] = m[k]; c.querySelector('.c').style.height = a + '%'; c.querySelector('.u').style.height = b * .6 + '%'; }); await wait(3600); };
    },
    signup(el) {
      const st = [['Compte créé', '0:20'], ['Logement ajouté', '2:10'], ['Calendriers connectés', '3:05'], ['Premier ménage programmé', '3:48']], mail = 'claire@exemple.fr';
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Créer mon compte</b><span class="s an-ok">Gratuit</span></div><div class="an-in"><span class="t"></span><i class="cu"></i></div><div class="an-btn">Commencer →</div><div class="an-bar"><i style="width:0"></i></div>${st.map(([t, h]) => `<div class="an-row fut"><span class="an-d"></span><span>${t}</span><time>${h}</time></div>`).join('')}</div><div class="an-toast">Prêt en 3 min 48 · Deltom prend le relais</div>`;
      const tx = el.querySelector('.t'), btn = el.querySelector('.an-btn'), rows = el.querySelectorAll('.an-row'), bar = el.querySelector('.an-bar i'), tst = el.querySelector('.an-toast');
      return async () => {
        tx.className = 't ph'; tx.textContent = 'votre@email.fr'; rows.forEach(r => r.className = 'an-row fut'); bar.style.width = '0'; tst.classList.remove('on'); await wait(700);
        tx.className = 't'; for (let i = 1; i <= mail.length; i++) { tx.textContent = mail.slice(0, i); await wait(60); }
        await wait(300); btn.classList.add('pr'); await wait(180); btn.classList.remove('pr'); await wait(300);
        for (let k = 0; k <= rows.length; k++) { rows.forEach((r, j) => r.className = 'an-row ' + (j < k ? 'done' : j === k ? 'cur' : 'fut')); bar.style.width = (k / rows.length * 100) + '%'; await wait(900); }
        tst.classList.add('on'); await wait(2600);
      };
    },
    ical(el) {
      const url = 'airbnb.fr/calendar/ical/48213.ics', R2 = [['14', 'mars', 'Départ 10:00 → arrivée 16:00'], ['17', 'mars', 'Départ 11:00 → arrivée 15:00'], ['21', 'mars', 'Départ 10:00 · pas d’arrivée']];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Connecter un calendrier</b><span class="s an-ok">Airbnb</span></div><div class="an-in"><span class="t an-lk"></span><i class="cu"></i></div><div class="an-btn">Synchroniser</div><div class="an-rs">${R2.map(([d, m, t]) => `<div><span class="dt"><b>${d}</b><small>${m}</small></span><span>${t}</span><span class="an-st a">Lu</span></div>`).join('')}</div></div><div class="an-toast">3 ménages ajoutés au planning</div>`;
      const tx = el.querySelector('.t'), btn = el.querySelector('.an-btn'), rs = el.querySelectorAll('.an-rs>div'), tst = el.querySelector('.an-toast');
      return async () => {
        tx.className = 't an-lk ph'; tx.textContent = 'Collez le lien iCal de votre annonce'; btn.textContent = 'Synchroniser'; rs.forEach(r => { r.classList.remove('on'); const s = r.querySelector('.an-st'); s.className = 'an-st a'; s.textContent = 'Lu'; }); tst.classList.remove('on'); await wait(900);
        tx.className = 't an-lk'; tx.textContent = 'https://' + url; await wait(700);
        btn.classList.add('pr'); btn.textContent = 'Lecture…'; await wait(200); btn.classList.remove('pr'); await wait(500);
        for (const r of rs) { r.classList.add('on'); await wait(450); }
        btn.textContent = 'Synchronisé ✓';
        for (const r of rs) { const s = r.querySelector('.an-st'); s.className = 'an-st t'; s.textContent = 'Ménage programmé'; await wait(380); }
        tst.classList.add('on'); await wait(2600);
      };
    },
    suivi(el) {
      const M = [['sy', 'Karim est en route · 10:34'], ['sy', 'Arrivé sur place · 11:02'], ['me', 'Pouvez-vous vérifier la machine à café ?'], ['typ'], ['th', '<small>Léa · supervision</small>C’est noté, Karim s’en occupe.'], ['pic'], ['th', '<small>Léa · supervision</small>Détartrée et testée ✓']];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Loft République · 11:00</b><span class="s an-live"><span class="an-pulse"></span>En direct</span></div><div class="an-cv">${M.map(([k, t]) => k === 'typ' ? '<div class="an-typ"><i></i><i></i><i></i></div>' : k === 'pic' ? '<div class="an-m pic"><i></i><i></i></div>' : `<div class="an-m ${k}">${t}</div>`).join('')}</div></div>`;
      const ms = el.querySelectorAll('.an-cv>div'), typ = el.querySelector('.an-typ');
      return async () => {
        ms.forEach(m => { m.classList.remove('on'); if (m !== typ) m.style.display = 'none'; }); typ.style.display = 'none'; await wait(500);
        for (const m of ms) {
          if (m === typ) { typ.style.display = ''; typ.classList.add('on'); await wait(1100); typ.classList.remove('on'); typ.style.display = 'none'; continue; }
          m.style.display = ''; await wait(20); m.classList.add('on'); await wait(1000);
        }
        await wait(2400);
      };
    },
    rapport(el) {
      const L = [['#DDE8DF', '#1A3A3A', 'Checklist', '24/24'], ['#F3EAD2', '#6A5F2C', 'Linge', '2 parures · 4 serviettes'], ['#FBEFE4', '#A0562F', 'Anomalie', 'Ampoule salon à changer'], ['#EAF0F5', '#3B5A7A', 'Objet oublié', 'Chargeur, rangé à l’entrée']];
      el.innerHTML = `<div class="an-c an-doc"><div class="an-h"><b>Rapport · 14 mars</b><span class="s an-live">Rédaction</span></div><div class="an-ph">${'<i></i>'.repeat(6)}</div>${L.map(([bg, c, t, v]) => `<div class="an-ln"><span class="tg" style="background:${bg};color:${c}">${t}</span><span>${v}</span></div>`).join('')}<div class="an-btn">Télécharger le PDF</div></div><div class="an-toast">Rapport envoyé par email</div>`;
      const ph = el.querySelectorAll('.an-ph i'), ls = el.querySelectorAll('.an-ln'), btn = el.querySelector('.an-btn'), s = el.querySelector('.s'), tst = el.querySelector('.an-toast');
      return async () => {
        ph.forEach(p => p.classList.remove('on')); ls.forEach(l => l.classList.remove('on')); s.className = 's an-live'; s.textContent = 'Rédaction'; tst.classList.remove('on'); await wait(400);
        for (const p of ph) { p.classList.add('on'); await wait(160); }
        for (const l of ls) { l.classList.add('on'); await wait(550); }
        s.className = 's an-ok'; s.textContent = 'Prêt'; await wait(600);
        btn.classList.add('pr'); await wait(180); btn.classList.remove('pr'); tst.classList.add('on'); await wait(2600);
      };
    },
    opmis(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Nouvelle mission</b><span class="s an-live"><span class="an-pulse"></span>Proposée</span></div><div class="an-f" style="border:0"><span>Logement</span><b class="on">T2 · Montreuil</b></div><div class="an-f"><span>Distance</span><b class="on">1,4 km de chez vous</b></div><div class="an-f"><span>Créneau</span><b class="on">Demain · 11:00 – 15:00</b></div><div class="an-pr"><span>Rémunération</span><b>34 €</b></div><div class="an-btn" style="margin-top:10px">Accepter la mission</div></div><div class="an-toast">Cagnotte de la semaine · <span class="cg">268</span> €</div>`;
      const btn = el.querySelector('.an-btn'), s = el.querySelector('.s'), tst = el.querySelector('.an-toast'), cg = el.querySelector('.cg');
      return async () => {
        btn.textContent = 'Accepter la mission'; btn.style.background = ''; s.className = 's an-live'; s.innerHTML = '<span class="an-pulse"></span>Proposée'; tst.classList.remove('on'); cg.textContent = 234; await wait(2000);
        btn.classList.add('pr'); await wait(180); btn.classList.remove('pr'); btn.textContent = 'Mission acceptée ✓'; btn.style.background = '#2F7A52'; s.className = 's an-ok'; s.textContent = 'Acceptée'; await wait(700);
        tst.classList.add('on'); for (let v = 234; v <= 268; v += 2) { cg.textContent = v; await wait(30); } await wait(2400);
      };
    },
    opjour(el) {
      const M = [['Studio · Vincennes', '09:30', 26], ['T3 · Montreuil', '11:30', 42], ['T2 · Bagnolet', '15:00', 34]];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Mes missions du jour</b><span class="s an-ok"><span class="n">0</span>/3</span></div><div class="an-bar"><i style="width:0"></i></div>${M.map(([t, h, p]) => `<div class="an-row fut"><span class="an-d"></span><span>${t}<br /><small style="color:#6F7B78;font-size:11.5px">${h}</small></span><time style="font-weight:800;color:#1A3A3A">${p} €</time></div>`).join('')}<div class="an-pr" style="margin-top:8px"><span>Gagné aujourd’hui</span><b class="tt">0 €</b></div></div>`;
      const rows = el.querySelectorAll('.an-row'), bar = el.querySelector('.an-bar i'), n = el.querySelector('.n'), tt = el.querySelector('.tt');
      return async () => {
        rows.forEach(r => r.className = 'an-row fut'); bar.style.width = '0'; n.textContent = 0; tt.textContent = '0 €'; await wait(600); let sum = 0;
        for (let k = 0; k < rows.length; k++) {
          rows.forEach((r, j) => r.className = 'an-row ' + (j < k ? 'done' : j === k ? 'cur' : 'fut')); await wait(1200);
          rows[k].className = 'an-row done'; sum += M[k][2]; n.textContent = k + 1; bar.style.width = ((k + 1) / rows.length * 100) + '%'; tt.textContent = sum + ' €'; tt.classList.add('bump'); await wait(250); tt.classList.remove('bump'); await wait(400);
        }
        await wait(2400);
      };
    },
    supchat(el) {
      const M = [['a', 'Superviseure Deltom', 'Rapport du T2 Montreuil relu : tout est conforme.'], ['a', 'Superviseure Deltom', 'Ampoule de la salle de bain grillée. Remplacée, 14:03.'], ['h', 'Vous', 'Merci&nbsp;!']];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Supervision</b><span class="s an-live"><span class="an-pulse"></span>En ligne</span></div><div class="sc-l" style="display:flex;flex-direction:column;gap:8px;min-height:190px"></div></div>`;
      const l = el.querySelector('.sc-l');
      return async () => {
        l.innerHTML = ''; await wait(500);
        for (const [w, n, x] of M) { const d = document.createElement('div'); d.style.cssText = `align-self:${w === 'h' ? 'flex-end' : 'flex-start'};max-width:86%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.4;background:${w === 'h' ? '#1A3A3A' : '#F3F1EC'};color:${w === 'h' ? '#fff' : '#172524'};opacity:0;transform:translateY(8px);transition:all .35s`; d.innerHTML = (w === 'h' ? '' : `<small style="display:block;font-size:11px;font-weight:700;color:#8B7D3C;margin-bottom:2px">${n}</small>`) + x; l.appendChild(d); await wait(30); d.style.opacity = 1; d.style.transform = 'none'; await wait(1500); }
        await wait(2400);
      };
    },
    upsell(el) {
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Réservation · T2 Bastille</b><span class="s an-ok">Confirmée</span></div><div class="an-f" style="border:0"><span>Arrivée</span><b class="on ar">16:00</b></div><div class="an-f"><span>Départ</span><b class="on" style="white-space:nowrap">Dim.&nbsp;11:00</b></div><div class="an-pr"><span>Options vendues</span><b class="tt">0 €</b></div></div><div class="an-toast">Arrivée anticipée vendue · <b>+25 €</b></div>`;
      const tst = el.querySelector('.an-toast'), ar = el.querySelector('.ar'), tt = el.querySelector('.tt');
      return async () => {
        tst.classList.remove('on'); ar.textContent = '16:00'; tt.textContent = '0 €'; await wait(1800);
        tst.classList.add('on'); await wait(700); ar.textContent = '13:00'; tt.textContent = '25 €'; tt.classList.add('bump'); await wait(250); tt.classList.remove('bump'); await wait(3000);
      };
    },
    prix(el) {
      const O = [['T2 · ménage', 50], ['Linge d’hôtel', 12], ['Consommables', 4]];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Coût par séjour</b><span class="s an-ok">Prix fixe</span></div>${O.map(([n, p]) => `<div class="an-f" style="display:flex;justify-content:space-between;gap:12px"><span style="white-space:nowrap">${n}</span><b class="on" style="opacity:.25;transition:opacity .3s">${p} €</b></div>`).join('')}<div class="an-pr"><span>Total TTC</span><b class="tt">0 €</b></div><div class="an-f" style="border:0;display:flex;justify-content:space-between;gap:12px"><span style="white-space:nowrap">100 séjours par an</span><b class="yr">0 €</b></div></div>`;
      const v = el.querySelectorAll('.an-f b.on'), tt = el.querySelector('.tt'), yr = el.querySelector('.yr');
      return async () => {
        v.forEach(b => b.style.opacity = .25); tt.textContent = '0 €'; yr.textContent = '0 €'; await wait(700); let s = 0;
        for (let i = 0; i < O.length; i++) { v[i].style.opacity = 1; s += O[i][1]; tt.textContent = s + ' €'; tt.classList.add('bump'); await wait(250); tt.classList.remove('bump'); await wait(700); }
        yr.textContent = (s * 100).toLocaleString('fr-FR') + ' €'; await wait(3000);
      };
    },
    fiche(el) {
      const sz = [['Studio', '1 lit double', 40], ['T2', '2 lits doubles', 50], ['T3', '2 lits doubles · 1 canapé', 60]];
      el.innerHTML = `<div class="an-c"><div class="an-h"><b>Nouveau logement</b><span class="s an-live">Brouillon</span></div><div class="an-f"><span>Adresse</span><b>12 rue Oberkampf</b></div><div class="an-f"><span>Accès</span><b>Boîte à clés · ••••</b></div><div class="an-f"><span>Checklist</span><b>Standard Deltom · 24 points</b></div><div class="an-f"><span>Taille</span><div class="an-seg">${sz.map(s => `<i>${s[0]}</i>`).join('')}</div></div><div class="an-f"><span>Couchages</span><b class="cp"></b></div><div class="an-pr"><span>Prix par ménage</span><b class="pv">—</b></div></div>`;
      const fs = [...el.querySelectorAll('.an-f b')].slice(0, 3), seg = el.querySelectorAll('.an-seg i'), cp = el.querySelector('.cp'), pv = el.querySelector('.pv'), s = el.querySelector('.s');
      return async () => {
        fs.forEach(f => f.classList.remove('on')); cp.classList.remove('on'); seg.forEach(i => i.classList.remove('on')); pv.textContent = '—'; s.className = 's an-live'; s.textContent = 'Brouillon'; await wait(500);
        for (const f of fs) { f.classList.add('on'); await wait(600); }
        for (let k = 0; k < sz.length; k++) { seg.forEach((i, j) => i.classList.toggle('on', j === k)); cp.textContent = sz[k][1]; cp.classList.add('on'); pv.textContent = sz[k][2] + ' €'; pv.classList.add('bump'); await wait(250); pv.classList.remove('bump'); await wait(1000); }
        seg.forEach((i, j) => i.classList.toggle('on', j === 1)); cp.textContent = sz[1][1]; pv.textContent = '50 €'; s.className = 's an-ok'; s.textContent = 'Enregistré'; await wait(2400);
      };
    },
  };
  document.querySelectorAll('[data-anim]').forEach(el => {
    const fn = R[el.dataset.anim]; if (!fn) return;
    const run = fn(el); if (!run) return;
    let on = false, busy = false;
    const loop = async () => { if (busy) return; busy = true; while (on) await run(); busy = false; };
    new IntersectionObserver(es => es.forEach(e => { on = e.isIntersecting; if (on) loop(); }), { threshold: .25 }).observe(el);
  });
})();
