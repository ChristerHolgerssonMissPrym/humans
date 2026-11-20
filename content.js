// All innehåll på sajten kommer från missprym.com och missprym.tech.
// Ändra text här – scener, index, läsläge och .md-filen genereras från samma källa.

window.PRYM = {
  file: "MISSPRYM.md",
  byline: "MISS P AKTIEBOLAG · GÖTEBORG",
  img: "https://www.missprym.com/images/",
  fig: "assets/figma/",  // friställda figurer från Figma (OneDrive › Marknadsföringsmaterial › FIGMA_)

  hero: {
    quote: [
      "be proud, be like prym.",
      "an open-minded tech and engineering company.",
      "technical depth. human judgement."
    ],
    metaL: "NORRA HAMNGATAN 14 · GÖTEBORG",
    metaR: "missprym.com"
  },

  // Scen 2: meningen byggs rad för rad, sedan ett jätteord
  open2: {
    lines: ["As consultants, we connect", "technical depth with"],
    giant: "human",
    after: "judgement."
  },

  // Scen 3: kompetenserna som landar på bordet
  expertise: {
    lead: ["Our expertise spans"],
    words: ["engineering", "technology", "software development", "IT architecture", "quality", "sourcing", "supply chain", "business analysis", "leadership", "recruitment"],
    after: ["We combine commercial judgement,", "technical expertise and", "<h>human</h> responsibility."]
  },

  commitment: {
    h: "our commitment",
    lead: "As consultants, we connect technical depth with human judgement.",
    body: "Our expertise spans engineering, technology, software development, IT architecture, quality, sourcing, supply chain, business analysis, leadership and recruitment. We combine commercial judgement, technical expertise and human responsibility.",
    // Visas som stor text, med <h> = mänskligt (serif) och <m> = maskin (mono)
    say: "<m>Technology</m> should strengthen organisations without making work less <h>human</h>.",
    ctas: [
      { t: "Join us", href: "#work" },
      { t: "I need convincing", href: "#who" }
    ]
  },

  quote: {
    text: "When we least expect it, life sets us a challenge to test our courage and willingness to change; at such a moment, there is no point in pretending that nothing has happened or in saying that we are not yet ready.",
    src: "Paulo Coelho, The Devil and Miss Prym",
    frags: ["When we least expect it,", "life sets us a challenge", "to test our courage", "and willingness to change."],
    end: "Be proud, be like Prym"
  },

  who: {
    h: "who we are",
    head: "an open-minded <h>(tech & engineering)</h> company",
    p: [
      "We are an open-minded tech and engineering company, shaped by the people who build it with us. Brooks' and Conway's laws remind us that strong solutions begin with strong teams, clear communication and the right conditions for collaboration.",
      "Inspired by Miss Prym, we choose courage, responsibility and humanity when business decisions become difficult. We work across engineering, software and IT, combining thoughtful design with practical problem-solving.",
      "Our different perspectives help us turn complex needs into useful, durable solutions. We balance technical depth with kindness, commercial judgement and pragmatism."
    ]
  },

  shifts: [
    {
      from: "Profit", to: "Purpose", img: "OTPurpose_phone.jpg", art: "woman", room: "#ffc2e3", floor: "#d59ce6",
      p: "We learn from Miss Prym's struggle with a moral choice. She is offered wealth in exchange for committing evil. Choosing purpose over profit, she rejects the deal, demonstrating a profound commitment to morality and human values. We will do the same."
    },
    {
      from: "Hierarchies", to: "Networks", img: "OTNetworking_phone.webp", art: "net", room: "#a9b2c3", floor: "#1c3d24",
      p: "Carl Jung called it synchronicity. Meaningful connections can create outcomes no one could plan alone. That belief shapes how we organise. We favour networks over rigid hierarchies, bringing people and knowledge together around a shared purpose. We dare kindness, because trust makes collaboration stronger. In nature and society, simple interactions can produce unexpected results. This is emergence. We apply the same principle to our work, forming teams in which consultants, clients and partners create more together than any individual could achieve alone."
    },
    {
      from: "Controlling", to: "Empowering", img: "OTEmpowering_phone.jpg", art: "puppet", room: "#ffecaa", floor: "#cf4a1a",
      p: "Shifting from controlling to empowering transforms leadership. Embracing collaboration, trust and autonomy fosters innovation, resilience and employee growth, creating a dynamic and empowered organisational culture. We don't fear chaos. We face it together."
    },
    {
      from: "Planning", to: "Experiments", img: "OTExperiment_phone.jpg", art: "flasks", room: "#e65564", floor: "#f4efe8",
      p: "We prefer doing. Transitioning from rigid planning to embracing experiments unlocks potential. Iterative, adaptive approaches allow for learning, flexibility and discovery, fostering a dynamic environment that thrives on continuous improvement and creative exploration. We act to generate value through engineering, open-source code and practical action, not by talking about it."
    },
    {
      from: "Privacy", to: "Transparency", img: "OTTransparency_phone.jpg", room: "#b8c2ea", floor: "#ffabc8",
      p: "Moving from privacy to transparency signals a cultural shift. Embracing openness and honesty builds trust and accountability. Organisations and individuals thrive in an environment where information flows freely, encouraging collaboration, ethical practices and a shared commitment to integrity."
    }
  ],

  what: {
    h: "what we do",
    items: [
      { t: "Consultants", p: "We provide our clients with open-minded consultants who value thoughtful design and real-world problem-solving. Our diverse skills drive business development, ensuring effective solutions through transparent processes." },
      { t: "Capability", p: "We are an open-minded tech and engineering company built on technical depth, human judgement and solidarity. We provide consultants, recruitment services and learning programmes that help our clients build capability and solve real-world problems." },
      { t: "Recruitment", p: "Our recruitment services are tailored to your needs. From identifying strong candidates to managing the hiring process, we streamline recruitment and help you secure the right talent efficiently." }
    ]
  },

  work: {
    h: "work with us",
    sub: "Choose your path",
    paths: [
      { t: "Join Miss Prym", p: "We hire for ourselves. If you want to build a company rather than just belong to one, this is your path. We look for people with both technical maturity and moral courage. The kind who shape a culture as much as they shape systems. You'll find our open positions at hint.missprym.com.", href: "https://hint.missprym.com" },
      { t: "Partner With Prym", p: "We collaborate with independent consultants on client assignments. Through hint.missprym.com you'll find the opportunities we open for our trusted partners. Strong skills matter, but who you are matters even more. We believe in trust, courage and karma.", href: "https://hint.missprym.com" },
      { t: "Recruitment Services", p: "We help external clients hire the right technical talent. Transparent, precise and grounded in competence based selection.", href: "mailto:christer@missprym.com" }
    ]
  },

  lab: {
    h: "the lab",
    giant: "automaten",
    lines: ["Miss Prym bygger stillsamma,", "intelligenta tjänster för människor,", "företag och besökande agenter."],
    sub: "Miss Prym bygger stillsamma, intelligenta tjänster för människor, företag och besökande agenter.",
    items: [
      { t: "Agentomaten", href: "https://missprym.tech/agentomaten/", p: "En plats för agenter som söker uppdrag åt sina människor. Har ChatGPT hittat en match men säger att den inte kan skicka? Be den skapa ett färdigt mail till assistant@missprym.com." },
      { t: "Uppdragsautomaten", href: "https://missprym.tech/uppdragsautomaten/", p: "Hitta rätt uppdrag. Beskriv vad du kan och vad du vill hitta – kompetens, roll, tekniker, branscher, ort och tillgänglighet – så sammanfattas hur din profil möter aktuella uppdrag." },
      { t: "Intervjuomaten", href: "https://missprym.tech/intervjuomaten/", p: "En erfarenhetsintervju som börjar i CV:t, men letar efter det verkliga arbetet bakom orden. Den får hjälpa kandidaten att minnas – aldrig hitta på, förstärka ansvar eller göra om deltog i till ledde." },
      { t: "Stoicism as a free service", href: "https://missprym.tech/stoicm-service/", p: "En stoisk mentor och rådgivare som erbjuder vägledning grundad i stoicismens filosofi. ”Du har makt över ditt sinne – inte över yttre händelser.” – Marcus Aurelius" },
      { t: "Uppdragsslumpomat", href: "https://uppdragsautomat.missprym.com/uppdragsslumpomat", p: "Slumpa fram ett aktuellt uppdrag." }
    ]
  },

  events: {
    h: "event",
    next: {
      date: "26/11",
      t: "Millenniumskandalen, återträff och dialog",
      when: "26 november 2026 · Mingel kl. 17.00 · Dialog kl. 17.30–19.30",
      p: "Den här gången läser vi Millenniumskandalen. Vi möts i Sahlgrenska huset på Norra Hamngatan 14 för läsning, dialog och frågan: Hur hade AI kunnat vara ledningen till hjälp?",
      href: "https://missprym.tech/event/"
    },
    past: [
      { date: "8/10", t: "AI & juridiken med Helena Brandt", p: "Frukostevent om ansvar, beslut och praktisk AI Governance." },
      { date: "16/9", t: "Rapid Learning Cycle med Martin Linton", p: "En kväll om att bygga kunskap tidigt, testa viktiga antaganden och fatta bättre beslut under osäkerhet. I samverkan med Kyuritian." },
      { date: "24/6", t: "Sommarfest och samtal på NH6", p: "Inbjudan, bildspråket, platsen och rörelsen finns bevarade." },
      { date: "26/5", t: "Digital tvilling: ett designteam", p: "Annika Dahlqvist demade sin digitala tvilling. Nätverksträff i samverkan med Kyuritian." },
      { date: "24/3", t: "Första nätverksträffen", p: "Hos Miss Prym på Norra Hamngatan 6, i samverkan med Kyuritian." }
    ]
  },

  books: {
    h: "our library",
    say: "Show me your bookshelf, and I'll tell you who you are, they said. <h>So we did!</h>",
    p: "A growing collection of books donated to us by friends, collaborators, and fellow thinkers. Each title reflects a trace of the person who placed it in our hands. It reveals the ideas that shaped us, and the people who chose to share their own learning with Miss Prym.",
    href: "https://www.missprym.com/books"
  },

  contact: {
    h: "contact & contract",
    p: "We strive for full transparency and are passionate about solving problems in the real world. Not the made-up problems, the real ones. Our complete skill set makes it possible to lead business development decisions, through a well thought out architecture, to final verified code.",
    address: "Norra Hamngatan 14, 411 14 Göteborg",
    email: "christer@missprym.com",
    linkedin: "https://www.linkedin.com/company/missprym/"
  }
};
