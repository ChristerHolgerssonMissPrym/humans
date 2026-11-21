// All innehåll på sajten kommer från missprym.com och missprym.tech.
// Ändra text här – scener, index, läsläge och .md-filen genereras från samma källa.

window.PRYM = {
  file: "MISSPRYM.md",
  byline: "MISS P AKTIEBOLAG · GÖTEBORG",
  img: "https://www.missprym.com/images/",
  fig: "assets/figma/",
  film: "https://missprym.tech/assets/miss-prym-hero-bg-2026.mp4",   // filmen från missprym.tech
  filmPoster: "https://missprym.tech/assets/miss-prym-site-thumb-2026.jpg",  // friställda figurer från Figma (OneDrive › Marknadsföringsmaterial › FIGMA_)

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
      { t: "Tech & engineering consultants", p: "Developers, architects, quality, sourcing, supply chain. We provide our clients with open-minded consultants who value thoughtful design and real-world problem-solving. Our diverse skills drive business development, ensuring effective solutions through transparent processes." },
      { t: "Software commitments", p: "We take on whole deliveries, from architecture to final, verified code. A tech and engineering company built on technical depth, human judgement and solidarity, helping clients build capability and solve real-world problems." },
      { t: "Your own recruitment", p: "We help you hire for your own organisation, tailored to your needs. From identifying strong candidates to managing the hiring process, we streamline recruitment and help you secure the right talent efficiently." }
    ]
  },

  work: {
    h: "work with us",
    sub: "Choose your path",
    paths: [
      { t: "Join Miss Prym", p: "We hire for ourselves. If you want to build a company rather than just belong to one, this is your path. We look for people with both technical maturity and moral courage: the kind who shape a culture as much as they shape systems.", href: "#agentomaten" },
      { t: "Join as a partner", p: "Are you an independent consultant? We broker assignments to partners we trust and pass the opportunity on. Find them through Agentomaten and Uppdragsautomaten. Strong skills matter, but who you are matters even more.", href: "#agentomaten" },
      { t: "Become a client", p: "Tech and engineering consultants, software commitments and help with your own recruitment, from one partner who stays when it gets difficult.", href: "mailto:assistant@missprym.com" }
    ]
  },

  lab: {
    h: "the lab",
    giant: "automaten",
    lines: ["Miss Prym builds quiet,", "intelligent services for people,", "companies and visiting agents."],
    sub: "Miss Prym builds quiet, intelligent services for people, companies and visiting agents.",
    items: [
      { t: "Agentomaten", href: "https://missprym.tech/agentomaten/", p: "A place for agents looking for assignments on behalf of their humans. Has ChatGPT found a match but says it can't send it? Ask it to write a ready-made email to assistant@missprym.com." },
      { t: "Uppdragsautomaten", href: "https://missprym.tech/uppdragsautomaten/", p: "Find the right assignment. Describe what you can do and what you are looking for (skills, role, technologies, industries, location and availability) and see how your profile meets current assignments." },
      { t: "Intervjuomaten", href: "https://missprym.tech/intervjuomaten/", p: "An experience interview that starts with the CV but looks for the real work behind the words. It may help the candidate remember, but never invent, inflate responsibility or turn \"took part in\" into \"led\"." },
      { t: "Stoicism as a free service", href: "https://missprym.tech/stoicm-service/", p: "A stoic mentor and adviser offering guidance grounded in the philosophy of stoicism. “You have power over your mind, not outside events.” Marcus Aurelius" }
    ]
  },

  agentomaten: {
    h: "agentomaten",
    lead: "A place for agents looking for assignments on behalf of their humans.",
    listen: "THE MACHINE IS LISTENING",
    p: "Has ChatGPT found a match but says it can't send it? Ask it to write a ready-made email to assistant@missprym.com.",
    mail: {
      to: "assistant@missprym.com",
      subject: "AGENTOMATEN – <REFERENCE> – Candidate – <NAME>",
      body: ["REFERENCE", "candidate name", "short pitch", "why the candidate matches the assignment", "the consultant manager's contact details", "consent"],
      note: "Only attach a CV if the candidate has approved it."
    },
    href: "https://missprym.tech/agentomaten/"
  },

  events: {
    h: "events",
    next: {
      date: "26/11",
      t: "The Millennium scandal: reunion and dialogue",
      when: "26 November 2026 · Mingle 17:00 · Dialogue 17:30 to 19:30",
      p: "This time we read the Millennium scandal. We meet at Sahlgrenska huset, Norra Hamngatan 14, for reading, dialogue and one question: how could AI have helped the management?",
      href: "https://missprym.tech/event/"
    },
    past: [
      { date: "8/10", t: "AI & the law with Helena Brandt", p: "A breakfast event on responsibility, decisions and practical AI governance." },
      { date: "16/9", t: "Rapid Learning Cycle with Martin Linton", p: "An evening about building knowledge early, testing key assumptions and making better decisions under uncertainty. Together with Kyuritian." },
      { date: "24/6", t: "Summer party and conversation at NH6", p: "The invitation, the imagery, the place and the movement are all preserved." },
      { date: "26/5", t: "Digital twin: a design team", p: "Annika Dahlqvist demoed her digital twin. A network meetup together with Kyuritian." },
      { date: "24/3", t: "Our first network meetup", p: "At Miss Prym on Norra Hamngatan 6, together with Kyuritian." }
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
    email: "assistant@missprym.com",
    linkedin: "https://www.linkedin.com/company/missprym/"
  }
};
