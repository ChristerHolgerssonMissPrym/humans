(() => {
  const C = window.PRYM;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // <h>…</h> = mänskligt (serif), <m>…</m> = maskin (mono)
  const rich = s => s.replace(/<h>(.*?)<\/h>/g, '<span class="hl-human">$1</span>').replace(/<m>(.*?)<\/m>/g, '<span class="hl-machine">$1</span>');
  const plain = s => s.replace(/<\/?[hm]>/g, "");
  const tilt = [-2.2, 1.6, -1, 2.4, -1.8, 1.1, -2.6, 1.9, -.8, 2.1, -1.5, 1.4, -2, .9, 2.6, -1.2];
  const isMobile = () => matchMedia("(max-width: 900px)").matches;
  const lines = arr => arr.map(t => `<span class="ln-mask"><span class="ln">${t}</span></span>`).join("");

  /* ---------------- scener ---------------- */
  // Varje scen: id, titel (crumb + index), hud-ton, kort-bild/glyf
  const scenes = [];
  const add = (o) => (scenes.push(o), o);

  const titleChars = (s, start = 0) => [...s].map((c, i) => `<span class="ch" style="--i:${i + start}">${c}</span>`).join("");

  add({
    id: "top", t: "MISSPRYM.md", hud: "dark", card: { img: "missp.jpg", n: "M", room: "#0b41c2" },
    html: `
      <section class="S S-open" id="top">
        <div class="S__in">
          <i class="wall"></i>
          <div class="floor"></div>
          <h1 class="o-title" aria-label="MISSPRYM.md">${titleChars("MISSPRYM")}<span class="ch" style="--i:8"><i class="o-title__dot"></i></span><span class="o-title__md">${titleChars("md", 9)}</span></h1>
          <figure class="o-frame"><img src="${C.img}missp.jpg" alt="Miss Prym"></figure>
          <div class="o-quote">${C.hero.quote.map(q => `<p><b class="md">&gt;</b>${esc(q)}</p>`).join("")}</div>
          <p class="o-meta o-meta--l">${C.byline}</p>
          <p class="o-meta o-meta--r">${C.hero.metaR}</p>
          <p class="o-hint"><span>scroll</span><i></i></p>
        </div>
      </section>`
  });

  const sayWords = rich(C.commitment.say).split(/(\s+|<span[^>]*>.*?<\/span>)/).filter(s => s && s.trim())
    .reduce((a, w) => (/^[.,;:!?]+$/.test(w) && a.length ? (a[a.length - 1] += w) : a.push(w), a), []);
  add({
    id: "commitment", t: C.commitment.h, hud: "dark", card: { glyph: "?", room: "#e7bfff" },
    html: `
      <section class="S S-commit S-ink" id="commitment">
        <div class="S__in">
          <div class="say">
            <p class="h2"><span class="md">##</span>${C.commitment.h}</p>
            <p>${sayWords.map(w => `<span class="w">${w}</span>`).join(" ")}</p>
          </div>
          <div class="lead">
            <p>${esc(C.commitment.lead)} ${esc(C.commitment.body)}</p>
            <div class="ctas">${C.commitment.ctas.map((c, i) => `<a class="cta ${i ? "cta--ghost" : "cta--pink"}" href="${c.href}">${c.t}</a>`).join("")}</div>
          </div>
        </div>
      </section>`
  });

  add({
    id: "prym", t: "be like prym", hud: "dark", card: { glyph: "”", room: "#ffabc8" },
    html: `
      <section class="S S-quote" id="prym">
        <div class="S__in">
          <i class="wall"></i>
          ${C.quote.frags.map(f => `<p class="frag" style="--on:0"><em>${esc(f)}</em></p>`).join("")}
          <blockquote class="q-full"><p>”${esc(C.quote.text)}”</p><cite>— ${esc(C.quote.src)}</cite></blockquote>
        </div>
      </section>`
  });

  add({
    id: "who", t: C.who.h, hud: "light", card: { glyph: "W", room: "#f8d867" },
    html: `
      <section class="S S-who S-paper" id="who">
        <div class="S__in">
          <h2 class="i-head"><span class="md">## ${C.who.h}</span>${lines(["An open-minded", "tech &", "engineering", "company."])}</h2>
          <div class="cap-stack">${C.who.p.map(p => `<p class="cap" style="--on:0">${esc(p)}</p>`).join("")}</div>
          <p class="laws"><span class="md">&gt;</span>Brooks' law<br><span class="md">&gt;</span>Conway's law</p>
        </div>
      </section>`
  });

  C.shifts.forEach((s, i) => add({
    id: `shift-${i + 1}`, t: `from ${s.from.toLowerCase()} to ${s.to.toLowerCase()}`, hud: "light",
    card: { img: s.img, n: String(i + 1), room: s.room },
    html: `
      <section class="S S-shift" id="shift-${i + 1}" style="--room:${s.room};--a:${tilt[i] * 2}deg">
        <div class="S__in">
          <p class="sh-n">${i + 1}</p>
          <div class="sh-words">
            <span class="sh-lab">FROM</span>
            <span class="sh-from">${s.from}<svg class="sh-strike" viewBox="0 0 100 10" preserveAspectRatio="none"><path pathLength="1" d="M1 6 C 30 3, 60 8, 99 4"/></svg></span>
            <span class="sh-to-w"><span class="sh-lab">TO</span><span class="sh-to">${s.to}.</span></span>
          </div>
          <div class="sh-card" aria-hidden="true">
            <div class="sh-card__pic"><img src="${C.img}${s.img}" alt="" loading="lazy"></div>
            <p class="sh-card__n">${i + 1}</p>
            <p class="sh-card__t">from ${s.from.toLowerCase()} to ${s.to.toLowerCase()}</p>
          </div>
          <p class="sh-p">${esc(s.p)}</p>
        </div>
      </section>`
  }));

  add({
    id: "what", t: C.what.h, hud: "dark", card: { glyph: "{ }", mono: true, room: "#5d9dc5" },
    html: `
      <section class="S S-what S-ink" id="what">
        <div class="S__in">
          <h2 class="i-head"><span class="md">## ${C.what.h}</span>${lines(["Real problems.", "Not made-up", "ones."])}</h2>
          <div class="what-grid">${C.what.items.map(it => `<div class="what-item" style="--on:0"><h3>${it.t}</h3><p><span class="md">-</span>${esc(it.p)}</p></div>`).join("")}</div>
        </div>
      </section>`
  });

  add({
    id: "work", t: C.work.h, hud: "light", card: { glyph: "→", room: "#69b488" },
    html: `
      <section class="S S-work" id="work">
        <div class="S__in">
          <h2 class="i-head"><span class="md">## ${C.work.h}</span>${lines([C.work.sub + "."])}</h2>
          <div class="work-grid">${C.work.paths.map((w, i) => `<a class="bubble" href="${w.href}" style="--a:${tilt[i + 3]}deg;--on:0"><h3>${w.t}</h3><p>${esc(w.p)}</p><span class="go">read more →</span></a>`).join("")}</div>
        </div>
      </section>`
  });

  add({
    id: "lab", t: C.lab.h, hud: "dark", card: { glyph: "&lt;/&gt;", mono: true, room: "#cb9cf8" },
    html: `
      <section class="S S-lab" id="lab">
        <div class="S__in">
          <i class="wall"></i>
          <div class="lab-top">
            <h2 class="i-head"><span class="md">## ${C.lab.h}</span>${lines(["missprym", "<span class='hl-machine'>.tech</span>"])}</h2>
            <p>${esc(C.lab.sub)}</p>
          </div>
          <ol class="lab-list">${C.lab.items.map((l, i) => `<li class="lab-row"><a href="${l.href}"><span class="n">${i + 1}</span><span class="t">${l.t}</span><span class="p">${esc(l.p)}</span><span class="arr">→</span></a></li>`).join("")}</ol>
        </div>
      </section>`
  });

  const E = C.events;
  add({
    id: "events", t: E.h, hud: "light", card: { glyph: E.next.date, room: "#fc4109" },
    html: `
      <section class="S S-events" id="events">
        <div class="S__in">
          <h2 class="h2"><span class="md">##</span>${E.h} · kommande</h2>
          <div class="ev-next">
            <p class="ev-date">${E.next.date}</p>
            <div>
              <h3>${esc(E.next.t)}</h3>
              <p class="ev-when">${esc(E.next.when)}</p>
              <p>${esc(E.next.p)}</p>
              <div class="ctas"><a class="cta" href="${E.next.href}">Läs mer och anmäl dig</a></div>
            </div>
          </div>
          <p class="ev-past-h">GENOMFÖRDA EVENT</p>
          <ul class="ev-past">${E.past.map(p => `<li><span class="d">${p.date}</span><span class="t">${esc(p.t)}</span><span class="p">${esc(p.p)}</span></li>`).join("")}</ul>
        </div>
      </section>`
  });

  const spineCols = ["#ffabc8", "#e7bfff", "#5d9dc5", "#f8d867", "#69b488", "#e83729", "#f4efe8", "#cb9cf8", "#a67325", "#fc4109"];
  const spines = Array.from({ length: 90 }, (_, i) => {
    const r = (Math.sin(i * 12.9898) * 43758.5453) % 1, r2 = Math.abs((Math.sin(i * 78.233) * 12345.678) % 1);
    return `<i class="spine" style="--i:${i};--w:${14 + Math.round(Math.abs(r) * 22)}px;--h:${55 + Math.round(r2 * 40)}%;--c:${spineCols[i % spineCols.length]}"></i>`;
  }).join("");
  add({
    id: "library", t: C.books.h, hud: "dark", card: { glyph: "B", room: "#1c3d24", light: true },
    html: `
      <section class="S S-books" id="library">
        <div class="S__in">
          <div class="say"><p class="h2"><span class="md">##</span>${C.books.h}</p><p>${rich(C.books.say)}</p></div>
          <p class="books-p">${esc(C.books.p)} <a href="${C.books.href}">Se hyllan →</a></p>
          <div class="shelf" aria-hidden="true">${spines}</div>
        </div>
      </section>`
  });

  const K = C.contact;
  add({
    id: "contact", t: K.h, hud: "dark", card: { glyph: "@", mono: true, room: "#f4efe8" },
    html: `
      <section class="S S-contact S-ink" id="contact">
        <div class="S__in">
          <h2 class="h2"><span class="md">##</span>${K.h}</h2>
          <p class="c-lead">${esc(K.p)}</p>
          <a class="c-mail" href="mailto:${K.email}">${K.email}</a>
          <div class="c-row">
            <span><span class="md">&gt;</span>${K.address}</span>
            <a href="${K.linkedin}">LinkedIn</a>
            <a href="https://missprym.tech">missprym.tech</a>
          </div>
          <footer class="foot">
            <span>— Miss P Aktiebolag</span>
            <button type="button" data-read>läs som text</button>
            <b>MISSPRYM<span>.md</span></b>
          </footer>
        </div>
      </section>`
  });

  $("#stage").innerHTML = scenes.map(s => s.html).join("");
  scenes.forEach(s => (s.el = document.getElementById(s.id)));

  /* ---------------- markdown (fil + läsläge) ---------------- */
  const md = [
    `# MISSPRYM.md`, ``,
    ...C.hero.quote.map(q => `> ${q}`), ``,
    `## ${C.commitment.h}`, ``, `${C.commitment.lead} ${C.commitment.body}`, ``, `*${plain(C.commitment.say)}*`, ``,
    `> ${C.quote.text}`, `> — ${C.quote.src}`, ``,
    `## ${C.who.h}`, ``, ...C.who.p.flatMap(p => [p, ``]),
    ...C.shifts.flatMap((s, i) => [`### ${i + 1}. from ${s.from.toLowerCase()} to ${s.to.toLowerCase()}`, ``, s.p, ``]),
    `---`, ``,
    `## ${C.what.h}`, ``, ...C.what.items.map(it => `- **${it.t}.** ${it.p}`), ``,
    `## ${C.work.h}`, ``, ...C.work.paths.map(w => `- **${w.t}.** ${w.p}`), ``,
    `## ${C.lab.h}`, ``, C.lab.sub, ``, ...C.lab.items.map(l => `- **${l.t}** (${l.href}) — ${l.p}`), ``,
    `## ${E.h}`, ``, `**${E.next.t}** — ${E.next.when}`, ``, E.next.p, ``, ...E.past.map(p => `- ${p.date} · ${p.t}. ${p.p}`), ``,
    `## ${C.books.h}`, ``, `${plain(C.books.say)}`, ``, C.books.p, ``,
    `---`, ``,
    `## ${K.h}`, ``, K.p, ``, `${K.address}  `, `${K.email}  `, `${K.linkedin}`, ``,
    `— Miss P Aktiebolag`
  ].join("\n");

  // läsläge: enkel md → html
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1">$1</a>').replace(/([\w.]+@[\w.]+\.\w+)/g, '<a href="mailto:$1">$1</a>');
  const readHtml = (() => {
    let out = `<header><p class="read__by">${C.byline}</p><h1>MISSPRYM<span class="md2">.md</span></h1>`, inList = false, inQuote = false;
    const body = md.split("\n").slice(1);
    const close = () => { if (inList) { out += "</ul>"; inList = false; } if (inQuote) { out += "</blockquote>"; inQuote = false; } };
    let headerClosed = false;
    body.forEach(l => {
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
  $("#read").innerHTML = readHtml;

  /* ---------------- index ---------------- */
  $(".index__track").innerHTML = scenes.map((s, i) => {
    const c = s.card;
    const pic = c.img ? `<img src="${C.img}${c.img}" alt="" loading="lazy">` : `<span class="icard__glyph${c.mono ? " mono" : ""}" ${c.light ? 'style="color:#f4efe8"' : ""}>${c.glyph}</span>`;
    return `<a class="icard" href="#${s.id}" data-go style="--a:${tilt[i]}deg"><span class="icard__face"><span class="icard__pic" style="--room:${c.room}">${pic}</span><span class="icard__n">${c.n || (i === 0 ? "M" : String.fromCharCode(96 + i))}</span><span class="icard__t">${s.t}</span></span><i class="icard__dot"></i></a>`;
  }).join("") + `<a class="icard" href="#file" data-file style="--a:${tilt[15]}deg"><span class="icard__face"><span class="icard__pic" style="--room:#0b0b0b"><span class="icard__glyph mono">.md</span></span><span class="icard__n">↓</span><span class="icard__t">MISSPRYM.md — hela filen</span></span></a>`;

  const body = document.body;
  const setIndex = open => {
    body.classList.toggle("index-open", open);
    $("[data-index]").setAttribute("aria-expanded", open);
    $(".index").hidden = false;
    if (open) $$(".icard").forEach(c => c.classList.toggle("is-here", c.getAttribute("href") === "#" + current?.id));
  };
  $("[data-index]").addEventListener("click", () => setIndex(!body.classList.contains("index-open")));

  /* ---------------- fil-fönster ---------------- */
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

  /* ---------------- läsläge ---------------- */
  const setReading = on => { document.documentElement.classList.toggle("reading", on); scrollTo(0, 0); if (on) history.replaceState(null, "", "#read"); };
  $$("[data-read]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); setReading(true); }));
  $("#read").addEventListener("click", e => { if (e.target.matches("[data-unread]")) { e.preventDefault(); setReading(false); history.replaceState(null, "", "#top"); } });
  if (location.hash === "#read") setReading(true);

  // indexlänkar och interna ankare
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute("data-file") || a.hasAttribute("data-read") || a.hasAttribute("data-unread")) return;
    const el = document.getElementById(a.getAttribute("href").slice(1));
    if (!el || el.id === "read") return;
    e.preventDefault();
    if (document.documentElement.classList.contains("reading")) setReading(false);
    setIndex(false);
    stopWatch();
    // landa en bit in i scenen så att innehållet syns
    const into = el.offsetHeight > innerHeight * 1.5 ? innerHeight * .35 : 0;
    scrollTo({ top: el.offsetTop + into, behavior: "smooth" });
  });

  /* ---------------- watch: automatisk scroll ---------------- */
  const watchBtn = $("[data-watch]");
  let watching = false, last = 0;
  const watchStep = t => {
    if (!watching) return;
    const dt = last ? Math.min(50, t - last) : 16; last = t;
    scrollBy(0, dt * .42);
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) return stopWatch();
    requestAnimationFrame(watchStep);
  };
  function stopWatch() { watching = false; watchBtn.setAttribute("aria-pressed", "false"); $(".hud-watch__t").textContent = "watch"; }
  watchBtn.addEventListener("click", () => {
    if (watching) return stopWatch();
    watching = true; last = 0; watchBtn.setAttribute("aria-pressed", "true"); $(".hud-watch__t").textContent = "pause";
    requestAnimationFrame(watchStep);
  });
  ["wheel", "touchstart", "keydown"].forEach(ev => addEventListener(ev, () => watching && stopWatch(), { passive: true }));

  /* ---------------- scroll-driven animation ---------------- */
  const commitWords = $$(".S-commit .w");
  const crumb = $(".hud-crumb"), crumbT = $(".hud-crumb__t");
  let current = null;

  const seg = (p, i, n) => clamp((p - i / n) * n);

  function frame() {
    const vh = innerHeight, y = scrollY;
    let active = scenes[0];
    for (const s of scenes) {
      const top = s.el.offsetTop, h = s.el.offsetHeight;
      const p = clamp((y - top) / Math.max(1, h - vh));
      s.el.style.setProperty("--p", p.toFixed(4));
      s.p = p;
      if (y + vh * .5 >= top) active = s;
    }

    // commitment: ord tänds ett i taget
    const pc = scenes[1].p, n = commitWords.length;
    commitWords.forEach((w, i) => w.style.setProperty("--lit", clamp(pc * 1.25 * n - i).toFixed(3)));

    // citat: tre fragment, sedan hela citatet
    const pq = scenes[2].p, frags = $$(".frag", scenes[2].el);
    frags.forEach((f, i) => f.style.setProperty("--on", pq >= i / 4 && pq < (i + 1) / 4 ? 1 : 0));
    scenes[2].el.style.setProperty("--qo", pq >= .75 ? 1 : 0);

    // who: bildtexter i tur och ordning
    const pw = scenes[3].p, caps = $$(".cap", scenes[3].el);
    caps.forEach((c, i) => c.style.setProperty("--on", pw >= i / caps.length && (pw < (i + 1) / caps.length || i === caps.length - 1) ? 1 : 0));

    // from → to
    scenes.filter(s => s.id.startsWith("shift-")).forEach(s => {
      const p = s.p, st = s.el.style;
      st.setProperty("--k1", clamp(p / .3).toFixed(3));
      st.setProperty("--k2", clamp((p - .25) / .22).toFixed(3));
      st.setProperty("--k3", clamp((p - .45) / .2).toFixed(3));
    });

    // what we do
    const what = scenes.find(s => s.id === "what"), items = $$(".what-item", what.el);
    items.forEach((it, i) => {
      const on = isMobile() ? (what.p >= i / 3 && (what.p < (i + 1) / 3 || i === 2)) : what.p >= i * .22;
      it.style.setProperty("--on", on ? 1 : 0);
    });

    // work with us
    const work = scenes.find(s => s.id === "work");
    $$(".bubble", work.el).forEach((b, i) => b.style.setProperty("--on", isMobile() ? 1 : clamp((work.p + .25 - i * .12) / .25).toFixed(3)));

    // bokhylla
    const lib = scenes.find(s => s.id === "library");
    lib.el.style.setProperty("--on", lib.p > 0.02 || (lib.el.getBoundingClientRect().top < vh * .3) ? 1 : 0);
    $$(".spine", lib.el).forEach(sp => sp.style.setProperty("--on", lib.el.style.getPropertyValue("--on")));

    // HUD
    if (active !== current) {
      current = active;
      body.dataset.hud = active.hud;
      crumb.classList.toggle("is-on", active.id !== "top");
      crumbT.textContent = active.t;
    }
    ticking = false;
  }
  let ticking = false;
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);

  // radvisning när en scen kommer in i bild
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("is-in")), { threshold: .2 });
  $$(".S").forEach(s => io.observe(s));

  /* ---------------- prick & öga ---------------- */
  const dot = $(".dot"), eye = $(".hud-mark");
  let mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my;
  addEventListener("pointermove", e => {
    mx = e.clientX; my = e.clientY;
    dot.classList.toggle("is-big", !!e.target.closest("a, button"));
    const r = eye.getBoundingClientRect(), ax = mx - (r.left + r.width / 2), ay = my - (r.top + r.height / 2), d = Math.hypot(ax, ay) || 1;
    eye.style.setProperty("--ex", (ax / d * Math.min(9, d / 30)).toFixed(1) + "px");
    eye.style.setProperty("--ey", (ay / d * Math.min(4, d / 60)).toFixed(1) + "px");
  });
  (function loop() {
    dx += (mx - dx) * .18; dy += (my - dy) * .18;
    dot.style.transform = `translate(${dx}px, ${dy}px)`;
    requestAnimationFrame(loop);
  })();

  /* ---------------- start ---------------- */
  const start = () => { body.classList.remove("is-loading"); frame(); };
  (document.fonts?.ready || Promise.resolve()).then(() => setTimeout(start, 120));
  setTimeout(start, 1500);
})();
