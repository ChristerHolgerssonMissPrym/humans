(() => {
  const C = window.PRYM, E = C.events, K = C.contact;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const easeIO = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rich = s => s.replace(/<h>(.*?)<\/h>/g, '<span class="hl-human">$1</span>').replace(/<m>(.*?)<\/m>/g, '<span class="hl-machine">$1</span>');
  const plain = s => s.replace(/<\/?[hm]>/g, "");
  const tilt = [-2.2, 1.6, -1, 2.4, -1.8, 1.1, -2.6, 1.9, -.8, 2.1, -1.5, 1.4, -2, .9, 2.6, -1.2, 1.7, -2.3];
  const portrait = () => innerHeight > innerWidth;
  const lines = arr => arr.map(t => `<span class="ln-mask"><span class="ln">${t}</span></span>`).join("");
  const chars = (s, cls = "") => [...s].map((c, i) => `<span class="ch ${typeof cls === "function" ? cls(i) : cls}">${c === " " ? "&nbsp;" : c}</span>`).join("");
  const wordsOf = html => html.split(/(\s+|<span[^>]*>.*?<\/span>)/).filter(s => s && s.trim())
    .reduce((a, w) => (/^[.,;:!?]+$/.test(w) && a.length ? (a[a.length - 1] += w) : a.push(w), a), []);

  // radvisning styrd av scroll: raderna i el glider upp i tur och ordning mellan a och b
  const reveal = (el, p, a, b) => {
    const ls = el.__ln || (el.__ln = $$(".ln", el)), n = ls.length;
    ls.forEach((l, i) => {
      const k = ease(seg(p, a + (b - a) * i / n, a + (b - a) * (i + 1) / n));
      l.style.transform = `translateY(${(1 - k) * 105}%)`;
    });
  };
  const hide = (el, p, a, b) => { // rader glider ut uppåt
    const k = easeIO(seg(p, a, b));
    el.style.transform = `translateY(${-k * 30}px)`; el.style.opacity = 1 - k;
  };
  const fadeIn = (el, k, dy = 24) => { el.style.opacity = k; el.style.transform = `translateY(${(1 - k) * dy}px)`; };

  const gearPath = (R, r, n) => { let d = ""; for (let i = 0; i < n * 2; i++) { const a0 = i / (n * 2) * Math.PI * 2, a1 = (i + 1) / (n * 2) * Math.PI * 2, rr = i % 2 ? r : R; d += `${i ? "L" : "M"}${(Math.cos(a0) * rr).toFixed(1)} ${(Math.sin(a0) * rr).toFixed(1)} L${(Math.cos(a1) * rr).toFixed(1)} ${(Math.sin(a1) * rr).toFixed(1)} `; } return d + "Z"; };

  /* ================= scener ================= */
  // len = scenens längd i skärmhöjder. wipe = hur scenen kommer in.
  const S = [];
  const scene = o => (S.push(o), o);

  // 1. Öppning – i Netlights anda: stor rubrik till vänster, en 3D-dator till höger som sprängs isär när man scrollar
  const keys = Array.from({ length: 60 }, (_, i) => `<b style="--r:${(Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) % 1}"></b>`).join("");
  const chips = Array.from({ length: 7 }, (_, i) => `<i class="chip c${i % 3}" style="left:${12 + (i * 37) % 70}%;top:${14 + (i * 23) % 64}%"></i>`).join("");
  scene({
    id: "top", t: "MISSPRYM.md", hud: "light", len: 2.0, card: { glyph: "▣", room: "#f7f7f7" },
    html: `
      <div class="nl">
        <h1 class="nl-h">${lines(["Technical depth.", "Human", "judgement<span class='nl-dot'></span>"])}</h1>
        <p class="nl-p">${esc(C.commitment.lead)} ${esc(C.commitment.body.split(". ").slice(-1)[0])}</p>
        <div class="pc">
          <div class="rig">
            <div class="mon">
              <i class="fc f-back"></i><i class="fc f-left"></i><i class="fc f-right"></i><i class="fc f-top"></i><i class="fc f-bot"></i>
              <div class="pcb pcb1">${chips}</div><div class="pcb pcb2">${chips}</div><i class="yoke"></i>
              <div class="tube"><video src="assets/agentomaten-face.mp4" poster="assets/agentomaten-face.jpg" muted loop playsinline preload="none" aria-label="Agentomatens ansikte som ler"></video><i class="crt-scan"></i><i class="crt-glare"></i><p class="crt-text">&gt; ${C.agentomaten.listen}<b class="crt-cur"></b></p></div>
              <div class="fc f-front"><span class="badge">MISS PRYM · 1.0</span><i class="led"></i><i class="slot"></i></div>
            </div>
            <div class="base"><i class="fc b-top"></i><i class="fc b-front"></i></div>
            <div class="kbd"><div class="kb-top">${keys}</div><i class="kb-front"></i></div>
            <i class="mouse"></i>
            <svg class="coil" viewBox="0 0 300 120" aria-hidden="true"><path d="${Array.from({ length: 24 }, (_, i) => `${i ? "" : "M10 60 "}C ${14 + i * 11} 30, ${20 + i * 11} 90, ${21 + i * 11} 60`).join(" ")} Q 290 60 290 20"/></svg>
          </div>
        </div>
        <button class="nl-down" type="button" aria-label="Till nästa del" data-next>↓</button>
        <div class="marquee" aria-hidden="true"><div class="mq">${Array.from({ length: 6 }, () => `<span>BE PROUD · BE LIKE PRYM · TECHNICAL DEPTH · HUMAN JUDGEMENT · </span>`).join("")}</div></div>
      </div>`,
    init(el) {
      this.nl = $(".nl", el); this.rig = $(".rig", el); this.q = n => $$(n, el); this.mq = $(".marquee", el); this.down = $(".nl-down", el);
      this.h = $(".nl-h", el); this.keys = $$(".kb-top b", el);
    },
    update(p, t) {
      reveal(this.h, Math.min(1, (performance.now() - (window.__t0 || 0)) / 1400), 0, 1);
      const e = easeIO(seg(p, .02, .62)), up = easeIO(seg(p, .08, 1));
      this.nl.style.transform = `translateY(${-up * 62}vh)`;
      const ax = (mx / innerWidth - .5) * (1 - e);
      this.rig.style.transform = `rotateX(${-6 - e * 10}deg) rotateY(${-24 + ax * 10 - e * 18}deg) translateZ(${e * -60}px)`;
      const T = (sel, f) => this.q(sel).forEach(f);
      const D = "var(--D)", W = "var(--W)", H = "var(--H)";
      T(".f-front", x => (x.style.transform = `translateZ(calc(${D} / 2 + ${e * 190}px)) translateY(${-e * 24}px)`));
      T(".f-back", x => (x.style.transform = `translateZ(calc(${D} / -2 - ${e * 170}px)) rotateY(180deg)`));
      T(".f-left", x => (x.style.transform = `translateX(${-e * 150}px) rotateY(-90deg) translateZ(calc(${W} / 2))`));
      T(".f-right", x => (x.style.transform = `translateX(${e * 150}px) rotateY(90deg) translateZ(calc(${W} / 2))`));
      T(".f-top", x => (x.style.transform = `translateY(${-e * 130}px) rotateX(90deg) translateZ(calc(${H} / 2))`));
      T(".f-bot", x => (x.style.transform = `translateY(${e * 40}px) rotateX(-90deg) translateZ(calc(${H} / 2))`));
      T(".tube", x => (x.style.transform = `translateZ(calc(${D} / 2 - 6px + ${e * 90}px))`));
      T(".pcb1", x => (x.style.transform = `translateZ(${e * 10}px)`));
      T(".pcb2", x => (x.style.transform = `translateZ(${-e * 80}px)`));
      T(".yoke", x => (x.style.transform = `translateZ(${e * 40}px) translateY(${-e * 30}px)`));
      T(".chip", (x, i) => (x.style.transform = `translateZ(${e * (20 + (i % 7) * 9)}px) rotate(${e * (i % 2 ? 30 : -30)}deg)`));
      T(".base", x => (x.style.transform = `translateY(${e * 50}px)`));
      T(".kbd", x => (x.style.transform = `translateY(${e * 70}px) translateZ(${e * 60}px)`));
      this.keys.forEach((k, i) => (k.style.transform = `translateZ(${e * (8 + +k.style.getPropertyValue("--r") * 70)}px)`));
      T(".mouse", x => (x.style.transform = `translate(${e * 60}px, ${e * 40}px)`));
      // bandet och pilen kommer upp när sidan glider uppåt
      this.down.style.opacity = 1 - seg(p, .1, .3);
    }
  });

  // 2. "As consultants, we connect technical depth with — human — judgement."
  scene({
    id: "commitment", t: C.commitment.h, hud: "dark", len: 2.7, wipe: "fade", card: { glyph: "?", room: "#e7bfff" },
    html: `
      <i class="wall"></i>
      <video class="bgfilm" src="${C.film}" poster="${C.filmPoster}" muted loop playsinline preload="none" aria-hidden="true"></video><i class="bgtint bgtint--commit"></i>
      <p class="lab"><span class="md">##</span>${C.commitment.h}</p>
      <div class="lead"><p class="l1">${lines(C.open2.lines)}</p><p class="after">${lines([esc(C.open2.after)])}</p></div>
      <p class="giant" aria-label="${C.open2.giant}">${chars(C.open2.giant)}</p>`,
    init(el) { this.l1 = $(".l1", el); this.after = $(".after", el); this.lab = $(".lab", el); this.ch = $$(".giant .ch", el); },
    update(p) {
      reveal(this.l1, p, .04, .3);
      this.lab.style.opacity = seg(p, 0, .08);
      this.ch.forEach((c, i) => {
        const k = ease(seg(p, .3 + i * .05, .55 + i * .05));
        c.style.transform = `translateY(${(1 - k) * 80}%)`;
      });
      reveal(this.after, p, .7, .8);
      const out = easeIO(seg(p, .9, 1));
      this.ch.forEach(c => (c.style.opacity = 1 - out));
    }
  });

  // 3. Bordet: kompetenserna landar som piller
  scene({
    id: "expertise", t: "our expertise", hud: "light", len: 3.4, wipe: "circle", card: { glyph: "∗", room: "#ffabc8" },
    html: `
      <i class="wall"></i>
      <div class="crowd">${["puppet-man", "statue-justitia", "bird-owl", "purpose-woman", "bird-crow", "statue-venus", "bird-robin"].map((n, i) => `<img class="dude d-${n}" src="${C.fig}${n}.webp" alt="" style="--x:${6 + i * 13.6}%;--f:${i % 2 ? -1 : 1}">`).join("")}</div>
      <div class="cloth"></div>
      <p class="lead lead--ink l1">${lines(C.expertise.lead)}</p>
      <p class="lead lead--ink l2">${lines(C.expertise.after.map(rich))}</p>
      <div class="pills">${C.expertise.words.map(w => `<span class="tpill">${w}</span>`).join("")}</div>`,
    init(el) { this.l1 = $(".l1", el); this.l2 = $(".l2", el); this.pills = $$(".tpill", el); this.dudes = $$(".dude", el); },
    layout() {
      // lägg pillren i rader på bordet, nedifrån och upp
      const W = innerWidth, maxW = W * (portrait() ? .94 : .86), gap = W * .012;
      let rows = [[]], rw = 0;
      this.pills.forEach(pl => {
        const w = pl.offsetWidth;
        if (rw + w > maxW && rows[rows.length - 1].length) { rows.push([]); rw = 0; }
        rows[rows.length - 1].push(pl); rw += w + gap;
      });
      rows.forEach((r, ri) => {
        const tw = r.reduce((s, pl) => s + pl.offsetWidth + gap, -gap);
        let x = (W - tw) / 2;
        r.forEach((pl, j) => {
          pl.__x = x; pl.__y = -ri * pl.offsetHeight * .92; pl.__r = tilt[(ri * 5 + j) % tilt.length] * 2;
          x += pl.offsetWidth + gap;
        });
      });
    },
    update(p, t) {
      // en figur går in längs bordet – sedan blir de fler och fler (som mannekängerna i human-md)
      this.dudes.forEach((d, i) => {
        const f = +d.style.getPropertyValue("--f");
        if (i === 0) {
          const w = seg(p, 0, .12), walk = Math.abs(Math.sin(w * Math.PI * 6)) * (w < 1 ? 1 : 0);
          d.style.transform = `translateX(${(1 - ease(w)) * -40}vw) translateY(${-walk * 3}%) rotate(${Math.sin(t * 1.2) * 1.2 + (w < 1 ? Math.sin(w * Math.PI * 6) * 3 : 0)}deg) scaleX(${f})`;
        } else {
          const k = seg(p, .08 + i * .015, .13 + i * .015), pop = k > 0 && k < 1 ? Math.sin(k * Math.PI) * 8 : 0;
          d.style.transform = `translateY(${(1 - ease(k)) * 105 - pop}%) rotate(${Math.sin(t * 1.2 + i) * 1.2}deg) scaleX(${f})`;
        }
      });
      reveal(this.l1, p, .05, .15);
      hide(this.l1, p, .64, .7);
      this.pills.forEach((pl, i) => {
        const k = seg(p, .16 + i * .045, .3 + i * .045);
        const fall = k < 1 ? (1 - Math.pow(1 - k, 2)) : 1; // tyngdkraft
        const bounce = k > .85 ? Math.sin((k - .85) / .15 * Math.PI) * 10 : 0;
        const y = pl.__y - (1 - fall) * innerHeight * 1.1 - bounce;
        pl.style.transform = `translate(${pl.__x}px, ${y}px) rotate(${pl.__r * (k < 1 ? 3 * (1 - k) + 1 : 1)}deg)`;
      });
      reveal(this.l2, p, .7, .9);
    }
  });

  // 4. Ord tänds: "Technology should strengthen … less human."
  scene({
    id: "human", t: "less human", hud: "dark", len: 2.5, wipe: "circle", card: { glyph: "h", room: "#5578dc" },
    html: `<i class="wall"></i><figure class="give"><video src="assets/prym-give.mp4" poster="assets/prym-give.jpg" muted loop playsinline preload="none" aria-label="Miss Prym: If you give, you will receive twice as much"></video></figure><div class="say say--left"><span class="say-lab"><span class="md">##</span>${C.commitment.h}</span><p>${wordsOf(rich(C.commitment.say)).map(w => `<span class="w">${w}</span>`).join(" ")}</p></div>`,
    init(el) { this.w = $$(".w", el); this.give = $(".give", el); },
    update(p, t) { const k = ease(seg(p, 0, .25)); this.give.style.transform = `translateY(-50%) scale(${.7 + k * .3}) rotate(${(1 - k) * -12 + Math.sin(t * .8) * 1.2}deg)`; this.give.style.opacity = k;
      const n = this.w.length; this.w.forEach((w, i) => w.style.setProperty("--lit", clamp(seg(p, .08, .8) * n - i).toFixed(3))); }
  });

  // 5. Coelho
  scene({
    id: "prym", t: "be like prym", hud: "dark", len: 3.9, card: { glyph: "”", room: "#ffabc8" },
    html: `
      <i class="wall"></i>
      <video class="bgfilm" src="assets/street-lamps.mp4" poster="assets/street-lamps.jpg" muted loop playsinline preload="none" aria-hidden="true"></video><i class="bgtint"></i>
      <div class="frags">${C.quote.frags.map(f => `<p class="frag">${esc(f)}</p>`).join("")}<p class="frag frag-end">${esc(C.quote.end)}<i class="p"></i></p></div>
      <blockquote class="q-cite"><p>”${esc(C.quote.text)}”</p><cite>— ${esc(C.quote.src)}</cite></blockquote>`,
    init(el) { this.f = $$(".frag", el); this.c = $(".q-cite", el); },
    update(p) {
      const n = this.f.length;
      this.f.forEach((f, i) => {
        const a = .02 + i * (.8 / n), b = a + .8 / n;
        const kin = ease(seg(p, a, a + .06)), kout = i === n - 1 ? 0 : easeIO(seg(p, b - .04, b));
        f.style.opacity = kin * (1 - kout);
        f.style.transform = `translateY(calc(-50% + ${(1 - kin) * 40 - kout * 40}px))`;
      });
      fadeIn(this.c, ease(seg(p, .86, .96)));
    }
  });

  // 6. Who we are – vi som jobbar på Miss Prym. Kameran åker längs salen (som bordet i human-md) och stannar vid var och en.
  // Stopp i bildkoordinater (0–1): x, y, zoom
  const STOPS = [[.08, .42, 2.2], [.22, .55, 2.4], [.36, .22, 2.6], [.48, .38, 2.3], [.54, .3, 2.6], [.66, .38, 2.4], [.74, .35, 2.3], [.82, .3, 2.4], [.92, .32, 2.4], [.86, .66, 2.4], [.62, .72, 2.1]];
  scene({
    id: "who", t: C.who.h, hud: "dark", len: 5.4, wipe: "circle", card: { glyph: "W", room: "#2a2622" },
    html: `
      <div class="hall">
        <div class="pano"><img src="assets/team.jpg" alt="Vi som jobbar på Miss Prym, i barockdräkter i en sal med utsikt över Göteborg"></div>
        <video class="hall-film" src="assets/team-krakan.mp4" poster="assets/team-krakan.jpg" muted loop playsinline preload="none" aria-label="Vi som jobbar på Miss Prym"></video>
        <i class="hall-shade"></i>
      </div>
      <h2 class="chap chap--hall"><span class="md">##</span>${lines([rich(C.who.head)])}</h2>
      <div class="cap-wrap">${C.who.p.map(t => `<p class="cap">${esc(t)}</p>`).join("")}</div>
      <p class="hall-sign">${lines(["This is us<span class='nl-dot'></span>"])}</p>`,
    init(el) { this.chap = $(".chap", el); this.pano = $(".pano", el); this.caps = $$(".cap", el); this.sign = $(".hall-sign", el); this.shade = $(".hall-shade", el); },
    update(p, t) {
      reveal(this.chap, p, .02, .1);
      this.chap.style.opacity = 1 - seg(p, .8, .86);
      const n = this.caps.length;
      this.caps.forEach((c, i) => { const a = .08 + i * .22, b = a + .22; fadeIn(c, ease(seg(p, a, a + .04)) * (i === n - 1 ? 1 - seg(p, .74, .78) : 1 - easeIO(seg(p, b - .03, b)))); });
      if (portrait()) return;
      // kameran: helbild → glid från person till person → tillbaka till helbild
      const W = innerWidth, H = innerHeight, iw = 1756, ih = 896, base = Math.max(W / iw, H / ih);
      const k = seg(p, .1, .8), f = k * (STOPS.length - 1), i0 = Math.min(STOPS.length - 2, Math.floor(f)), u = easeIO(f - i0);
      let [x, y, z] = STOPS[i0].map((v, j) => v + (STOPS[i0 + 1][j] - v) * u);
      const intro = 1 - easeIO(seg(p, .02, .12)), outro = easeIO(seg(p, .8, .9));
      const blend = Math.max(intro, outro);
      x = x + (.5 - x) * blend; y = y + (.5 - y) * blend; z = z + (1 - z) * blend;
      const sc = base * z, tx = W / 2 - x * iw * sc, ty = H / 2 - y * ih * sc;
      this.pano.style.transform = `translate(${Math.min(0, Math.max(W - iw * sc, tx))}px, ${Math.min(0, Math.max(H - ih * sc, ty))}px) scale(${sc})`;
      this.shade.style.opacity = .55 - outro * .35 - (1 - intro) * .2;
      reveal(this.sign, p, .88, .96);
      this.sign.style.opacity = seg(p, .86, .9);
    }
  });

  // 6b. "Tänk dig…" – stor text i mitten, kort med hela laget och figurerna svävar förbi (som Netlights sektion)
  const FL = [...C.shifts.map(x => ({ img: C.img + x.img, bg: x.room })), { img: C.fig + "bird-crow.webp", bg: "#a9b2c3" }, { img: C.fig + "puppet-man.webp", bg: "#ffecaa" }, { img: C.fig + "bird-owl.webp", bg: "#f0bad9" }, { img: C.fig + "statue-venus.webp", bg: "#b9bee9" }, { img: C.fig + "bird-robin.webp", bg: "#f7eaad" }, { img: C.fig + "statue-justitia.webp", bg: "#d9646a" }, { img: C.fig + "purpose-woman.webp", bg: "#ffc2e3" }, { img: C.fig + "exp-flasks.webp", bg: "#e65564" }];
  const team = C.expertise.words.map((w, i) => ({ word: w, bg: ["#d9646a", "#f7eaad", "#b9bee9", "#f0bad9", "#3a4650", "#f2cd5c", "#69b488", "#cb9cf8", "#5d9dc5", "#fc4109"][i] }));
  const floaters = [];
  for (let i = 0; i < 22; i++) floaters.push(i % 2 ? team[(i >> 1) % team.length] : FL[(i >> 1) % FL.length]);
  scene({
    id: "together", t: "together", hud: "light", len: 3.7, wipe: "fade", card: { glyph: "∞", room: "#f4efe8" },
    html: `
      <div class="swarm">${floaters.map((f, i) => {
        const x = [6, 74, 18, 60, 38, 84, 2, 48, 28, 70, 90, 12, 56, 34, 80, 8, 64, 44, 22, 76, 52, 30][i], d = [1, .7, .45, .9, .6, 1, .5, .8, .35, .95, .55, .75, .4, 1, .65, .5, .85, .45, .7, .9, .6, .8][i];
        return `<figure class="fl" style="--x:${x}%;--d:${d};--o:${i * .043};--bg:${f.bg}">${f.img ? `<img src="${f.img}" alt="" loading="lazy">` : `<span>${f.word}</span>`}</figure>`;
      }).join("")}</div>
      <p class="big-say s1">${wordsOf("We provide our clients with open-minded consultants…").map(w => `<span class="w">${w}</span>`).join(" ")}</p>
      <p class="big-say s2">${wordsOf("…who create more together than any individual could achieve alone.").map(w => `<span class="w">${w}</span>`).join(" ")}</p>`,
    init(el) { this.fl = $$(".fl", el); this.s1 = $(".s1", el); this.s2 = $(".s2", el); this.w1 = $$(".s1 .w", el); this.w2 = $$(".s2 .w", el); },
    update(p, t) {
      // som hos Netlight: texten står grå och fylls i svart ord för ord
      const lit = (ws, a, b) => ws.forEach((w, i) => w.style.setProperty("--lit", clamp(seg(p, a, b) * ws.length - i).toFixed(3)));
      lit(this.w1, .02, .36); lit(this.w2, .52, .86);
      const out1 = seg(p, .42, .5); this.s1.style.opacity = 1 - out1; this.s1.style.transform = `translate(-50%, calc(-50% - ${out1 * 30}px))`;
      const in2 = seg(p, .46, .54); this.s2.style.opacity = in2; this.s2.style.transform = `translate(-50%, calc(-50% + ${(1 - in2) * 30}px))`;
      this.fl.forEach(f => {
        const d = +f.style.getPropertyValue("--d"), o = +f.style.getPropertyValue("--o");
        // korten stiger genom bilden; närmare kort rör sig snabbare och är skarpare
        const y = 115 - ((p * 1.6 + o) % 1.15) * 170 * (0.6 + d * .5);
        f.style.transform = `translate3d(0, ${y}vh, 0) scale(${.45 + d * .6}) rotate(${Math.sin(t * .5 + o * 9) * 3}deg)`;
        f.style.filter = `blur(${(1 - d) * 5}px)`; f.style.opacity = .35 + d * .65;
      });
    }
  });

  // 7–11. From → To – figurerna från Figma, friställda och animerade
  const FIG = { // placering i Figma-ramen 1920×1080
    "purpose-woman": [854, 99, 1071, 986], "net-all": [954, 0, 971, 1085],
    "emp-tophand": [1095, 0, 425, 520], "emp-scissors": [1189, 389, 370, 192], "emp-free": [1093, 509, 832, 552],
    "exp-flasks": [1009, 247, 696, 618],
    // fåglarna i nätverksrummet – egen uppställning kring bordet (ramenheter)
    "bird-crow": [1010, 300, 431, 474], "bird-owl": [1560, 290, 261, 487],
    "bird-bowl": [1290, 690, 274, 149], "puppet-man": [1745, 420, 211, 335], "bird-robin": [1610, 660, 239, 221], "bird-robin2": [1235, 560, 122, 166]
  };
  const pc = (name, cls = "") => { const [x, y, w, h] = FIG[name]; return `<img class="pc ${cls}" src="${C.fig}${name}.webp" alt="" style="left:${x / 19.2}%;top:${y / 10.8}%;width:${w / 19.2}%;height:${h / 10.8}%">`; };
  const BUB = Array.from({ length: 16 }, (_, i) => [1110 + (i * 97) % 520, 0.4 + (i * 0.37) % 1, 5 + (i * 7) % 9, (i * .173) % 1]);
  const ART = {
    woman: () => `<div class="fig">${pc("purpose-woman", "a-woman")}</div><div class="gold" aria-hidden="true">${[0, 1, 2].map(i => `<i class="bar" style="--i:${i}"></i>`).join("")}<span class="gold-tag">profit?</span></div>`,
    net: () => `
      <div class="fig">
        <svg class="balloon" viewBox="0 0 1920 1080" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
          <g class="bal-g">
            <path class="bal-str" d="M1438 453 C 1470 380, 1430 300, 1500 205"/>
            <ellipse cx="1500" cy="118" rx="72" ry="88" class="bal-b"/>
            <ellipse cx="1474" cy="88" rx="16" ry="26" class="bal-h"/>
            <path d="M1490 204 L1510 204 L1500 192 Z" class="bal-k"/>
          </g>
          <circle class="berry" r="13" cx="0" cy="0"/>
          <g class="confetti">${Array.from({ length: 18 }, (_, i) => `<rect width="${10 + (i % 3) * 5}" height="${6 + (i % 2) * 6}" rx="2" fill="${["#e83729", "#ffabc8", "#f8d867", "#f4efe8"][i % 4]}"/>`).join("")}</g>
        </svg>
        ${pc("bird-owl", "a-owl")}${pc("bird-crow", "a-crow")}${pc("puppet-man", "a-man")}
      </div>
      <div class="cloth"></div>
      <div class="fig">${pc("bird-bowl", "a-bowl")}${pc("bird-robin2", "a-robin2")}${pc("bird-robin", "a-robin")}</div>`,
    puppet: () => `<div class="fig">${pc("emp-free", "a-free")}${pc("emp-tophand", "a-top")}${pc("emp-scissors", "a-sc")}</div>`,
    flasks: () => `<div class="fig">${BUB.map(b => `<i class="bub" style="left:${b[0] / 19.2}%;--s:${b[2]}px"></i>`).join("")}${pc("exp-flasks", "a-flasks")}</div>`
  };
  C.shifts.forEach((s, i) => scene({
    id: `shift-${i + 1}`, t: `${i + 1}. from ${s.from.toLowerCase()} to ${s.to.toLowerCase()}`, hud: "light", len: s.art === "puppet" ? 3.8 : 3.1, wipe: "circle",
    card: { img: s.img, n: String(i + 1), room: s.room }, art: s.art,
    style: `--room:${s.room};--floor:${s.floor}`,
    html: `
      <i class="wall"></i>${s.art === "net" ? "" : `<div class="floor"></div>`}
      ${s.art ? ART[s.art]() : `<div class="glass-wrap"><img class="sh-img" src="${C.img}${s.img}" alt=""><i class="frost"></i><i class="wiper"></i></div>`}
      <h2 class="sh-title">${lines([`<span class="num">${i + 1}.</span> from <span class="sh-x">${s.from.toLowerCase()}<svg viewBox="0 0 100 10" preserveAspectRatio="none"><path pathLength="1" d="M1 6 C 30 3, 60 8, 99 4"/></svg></span>`])}</h2>
      <p class="sh-to">${lines([`${s.to}<i></i>`])}</p>
      <p class="sh-p">${esc(s.p)}</p>
      <p class="sh-n">${i + 1} / ${C.shifts.length}</p>`,
    init(el) {
      this.fig = $(".fig", el); this.img = $(".sh-img", el); this.title = $(".sh-title", el); this.x = $(".sh-x path", el); this.to = $(".sh-to", el); this.p = $(".sh-p", el);
      this.q = n => $(n, el); this.bubs = $$(".bub", el);
    },
    update(p, t) {
      const art = this.art, k = ease(seg(p, 0, .3));
      // tidpunkter: marionetten klipps loss när ordet stryks
      const strikeA = art === "puppet" ? .4 : .22, strikeB = art === "puppet" ? .46 : .36;
      reveal(this.title, p, .05, .16);
      this.x.style.strokeDashoffset = 1 - easeIO(seg(p, strikeA, strikeB));
      reveal(this.to, p, strikeB - .02, strikeB + .1);
      fadeIn(this.p, ease(seg(p, strikeB + .12, strikeB + .24)));

      if (!art) { // Transparency: bilden står bakom frostat glas – när "privacy" stryks torkas glaset klart
        this.img.style.transform = `translateY(${Math.sin(t * 1.1) * 4}px)`;
        const w = this.q(".glass-wrap"), fr = this.q(".frost"), wp = this.q(".wiper");
        w.style.transform = `translateX(${(1 - k) * 30}vw)`;
        const c = easeIO(seg(p, strikeA, strikeB + .1));
        fr.style.clipPath = `inset(0 0 0 ${c * 100}%)`;
        wp.style.left = `${c * 100}%`; wp.style.opacity = c > 0 && c < 1 ? 1 : 0;
        return;
      }
      if (art === "woman") {
        const w = this.q(".a-woman");
        // glider in på golvplankorna och läser – andas, bläddrar med en lätt nick
        w.style.transform = `translateX(${(1 - k) * 45}vw) rotate(${Math.sin(t * .9) * .5 - (1 - k) * 4}deg) scale(${1 + Math.sin(t * 1.8) * .004})`;
        // frestelsen: guldtackorna glider fram mot henne – hon läser vidare – guldet sjunker genom golvet
        const g = this.q(".gold"), offer = ease(seg(p, .08, .26)), sink = easeIO(seg(p, .3, .44));
        g.style.transform = `translate(${(1 - offer) * -60}vw, ${sink * 40}vh)`;
        g.style.opacity = 1 - seg(p, .4, .46);
        g.querySelector(".gold-tag").style.opacity = seg(p, .16, .22) * (1 - seg(p, .28, .32));
        $$(".bar", g).forEach((b, i) => (b.style.transform = `translateY(${Math.sin(t * 3 + i) * (offer < 1 ? 2 : 0)}px) rotate(${(i - 1) * 2}deg)`));
      }
      if (art === "net") {
        // fåglarna reser sig bakom bordet, rödhakarna hoppar in, kråkan håller ballongen
        const up = (a, b) => 1 - ease(seg(p, a, b));
        const owl = this.q(".a-owl"), crow = this.q(".a-crow"), g = this.q(".bal-g");
        const uo = up(.02, .16), uc = up(.06, .2);
        owl.style.transform = `translateY(${uo * 105}%) rotate(${Math.sin(t * .8) * 2.2}deg)`;
        crow.style.transform = `translateY(${uc * 105}%) rotate(${Math.sin(t * 1.1 + 1) * 1.4}deg)`;
        const dy = uc * 474 * 1.05 - Math.sin(t * 1.1 + 1) * 3;
        g.setAttribute("transform", `translate(0 ${dy - ease(seg(p, .2, .4)) * 12}) rotate(${Math.sin(t * .9) * 5 - uc * 8} 1438 453)`);
        // gubben reser sig, tar sikte med ett bär och skjuter – ballongen smäller
        const man = this.q(".a-man"), berry = this.q(".berry"), conf = $$(".confetti rect", this.fig.parentElement);
        const um = up(.28, .38), aim = seg(p, .6, .66), fly = seg(p, .66, .72), popK = seg(p, .72, .86);
        man.style.transform = `translateY(${um * 105}%) rotate(${-aim * 6 + (fly > 0 ? Math.sin(fly * Math.PI) * 8 : 0) + Math.sin(t * 1.3) * .8}deg)`;
        const bx = 1500, by = 118 + dy - ease(seg(p, .2, .4)) * 12, hx = 1760, hy = 650;
        if (fly > 0 && fly < 1) {
          const x = hx + (bx - hx) * fly, y = hy + (by - hy) * fly - Math.sin(fly * Math.PI) * 220;
          berry.setAttribute("cx", x); berry.setAttribute("cy", y); berry.style.opacity = 1;
        } else berry.style.opacity = 0;
        const popped = popK > 0;
        this.q(".bal-b").style.opacity = this.q(".bal-h").style.opacity = this.q(".bal-k").style.opacity = popped ? 0 : 1;
        // snöret faller när ballongen är borta
        this.q(".bal-str").style.transform = popped ? `translateY(${ease(popK) * 260}px)` : "";
        this.q(".bal-str").style.opacity = 1 - seg(p, .78, .86);
        conf.forEach((c, i) => {
          const ang = i / conf.length * Math.PI * 2 + i, r = ease(popK) * (90 + (i * 37) % 120), g = popK * popK * 260;
          c.setAttribute("x", bx + Math.cos(ang) * r); c.setAttribute("y", by + Math.sin(ang) * r + g);
          c.setAttribute("transform", `rotate(${popK * 540 * (i % 2 ? 1 : -1)} ${bx + Math.cos(ang) * r} ${by + Math.sin(ang) * r + g})`);
          c.style.opacity = popped ? 1 - seg(popK, .7, 1) : 0;
        });
        // kråkan hoppar till av smällen
        if (popK > 0 && popK < .3) crow.style.transform += ` translateY(${-Math.sin(popK / .3 * Math.PI) * 6}%)`;
        const bowl = this.q(".a-bowl");
        bowl.style.transform = `translateX(${up(.12, .26) * -60}vw)`;
        const hop = (el, a, b, from, dir) => {
          const kk = seg(p, a, b), x = (1 - ease(kk)) * from;
          const y = -Math.abs(Math.sin(kk * Math.PI * 3)) * 18 * (1 - kk);
          const peck = kk >= 1 ? Math.max(0, Math.sin(t * 2.2 + dir)) ** 6 * 14 : 0;
          el.style.transform = `translate(${x}vw, ${y}%) rotate(${dir * peck}deg)`;
        };
        hop(this.q(".a-robin"), .18, .34, 40, 1);
        hop(this.q(".a-robin2"), .24, .4, -50, -1);
      }
      if (art === "puppet") {
        const top = this.q(".a-top"), sc = this.q(".a-sc"), fr = this.q(".a-free");
        const cut = seg(p, strikeA, strikeB), freed = seg(p, strikeB, strikeB + .14);
        const pull = Math.sin(t * 1.7) * (1 - freed); // dockföraren rycker i trådarna
        // övre handen: in uppifrån, rycker, flyger iväg efter klippet
        top.style.transform = `translateY(${(1 - k) * -60 + pull * 2.2 - easeIO(freed) * 120}%) rotate(${pull * 1.6 - easeIO(freed) * 12}deg)`;
        // saxen: in från höger, klipper två gånger, ut igen
        const inS = ease(seg(p, .2, strikeA)), outS = easeIO(seg(p, strikeB + .1, strikeB + .24));
        const snip = Math.sin(cut * Math.PI * 4) * 9;
        sc.style.transform = `translateX(${(1 - inS) * 70 + outS * 90}vw) rotate(${snip}deg)`;
        // marionetten: dinglar i trådarna, gör ett glädjeskutt när den är fri
        const hop = Math.sin(seg(p, strikeB + .02, strikeB + .12) * Math.PI) * 5;
        fr.style.transform = `translateX(${(1 - k) * 20}vw) translateY(${pull * .6 - hop}%) rotate(${pull * 1.2 * (1 - freed)}deg)`;
      }
      if (art === "flasks") {
        const f = this.q(".a-flasks");
        f.style.transform = `translateY(${(1 - k) * 40}vh) rotate(${Math.sin(t * 2.4) * .6}deg)`;
        this.bubs.forEach((b, i) => {
          const B = BUB[i], cyc = (t * .12 * B[1] + B[3]) % 1;
          b.style.top = `${(44 - cyc * 40)}%`;
          b.style.opacity = k * Math.sin(cyc * Math.PI) * .9;
        });
      }
    }
  }));

  // 11a. 1,01^365 – stapel för stapel; det mesta av resan ser ut att inte ge något alls
  const NB = 30, bars = Array.from({ length: NB }, (_, i) => Math.pow(1.01, (i + 1) * 365 / NB));
  scene({
    id: "one-percent", t: "one percent a day", hud: "dark", len: 3.6, wipe: "circle", card: { glyph: "%", room: "#111111", light: true },
    html: `
      <div class="eq eq1"><span class="b">(1.00)</span><sup>365</sup><span class="eqs">=</span><span class="r r1">1.00</span></div>
      <div class="eq eq2"><span class="b">(1.01)</span><sup class="d">0</sup><span class="eqs">=</span><span class="r r2">1.00</span></div>
      <div class="ticks">${bars.map(v => `<i style="--v:${(v - 1) / 36.8}"></i>`).join("")}</div>
      <p class="tick-mark"><b>▲</b><span class="tm-t">"this is pointless."</span></p>
      <p class="eq-cap">${lines(["Standing still", "<span class='hl-human'>vs.</span>", "one percent better every day."])}</p>`,
    init(el) { this.d = $(".eq2 .d", el); this.r2 = $(".r2", el); this.bars = $$(".ticks i", el); this.mark = $(".tick-mark", el); this.mt = $(".tm-t", el); this.cap = $(".eq-cap", el); this.eqs = $$(".eq", el); },
    update(p, t) {
      this.eqs.forEach((e, i) => fadeIn(e, ease(seg(p, .02 + i * .06, .14 + i * .06))));
      const k = seg(p, .16, .72), day = Math.round(k * 365), n = this.bars.length;
      this.d.textContent = day; this.r2.textContent = Math.pow(1.01, day).toFixed(day > 300 ? 1 : 2);
      this.bars.forEach((b, i) => { const on = clamp(k * n - i); b.style.transform = `scaleY(${on * (.03 + +b.style.getPropertyValue("--v") * .97)})`; b.style.opacity = on > 0 ? 1 : .18; });
      // markören följer dagarna – och står still vid den platta delen, där de flesta ger upp
      const at = Math.min(k, .7);
      this.mark.style.left = `calc(var(--pad) + ${at} * (100% - 2 * var(--pad)))`;
      this.mt.style.opacity = seg(p, .3, .36) * (1 - seg(p, .62, .68));
      this.mark.style.opacity = seg(p, .14, .2) * (1 - seg(p, .74, .8));
      reveal(this.cap, p, .76, .92);
    }
  });
  { const i = S.findIndex(x => x.id === "one-percent"), j = S.findIndex(x => x.id === "shift-4"); S.splice(j + 1, 0, ...S.splice(i, 1)); }

  // 11b. Textrytmen från human-md ("Yet." / "I'm not in that argument" / "I'm in this one") – med Miss Pryms ord
  scene({
    id: "chaos", t: "we face it together", hud: "dark", len: 3.1, wipe: "circle", card: { glyph: "C", room: "#0b41c2", light: true },
    html: `
      <i class="wall"></i>
      <p class="chaos-word" aria-label="Chaos.">${[..."Chaos"].map(c => `<span class="ch">${c}</span>`).join("")}<i class="cdot"></i></p>
      <p class="chaos-small">We don't fear chaos<i class="cdot"></i></p>
      <p class="chaos-big">${wordsOf("We face it together.").map(w => `<span class="w">${w}</span>`).join(" ")}</p>`,
    init(el) { this.ch = $$(".chaos-word .ch", el); this.word = $(".chaos-word", el); this.small = $(".chaos-small", el); this.big = $(".chaos-big", el); this.w = $$(".chaos-big .w", el); },
    update(p, t) {
      // ordet darrar allt mer och flyger sedan isär
      const shake = seg(p, .04, .3), fly = easeIO(seg(p, .3, .42));
      this.word.style.opacity = ease(seg(p, 0, .06)) * (1 - seg(p, .38, .44));
      this.ch.forEach((c, i) => {
        const r1 = Math.sin(i * 91.7 + t * 9) , r2 = Math.cos(i * 37.3 + t * 11);
        const dx = r1 * shake * 6 + (i - 2) * fly * 40, dy = r2 * shake * 6 + (i % 2 ? -1 : 1) * fly * 30;
        c.style.transform = `translate(${dx}vw, ${dy}vh) rotate(${r1 * shake * 12 + (i - 2) * fly * 60}deg)`;
      });
      fadeIn(this.small, ease(seg(p, .42, .5)) * (1 - seg(p, .62, .68)), 12);
      const inB = ease(seg(p, .6, .7)); this.big.style.opacity = inB;
      const n = this.w.length; this.w.forEach((w, i) => w.style.setProperty("--lit", clamp(seg(p, .64, .9) * n - i).toFixed(3)));
    }
  });
  { const i = S.findIndex(x => x.id === "chaos"), j = S.findIndex(x => x.id === "shift-3"); S.splice(j + 1, 0, ...S.splice(i, 1)); }

  // 12. What we do – tre tallrikar med silverkupor som lyfts (efter Figma-skissen)
  const cloche = `<svg class="cl-svg" viewBox="0 0 200 130" aria-hidden="true"><defs><linearGradient id="clg" x1="0" x2="1"><stop offset="0" stop-color="#9aa0a6"/><stop offset=".35" stop-color="#f4f4f2"/><stop offset=".6" stop-color="#c9cdd0"/><stop offset="1" stop-color="#7e858b"/></linearGradient></defs><path d="M10 118 Q 10 22 100 18 Q 190 22 190 118 Z" fill="url(#clg)" stroke="#5c6369" stroke-width="2"/><rect x="2" y="114" width="196" height="12" rx="6" fill="#b9bec2" stroke="#5c6369" stroke-width="2"/><circle cx="100" cy="12" r="9" fill="url(#clg)" stroke="#5c6369" stroke-width="2"/><path d="M40 40 Q 60 28 80 26" stroke="#fff" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/></svg>`;
  scene({
    id: "what", t: C.what.h, hud: "light", len: 3.4, wipe: "circle", card: { glyph: "{ }", mono: true, room: "#ffeaa6" },
    html: `
      <i class="wall"></i><div class="cloth"></div>
      <h2 class="chap chap--ink"><span class="md">##</span>${lines([C.what.h])}</h2>
      <div class="plates">${C.what.items.map((it, i) => `<div class="plate">
        <svg class="steam" viewBox="0 0 120 160" aria-hidden="true"><path d="M30 150 C 10 120, 50 100, 30 70 S 40 20, 30 0"/><path d="M60 150 C 40 115, 80 95, 60 62 S 70 18, 60 -4"/><path d="M90 150 C 70 120, 110 100, 90 70 S 100 20, 90 0"/></svg>
        <i class="dish"></i>
        <img class="serve" src="${C.fig}${["puppet-man.webp", "exp-flasks.webp", "bird-robin.webp"][i]}" alt="">
        <span class="spark">${Array.from({ length: 8 }, () => "<i></i>").join("")}</span>
        <img class="waiter" src="${C.fig}team-${["cap", "blond", "glasses"][i]}.webp" alt="">
        <span class="cl">${cloche}</span>
        <div class="menu"><span class="menu-h"><span class="md">###</span> ${it.t.toLowerCase()}</span><p>${esc(it.p)}</p></div>
      </div>`).join("")}</div>`,
    init(el) { this.chap = $(".chap", el); this.pl = $$(".plate", el); },
    update(p, t) {
      reveal(this.chap, p, .02, .12);
      const n = this.pl.length;
      this.pl.forEach((pl, i) => {
        const inK = ease(seg(p, .06 + i * .05, .2 + i * .05));
        pl.style.transform = `translateY(${(1 - inK) * 60}vh)`;
        const a = .26 + i * .22, lift = easeIO(seg(p, a, a + .1));
        const wob = lift > 0 && lift < 1 ? Math.sin(lift * Math.PI * 3) * 4 : 0;
        const cl = pl.querySelector(".cl"), waiter = pl.querySelector(".waiter");
        // handen kommer ner, greppar knoppen och lyfter kupan
        const down = ease(seg(p, a - .1, a - .01));
        // en av oss reser sig bakom bordet, lyfter kupan högt och ler
        waiter.style.transform = `translateX(-50%) translateY(${(1 - down) * 100 - lift * 6}%) rotate(${Math.sin(t * 1.3 + i) * (lift >= 1 ? 1.5 : 0)}deg)`;
        cl.style.transform = `translate(${lift * 38}%, ${-lift * 120}%) rotate(${lift * 16 + wob * .6}deg)`;
        // under kupan: rätten reser sig, ångan stiger, det gnistrar – och menykortet viks upp
        const rev = seg(p, a + .02, a + .12), serve = pl.querySelector(".serve"), steam = pl.querySelector(".steam"), sp = $$(".spark i", pl), menu = pl.querySelector(".menu");
        serve.style.transform = `translateX(-50%) translateY(${(1 - ease(rev)) * 30}%) scale(${.5 + .5 * ease(rev) + Math.sin(rev * Math.PI) * .12})`;
        serve.style.opacity = rev > 0 ? 1 : 0;
        steam.style.opacity = seg(p, a + .02, a + .06) * (.65 + Math.sin(t * 2 + i) * .15);
        const burst = seg(p, a + .03, a + .11);
        sp.forEach((s2, j) => { const ang = j / sp.length * Math.PI * 2, r = ease(burst) * 60; s2.style.transform = `translate(${Math.cos(ang) * r}px, ${Math.sin(ang) * r - 20}px) rotate(${ang}rad) scale(${1 - burst})`; s2.style.opacity = burst > 0 && burst < 1 ? 1 : 0; });
        const mk = easeIO(seg(p, a + .08, a + .18));
        menu.style.transform = `perspective(600px) rotateX(${(1 - mk) * -95}deg)`; menu.style.opacity = mk > 0 ? 1 : 0;
      });
    }
  });

  // 13. Work with us
  scene({
    id: "work", t: C.work.h, hud: "dark", len: 2.5, wipe: "circle", card: { glyph: "→", room: "#26512f", light: true },
    html: `
      <i class="wall"></i><div class="floor"></div>
      <h2 class="chap"><span class="md">##</span>${lines([`${C.work.h} <span class="hl-human">(${C.work.sub.toLowerCase()})</span>`])}</h2>
      <div class="bubbles">${C.work.paths.map((w, i) => `<a class="bubble" href="${w.href}"><h3>${w.t}</h3><p>${esc(w.p)}</p><span class="go">read more →</span></a>`).join("")}</div>
      <div class="gold gold--rope" aria-hidden="true"><i class="bar"></i><i class="bar"></i><i class="bar"></i><span class="gold-tag">profit?</span></div>
      <div class="queue"><div class="walker w1"><img src="${C.fig}statue-venus.webp" alt=""><i class="plinth"></i></div><div class="walker w2"><img src="${C.fig}statue-justitia.webp" alt=""><i class="plinth"></i></div></div>
      <svg class="rope" viewBox="0 0 1000 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <g class="post"><rect x="96" y="40" width="16" height="170" rx="6" fill="#c9a24a"/><circle cx="104" cy="34" r="16" fill="#e2bd5c"/><rect x="70" y="200" width="68" height="14" rx="6" fill="#a8822e"/></g>
        <g class="post"><rect x="888" y="40" width="16" height="170" rx="6" fill="#c9a24a"/><circle cx="896" cy="34" r="16" fill="#e2bd5c"/><rect x="862" y="200" width="68" height="14" rx="6" fill="#a8822e"/></g>
        <path class="rope-p" d="" fill="none" stroke="#b4122a" stroke-width="16" stroke-linecap="round"/>
      </svg>`,
    init(el) { this.chap = $(".chap", el); this.b = $$(".bubble", el); this.rope = $(".rope-p", el); this.wk = $$(".walker", el); },
    update(p, t) {
      // repet hänger mellan stolparna, hakas av i högra änden och faller ned – vägen är öppen
      // figurerna kommer gående, väntar vid repet och går igenom när det hakas av
      this.wk.forEach((w, i) => {
        const inn = seg(p, .02 + i * .04, .2 + i * .04), out = seg(p, .4 + i * .06, .75 + i * .06);
        const x = -60 + ease(inn) * (40 - i * 9) + easeIO(out) * 150;
        const moving = (inn > 0 && inn < 1) || (out > 0 && out < 1);
        const step = moving ? Math.abs(Math.sin(t * 7 + i)) : 0;
        w.style.transform = `translateX(${x}vw) translateY(${-step * 2.4}%) rotate(${moving ? Math.sin(t * 7 + i) * 2.5 : Math.sin(t * .8 + i) * .5}deg)`;
      });
      // guldet ligger där – statyerna går förbi utan att titta
      const gr = this.gold || (this.gold = this.wk[0].closest("section").querySelector(".gold--rope"));
      gr.style.opacity = ease(seg(p, .1, .2)) * (1 - seg(p, .85, .95));
      gr.querySelector(".gold-tag").style.opacity = seg(p, .3, .36) * (1 - seg(p, .6, .66));
      const un = easeIO(seg(p, .22, .36)), sw = Math.sin(t * 1.6) * (1 - un * .6);
      const ex = 896 - un * 420, ey = 40 + un * 160 + Math.sin(un * Math.PI) * 30;
      const cx = (104 + ex) / 2 + sw * 10, cy = 130 + un * 40 + sw * 6;
      this.rope.setAttribute("d", `M104 40 Q ${cx} ${cy + 40}, ${ex} ${ey}`);
      reveal(this.chap, p, .03, .15);
      this.b.forEach((b, i) => {
        const k = seg(p, .18 + i * .12, .34 + i * .12), e = 1 - Math.pow(1 - k, 3) + Math.sin(k * Math.PI) * .08;
        b.style.opacity = clamp(k * 3);
        b.style.transform = `translateY(${(1 - k) * 60}px) scale(${.7 + e * .3}) rotate(${tilt[i + 5] * (2 - k)}deg)`;
      });
    }
  });

  // 14. Labbet – ordet faller ner, sedan åker kameran ner under golvet till maskineriet
  const fcls = i => ["f1", "f2", "f3"][(i * 7 + 1) % 3];
  scene({
    id: "lab", t: C.lab.h, hud: "light", len: 4.2, wipe: "circle", card: { glyph: "&lt;/&gt;", mono: true, room: "#ffc3e5" },
    html: `
      <div class="labcam">
        <div class="lab-top">
          <i class="wall"></i><div class="cloth"></div>
          <p class="lab"><span class="md">##</span>${C.lab.h} · missprym.tech</p>
          <p class="lead lead--sm">${lines(C.lab.lines.map(esc))}</p>
          <p class="mgiant" aria-label="${C.lab.giant}">${chars(C.lab.giant, fcls)}</p>
        </div>
        <div class="cellar">
          <div class="pit">
            ${[["g1"], ["g2"], ["g3"], ["g4"]].map(([c]) => `<svg class="gear ${c}" viewBox="-110 -110 220 220" aria-hidden="true"><path d="${gearPath(100, 80, 16)}"/><circle r="30"/><circle r="9" class="hub"/></svg>`).join("")}
            <img class="crank" src="${C.fig}emp-tophand.webp" alt="">
          </div>
          <div class="lab-cards">${C.lab.items.map((l, i) => `<a class="lcard" href="${l.href}" style="--a:${tilt[i + 2]}deg"><span class="n">${i + 1}</span><b>${l.t}</b><p>${esc(l.p)}</p></a>`).join("")}</div>
        </div>
      </div>`,
    init(el) { this.cam = $(".labcam", el); this.lead = $(".lead", el); this.lab = $(".lab", el); this.ch = $$(".mgiant .ch", el); this.cards = $$(".lcard", el); this.g = $$(".gear", el); this.crank = $(".crank", el); },
    update(p, t) {
      this.lab.style.opacity = seg(p, 0, .05);
      reveal(this.lead, p, .03, .14);
      this.ch.forEach((c, i) => {
        const k = seg(p, .14 + i * .02, .24 + i * .02);
        const y = (1 - ease(k)) * -60 + (k > 0 && k < 1 ? Math.sin(k * Math.PI) * -12 : 0);
        c.style.transform = `translateY(${y}vh) rotate(${(1 - k) * (i % 2 ? 20 : -20)}deg)`;
        c.style.opacity = k > 0 ? 1 : 0;
      });
      // kameran åker ner: ytan är bara ytan – under den finns maskineriet
      const pan = easeIO(seg(p, .42, .6));
      this.cam.style.transform = `translateY(${-pan * 100}vh)`;
      const rot = p * 900 + t * 10;
      this.g.forEach((g, i) => (g.style.transform = `rotate(${(i % 2 ? -1 : 1) * rot * [1, 1.6, .8, 2.2][i]}deg)`));
      const a = rot * Math.PI / 180;
      this.crank.style.transform = `translate(${Math.cos(a) * 1.4}vh, ${Math.sin(a) * 1.4}vh) rotate(${-24 + Math.sin(a) * 3}deg)`;
      this.cards.forEach((c, i) => {
        const k = ease(seg(p, .62 + i * .04, .74 + i * .04));
        c.style.opacity = k; c.style.transform = `translateY(${(1 - k) * 40}vh) rotate(${tilt[i + 2] * (1 + (1 - k) * 4)}deg)`;
      });
    }
  });

  // 14a. "Du ser ett CV. Vi ser en berättelse." – Intervjuomaten
  const slips = ["deltog i", "ansvarade för", "avvikelser", "leverantörer", "uppföljning", "kunder", "metoder", "verktyg", "beslut", "resultat", "processer", "dokumentation", "projekt", "förbättring", "samordning", "kvalitet"];
  const story = ["Hon fick olika personer att", "röra sig åt samma håll,", "följde upp leverantörerna", "– och avvikelserna blev färre."];
  scene({
    id: "story", t: "intervjuomaten", hud: "light", len: 3.6, wipe: "circle", card: { glyph: "¶", room: "#f7eaad" },
    html: `
      <i class="wall"></i>
      <p class="lab"><span class="md">##</span>intervjuomaten · missprym.tech</p>
      <div class="pile">${slips.map((w, i) => `<span class="slip" style="--i:${i}">${w}</span>`).join("")}</div>
      <p class="st-a">${lines(["You may only see", "a CV."])}</p>
      <svg class="story-line" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M10 380 L80 300 L130 350 L190 320 L240 355 L300 120 L350 260 L400 180 L450 280 L510 110 L560 220 L610 160 L670 330 L720 110 L760 170 L795 20"/><circle cx="795" cy="20" r="7"/></svg>
      <p class="st-b">${lines(["We see a <span class='hl-human'>story.</span>"])}</p>
      <div class="story-card"><span class="md">&gt;</span> ${story.map(esc).join(" ")}<p>Intervjuomaten får hjälpa kandidaten att minnas. Den får aldrig hitta på.</p><a class="cta" href="https://missprym.tech/intervjuomaten/">Testa Intervjuomaten →</a></div>`,
    init(el) { this.sl = $$(".slip", el); this.a = $(".st-a", el); this.b = $(".st-b", el); this.card = $(".story-card", el); this.lab = $(".lab", el); },
    update(p, t) {
      this.lab.style.opacity = seg(p, 0, .05);
      reveal(this.a, p, .02, .14);
      hide(this.a, p, .44, .5);
      // lapparna ligger i en hög – sedan lyfter de och sorterar sig till en berättelse
      const sort = easeIO(seg(p, .3, .62)), n = this.sl.length;
      this.sl.forEach((e, i) => {
        const r1 = Math.sin(i * 12.9898) * 43758.5453 % 1, r2 = Math.cos(i * 78.233) * 12345.678 % 1;
        const px = 50 + r1 * 22, py = 72 + r2 * 8, pr = r1 * 40;
        const nc = portrait() ? 3 : 4, col = i % nc, row = Math.floor(i / nc), tx = (portrait() ? 20 : 14) + col * (portrait() ? 30 : 20), ty = (portrait() ? 26 : 28) + row * (portrait() ? 6.5 : 8);
        const x = px + (tx - px) * sort, y = py + (ty - py) * sort, rot = pr * (1 - sort);
        const lift = Math.sin(sort * Math.PI) * -6;
        e.style.left = x + "%"; e.style.top = (y + lift) + "%";
        e.style.transform = `translate(-50%, -50%) rotate(${rot + (sort < 1 ? Math.sin(t * 2 + i) * 2 * (1 - sort) : 0)}deg)`;
        e.style.opacity = 1 - seg(p, .6, .68);
      });
      reveal(this.b, p, .5, .62);
      const sl = this.sline || (this.sline = this.a.parentElement.querySelector(".story-line")), dl = easeIO(seg(p, .66, .8));
      sl.querySelector("path").style.strokeDashoffset = 1 - dl; sl.querySelector("circle").style.opacity = dl >= 1 ? 1 : 0; sl.style.opacity = portrait() ? 1 - seg(p, .84, .88) : 1;
      fadeIn(this.card, ease(seg(p, .84, .94)), 30);
    }
  });

  // 14b. Agentomaten – maskinen lyssnar och skriver mailet själv
  const AG = C.agentomaten;
  const agMail = `Till: ${AG.mail.to}\nÄmne: ${AG.mail.subject}\n\n${AG.mail.body.map(b => `– ${b}`).join("\n")}\n\n${AG.mail.note}`;
  scene({
    id: "agentomaten", t: AG.h, hud: "dark", len: 3.1, wipe: "circle", card: { glyph: "✉", room: "#0b41c2", light: true },
    html: `
      <i class="wall"></i>
      <p class="lab"><span class="md">##</span>${AG.h}</p>
      <p class="lead ag-lead">${lines([esc(AG.lead)])}</p>
      <p class="ag-listen"><i class="ag-dot"></i>${AG.listen}<span class="ag-wave">${Array.from({ length: 9 }, () => "<b></b>").join("")}</span></p>
      <p class="ag-p">${esc(AG.p)}</p>
      <div class="ag-win"><div class="file__bar"><span class="file__name">nytt mail · agentomaten</span><span>●●●</span></div><pre class="ag-text"></pre></div>
      <div class="ag-cta"><a class="cta" href="${AG.href}">Öppna Agentomaten →</a><a class="cta cta--ghost" href="mailto:${AG.mail.to}?subject=${encodeURIComponent(AG.mail.subject)}">Skicka till ${AG.mail.to}</a></div>`,
    init(el) { this.lead = $(".ag-lead", el); this.lab = $(".lab", el); this.listen = $(".ag-listen", el); this.bars = $$(".ag-wave b", el); this.pp = $(".ag-p", el); this.win = $(".ag-win", el); this.txt = $(".ag-text", el); this.cta = $(".ag-cta", el); },
    update(p, t) {
      this.lab.style.opacity = seg(p, 0, .06);
      reveal(this.lead, p, .03, .14);
      fadeIn(this.listen, ease(seg(p, .12, .2)));
      this.bars.forEach((b, i) => (b.style.transform = `scaleY(${.25 + Math.abs(Math.sin(t * 6 + i * .9)) * (p < .7 ? 1 : .3)})`));
      fadeIn(this.pp, ease(seg(p, .16, .26)));
      const k = ease(seg(p, .18, .3));
      this.win.style.opacity = k; this.win.style.transform = `translateY(${(1 - k) * 40}px) rotate(${(1 - k) * 3}deg)`;
      const n = Math.round(seg(p, .28, .78) * agMail.length);
      this.txt.innerHTML = esc(agMail.slice(0, n)) + (p < .8 ? '<i class="caret"></i>' : "");
      fadeIn(this.cta, ease(seg(p, .78, .88)));
    }
  });

  // 15. Event
  scene({
    id: "events", t: E.h, hud: "light", len: 2.5, wipe: "circle", card: { glyph: E.next.date, room: "#fc4109" },
    html: `
      <p class="lab"><span class="md">##</span>${E.h} · kommande</p>
      <p class="ev-date">${lines([E.next.date])}</p>
      <div class="ev-box"><h3>${esc(E.next.t)}</h3><p class="ev-when">${esc(E.next.when)}</p><p>${esc(E.next.p)}</p><a class="cta" href="${E.next.href}">Läs mer och anmäl dig</a></div>
      <p class="ev-past-h">GENOMFÖRDA EVENT</p>
      <ul class="ev-past">${E.past.map(x => `<li><span class="d">${x.date}</span><span class="t">${esc(x.t)}</span></li>`).join("")}</ul>`,
    init(el) { this.lab = $(".lab", el); this.d = $(".ev-date", el); this.box = $(".ev-box", el); this.past = $$(".ev-past li, .ev-past-h", el); },
    update(p) {
      this.lab.style.opacity = seg(p, 0, .06);
      reveal(this.d, p, .02, .2);
      fadeIn(this.box, ease(seg(p, .18, .34)));
      this.past.forEach((l, i) => fadeIn(l, ease(seg(p, .38 + i * .04, .5 + i * .04)), 16));
    }
  });

  // 16. Bibliotek
  const spineCols = ["#ffabc8", "#e7bfff", "#5d9dc5", "#f8d867", "#69b488", "#e83729", "#f4efe8", "#cb9cf8", "#a67325", "#fc4109"];
  const spines = Array.from({ length: 96 }, (_, i) => {
    const r = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1), r2 = Math.abs((Math.sin(i * 78.233) * 12345.678) % 1);
    return `<i class="spine" style="--w:${14 + Math.round(r * 22)}px;--h:${55 + Math.round(r2 * 40)}%;--c:${spineCols[i % spineCols.length]}"></i>`;
  }).join("");
  scene({
    id: "library", t: C.books.h, hud: "dark", len: 2.5, wipe: "circle", card: { glyph: "B", room: "#1c3d24", light: true },
    html: `
      <i class="wall"></i>
      <figure class="painting"><video src="assets/portrait.mp4" poster="assets/portrait.jpg" muted loop playsinline preload="none" aria-label="Porträtt"></video></figure>
      <div class="say"><span class="say-lab"><span class="md">##</span>${C.books.h}</span><p>${wordsOf(rich(C.books.say)).map(w => `<span class="w">${w}</span>`).join(" ")}</p></div>
      <p class="books-p">${esc(C.books.p)} <a href="${C.books.href}">Se hyllan →</a></p>
      <div class="shelf" aria-hidden="true">${spines}</div>`,
    init(el) { this.w = $$(".w", el); this.sp = $$(".spine", el); this.bp = $(".books-p", el); },
    update(p) {
      const n = this.w.length;
      this.w.forEach((w, i) => w.style.setProperty("--lit", clamp(seg(p, .05, .55) * n - i).toFixed(3)));
      this.sp.forEach((s, i) => (s.style.transform = `translateY(${(1 - ease(seg(p, .3 + i * .004, .5 + i * .004))) * 110}%)`));
      fadeIn(this.bp, ease(seg(p, .55, .7)));
    }
  });

  // 17. Kontakt – Newtons vagga från Figma-skissen
  scene({
    id: "contact", t: K.h, hud: "dark", len: 2.2, wipe: "circle", card: { glyph: "@", mono: true, room: "#e65564" },
    html: `
      <img class="c-photo" src="assets/goteborg-sunset.jpg" alt="Norra Hamngatan i solnedgång"><i class="c-tint"></i>
      <div class="cradle" aria-hidden="true">${[0, 1, 2, 3].map(i => `<span class="pend"><i></i><b></b></span>`).join("")}</div>
      <p class="lab"><span class="md">##</span>${K.h}</p>
      <p class="c-lead">${esc(K.p)}</p>
      <a class="c-mail" href="mailto:${K.email}">${K.email}</a>
      <div class="c-row"><span><span class="md">&gt;</span>${K.address}</span><a href="${K.linkedin}">LinkedIn</a><a href="https://missprym.tech">missprym.tech</a></div>
      <footer class="foot"><span>— Miss P Aktiebolag</span><button type="button" data-read>läs som text</button><b>MISSPRYM<span>.md</span></b></footer>`,
    init(el) { this.items = $$(".lab, .c-lead, .c-mail, .c-row, .foot", el); this.pend = $$(".pend", el); this.cradle = $(".cradle", el); },
    update(p, t) {
      this.items.forEach((it, i) => fadeIn(it, ease(seg(p, .02 + i * .06, .16 + i * .06))));
      // kulorna faller ner uppifrån och börjar slå
      const drop = ease(seg(p, 0, .3));
      this.cradle.style.transform = `translateY(${(1 - drop) * -100}%)`;
      const w = Math.sin(t * 3.2), A = 26 * drop;
      this.pend.forEach((pd, i) => {
        const ang = i === 0 ? Math.min(0, w) * A : i === 3 ? Math.max(0, w) * A : 0;
        pd.style.transform = `rotate(${-ang}deg)`;
      });
    }
  });

  { const i = S.findIndex(x => x.id === "together"); S.splice(1, 0, ...S.splice(i, 1)); }

  // Newtons vagga – affärsaktivism och solidarisk kapitalism: energi in → den rör många → resultat ut → det kommer tillbaka
  const CR = [["01", "we put energy in", "business activism"], ["02", "it moves through many", "people, clients, partners"], ["03", "a result swings out", "on the other side"], ["04", "and comes back", "stronger – solidarity capitalism"]];
  scene({
    id: "cradle", t: "solidarity capitalism", hud: "dark", len: 4.2, wipe: "circle", card: { glyph: "∘∘∘", room: "#3a4650", light: true },
    html: `
      <p class="lab"><span class="md">##</span>business activism · solidarity capitalism</p>
      <h2 class="nc-h">${lines(["We don't keep the energy.", "<span class='hl-human'>We pass it on.</span>"])}</h2>
      <div class="nc">
        <i class="nc-bar"></i>
        ${[0, 1, 2, 3, 4].map(i => `<span class="nc-p" style="--i:${i}"><i class="nc-s"></i><b class="nc-b">${["", "", "", "", ""][i]}</b></span>`).join("")}
        <i class="nc-wave"></i>
        <i class="nc-base"></i>
      </div>
      <ol class="nc-steps">${CR.map(([n, a, b]) => `<li><span class="md">${n}</span><b>${a}</b><em>${b}</em></li>`).join("")}</ol>`,
    init(el) { this.q = n => $(n, el); this.p = $$(".nc-p", el); this.st = $$(".nc-steps li", el); this.h = $(".nc-h", el); this.lab = $(".lab", el); this.wave = $(".nc-wave", el); },
    update(p, t) {
      this.lab.style.opacity = seg(p, 0, .05);
      reveal(this.h, p, .02, .12);
      // fas: 0 dra ut vänster kula → 1 släpp, slag → 2 vågen går genom → 3 höger kula svänger ut → 4 kommer tillbaka; sedan i loop
      const ph = seg(p, .14, .3), loopOn = p > .3;
      let a0 = 0, a4 = 0, wave = -1;
      if (!loopOn) { a0 = -38 * ease(ph); }
      else {
        // enkel symmetrisk modell
        const ang = Math.sin(t * 2.4) * 38;
        a0 = Math.min(0, ang); a4 = Math.max(0, ang);
        wave = Math.abs(ang) < 6 ? 1 - Math.abs(ang) / 6 : 0;
      }
      this.p.forEach((e, i) => e.style.transform = `rotate(${i === 0 ? a0 : i === 4 ? a4 : 0}deg)`);
      this.wave.style.opacity = loopOn ? wave : 0;
      // stegen tänds i takt med rörelsen
      const k = seg(p, .3, .7);
      this.st.forEach((l, i) => { const on = k * 4 > i; l.classList.toggle("on", on); });
      const cur = loopOn ? (a0 < -4 ? 0 : Math.abs(a0) + Math.abs(a4) < 6 ? 1 : a4 > 4 && Math.sin(t * 2.4 + Math.PI / 2) > 0 ? 2 : 3) : -1;
      this.st.forEach((l, i) => l.classList.toggle("now", p > .7 && i === cur));
    }
  });
  { const i = S.findIndex(x => x.id === "cradle"), [sc] = S.splice(i, 1), j = S.findIndex(x => x.id === "work"); S.splice(j, 0, sc); }

  // ===== manifeststrukturen (som human-md: en fil som läses uppifrån) =====
  const JOB = [["shift-1", "choose purpose over profit"], ["shift-2", "organise as a network"], ["shift-3", "empower, don't control"], ["chaos", "face the chaos together"], ["shift-4", "experiment, don't plan"], ["one-percent", "one percent, every day"], ["shift-5", "make it transparent"], ["what", "solve the real problems"], ["story", "see the story, not the CV"], ["lab", "build it, don't talk about it"]];
  const STOP = ["selling hours instead of value", "hiding behind the process", "planning things to death", "talking about AI instead of building with it", "keeping what we learn to ourselves", "choosing profit when it costs us our humanity"];
  const MORE = ["say no to the wrong assignment", "open-source what we build", "share the bookshelf", "experiment where people can see", "ask what the consultant actually wants", "be kind on purpose"];

  scene({
    id: "file", t: "what this file is", hud: "dark", len: 2.6, wipe: "circle", card: { glyph: "#", room: "#201e1f", light: true },
    html: `
      <div class="mf">
        <p class="mf-q">${lines(["&gt; a working manifesto.", "&gt; written for ourselves first.", "&gt; last edited at Norra Hamngatan 14."])}</p>
        <h2 class="mf-h"><span class="md">##</span> what this file is</h2>
        <img class="cameo cm-hero" src="${C.fig}team-hero.webp" alt="">
        <p class="mf-p">${lines(["A plain-text promise about how we behave", "when business gets difficult – and what", "we think people bring to the table now", "that the machines are getting good."])}</p>
      </div>`,
    init(el) { this.q = $(".mf-q", el); this.h = $(".mf-h", el); this.p = $(".mf-p", el); },
    update(p, t) { reveal(this.q, p, .02, .3); fadeIn(this.h, ease(seg(p, .32, .42)), 12); reveal(this.p, p, .42, .8);
      const hero = this.h.parentElement.querySelector(".cm-hero"); hero.style.transform = `translateX(${(1 - p) * 30}vw) translateY(${Math.abs(Math.sin(t * 3)) * -1.5}%)`; }
  });

  scene({
    id: "job", t: "the actual job", hud: "dark", len: 2.8, wipe: "circle", card: { glyph: "≡", room: "#201e1f", light: true },
    html: `
      <div class="toc">
        <img class="cameo cm-peek" src="${C.fig}team-glasses.webp" alt="">
        <div class="toc-bar"><i></i><i></i><i></i><span>MISSPRYM.md — ## the actual job</span></div>
        <ol class="toc-list">${JOB.map(([id, t], i) => `<li><a href="#${id}"><span class="ln-no">${String(i + 12).padStart(3, " ")}</span><span class="md">###</span> <b>${i + 1}.</b> ${t}</a></li>`).join("")}</ol>
      </div>`,
    init(el) { this.li = $$(".toc-list li", el); this.box = $(".toc", el); },
    update(p, t) {
      const kb = ease(seg(p, 0, .12)); this.box.style.opacity = kb; this.box.style.transform = `translate(-50%, calc(-50% + ${(1 - kb) * 30}px))`;
      const n = this.li.length;
      this.li.forEach((l, i) => { const k = seg(p, .1 + i * .06, .16 + i * .06); l.style.opacity = k; l.style.transform = `translateX(${(1 - ease(k)) * 20}px)`; l.classList.toggle("cur", k > 0 && k < 1); });
    }
  });

  scene({
    id: "lists", t: "stop doing / do more", hud: "light", len: 3.2, wipe: "circle", card: { glyph: "✕", room: "#fbf6ea" },
    html: `
      <div class="lists">
        <div class="lcol"><h3><span class="md">##</span> things we are trying to stop doing</h3><ul>${STOP.map(x => `<li><span class="st">${x}<i></i></span></li>`).join("")}</ul></div>
        <div class="lcol"><h3><span class="md">##</span> things we are trying to do more</h3><ul>${MORE.map(x => `<li><span class="hi">${x}</span></li>`).join("")}</ul></div>
      </div>
      <img class="cameo cm-dancer" src="${C.fig}team-dancer.webp" alt="">
      <p class="lists-end">${lines(["This file will change. That's the point.", "<span class='sig'>— Miss Prym, Norra Hamngatan 14</span>"])}</p>`,
    init(el) { this.st = $$(".st", el); this.hi = $$(".hi", el); this.lis = $$(".lcol li", el); this.end = $(".lists-end", el); this.hs = $$(".lcol h3", el); },
    update(p) {
      this.hs.forEach((h, i) => fadeIn(h, ease(seg(p, .02 + i * .3, .1 + i * .3)), 12));
      this.st.forEach((x, i) => { const k = seg(p, .06 + i * .04, .1 + i * .04); x.parentElement.style.opacity = k > 0 ? 1 : 0; x.style.setProperty("--k", easeIO(seg(p, .1 + i * .04, .16 + i * .04))); });
      this.hi.forEach((x, i) => { const k = seg(p, .36 + i * .04, .4 + i * .04); x.parentElement.style.opacity = k > 0 ? 1 : 0; x.style.setProperty("--k", easeIO(seg(p, .4 + i * .04, .46 + i * .04))); });
      reveal(this.end, p, .7, .86);
      const d = this.end.parentElement.querySelector(".cm-dancer"), k = ease(seg(p, .6, .78)); d.style.transform = `translateX(${(1 - k) * 60}vw) rotate(${(1 - k) * 12}deg)`;
    }
  });

  // ordning: filen först, innehållsförteckningen före principerna, listorna före kontakt
  { const mv = (id, beforeId) => { const i = S.findIndex(x => x.id === id), [sc] = S.splice(i, 1), j = S.findIndex(x => x.id === beforeId); S.splice(j, 0, sc); };
    mv("file", "commitment"); mv("job", "shift-1"); mv("lists", "contact"); }
  // numrera principerna – breadcrumben visar "### 3. empower, don't control"
  JOB.forEach(([id, t], i) => { const sc = S.find(x => x.id === id); if (sc) { sc.t = `${i + 1}. ${t}`; sc.num = true; } });

  // baksida på indexkorten: en rad ur innehållet
  const backs = { top: C.hero.quote.join(" "), commitment: C.commitment.lead, expertise: C.expertise.words.join(", "), human: plain(C.commitment.say), prym: C.quote.text, who: C.who.p[0], what: C.what.items.map(x => x.t).join(" · "), work: C.work.paths.map(x => x.t).join(" · "), together: "We provide our clients with open-minded consultants", file: "a working manifesto. written for ourselves first.", job: JOB.map(x => x[1]).join(" · "), cradle: "We don't keep the energy. We pass it on.", lists: "This file will change. That's the point.", "one-percent": "Standing still vs. one percent better every day.", finale: "Be proud. Be like Prym.", story: "You may only see a CV. We see a story.", chaos: "We don't fear chaos. We face it together.", lab: C.lab.sub, agentomaten: C.agentomaten.lead, events: E.next.t, library: C.books.p, contact: K.email };
  S.forEach(x => (x.back = backs[x.id] || (C.shifts[+x.id.split("-")[1] - 1] || {}).p || ""));

  // 18. Finalen – stumfilm: landsväg i solnedgång, två figurer mot horisonten, iris, eftertexter, The End
  const P = [0, 1, 2, 3, 4, 5, 6].map(i => { const d = Math.pow(.66, i); return { r: 50 + 40 * d, l: 50 - 40 * d, base: 56 + 40 * d, h: 34 * d }; });
  const wire = side => P.map((q, i) => { const x = side > 0 ? q.r : q.l, y = q.base - q.h + q.h * .08; if (!i) return `M${x} ${y}`; const o = P[i - 1], ox = side > 0 ? o.r : o.l, oy = o.base - o.h + o.h * .08; return `Q ${(x + ox) / 2} ${(y + oy) / 2 + 1.6 * (o.h / 34) + .3} ${x} ${y}`; }).join(" ");
  const credits = [["Starring", C.expertise.words.slice(0, 10).join("<br>")], ["Inspired by", "Fröken Prym"], ["Directed by", "Courage"], ["Produced by", "Miss P Aktiebolag"], ["Filmed on location", "Norra Hamngatan 14, Göteborg"]];
  scene({
    id: "finale", t: "the end", hud: "dark", len: 5, wipe: "fade", card: { glyph: "∎", room: "#1a1a1a", light: true },
    html: `
      <div class="silent">
        <div class="frame">
          <div class="sky"></div><i class="sun"></i>
          <div class="clouds"><i></i><i></i><i></i></div>
          <img class="crow-fly" src="${C.fig}bird-crow.webp" alt="">
          <div class="hills h3"></div><div class="hills h2"></div><div class="hills h1"></div>
          <div class="road"><i class="tarmac"></i><i class="midline"></i></div>
          <svg class="poles" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${P.map(q => [q.r, q.l].map(x => `<line class="pole" x1="${x}" y1="${q.base}" x2="${x}" y2="${q.base - q.h}"/><line class="arm" x1="${x - q.h * .12}" y1="${q.base - q.h + q.h * .08}" x2="${x + q.h * .12}" y2="${q.base - q.h + q.h * .08}"/>`).join("")).join("")}
            <path class="wire" d="${wire(1)}"/><path class="wire" d="${wire(-1)}"/>
          </svg>
          <div class="pair"><i class="pair-sh"></i><img class="walk w-a" src="${C.fig}statue-justitia.webp" alt=""><img class="walk w-b" src="${C.fig}statue-venus.webp" alt=""></div>
          <i class="dust"></i>
        </div>
        <i class="iris"></i>
        <div class="title-card tc1"><span class="tc-mark">MISS PRYM PICTURES</span><p>”Is it even worth trying?”</p></div>
        <div class="title-card tc2"><span class="tc-mark">MISS PRYM PICTURES</span><p>Be proud.<br><em>Be like Prym.</em></p></div>
        <div class="title-card tc-credits"><div class="roll">${credits.map(([h, v]) => `<div class="cr"><span>${h}</span><p>${v}</p></div>`).join("")}</div></div>
        <div class="title-card tc3">
          <p class="fin">The End<i></i></p>
          <p class="fin-sub">MISS P AKTIEBOLAG · GÖTEBORG · ${new Date().getFullYear()}</p>
          <a class="fin-mail" href="mailto:${K.email}">${K.email}</a>
          <div class="fin-btns"><button type="button" class="fin-btn" data-replay>↺ se igen</button><button type="button" class="fin-btn" data-read>läs som text</button></div>
        </div>
        <div class="sprockets l"></div><div class="sprockets r"></div>
        <i class="flick"></i><i class="vign"></i><i class="scratch s1"></i><i class="scratch s2"></i><i class="burn"></i>
      </div>`,
    init(el) { this.q = n => $(n, el); },
    update(p, t) {
      const q = this.q, show = (e, a, b) => { e.style.opacity = seg(p, a, a + .025) * (1 - seg(p, b - .025, b)); };
      show(q(".tc1"), 0, .13); show(q(".tc2"), .4, .52);
      const j = (Math.sin(t * 37) + Math.sin(t * 61)) * .5;
      q(".frame").style.transform = `translate(${j * 1.4}px, ${Math.sin(t * 43) * 1.8}px)`;
      const w = seg(p, .11, .72);
      q(".sun").style.transform = `translate(-50%, ${w * 55}%)`;
      q(".clouds").style.transform = `translateX(${-w * 12}vw)`;
      const cf = seg(p, .14, .42);
      q(".crow-fly").style.transform = `translate(${-20 + cf * 140}vw, ${-Math.sin(cf * Math.PI) * 8}vh) scaleX(-1) rotate(${Math.sin(t * 9) * 6}deg)`;
      q(".crow-fly").style.opacity = cf > 0 && cf < 1 ? .9 : 0;
      q(".pair").style.transform = `translateX(-50%) translateY(${-w * 37}vh) scale(${1 - w * .86})`;
      q(".w-a").style.transform = `translateY(${-Math.abs(Math.sin(t * 5)) * 3}%) rotate(${Math.sin(t * 5) * 2}deg)`;
      q(".w-b").style.transform = `scaleX(-1) translateY(${-Math.abs(Math.sin(t * 5 + 1.6)) * 3}%) rotate(${Math.sin(t * 5 + 1.6) * 2}deg)`;
      const ir = easeIO(seg(p, .64, .74));
      q(".iris").style.background = `radial-gradient(circle at 50% ${66 - w * 22}%, transparent ${(1 - ir) * 85}vmax, #0b0a09 ${(1 - ir) * 85 + .3}vmax)`;
      // eftertexterna rullar uppåt
      const cr = seg(p, .74, .9), roll = q(".roll");
      q(".tc-credits").style.opacity = seg(p, .74, .76) * (1 - seg(p, .89, .91));
      roll.style.transform = `translateY(${(1 - cr) * 60 - cr * (roll.offsetHeight / innerHeight * 100) * .9}vh)`;
      q(".tc3").style.opacity = seg(p, .91, .95);
      $$(".tc3 > *", q(".silent")).forEach((e, i) => (e.style.transform = `translateY(${(1 - ease(seg(p, .91 + i * .012, .96 + i * .012))) * 18}px)`));
      q(".flick").style.opacity = .04 + Math.abs(Math.sin(t * 23)) * .06;
      q(".s1").style.left = `${(Math.sin(t * 3.1) * .5 + .5) * 100}%`; q(".s1").style.opacity = Math.sin(t * 7) > .6 ? .45 : 0;
      q(".s2").style.left = `${(Math.cos(t * 1.7) * .5 + .5) * 100}%`; q(".s2").style.opacity = Math.sin(t * 5 + 2) > .8 ? .3 : 0;
      q(".burn").style.opacity = seg(p, .975, 1) * .75;
      $$(".sprockets", q(".silent")).forEach(sp => (sp.style.backgroundPositionY = `${(t * 140) % 64}px`));
    }
  });

  /* ================= bygg scenen ================= */
  const stage = $("#stage");
  stage.innerHTML = S.map(s => `<section class="L L-${s.id.replace(/-\d+$/, "")}" id="${s.id}" ${s.style ? `style="${s.style}"` : ""}>${s.html}</section>`).join("") + `<i class="wipe-ring"></i>`;
  const ring = $(".wipe-ring");
  S.forEach(s => { s.el = document.getElementById(s.id); s.init?.(s.el); });

  const WIPE = .9; // skärmhöjder som en övergång tar
  let VH = innerHeight, total = 0;
  const measure = () => {
    VH = innerHeight; total = 0;
    S.forEach(s => { s.start = total; total += s.len; });
    $("#scroll").style.height = `${(total + 1) * VH}px`;
    S.forEach(s => s.layout?.());
    window.__scenes = S.map(s => ({ id: s.id, start: s.start, len: s.len }));
  };

  /* ================= renderloop ================= */
  let cur = scrollY, mx = innerWidth * .72, my = innerHeight * .62, active = null, prevVisible = [];
  const body = document.body;
  const crumb = $(".hud-crumb"), crumbT = $(".hud-crumb__t");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let clock = 0, pausedFor = 0, pausedAt = 0, lastVis = "";
  const prog = $(".prog i");
  function render() {
    const target = scrollY;
    cur += (target - cur) * (reduced ? 1 : .1);
    if (Math.abs(target - cur) < .4) cur = target;
    const pos = cur / VH;

    let k = S.findIndex(s => pos < s.start + s.len); if (k < 0) k = S.length - 1;
    const s = S[k], p = clamp((pos - s.start) / s.len);
    const wp = s.wipe ? (pos - s.start) / WIPE : 1; // 0..1 under övergången
    const visible = [s];
    if (k > 0 && wp < 1) visible.push(S[k - 1]);

    S.forEach(x => {
      const on = visible.includes(x);
      x.el.classList.toggle("is-on", on);
      x.el.classList.toggle("is-top", x === s && visible.length > 1);
      x.el.classList.toggle("is-under", on && x !== s);
    });
    if (!body.classList.contains("paused")) clock = performance.now() / 1000 - pausedFor;
    const T = clock;
    prog.style.transform = `scaleX(${clamp(pos / total)})`;
    s.update?.(p, T);
    if (visible.length > 1) S[k - 1].update?.(1, T);

    // övergång
    if (visible.length > 1 && s.wipe === "circle") {
      const R = Math.hypot(innerWidth, innerHeight) * 1.05, t = easeIO(clamp(wp));
      const r = t * R, ox = mx, oy = my;
      s.el.style.clipPath = `circle(${r}px at ${ox}px ${oy}px)`;
      s.el.style.opacity = 1;
      ring.style.visibility = "visible";
      ring.style.clipPath = `circle(${r + Math.max(6, innerWidth * .009) * Math.sin(t * Math.PI)}px at ${ox}px ${oy}px)`;
    } else {
      s.el.style.clipPath = "";
      s.el.style.opacity = visible.length > 1 && s.wipe === "fade" ? easeIO(clamp(wp)) : 1;
      ring.style.visibility = "hidden";
    }

    // filmer spelas bara i de scener som syns – sparar batteri och data
    if (visible.map(v => v.id).join() !== lastVis) {
      lastVis = visible.map(v => v.id).join();
      S.forEach(x => $$("video", x.el).forEach(v => {
        if (visible.includes(x) && !body.classList.contains("paused")) { if (v.preload !== "auto") v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
      }));
    }
    if (active !== s) {
      active = s;
      body.dataset.hud = s.hud;
      crumb.classList.toggle("is-on", s.id !== "top");
      crumbT.textContent = s.t;
      crumb.querySelector(".md").textContent = s.num ? "###" : "##";
      $(".hud-count").textContent = `${String(k + 1).padStart(2, "0")} / ${String(S.length).padStart(2, "0")}`;
    }

    dot.style.transform = `translate(${dx += (mx - dx) * .2}px, ${dy += (my - dy) * .2}px)`;
    requestAnimationFrame(render);
  }

  /* ================= markdown (fil + läsläge) ================= */
  const md = [
    `# MISSPRYM.md`, ``,
    ...C.hero.quote.map(q => `> ${q}`), ``,
    `## ${C.commitment.h}`, ``, `${C.commitment.lead} ${C.commitment.body}`, ``, `*${plain(C.commitment.say)}*`, ``,
    `> ${C.quote.text}`, `> — ${C.quote.src}`, ``,
    `## what this file is`, ``, `A plain-text promise about how we behave when business gets difficult – and what we think people bring to the table now that the machines are getting good.`, ``,
    `## the actual job`, ``, ...JOB.map(([, t], i) => `${i + 1}. ${t}`), ``,
    `## ${C.who.h}`, ``, ...C.who.p.flatMap(p => [p, ``]),
    ...C.shifts.flatMap((s, i) => [`### ${i + 1}. from ${s.from.toLowerCase()} to ${s.to.toLowerCase()}`, ``, s.p, ``]),
    `---`, ``,
    `## ${C.what.h}`, ``, ...C.what.items.map(it => `- **${it.t}.** ${it.p}`), ``,
    `## ${C.work.h}`, ``, ...C.work.paths.map(w => `- **${w.t}.** ${w.p}`), ``,
    `## ${C.lab.h}`, ``, C.lab.sub, ``, ...C.lab.items.map(l => `- **${l.t}** (${l.href}) — ${l.p}`), ``,
    `## ${AG.h}`, ``, AG.lead, ``, AG.p, ``, ...agMail.split("\n"), ``, `${AG.href}`, ``,
    `## ${E.h}`, ``, `**${E.next.t}** — ${E.next.when}`, ``, E.next.p, ``, ...E.past.map(p => `- ${p.date} · ${p.t}. ${p.p}`), ``,
    `## ${C.books.h}`, ``, `${plain(C.books.say)}`, ``, C.books.p, ``,
    `---`, ``,
    `## business activism · solidarity capitalism`, ``, `We don't keep the energy. We pass it on.`, ``, ...CR.map(([n, a, b]) => `${+n}. ${a} – ${b}`), ``,
    `## things we are trying to stop doing`, ``, ...STOP.map(x => `- ${x}`), ``, `## things we are trying to do more`, ``, ...MORE.map(x => `- ${x}`), ``, `This file will change. That's the point.`, ``,
    `## ${K.h}`, ``, K.p, ``, `${K.address}  `, `${K.email}  `, `${K.linkedin}`, ``,
    `— Miss P Aktiebolag`
  ].join("\n");

  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1">$1</a>').replace(/([\w.]+@[\w.]+\.\w+)/g, '<a href="mailto:$1">$1</a>');
  $("#read").innerHTML = (() => {
    let out = `<header><p class="read__by">${C.byline}</p><h1>MISSPRYM<span class="md2">.md</span></h1>`, inList = false, inQuote = false, headerClosed = false;
    const close = () => { if (inList) { out += "</ul>"; inList = false; } if (inQuote) { out += "</blockquote>"; inQuote = false; } };
    md.split("\n").slice(1).forEach(l => {
      if (l.startsWith("## ") && !headerClosed) { close(); out += "</header>"; headerClosed = true; }
      if (l.startsWith("> ")) { if (inList) { out += "</ul>"; inList = false; } if (!inQuote) { out += "<blockquote>"; inQuote = true; } out += `<p>&gt; ${inline(l.slice(2))}</p>`; return; }
      if (l.startsWith("- ")) { if (inQuote) { out += "</blockquote>"; inQuote = false; } if (!inList) { out += "<ul>"; inList = true; } out += `<li>${inline(l.slice(2))}</li>`; return; }
      close();
      if (l.startsWith("### ")) out += `<h3>### ${esc(l.slice(4))}</h3>`;
      else if (l.startsWith("## ")) out += `<h2>## ${esc(l.slice(3))}</h2>`;
      else if (l === "---") out += "<hr>";
      else if (l.trim()) out += `<p>${inline(l)}</p>`;
    });
    close();
    return out + `<p class="read__back"><a href="#top" data-unread>← tillbaka till sajten</a></p>`;
  })();

  /* ================= index ================= */
  // varje kort får en liten bild ur sin egen scen, i scenens färg – som korten i human-md
  const F = C.fig, im = (src, cls = "") => `<img class="th ${cls}" src="${src}" alt="" loading="lazy">`;
  const word = (w, cls = "") => `<span class="th-word ${cls}">${w}</span>`;
  const TH = {
    top: [`<span class="th-crt"><span><img src="assets/agentomaten-face.jpg" alt=""></span></span>`, "#f4f1ea"],
    together: [`<span class="th-cards"><i style="--b:#f0bad9"></i><i style="--b:#f7eaad"></i><i style="--b:#b9bee9"></i></span>`, "#f4f1ea"],
    commitment: [word("human", "pink"), "#0b41c2"],
    expertise: [im(F + "puppet-man.webp", "fig"), "#ffabc8"],
    human: [im("assets/prym-give.jpg", "cover"), "#3a4650"],
    prym: [im("assets/street-lamps.jpg", "cover duo"), "#0b41c2"],
    who: [im("assets/team-thumb.jpg", "cover"), "#2a2622"],
    "shift-1": [im(F + "purpose-woman.webp", "fig"), "#ffc2e3"],
    "shift-2": [im(F + "bird-crow.webp", "fig") + `<i class="th-balloon"></i>`, "#a9b2c3"],
    "shift-3": [im(F + "emp-free.webp", "fig wide"), "#ffecaa"],
    chaos: [word("Chaos.", "pink serif"), "#0b41c2"],
    "shift-4": [im(F + "exp-flasks.webp", "fig"), "#e65564"],
    "one-percent": [`<span class="th-bars">${Array.from({ length: 12 }, (_, i) => `<i style="--h:${(Math.pow(1.35, i) / Math.pow(1.35, 11) * 100).toFixed(0)}%"></i>`).join("")}</span>`, "#111111"],
    "shift-5": [im(C.img + "OTTransparency_phone.jpg", "cover"), "#b8c2ea"],
    what: [`<span class="th-cl">${cloche}</span>`, "#ffeaa6"],
    work: [im(F + "statue-justitia.webp", "fig") + `<i class="th-rope"></i>`, "#26512f"],
    lab: [`<svg class="th-gear" viewBox="-110 -110 220 220"><path d="${gearPath(100, 80, 14)}"/><circle r="30"/></svg>`, "#cf4a1a"],
    story: [`<span class="th-slips"><i>deltog i</i><i>beslut</i><i>resultat</i></span>`, "#f7eaad"],
    agentomaten: [`<span class="th-mail">✉<b></b></span>`, "#0b41c2"],
    events: [word("26/11", "red serif"), "#fbf6ea"],
    library: [im("assets/portrait.jpg", "cover"), "#1c3d24"],
    contact: [im("assets/goteborg-sunset.jpg", "cover"), "#e65564"],
    file: [`<span class="th-word" style="color:#f4efe8;font-family:var(--f-mono);font-weight:400">.md</span>`, "#201e1f"],
    job: [`<span class="th-toc">${JOB.slice(0, 5).map((x, i) => `<i>${i + 1}. ${x[1]}</i>`).join("")}</span>`, "#201e1f"],
    lists: [`<span class="th-slips"><i style="text-decoration:line-through">planning</i><i>be kind</i></span>`, "#fbf6ea"],
    cradle: [`<span class="th-cradle">${[0,1,2,3,4].map(i => `<i style="--i:${i}"></i>`).join("")}</span>`, "#3a4650"],
    finale: [`<span class="th-end">${im(F + "statue-justitia.webp", "sil")}${im(F + "statue-venus.webp", "sil")}</span>`, "#d8d0c2"]
  };
  $(".index__track").innerHTML = S.map((s, i) => {
    const c = s.card, th = TH[s.id];
    if (th) { c.room = th[1]; }
    const pic = th ? th[0] : c.img ? `<img src="${C.img}${c.img}" alt="" loading="lazy">` : c.fig ? `<img src="${C.fig}${c.fig}" alt="" loading="lazy" style="object-fit:contain;padding:8%">` : `<span class="icard__glyph${c.mono ? " mono" : ""}" ${c.light ? 'style="color:#f4efe8"' : ""}>${c.glyph}</span>`;
    return `<a class="icard" href="#${s.id}" style="--a:${tilt[i]}deg;--room:${c.room}"><span class="icard__in"><span class="icard__face"><span class="icard__pic" style="--room:${c.room}">${pic}</span><span class="icard__n">${i + 1}</span><span class="icard__t">${s.t}</span></span><span class="icard__back"><span class="icard__file">## ${s.t}\n\n${esc((s.back || "").slice(0, 150))}</span></span></span><i class="icard__dot"></i></a>`;
  }).join("") + `<a class="icard" href="#file" data-file style="--a:${tilt[17]}deg"><span class="icard__face"><span class="icard__pic" style="--room:#0b0b0b"><span class="icard__glyph mono">.md</span></span><span class="icard__n">↓</span><span class="icard__t">MISSPRYM.md — hela filen</span></span></a>`;

  const setIndex = open => {
    body.classList.toggle("index-open", open);
    $("[data-index]").setAttribute("aria-expanded", open);
    $(".index").hidden = false;
    if (open) $$(".icard").forEach(c => c.classList.toggle("is-here", c.getAttribute("href") === "#" + active?.id));
  };
  $("[data-index]").addEventListener("click", () => setIndex(!body.classList.contains("index-open")));

  /* ================= .md-fönster ================= */
  const fileEl = $(".file");
  $(".file__text").innerHTML = esc(md).split("\n").map(l => /^#{1,3} /.test(l) ? `<span class="h">${l}</span>` : /^&gt; /.test(l) ? `<span class="q">${l}</span>` : l).join("\n");
  const openFile = () => { setIndex(false); fileEl.hidden = false; $(".file__text").focus(); };
  const closeFile = () => (fileEl.hidden = true);
  $$("[data-file]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openFile(); }));
  $$("[data-close]").forEach(b => b.addEventListener("click", closeFile));
  $("[data-copy]").addEventListener("click", async e => { try { await navigator.clipboard.writeText(md); e.target.textContent = "copied ✓"; } catch { e.target.textContent = "kunde inte kopiera"; } setTimeout(() => (e.target.textContent = "copy"), 1600); });
  $("[data-download]").addEventListener("click", () => {
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([md], { type: "text/markdown" })), download: "MISSPRYM.md" });
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  addEventListener("keydown", e => { if (e.key === "Escape") { closeFile(); setIndex(false); } });

  /* ================= läsläge ================= */
  const setReading = on => { document.documentElement.classList.toggle("reading", on); scrollTo(0, 0); cur = 0; history.replaceState(null, "", on ? "#read" : "#top"); };
  document.addEventListener("click", e => {
    if (e.target.closest("[data-read]")) { e.preventDefault(); setReading(true); return; }
    if (e.target.closest("[data-unread]")) { e.preventDefault(); setReading(false); return; }
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute("data-file")) return;
    const s = S.find(x => "#" + x.id === a.getAttribute("href"));
    if (!s) return;
    e.preventDefault();
    if (document.documentElement.classList.contains("reading")) setReading(false);
    setIndex(false); stopWatch();
    const into = s.start + (s.id === "top" ? 0 : Math.min(s.len * .5, 1.4));
    scrollTo({ top: into * VH, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    cur = into * VH - VH * .6; // kort glidning in i scenen
  });
  if (location.hash === "#read") document.documentElement.classList.add("reading");

  /* ================= watch ================= */
  const watchBtn = $("[data-watch]"), watchT = $(".hud-watch__t");
  let watching = false, last = 0;
  const step = t => {
    if (!watching) return;
    const dt = last ? Math.min(50, t - last) : 16; last = t;
    scrollBy(0, dt * VH / 2200);
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) return stopWatch();
    requestAnimationFrame(step);
  };
  function stopWatch() { watching = false; watchBtn.setAttribute("aria-pressed", "false"); watchT.textContent = "watch"; }
  watchBtn.addEventListener("click", () => {
    if (watching) return stopWatch();
    watching = true; last = 0; watchBtn.setAttribute("aria-pressed", "true"); watchT.textContent = "pause";
    requestAnimationFrame(step);
  });
  ["wheel", "touchstart"].forEach(ev => addEventListener(ev, () => watching && stopWatch(), { passive: true }));
  addEventListener("keydown", e => { if (watching && e.key !== " ") stopWatch(); });

  /* ================= prick & öga ================= */
  const dot = $(".dot"), eye = $(".hud-mark");
  let dx = mx, dy = my;
  const tch = $$(".o-title .ch");
  addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    if (active?.id === "top") tch.forEach(c => {
      const r = c.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < r.height * .6 && !c.classList.contains("hop")) { c.classList.add("hop"); setTimeout(() => c.classList.remove("hop"), 520); }
    });
    mx = e.clientX; my = e.clientY;
    const hit = e.target.closest("a, button");
    dot.classList.toggle("is-big", !!hit);
    dot.dataset.label = hit ? (hit.matches(".icard, [data-go]") ? "go" : hit.matches("[data-index]") ? "" : "open") : "";
    const r = eye.getBoundingClientRect(), ax = mx - (r.left + r.width / 2), ay = my - (r.top + r.height / 2), d = Math.hypot(ax, ay) || 1;
    eye.style.setProperty("--ex", (ax / d * Math.min(9, d / 30)).toFixed(1) + "px");
    eye.style.setProperty("--ey", (ay / d * Math.min(4, d / 60)).toFixed(1) + "px");
  });

  document.addEventListener("click", e => {
    const pb = e.target.closest("[data-pause]"); if (!pb) return;
    const on = !body.classList.contains("paused"); body.classList.toggle("paused", on); pb.setAttribute("aria-pressed", on);
    if (on) pausedAt = performance.now() / 1000; else pausedFor += performance.now() / 1000 - pausedAt;
    if (on) $$("video").forEach(v => v.pause()); else lastVis = "";
  });
  document.addEventListener("click", e => { if (e.target.closest("[data-replay]")) { cur = 0; scrollTo(0, 0); window.__t0 = performance.now(); } });
  document.addEventListener("click", e => { if (e.target.closest("[data-next]")) { const n = S[1]; scrollTo({ top: (n.start + .6) * VH, behavior: "smooth" }); } });

  /* ================= verktygen i egen design ================= */
  const TOOLS = [
    { id: "uppdrag", t: "Uppdragsautomaten", href: "https://missprym.tech/uppdragsautomaten/" },
    { id: "intervju", t: "Intervjuomaten", href: "https://missprym.tech/intervjuomaten/" },
    { id: "agent", t: "Agentomaten", href: "https://missprym.tech/agentomaten/" },
    { id: "stoic", t: "Stoicism", href: "https://missprym.tech/stoicm-service/" },
    { id: "event", t: "Event", href: "https://missprym.tech/event/" }
  ];
  const API = "https://missprym.tech/uppdragsautomaten-api/api/public-assignments";
  const appEl = $(".app"), appTabs = $(".app__tabs"), appBody = $(".app__body"), appExt = $(".app__ext");
  appTabs.innerHTML = TOOLS.map(x => `<button type="button" class="app__tab" data-tool="${x.id}">${x.t}</button>`).join("");
  let assignments = null;
  const fmtDate = d => { try { return new Date(d).toLocaleDateString("sv-SE", { day: "numeric", month: "short" }); } catch { return ""; } };
  const words = q => q.toLowerCase().split(/[^a-zåäö0-9#+.]+/i).filter(w => w.length > 1);
  function renderUppdrag() {
    appBody.innerHTML = `
      <div class="ua">
        <div class="ua-side">
          <p class="lab"><span class="md">##</span>uppdragsautomaten</p>
          <h3 class="ua-h">Beskriv vad du kan<br><em>– vi hittar uppdragen.</em></h3>
          <textarea class="ua-q" rows="4" placeholder="T.ex. Java, Spring, Göteborg, systemarkitekt, tillgänglig mars…"></textarea>
          <div class="ua-f">${[["all", "Alla"], ["2", "2 dygn"], ["7", "Veckan"]].map(([v, l], i) => `<button type="button" class="chip${i ? "" : " on"}" data-days="${v}">${l}</button>`).join("")}</div>
          <p class="ua-meta">Hämtar uppdrag…</p>
        </div>
        <div class="ua-list" aria-live="polite"></div>
      </div>`;
    const q = $(".ua-q", appBody), list = $(".ua-list", appBody), meta = $(".ua-meta", appBody);
    let days = "all";
    const draw = () => {
      if (!assignments) return;
      const ws = words(q.value), now = Date.now();
      let rows = assignments.filter(a => days === "all" || now - new Date(a.receivedAt || a.firstSeen).getTime() < +days * 864e5);
      rows = rows.map(a => {
        const hay = [a.title, a.summary, a.location, ...(a.skills || [])].join(" ").toLowerCase();
        const score = ws.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
        return { a, score };
      }).filter(r => !ws.length || r.score > 0).sort((x, y) => y.score - x.score || new Date(y.a.receivedAt) - new Date(x.a.receivedAt));
      meta.textContent = `${rows.length} aktuella behov${ws.length ? " som matchar" : ""}`;
      list.innerHTML = rows.slice(0, 60).map(({ a, score }) => `
        <article class="ua-card">
          <div class="ua-top"><span class="ua-ref">${esc(a.reference || a.id || "")}</span><span class="ua-date">${fmtDate(a.receivedAt || a.firstSeen)}</span>${ws.length ? `<span class="ua-score">${"●".repeat(Math.min(5, score))}</span>` : ""}</div>
          <h4>${esc(a.title || "Uppdrag")}</h4>
          <p class="ua-loc">${esc(a.location || "")}</p>
          ${a.summary ? `<p class="ua-sum">${esc(a.summary)}</p>` : ""}
          <div class="ua-skills">${(a.skills || []).slice(0, 8).map(k => `<span>${esc(String(k))}</span>`).join("")}</div>
          <a class="cta ua-cta" href="mailto:${K.email}?subject=${encodeURIComponent(`AGENTOMATEN – ${a.reference || a.id} – Kandidat – `)}">Intresserad →</a>
        </article>`).join("") || `<p class="ua-empty">Inga träffar ännu – prova färre eller andra ord.</p>`;
    };
    q.addEventListener("input", draw);
    $$(".chip", appBody).forEach(c => c.addEventListener("click", () => { $$(".chip", appBody).forEach(x => x.classList.remove("on")); c.classList.add("on"); days = c.dataset.days; draw(); }));
    if (assignments) draw();
    else fetch(API).then(r => r.json()).then(j => { assignments = (j.assignments || []).filter(a => a.public !== false); draw(); })
      .catch(() => { meta.innerHTML = `Kunde inte hämta uppdragen just nu. <a href="${TOOLS[0].href}" target="_blank" rel="noopener">Öppna Uppdragsautomaten ↗</a>`; });
    setTimeout(() => q.focus(), 300);
  }
  function openTool(id) {
    const tool = TOOLS.find(x => x.id === id) || TOOLS[0];
    $$(".app__tab", appTabs).forEach(b => b.classList.toggle("on", b.dataset.tool === tool.id));
    appExt.href = tool.href;
    if (tool.id === "uppdrag") renderUppdrag();
    else appBody.innerHTML = `<iframe class="app__frame" src="${tool.href}" title="${tool.t}" loading="lazy"></iframe>`;
    if (appEl.hidden) { appEl.hidden = false; body.classList.add("app-open"); stopWatch(); }
  }
  const closeTool = () => { appEl.hidden = true; body.classList.remove("app-open"); appBody.innerHTML = ""; };
  appTabs.addEventListener("click", e => { const b = e.target.closest("[data-tool]"); if (b) openTool(b.dataset.tool); });
  $$("[data-app-close]").forEach(b => b.addEventListener("click", closeTool));
  addEventListener("keydown", e => { if (e.key === "Escape" && !appEl.hidden) closeTool(); });
  // alla länkar till verktygen öppnas i fönstret i stället för att lämna sajten
  const toolFromHref = h => h && (/uppdragsautomat|uppdragsslumpomat/.test(h) ? "uppdrag" : /intervjuomaten/.test(h) ? "intervju" : /agentomaten/.test(h) ? "agent" : /stoicm/.test(h) ? "stoic" : /missprym\.tech\/event/.test(h) ? "event" : null);
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]"); if (!a || a.closest(".app")) return;
    const id = toolFromHref(a.getAttribute("href")) || (a.getAttribute("href") === "#agentomaten" ? "agent" : null);
    if (!id) return;
    e.preventDefault(); e.stopPropagation(); openTool(id);
  }, true);

  /* ================= den röda tråden: en rälsprick per scen ================= */
  const rail = document.createElement("nav");
  rail.className = "rail"; rail.setAttribute("aria-label", "Scener");
  rail.innerHTML = `<i class="rail-line"><i></i></i>` + S.map((x, i) => `<a href="#${x.id}" style="--y:${(i / (S.length - 1) * 100).toFixed(2)}%" title="${x.t}"><span>${x.t}</span></a>`).join("");
  document.body.appendChild(rail);
  const railDots = $$("a", rail), railFill = $(".rail-line i", rail);
  (function railLoop() {
    const k = active ? S.indexOf(active) : 0;
    railDots.forEach((d, i) => { d.classList.toggle("on", i === k); d.classList.toggle("past", i < k); });
    railFill.style.transform = `scaleY(${k / (S.length - 1)})`;
    requestAnimationFrame(railLoop);
  })();
  // pricken visar vägen när man står still
  let idleT = 0;
  const idle = () => { clearTimeout(idleT); body.classList.remove("idle"); idleT = setTimeout(() => body.classList.add("idle"), 2600); };
  ["scroll", "pointermove", "touchstart", "keydown"].forEach(ev => addEventListener(ev, idle, { passive: true })); idle();
  document.body.insertAdjacentHTML("beforeend", `<div class="way" aria-hidden="true"><i></i><span>scroll</span></div>`);

  /* ================= ögat blinkar ================= */
  const lid = $(".hud-mark__blink");
  (function blink() { lid?.classList.add("is-on"); setTimeout(() => lid?.classList.remove("is-on"), 140); setTimeout(blink, 2600 + Math.random() * 4200); })();

  /* ================= start ================= */
  addEventListener("resize", measure);
  let started = false;
  const loader = $(".loader"), lnum = $(".loader-n");
  const imgs = $$("img, video[poster]"); let done = 0;
  const bump = () => { done++; lnum.textContent = String(Math.min(99, Math.round(done / Math.max(1, imgs.length) * 100))).padStart(2, "0"); };
  imgs.forEach(im => { if (im.complete) bump(); else { im.addEventListener("load", bump, { once: true }); im.addEventListener("error", bump, { once: true }); } });
  const start = () => { if (started) return; started = true; lnum.textContent = "100"; setTimeout(() => loader.classList.add("is-out"), 260); setTimeout(() => loader.remove(), 1400); window.__t0 = performance.now() + 500; measure(); body.classList.remove("is-loading"); requestAnimationFrame(render); };
  (document.fonts?.ready || Promise.resolve()).then(() => setTimeout(start, 700));
  setTimeout(start, 1500);
})();
