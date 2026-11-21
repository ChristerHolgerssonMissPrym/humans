// Svensk version: läses in efter content.js och ersätter texterna. Struktur, bilder och länkar ärvs från content.js.
(() => {
  const C = window.PRYM;
  const merge = (a, b) => { for (const k in b) { if (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a[k] && typeof a[k] === "object") merge(a[k], b[k]); else a[k] = b[k]; } return a; };
  // listor med objekt: behåll bild, länk m.m. från originalet och byt bara texten
  const each = (arr, sv) => arr.map((x, i) => Object.assign({}, x, sv[i] || {}));

  merge(C, {
    lang: "sv",
    locale: "sv-SE",
    byline: "MISS P AKTIEBOLAG · GÖTEBORG",
    hero: {
      quote: ["var stolt, var som prym.", "ett öppensinnat tech- och ingenjörsföretag.", "teknisk djup. mänskligt omdöme."]
    },
    open2: { lines: ["Som konsulter förenar vi", "tekniskt djup med"], giant: "mänskligt", after: "omdöme." },
    expertise: {
      lead: ["Vår kompetens spänner över"],
      words: ["ingenjörskonst", "teknik", "mjukvaruutveckling", "IT-arkitektur", "kvalitet", "inköp", "supply chain", "verksamhetsanalys", "ledarskap", "rekrytering"],
      after: ["Vi förenar affärsmässigt omdöme,", "teknisk expertis och", "<h>mänskligt</h> ansvar."]
    },
    commitment: {
      h: "vårt åtagande",
      lead: "Som konsulter förenar vi tekniskt djup med mänskligt omdöme.",
      body: "Vår kompetens spänner över ingenjörskonst, teknik, mjukvaruutveckling, IT-arkitektur, kvalitet, inköp, supply chain, verksamhetsanalys, ledarskap och rekrytering. Vi förenar affärsmässigt omdöme, teknisk expertis och mänskligt ansvar.",
      say: "<m>Tekniken</m> ska stärka organisationer utan att göra arbetet mindre <h>mänskligt</h>.",
      ctas: [{ t: "Bli en av oss" }, { t: "Övertyga mig" }]
    },
    quote: {
      text: "När vi minst anar det ställer livet oss inför en utmaning som prövar vårt mod och vår vilja att förändras; i ett sådant ögonblick är det ingen idé att låtsas att ingenting har hänt eller att säga att vi inte är redo än.",
      src: "Paulo Coelho, Djävulen och fröken Prym",
      frags: ["När vi minst anar det", "ställer livet oss inför en utmaning", "som prövar vårt mod", "och vår vilja att förändras."],
      end: "Var stolt, var som Prym"
    },
    who: {
      h: "vilka vi är",
      head: "ett öppensinnat <h>(tech- & ingenjörs)</h>företag",
      p: [
        "Vi är ett öppensinnat tech- och ingenjörsföretag, format av människorna som bygger det tillsammans med oss. Brooks och Conways lagar påminner oss om att starka lösningar börjar med starka team, tydlig kommunikation och rätt förutsättningar för samarbete.",
        "Inspirerade av fröken Prym väljer vi mod, ansvar och medmänsklighet när affärsbesluten blir svåra. Vi arbetar inom ingenjörskonst, mjukvara och IT och förenar genomtänkt design med praktisk problemlösning.",
        "Våra olika perspektiv hjälper oss att göra komplexa behov till användbara och hållbara lösningar. Vi balanserar tekniskt djup med vänlighet, affärsmässigt omdöme och pragmatism."
      ]
    },
    what: {
      h: "vad vi gör",
      items: [
        { t: "Tech- & ingenjörskonsulter", p: "Utvecklare, arkitekter, kvalitet, inköp, supply chain. Vi ger våra kunder öppensinnade konsulter som värdesätter genomtänkt design och verklig problemlösning. Vår bredd driver affärsutveckling och ger effektiva lösningar genom transparenta processer." },
        { t: "Mjukvaruåtaganden", p: "Vi tar hela leveranser – från arkitektur till färdig, verifierad kod. Ett tech- och ingenjörsföretag byggt på tekniskt djup, mänskligt omdöme och solidaritet, som hjälper kunder att bygga förmåga och lösa verkliga problem." },
        { t: "Er egen rekrytering", p: "Vi hjälper er att anställa till er egen organisation, anpassat efter era behov. Från att hitta starka kandidater till att driva hela processen – vi gör rekryteringen enklare och hjälper er att hitta rätt person." }
      ]
    },
    work: {
      h: "jobba med oss",
      sub: "Välj din väg",
      paths: [
        { t: "Bli en av oss", p: "Vi anställer till oss själva. Vill du bygga ett företag snarare än bara tillhöra ett, är det här din väg. Vi söker människor med både teknisk mognad och moraliskt mod – sådana som formar en kultur lika mycket som de formar system." },
        { t: "Anslut som partner", p: "Är du egen konsult? Vi förmedlar uppdrag som mäklare till partners vi litar på och skickar möjligheten vidare. Hitta dem via Agentomaten och Uppdragsautomaten. Stark kompetens spelar roll, men vem du är spelar ännu större roll." },
        { t: "Bli vår kund", p: "Tech- och ingenjörskonsulter, mjukvaruåtaganden och hjälp med er egen rekrytering – från en partner som stannar när det blir svårt." }
      ]
    },
    lab: {
      h: "labbet",
      lines: ["Miss Prym bygger stillsamma,", "intelligenta tjänster för människor,", "företag och besökande agenter."],
      sub: "Miss Prym bygger stillsamma, intelligenta tjänster för människor, företag och besökande agenter.",
      items: [
        { p: "En plats för agenter som söker uppdrag åt sina människor. Har ChatGPT hittat en match men säger att den inte kan skicka? Be den skapa ett färdigt mail till assistant@missprym.com." },
        { p: "Hitta rätt uppdrag. Beskriv vad du kan och vad du vill hitta – kompetens, roll, tekniker, branscher, ort och tillgänglighet – så sammanfattas hur din profil möter aktuella uppdrag." },
        { p: "En erfarenhetsintervju som börjar i CV:t, men letar efter det verkliga arbetet bakom orden. Den får hjälpa kandidaten att minnas – aldrig hitta på, förstärka ansvar eller göra om ”deltog i” till ”ledde”." },
        { t: "Stoicism som gratistjänst", p: "En stoisk mentor och rådgivare som erbjuder vägledning grundad i stoicismens filosofi. ”Du har makt över ditt sinne – inte över yttre händelser.” – Marcus Aurelius" }
      ]
    },
    agentomaten: {
      lead: "En plats för agenter som söker uppdrag åt sina människor.",
      listen: "MASKINEN LYSSNAR",
      p: "Har ChatGPT hittat en match men säger att den inte kan skicka? Be den skapa ett färdigt mail till assistant@missprym.com.",
      mail: {
        subject: "AGENTOMATEN – <REFERENS> – Kandidat – <NAMN>",
        body: ["REFERENS", "kandidatnamn", "kort pitch", "varför kandidaten matchar uppdraget", "konsultchefens kontaktuppgifter", "samtycke"],
        note: "Bifoga CV bara om kandidaten har godkänt det."
      }
    },
    events: {
      h: "event",
      next: {
        t: "Millenniumskandalen – återträff och dialog",
        when: "26 november 2026 · Mingel kl. 17.00 · Dialog kl. 17.30–19.30",
        p: "Den här gången läser vi Millenniumskandalen. Vi möts i Sahlgrenska huset på Norra Hamngatan 14 för läsning, dialog och frågan: hur hade AI kunnat vara ledningen till hjälp?"
      }
    },
    books: {
      h: "vårt bibliotek",
      say: "Visa mig din bokhylla så ska jag säga dig vem du är, sa de. <h>Så det gjorde vi!</h>",
      p: "En växande samling böcker som skänkts till oss av vänner, samarbetspartners och andra tänkare. Varje titel bär ett spår av personen som lade den i våra händer. Den visar idéerna som format oss – och människorna som valt att dela sitt eget lärande med Miss Prym."
    },
    contact: {
      h: "kontakt & kontrakt",
      p: "Vi strävar efter full transparens och brinner för att lösa problem i den verkliga världen. Inte de påhittade problemen – de verkliga. Vår samlade kompetens gör det möjligt att leda hela vägen från affärsutvecklingsbeslut, via en väl genomtänkt arkitektur, till färdig verifierad kod."
    }
  });

  C.shifts = each(C.shifts, [
    { from: "Vinst", to: "Syfte", p: "Vi lär oss av fröken Pryms kamp med ett moraliskt val. Hon erbjuds rikedom i utbyte mot att begå något ont. Hon väljer syfte framför vinst och tackar nej – ett djupt engagemang för moral och mänskliga värden. Vi gör detsamma." },
    { from: "Hierarkier", to: "Nätverk", p: "Carl Jung kallade det synkronicitet. Meningsfulla kopplingar kan skapa resultat som ingen kunnat planera ensam. Den tron formar hur vi organiserar oss. Vi föredrar nätverk framför stela hierarkier och för samman människor och kunskap kring ett gemensamt syfte. Vi vågar vänlighet, eftersom tillit gör samarbetet starkare. I naturen och samhället kan enkla samspel ge oväntade resultat. Det är emergens. Vi tillämpar samma princip i vårt arbete och bildar team där konsulter, kunder och partners skapar mer tillsammans än någon kunnat åstadkomma ensam." },
    { from: "Kontroll", to: "Egenmakt", p: "Att gå från kontroll till egenmakt förändrar ledarskap. Samarbete, tillit och självständighet ger innovation, motståndskraft och växande medarbetare – en dynamisk och stärkt organisationskultur. Vi är inte rädda för kaos. Vi möter det tillsammans." },
    { from: "Planering", to: "Experiment", p: "Vi föredrar att göra. Att gå från stel planering till experiment frigör potential. Iterativa, anpassningsbara arbetssätt ger lärande, flexibilitet och upptäckter i en miljö som lever på ständig förbättring och kreativt utforskande. Vi skapar värde genom ingenjörskonst, öppen källkod och handling – inte genom att prata om det." },
    { from: "Hemlighet", to: "Transparens", p: "Att gå från hemlighet till transparens är ett kulturskifte. Öppenhet och ärlighet bygger tillit och ansvar. Organisationer och människor växer i en miljö där information flödar fritt, vilket främjar samarbete, etiskt agerande och ett gemensamt åtagande för integritet." }
  ]);
  C.events.past = each(C.events.past, [
    { t: "AI & juridiken med Helena Brandt", p: "Frukostevent om ansvar, beslut och praktisk AI governance." },
    { t: "Rapid Learning Cycle med Martin Linton", p: "En kväll om att bygga kunskap tidigt, testa viktiga antaganden och fatta bättre beslut under osäkerhet. I samverkan med Kyuritian." },
    { t: "Sommarfest och samtal på NH6", p: "Inbjudan, bildspråket, platsen och rörelsen finns bevarade." },
    { t: "Digital tvilling: ett designteam", p: "Annika Dahlqvist demade sin digitala tvilling. Nätverksträff i samverkan med Kyuritian." },
    { t: "Första nätverksträffen", p: "Hos Miss Prym på Norra Hamngatan 6, i samverkan med Kyuritian." }
  ]);

  // texter som står direkt i scenerna (app.js) – nyckeln är den engelska texten
  C.tr = {
    "Technical depth.": "Tekniskt djup.", "Human": "Mänskligt", "judgement": "omdöme",
    "The smiling face of Agentomaten": "Agentomatens ansikte som ler", "To the next part": "Till nästa del",
    "BE PROUD · BE LIKE PRYM · TECHNICAL DEPTH · HUMAN JUDGEMENT · ": "VAR STOLT · VAR SOM PRYM · TEKNISKT DJUP · MÄNSKLIGT OMDÖME · ",
    "our expertise": "vår kompetens", "less human": "mindre mänskligt", "be like prym": "var som prym",
    "Miss Prym: If you give, you will receive twice as much": "Miss Prym: Om du ger, får du tillbaka dubbelt så mycket",
    "We who work at Miss Prym, in baroque costumes in a hall overlooking Gothenburg": "Vi som jobbar på Miss Prym, i barockdräkter i en sal med utsikt över Göteborg",
    "We who work at Miss Prym": "Vi som jobbar på Miss Prym", "This is us": "Det här är vi",
    "together": "tillsammans",
    "We provide our clients with open-minded consultants…": "Vi ger våra kunder öppensinnade konsulter…",
    "…who create more together than any individual could achieve alone.": "…som skapar mer tillsammans än någon kunnat åstadkomma ensam.",
    "profit?": "vinst?", "from": "från", "to": "till",
    "one percent a day": "en procent om dagen", "\"this is pointless.\"": "”det här är meningslöst.”",
    "Standing still": "Att stå still", "vs.": "mot", "one percent better every day.": "en procent bättre varje dag.",
    "we face it together": "vi möter det tillsammans", "Chaos": "Kaos", "We don't fear chaos": "Vi är inte rädda för kaos", "We face it together.": "Vi möter det tillsammans.",
    "read more →": "läs mer →",
    "took part in": "deltog i", "responsible for": "ansvarade för", "deviations": "avvikelser", "suppliers": "leverantörer", "follow-up": "uppföljning", "clients": "kunder", "methods": "metoder", "tools": "verktyg", "decisions": "beslut", "results": "resultat", "processes": "processer", "documentation": "dokumentation", "projects": "projekt", "improvement": "förbättring", "coordination": "samordning", "quality": "kvalitet",
    "You may only see": "Du kanske bara ser", "a CV.": "ett CV.", "We see a": "Vi ser en", "story.": "berättelse.",
    "Try Intervjuomaten →": "Testa Intervjuomaten →",
    "To": "Till", "Subject": "Ämne", "new email · agentomaten": "nytt mail · agentomaten", "Open Agentomaten →": "Öppna Agentomaten →", "Send to": "Skicka till",
    "upcoming": "kommande", "Read more and sign up": "Läs mer och anmäl dig", "PAST EVENTS": "GENOMFÖRDA EVENT", "See the event →": "Se eventet →",
    "Portrait": "Porträtt", "See the shelf →": "Se hyllan →", "Norra Hamngatan at sunset": "Norra Hamngatan i solnedgång", "read as text": "läs som text",
    "we put energy in": "vi lägger in energi", "business activism": "affärsaktivism",
    "it moves through many": "den rör sig genom många", "people, clients, partners": "människor, kunder, partners",
    "a result swings out": "ett resultat svänger ut", "on the other side": "på andra sidan",
    "and comes back": "och kommer tillbaka", "stronger – solidarity capitalism": "starkare – solidarisk kapitalism",
    "solidarity capitalism": "solidarisk kapitalism", "We don't keep the energy.": "Vi behåller inte energin.", "We pass it on.": "Vi skickar den vidare.",
    "business activism · solidarity capitalism": "affärsaktivism · solidarisk kapitalism", "Altruism + Emergence = Profit": "Altruism + Emergens = Profit",
    "> a working manifesto.": "> ett manifest i arbete.", "> written for ourselves first.": "> skrivet för oss själva först.",
    "> by Miss P Aktiebolag · 559455-8172,": "> av Miss P Aktiebolag · 559455-8172,", "> a tech & engineering firm.": "> en tech- & ingenjörsbyrå.",
    "> last edited at Norra Hamngatan 14.": "> senast ändrat på Norra Hamngatan 14.",
    "what this file is": "vad den här filen är",
    "A plain-text promise about how we behave": "Ett löfte i ren text om hur vi beter oss",
    "when business gets difficult – and what": "när affärerna blir svåra – och vad",
    "we think people bring to the table now": "vi tror att människor bidrar med nu",
    "that the machines are getting good.": "när maskinerna blir riktigt bra.",
    "the actual job": "det egentliga jobbet",
    "choose purpose over profit": "välj syfte före vinst", "organise as a network": "organisera som ett nätverk", "empower, don't control": "ge egenmakt, kontrollera inte",
    "face the chaos together": "möt kaoset tillsammans", "experiment, don't plan": "experimentera, planera inte", "one percent, every day": "en procent, varje dag",
    "make it transparent": "gör det transparent", "solve the real problems": "lös de verkliga problemen", "see the story, not the CV": "se berättelsen, inte CV:t",
    "build it, don't talk about it": "bygg det, prata inte om det",
    "selling hours instead of value": "sälja timmar i stället för värde", "hiding behind the process": "gömma oss bakom processen", "planning things to death": "planera ihjäl saker",
    "talking about AI instead of building with it": "prata om AI i stället för att bygga med den", "keeping what we learn to ourselves": "behålla det vi lär oss för oss själva",
    "choosing profit when it costs us our humanity": "välja vinst när det kostar oss vår medmänsklighet",
    "say no to the wrong assignment": "säga nej till fel uppdrag", "open-source what we build": "öppna källkoden till det vi bygger", "share the bookshelf": "dela bokhyllan",
    "experiment where people can see": "experimentera där andra ser", "ask what the consultant actually wants": "fråga vad konsulten faktiskt vill", "be kind on purpose": "vara snälla med flit",
    "stop doing / do more": "sluta med / göra mer", "things we are trying to stop doing": "saker vi försöker sluta med", "things we are trying to do more": "saker vi försöker göra mer",
    "This file will change. That's the point.": "Den här filen kommer att ändras. Det är meningen.",
    "a working manifesto. written for ourselves first.": "ett manifest i arbete. skrivet för oss själva först.",
    "Be proud. Be like Prym.": "Var stolt. Var som Prym.", "You may only see a CV. We see a story.": "Du kanske bara ser ett CV. Vi ser en berättelse.",
    "Starring": "I rollerna", "Inspired by": "Inspirerad av", "Miss Prym": "Fröken Prym", "Directed by": "Regi", "Courage": "Mod", "Produced by": "Produktion", "Filmed on location": "Inspelad på plats",
    "the end": "slut", "Is it even worth trying?": "Är det ens värt att försöka?", "Be proud.": "Var stolt.", "Be like Prym.": "Var som Prym.", "The End": "Slut",
    "watch again": "se igen", "about us": "om oss",
    "Miss P Aktiebolag (559455-8172) – a tech & engineering firm. Consultants, software commitments, your own recruitment, assignments brokered – as a partner, while we work to reform our industry.": "Miss P Aktiebolag (559455-8172) – en tech- och ingenjörsbyrå. Konsulter, mjukvaruåtaganden, hjälp med er egen rekrytering och förmedling av uppdrag – som partner, samtidigt som vi arbetar för att reformera vår bransch.",
    "← back to the site": "← tillbaka till sajten", "copied ✓": "kopierat ✓", "could not copy": "kunde inte kopiera", "copy": "kopiera",
    "watch": "titta", "pause": "paus", "go": "gå", "open": "öppna", "scroll": "scrolla",
    "Describe what you can do": "Beskriv vad du kan", "– we find the assignments.": "– vi hittar uppdragen.",
    "E.g. Java, Spring, Gothenburg, systems architect, available in March…": "T.ex. Java, Spring, Göteborg, systemarkitekt, tillgänglig i mars…",
    "All": "Alla", "48 hours": "2 dygn", "This week": "Veckan", "Fetching assignments…": "Hämtar uppdrag…",
    "current needs that match": "aktuella behov som matchar", "current needs": "aktuella behov", "Candidate": "Kandidat", "Interested →": "Intresserad →",
    "No matches yet – try fewer or different words.": "Inga träffar ännu – prova färre eller andra ord.",
    "Could not fetch the assignments right now.": "Kunde inte hämta uppdragen just nu.", "Open Uppdragsautomaten ↗": "Öppna Uppdragsautomaten ↗",
    "planning": "planering", "be kind": "var snäll", "the whole file": "hela filen", "Events": "Event"
  };
})();
