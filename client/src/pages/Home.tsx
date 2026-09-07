import { ArrowDownRight, ArrowUpRight, Menu, MoveUpRight, X } from "lucide-react";
import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Why Zorq", href: "#why-zorq" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#community" },
];

const foundationCards = [
  {
    index: "01",
    title: "Quiet authority",
    copy: "A mineral-dark palette gives Zorq a sharper silhouette than the usual neon-first crypto aesthetic.",
    accent: "cyan",
  },
  {
    index: "02",
    title: "One clear signal",
    copy: "Every interaction has a job: orient, invite, or confirm. Nothing moves just to fill space.",
    accent: "lime",
  },
  {
    index: "03",
    title: "Room to land",
    copy: "Measured spacing and a strong type scale make future project content feel intentional when it arrives.",
    accent: "blue",
  },
];

const whyCards = [
  { index: "01", title: "A signal, not a spreadsheet", copy: "A recognizable identity for people who move fast and know what they like.", accent: "cyan" },
  { index: "02", title: "Made to travel", copy: "A compact name, glyph, and voice designed to hold up in the feed.", accent: "lime" },
  { index: "03", title: "Small surface, strong system", copy: "Every touchpoint stays connected, from the orbital mark to the last pixel.", accent: "blue" },
  { index: "04", title: "Room to evolve", copy: "A clear foundation that leaves space for the community to shape what comes next.", accent: "violet" },
];

const roadmapPhases = [
  { phase: "01", title: "Signal detected", copy: "Brand and launch foundation.", status: "FOUNDATION" },
  { phase: "02", title: "First transmission", copy: "Community opening and initial launch materials.", status: "TBA" },
  { phase: "03", title: "Orbit expansion", copy: "Owner-defined ecosystem and community initiatives.", status: "TBA" },
  { phase: "04", title: "Next coordinates", copy: "Future plans shaped with the people in orbit.", status: "TBA" },
];

const faqItems = [
  { question: "What is Zorq?", answer: "Zorq is a meme token project with a premium visual identity and a community-first launch surface." },
  { question: "Which blockchain is Zorq on?", answer: "Zorq is being built on ARC. Official technical and transaction details will be published when verified." },
  { question: "Where is the official contract address?", answer: "The contract address is currently TBA. Only use an address published through an official Zorq channel." },
  { question: "Where can I find official links?", answer: "Verified community links will be added here once they are provided by the project owner." },
  { question: "Is Zorq financial advice?", answer: "No. Meme tokens are high-risk and volatile. Do your own research and never commit more than you can afford to lose." },
  { question: "How will updates be shared?", answer: "Roadmap and project updates will be published through verified Zorq community channels." },
];

function ZorqMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "zorq-mark zorq-mark--compact" : "zorq-mark"} aria-hidden="true">
      <span className="zorq-mark__core" />
      <span className="zorq-mark__orbit zorq-mark__orbit--one" />
      <span className="zorq-mark__orbit zorq-mark__orbit--two" />
    </span>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow"><span className="eyebrow__dot" />{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-heading__copy">{copy}</p>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setScrollY(window.scrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 });
  };
  const handleHeroPointerLeave = () => setPointer({ x: 0, y: 0 });
  const copyContract = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText("Contract address pending");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className={pageReady ? "site-shell site-shell--ready" : "site-shell"}>
      <div className="ambient-field" aria-hidden="true">
        <span className="ambient-field__bloom ambient-field__bloom--cyan" />
        <span className="ambient-field__bloom ambient-field__bloom--blue" />
        <span className="ambient-field__grid" />
        <span className="ambient-field__noise" />
      </div>

      <header className={scrolled ? "site-nav site-nav--scrolled" : "site-nav"}>
        <div className="container site-nav__inner">
          <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Zorq home">
            <ZorqMark compact />
            <span className="brand-lockup__word">ZORQ<span className="brand-lockup__dot">.</span></span>
          </a>

          <nav className={menuOpen ? "site-nav__links site-nav__links--open" : "site-nav__links"} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="nav-cta" href="#surfaces" onClick={closeMenu}>View system <MoveUpRight size={14} /></a>
          </nav>

          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" onPointerMove={handleHeroPointerMove} onPointerLeave={handleHeroPointerLeave}>
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal data-visible="true">
              <p className="eyebrow hero-eyebrow"><span className="eyebrow__dot" />ARC / MEME TOKEN <span className="eyebrow__line" /> VISUAL FOUNDATION</p>
              <h1>ZORQ<br /><span>IS HERE<span className="hero-period">.</span></span></h1>
              <p className="hero-description">A premium visual system for a signal with somewhere to go. Dark, deliberate, and ready for the ARC orbit.</p>
              <div className="hero-actions">
                <a className="button button--primary" href="#foundation">Explore the system <ArrowDownRight size={17} /></a>
                <a className="button button--secondary" href="#motion">See the motion <ArrowUpRight size={17} /></a>
              </div>
              <div className="hero-utility-row">
                <div className="contract-control" aria-label="Contract address placeholder">
                  <div className="contract-control__label"><span className="contract-control__dot" />CONTRACT ADDRESS</div>
                  <div className="contract-control__value">TBA — address pending</div>
                  <button className="contract-control__copy" type="button" onClick={copyContract} disabled aria-label="Copy contract address placeholder" title="Contract address pending">{copied ? "COPIED" : "COPY"}</button>
                </div>
                <div className="arc-badge" aria-label="ARC blockchain badge"><span className="arc-badge__mark">A</span><span><strong>ARC</strong><small>BLOCKCHAIN</small></span></div>
              </div>
              <div className="hero-meta">
                <span className="status-chip"><span className="status-chip__dot" />SYSTEM PREVIEW</span>
                <span className="hero-meta__divider" />
                <span className="hero-meta__note">Facts &amp; chain features intentionally pending</span>
              </div>
            </div>

            <div className="hero-visual" data-reveal data-visible="true" aria-label="Zorq orbital signal visual" style={{ "--pointer-x": `${pointer.x * 7}px`, "--pointer-y": `${pointer.y * 7 - Math.min(scrollY * 0.035, 16)}px` } as CSSProperties}>
              <div className="hero-visual__halo" />
              <div className="hero-visual__orbit hero-visual__orbit--outer" />
              <div className="hero-visual__orbit hero-visual__orbit--inner" />
              <div className="hero-visual__ticks" />
              <div className="signal-creature">
                <div className="signal-creature__ring signal-creature__ring--back" />
                <div className="signal-creature__body">
                  <span className="signal-creature__shine" />
                  <span className="signal-creature__eye" />
                  <span className="signal-creature__cut" />
                </div>
                <div className="signal-creature__ring signal-creature__ring--front" />
              </div>
              <span className="hero-particle hero-particle--one" />
              <span className="hero-particle hero-particle--two" />
              <span className="hero-particle hero-particle--three" />
              <div className="hero-visual__label hero-visual__label--top"><span />ZORQ / 001</div>
              <div className="hero-visual__label hero-visual__label--bottom">ORBITAL SIGNAL <span>ARC</span></div>
            </div>
          </div>
          <div className="hero-bottom-line container"><span>SCROLL TO TUNE IN</span><div className="hero-bottom-line__track"><span /></div><span>01 / 03</span></div>
        </section>

        <section className="intro-section section-shell" id="about">
          <div className="container intro-grid">
            <SectionHeading eyebrow="00 / Meet Zorq" title={<>A meme token<br /><em>with a signal.</em></>} copy="Zorq is a playful, confident presence entering the ARC orbit. A short name, a strong mark, and space for a community to make it their own." />
            <div className="intro-statement" data-reveal><span className="intro-statement__quote">“</span><p>Zorq is here.<br /><em>Keep your frequency open.</em></p><span className="intro-statement__line" /></div>
          </div>
        </section>

        <section className="foundation-section section-shell" id="foundation">
          <div className="container">
            <SectionHeading eyebrow="01 / Foundation" title={<>A sharper kind<br /><em>of signal.</em></>} copy="The first layer of Zorq is restraint. A high-contrast foundation that gives the brand enough space to be playful without looking disposable." />
            <div className="foundation-grid">
              {foundationCards.map((card, index) => (
                <article className={`foundation-card foundation-card--${card.accent}`} key={card.index} data-reveal style={{ "--card-delay": `${index * 80}ms` } as React.CSSProperties}>
                  <div className="foundation-card__top"><span>{card.index}</span><span className="foundation-card__arrow"><MoveUpRight size={16} /></span></div>
                  <div className="foundation-card__signal" aria-hidden="true"><span /><span /><span /></div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section section-shell" id="why-zorq">
          <div className="container">
            <SectionHeading eyebrow="02 / Why Zorq" title={<>Built for the<br /><em>meme frequency.</em></>} copy="Zorq keeps the idea simple: recognizable enough to remember, refined enough to belong in the ARC ecosystem." />
            <div className="why-grid">
              {whyCards.map((card, index) => <article className={`why-card why-card--${card.accent}`} key={card.index} data-reveal style={{ "--card-delay": `${index * 70}ms` } as CSSProperties}><div className="why-card__top"><span>{card.index}</span><MoveUpRight size={16} /></div><div className="why-card__orb" /><h3>{card.title}</h3><p>{card.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="tokenomics-section section-shell" id="tokenomics">
          <div className="container">
            <SectionHeading eyebrow="03 / Tokenomics" title={<>The numbers<br /><em>come next.</em></>} copy="A clean, verified data surface is ready for the real details. Nothing here is guessed." />
            <div className="tokenomics-panel" data-reveal>
              <div className="tokenomics-ring"><div className="tokenomics-ring__inner"><span>TBA</span><small>VERIFIED DATA PENDING</small></div><span className="tokenomics-ring__orbit" /></div>
              <div className="tokenomics-fields">
                {["Total supply", "Liquidity", "Allocation", "Contract address"].map((label) => <div className="token-field" key={label}><span>{label}</span><strong>TBA</strong><small>Owner to provide verified value</small></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="roadmap-section section-shell" id="roadmap">
          <div className="container">
            <SectionHeading eyebrow="04 / Roadmap" title={<>Coordinates,<br /><em>not promises.</em></>} copy="A simple set of phases for the signal to move through. Dates and statuses stay pending until the project confirms them." />
            <div className="roadmap-list" data-reveal>{roadmapPhases.map((item) => <article className="roadmap-item" key={item.phase}><div className="roadmap-item__index">{item.phase}</div><div className="roadmap-item__marker"><span /></div><div className="roadmap-item__copy"><div><h3>{item.title}</h3><span className="status-chip status-chip--small"><span className="status-chip__dot" />{item.status}</span></div><p>{item.copy}</p></div></article>)}</div>
          </div>
        </section>

        <section className="surfaces-section section-shell" id="surfaces">
          <div className="container">
            <SectionHeading eyebrow="02 / Surfaces" title={<>Every surface<br /><em>has a purpose.</em></>} copy="Controls stay tactile. Cards stay quiet. The system uses contrast, rhythm, and a single electric accent to keep attention where it matters." />
            <div className="surface-showcase" data-reveal>
              <div className="surface-showcase__label">INTERACTION KIT / 02</div>
              <div className="surface-showcase__controls">
                <button className="button button--primary" type="button">Primary action <MoveUpRight size={16} /></button>
                <button className="button button--secondary" type="button">Secondary action <ArrowUpRight size={16} /></button>
              </div>
              <div className="surface-showcase__rule" />
              <div className="surface-showcase__meta"><span><i className="swatch swatch--cyan" />CYAN SIGNAL</span><span><i className="swatch swatch--lime" />LIME PULSE</span><span className="surface-showcase__mono">RADIUS / 18PX</span></div>
            </div>
          </div>
        </section>

        <section className="motion-section section-shell" id="motion">
          <div className="container motion-grid">
            <div>
              <SectionHeading eyebrow="03 / Motion" title={<>Motion with<br /><em>intent.</em></>} copy="Soft orbital drift and precise interaction states make the interface feel alive without making it feel busy." />
              <div className="motion-note" data-reveal><span className="motion-note__line" /><p>Reduced motion is respected across the system. The signal remains clear at every speed.</p></div>
            </div>
            <div className="motion-panel" data-reveal>
              <div className="motion-panel__header"><span>AMBIENT FIELD</span><span className="status-chip status-chip--small"><span className="status-chip__dot" />LIVE</span></div>
              <div className="motion-panel__stage">
                <div className="motion-panel__arc motion-panel__arc--one" />
                <div className="motion-panel__arc motion-panel__arc--two" />
                <div className="motion-panel__node"><ZorqMark /></div>
                <span className="motion-panel__particle motion-panel__particle--one" /><span className="motion-panel__particle motion-panel__particle--two" /><span className="motion-panel__particle motion-panel__particle--three" />
              </div>
              <div className="motion-panel__footer"><span>ORBITAL DRIFT</span><span>8.0 SEC</span></div>
            </div>
          </div>
        </section>

        <section className="arc-section section-shell" id="arc">
          <div className="container arc-grid"><div><SectionHeading eyebrow="06 / ARC" title={<>In the<br /><em>ARC orbit.</em></>} copy="Zorq is built on ARC. Official network guidance, explorer links, and technical details will be added here when verified." /><div className="arc-links" data-reveal><span>NETWORK</span><strong>ARC</strong><span className="arc-links__pending">DETAILS PENDING</span></div></div><div className="arc-visual" data-reveal><div className="arc-visual__field"><span className="arc-visual__arc arc-visual__arc--one" /><span className="arc-visual__arc arc-visual__arc--two" /><div className="arc-visual__node">A</div><span className="arc-visual__label">ZORQ / ARC</span></div></div></div>
        </section>

        <section className="community-section section-shell" id="community">
          <div className="container"><SectionHeading eyebrow="07 / Community" title={<>Find the signal.<br /><em>Add your frequency.</em></>} copy="Official social channels will appear here once they are verified. No placeholder links masquerading as official destinations." /><div className="community-grid" data-reveal>{["Discord", "Telegram", "X", "Community hub"].map((label, index) => <a className="community-card" href="#community" key={label} onClick={(event) => event.preventDefault()}><span className="community-card__index">0{index + 1}</span><span className="community-card__label">{label}<small>LINK TBA</small></span><MoveUpRight size={17} /></a>)}</div></div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <div className="container faq-grid"><SectionHeading eyebrow="08 / FAQ" title={<>Keep it<br /><em>clear.</em></>} copy="The useful answers, without the launch theater." /><div className="faq-list" data-reveal>{faqItems.map((item, index) => <div className={openFaq === index ? "faq-item faq-item--open" : "faq-item"} key={item.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{item.question}</span><span className="faq-item__plus">+</span></button><div className="faq-item__answer"><p>{item.answer}</p></div></div>)}</div></div>
        </section>

        <section className="closing-section section-shell" id="join">
          <div className="container closing-card" data-reveal>
            <div><p className="eyebrow"><span className="eyebrow__dot" />THE SIGNAL IS OPEN</p><h2>Zorq is here.<br /><em>Join the orbit.</em></h2></div>
            <a className="button button--primary" href="#community">Find the community <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container site-footer__inner"><div className="site-footer__brand"><a className="brand-lockup" href="#top"><ZorqMark compact /><span className="brand-lockup__word">ZORQ<span className="brand-lockup__dot">.</span></span></a><p>A playful signal entering the ARC orbit.</p></div><div className="site-footer__nav"><span>NAVIGATE</span><a href="#about">About</a><a href="#tokenomics">Tokenomics</a><a href="#roadmap">Roadmap</a><a href="#faq">FAQ</a></div><div className="site-footer__nav"><span>CONNECT</span><a href="#community">Discord / TBA</a><a href="#community">Telegram / TBA</a><a href="#community">X / TBA</a><a href="#arc">ARC reference</a></div><div className="site-footer__status"><span>CONTRACT</span><strong>TBA — address pending</strong><small>Crypto assets are volatile. Do your own research.</small></div></div><div className="container site-footer__bottom"><span>© ZORQ / COMMUNITY-LED PROJECT</span><span>FACTS PENDING WHERE NOT YET PUBLISHED</span></div></footer>
    </div>
  );
}

export default Home;
