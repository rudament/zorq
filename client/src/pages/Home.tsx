import { ArrowDownRight, ArrowUpRight, Menu, MoveUpRight, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { label: "Foundation", href: "#foundation" },
  { label: "Surfaces", href: "#surfaces" },
  { label: "Motion", href: "#motion" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
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
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal data-visible="true">
              <p className="eyebrow hero-eyebrow"><span className="eyebrow__dot" />ARC / MEME TOKEN <span className="eyebrow__line" /> VISUAL FOUNDATION</p>
              <h1>ZORQ<br /><span>IS HERE<span className="hero-period">.</span></span></h1>
              <p className="hero-description">A premium visual system for a signal with somewhere to go. Dark, deliberate, and ready for the ARC orbit.</p>
              <div className="hero-actions">
                <a className="button button--primary" href="#foundation">Explore the system <ArrowDownRight size={17} /></a>
                <a className="button button--secondary" href="#motion">See the motion <ArrowUpRight size={17} /></a>
              </div>
              <div className="hero-meta">
                <span className="status-chip"><span className="status-chip__dot" />SYSTEM PREVIEW</span>
                <span className="hero-meta__divider" />
                <span className="hero-meta__note">Facts &amp; chain features intentionally pending</span>
              </div>
            </div>

            <div className="hero-visual" data-reveal data-visible="true" aria-label="Zorq orbital signal visual">
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
              <div className="hero-visual__label hero-visual__label--top"><span />ZORQ / 001</div>
              <div className="hero-visual__label hero-visual__label--bottom">ORBITAL SIGNAL <span>ARC</span></div>
            </div>
          </div>
          <div className="hero-bottom-line container"><span>SCROLL TO TUNE IN</span><div className="hero-bottom-line__track"><span /></div><span>01 / 03</span></div>
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

        <section className="closing-section section-shell">
          <div className="container closing-card" data-reveal>
            <div><p className="eyebrow"><span className="eyebrow__dot" />READY FOR THE NEXT LAYER</p><h2>Zorq is here.<br /><em>The foundation is set.</em></h2></div>
            <a className="button button--primary" href="#top">Back to top <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container site-footer__inner"><a className="brand-lockup" href="#top"><ZorqMark compact /><span className="brand-lockup__word">ZORQ<span className="brand-lockup__dot">.</span></span></a><span className="site-footer__note">A visual foundation for an ARC-native signal.</span><span className="site-footer__mono">VISUAL SYSTEM / 001</span></div></footer>
    </div>
  );
}

export default Home;
