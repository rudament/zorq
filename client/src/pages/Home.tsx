import {
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  MoveUpRight,
  Wallet,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  ZORQ_CONTRACT_ADDRESS,
  ZORQ_DONATION_ADDRESS,
  ZORQ_X_URL,
} from "@shared/const";

const SHORT_ZORQ_CONTRACT = `${ZORQ_CONTRACT_ADDRESS.slice(0, 6)}...${ZORQ_CONTRACT_ADDRESS.slice(-4)}`;
const SHORT_ZORQ_DONATION = `${ZORQ_DONATION_ADDRESS.slice(0, 6)}...${ZORQ_DONATION_ADDRESS.slice(-5)}`;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Why Zorq", href: "#why-zorq" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Support the dev", href: "#support" },
  { label: "Community", href: "#community" },
];

const whyCards = [
  {
    index: "01",
    title: "A signal, not a spreadsheet",
    copy: "A recognizable identity for people who move fast and know what they like.",
    accent: "cyan",
  },
  {
    index: "02",
    title: "Made to travel",
    copy: "A compact name, glyph, and voice designed to hold up in the feed.",
    accent: "lime",
  },
  {
    index: "03",
    title: "Small surface, strong system",
    copy: "Every touchpoint stays connected, from the orbital mark to the last pixel.",
    accent: "blue",
  },
  {
    index: "04",
    title: "Room to evolve",
    copy: "A clear foundation that leaves space for the community to shape what comes next.",
    accent: "violet",
  },
];

const faqItems = [
  {
    question: "What is Zorq?",
    answer:
      "Zorq is a meme token project with a premium visual identity and a community-first launch surface.",
  },
  {
    question: "Which blockchain is Zorq on?",
    answer:
      "Zorq is being built on ARC. Official technical and transaction details will be published when verified.",
  },
  {
    question: "Where is the official contract address?",
    answer:
      "The verified Zorq contract is shown on this website. Always confirm the full address through an official Zorq channel before using it.",
  },
  {
    question: "Where can I find official links?",
    answer:
      "Verified community links will be added here once they are provided by the project owner.",
  },
  {
    question: "Is Zorq financial advice?",
    answer:
      "No. Meme tokens are high-risk and volatile. Do your own research and never commit more than you can afford to lose.",
  },
  {
    question: "How will updates be shared?",
    answer:
      "Project updates will be published through verified Zorq community channels.",
  },
];

function ZorqMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "zorq-mark zorq-mark--compact" : "zorq-mark"}
      aria-hidden="true"
    >
      <span className="zorq-mark__core" />
      <span className="zorq-mark__orbit zorq-mark__orbit--one" />
      <span className="zorq-mark__orbit zorq-mark__orbit--two" />
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__dot" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      <p className="section-heading__copy">{copy}</p>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [contractCopied, setContractCopied] = useState(false);
  const [donationCopied, setDonationCopied] = useState(false);
  const pointerFrame = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      document.documentElement.style.setProperty(
        "--zorq-scroll-shift",
        `${Math.min(window.scrollY * 0.035, 16)}px`
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll("[data-reveal]")
        .forEach(element => element.setAttribute("data-visible", "true"));
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        document.documentElement.style.removeProperty("--zorq-scroll-shift");
      };
    }

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach(element => revealObserver.observe(element));

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--zorq-scroll-shift");
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const copyContractAddress = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(ZORQ_CONTRACT_ADDRESS);
    setContractCopied(true);
    window.setTimeout(() => setContractCopied(false), 1600);
  };
  const copyDonationAddress = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(ZORQ_DONATION_ADDRESS);
    setDonationCopied(true);
    window.setTimeout(() => setDonationCopied(false), 1600);
  };
  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    if (pointerFrame.current !== null)
      window.cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = window.requestAnimationFrame(() => {
      target.style.setProperty("--zorq-pointer-x", `${x}px`);
      target.style.setProperty("--zorq-pointer-y", `${y}px`);
      pointerFrame.current = null;
    });
  };
  const handleHeroPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (pointerFrame.current !== null)
      window.cancelAnimationFrame(pointerFrame.current);
    event.currentTarget.style.setProperty("--zorq-pointer-x", "0px");
    event.currentTarget.style.setProperty("--zorq-pointer-y", "0px");
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
          <a
            className="brand-lockup"
            href="#top"
            onClick={closeMenu}
            aria-label="Zorq home"
          >
            <ZorqMark compact />
            <span className="brand-lockup__word">
              ZORQ<span className="brand-lockup__dot">.</span>
            </span>
          </a>

          <nav
            className={
              menuOpen
                ? "site-nav__links site-nav__links--open"
                : "site-nav__links"
            }
            aria-label="Primary navigation"
          >
            {navItems.map(item => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href="#join" onClick={closeMenu}>
              Join the signal <MoveUpRight size={14} />
            </a>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section
          className="hero-section"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal data-visible="true">
              <p className="eyebrow hero-eyebrow">
                <span className="eyebrow__dot" />
                ARC / MEME TOKEN <span className="eyebrow__line" /> ZORQ SIGNAL
              </p>
              <h1>
                ZORQ<span className="hero-period">.</span>
                <span>
                  THE MEME
                  <br className="hero-title-break" /> HAS LANDED
                  <span className="hero-period">.</span>
                </span>
              </h1>
              <p className="hero-description">
                A premium meme token on ARC. Clean enough to remember, playful
                enough to make noise.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#tokenomics">
                  Get Zorq <ArrowDownRight size={17} />
                </a>
                <a className="button button--secondary" href="#community">
                  Join the community <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="hero-utility-row">
                <div
                  className="contract-control"
                  aria-label="Zorq contract address"
                >
                  <div className="contract-control__label">
                    <span className="contract-control__dot" />
                    CONTRACT ADDRESS
                  </div>
                  <div className="contract-control__value">
                    {SHORT_ZORQ_CONTRACT}
                  </div>
                  <button
                    className="contract-control__copy"
                    type="button"
                    onClick={copyContractAddress}
                    aria-label="Copy full Zorq contract address"
                    title="Copy full contract address"
                  >
                    {contractCopied ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="arc-badge" aria-label="ARC blockchain badge">
                  <span className="arc-badge__mark">A</span>
                  <span>
                    <strong>ARC</strong>
                    <small>BLOCKCHAIN</small>
                  </span>
                </div>
              </div>
              <div className="hero-meta">
                <span className="status-chip">
                  <span className="status-chip__dot" />
                  SIGNAL STATUS
                </span>
                <span className="hero-meta__divider" />
                <span className="hero-meta__note">
                  Official project details pending
                </span>
              </div>
            </div>

            <div
              className="hero-visual"
              data-reveal
              data-visible="true"
              aria-label="Zorq orbital signal visual"
            >
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
              <div className="hero-visual__label hero-visual__label--top">
                <span />
                ZORQ / 001
              </div>
              <div className="hero-visual__label hero-visual__label--bottom">
                ORBITAL SIGNAL <span>ARC</span>
              </div>
            </div>
          </div>
          <div className="hero-bottom-line container">
            <span>SCROLL TO TUNE IN</span>
            <div className="hero-bottom-line__track">
              <span />
            </div>
            <span>ZORQ / 001</span>
          </div>
        </section>

        <section className="intro-section section-shell" id="about">
          <div className="container intro-grid">
            <SectionHeading
              eyebrow="00 / What is Zorq?"
              title={
                <>
                  A meme token
                  <br />
                  <em>with a signal.</em>
                </>
              }
              copy="Zorq is a playful, confident presence entering the ARC orbit. A short name, a strong mark, and space for a community to make it their own."
            />
            <div className="intro-statement" data-reveal>
              <span className="intro-statement__quote">“</span>
              <p>
                Zorq is here.
                <br />
                <em>Keep your frequency open.</em>
              </p>
              <span className="intro-statement__line" />
            </div>
          </div>
        </section>

        <section className="why-section section-shell" id="why-zorq">
          <div className="container">
            <SectionHeading
              eyebrow="01 / Why Zorq"
              title={
                <>
                  Built for the
                  <br />
                  <em>meme frequency.</em>
                </>
              }
              copy="Zorq keeps the idea simple: recognizable enough to remember, refined enough to belong in the ARC ecosystem."
            />
            <div className="why-grid">
              {whyCards.map((card, index) => (
                <article
                  className={`why-card why-card--${card.accent}`}
                  key={card.index}
                  data-reveal
                  style={{ "--card-delay": `${index * 70}ms` } as CSSProperties}
                >
                  <div className="why-card__top">
                    <span>{card.index}</span>
                    <MoveUpRight size={16} />
                  </div>
                  <div className="why-card__orb" />
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tokenomics-section section-shell" id="tokenomics">
          <div className="container">
            <SectionHeading
              eyebrow="02 / Tokenomics"
              title={
                <>
                  The numbers
                  <br />
                  <em>come next.</em>
                </>
              }
              copy="A clean, verified data surface is ready for the real details. Nothing here is guessed."
            />
            <div className="tokenomics-panel" data-reveal>
              <div className="tokenomics-ring">
                <div className="tokenomics-ring__inner">
                  <span>TBA</span>
                  <small>VERIFIED DATA PENDING</small>
                </div>
                <span className="tokenomics-ring__orbit" />
              </div>
              <div className="tokenomics-fields">
                {[
                  {
                    label: "Total supply",
                    value: "1,000,000,000",
                    note: "1 BILLION ZORQ",
                  },
                  {
                    label: "Liquidity",
                    value: "FULLY LOCKED",
                    note: "Liquidity is fully locked",
                  },
                  {
                    label: "Allocation",
                    value: "100% FOR COMMUNITY",
                    note: "Community oriented distribution",
                  },
                  {
                    label: "Contract address",
                    value: SHORT_ZORQ_CONTRACT,
                    note: "Verified ARC contract",
                  },
                ].map(({ label, value, note }) => (
                  <div className="token-field" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="arc-section section-shell" id="arc">
          <div className="container arc-grid">
            <div>
              <SectionHeading
                eyebrow="03 / ARC"
                title={
                  <>
                    In the
                    <br />
                    <em>ARC orbit.</em>
                  </>
                }
                copy="Zorq is built on ARC. Official network guidance, explorer links, and technical details will be added here when verified."
              />
              <div className="arc-links" data-reveal>
                <span>NETWORK</span>
                <strong>ARC</strong>
                <span className="arc-links__pending">DETAILS PENDING</span>
              </div>
            </div>
            <div className="arc-visual" data-reveal>
              <div className="arc-visual__field">
                <span className="arc-visual__arc arc-visual__arc--one" />
                <span className="arc-visual__arc arc-visual__arc--two" />
                <div className="arc-visual__node">A</div>
                <span className="arc-visual__label">ZORQ / ARC</span>
              </div>
            </div>
          </div>
        </section>

        <section className="donation-section section-shell" id="support">
          <div className="container">
            <div className="donation-panel" data-reveal>
              <div className="donation-copy">
                <p className="eyebrow">
                  <span className="eyebrow__dot" />
                  DEVELOPER SUPPORT / EVM
                </p>
                <h2>HELP THE POOR DEV</h2>
                <p>Support the dev and help keep Zorq building.</p>
              </div>
              <div className="donation-visual" aria-hidden="true">
                <div className="donation-visual__halo" />
                <div className="donation-visual__wallet">
                  <Wallet size={23} strokeWidth={1.5} />
                  <span />
                </div>
                <small>EVM / OPEN SIGNAL</small>
              </div>
              <div className="donation-address">
                <span className="donation-address__label">
                  DONATION ADDRESS
                </span>
                <strong>{SHORT_ZORQ_DONATION}</strong>
                <button
                  className="button button--secondary donation-address__button"
                  type="button"
                  onClick={copyDonationAddress}
                  aria-label="Copy full EVM donation address"
                >
                  {donationCopied ? "Copied ✓" : "Copy Address"}
                </button>
                <small>
                  Send only on the EVM network. No wallet connection required.
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className="community-section section-shell" id="community">
          <div className="container">
            <SectionHeading
              eyebrow="04 / Community"
              title={
                <>
                  Find the signal.
                  <br />
                  <em>Add your frequency.</em>
                </>
              }
              copy="Official social channels will appear here once they are verified. No placeholder links masquerading as official destinations."
            />
            <div className="community-grid" data-reveal>
              {["Discord", "Telegram", "X", "Community hub"].map(
                (label, index) => (
                  <a
                    className="community-card"
                    href={label === "X" ? ZORQ_X_URL : "#community"}
                    target={label === "X" ? "_blank" : undefined}
                    rel={label === "X" ? "noreferrer" : undefined}
                    key={label}
                    onClick={event => {
                      if (label !== "X") event.preventDefault();
                    }}
                  >
                    <span className="community-card__index">0{index + 1}</span>
                    <span className="community-card__label">
                      {label}
                      <small>
                        {label === "X" ? "OFFICIAL PROFILE" : "LINK TBA"}
                      </small>
                    </span>
                    <MoveUpRight size={17} />
                  </a>
                )
              )}
            </div>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <div className="container faq-grid">
            <SectionHeading
              eyebrow="05 / FAQ"
              title={
                <>
                  Keep it
                  <br />
                  <em>clear.</em>
                </>
              }
              copy="The useful answers, without the launch theater."
            />
            <div className="faq-list" data-reveal>
              {faqItems.map((item, index) => (
                <div
                  className={
                    openFaq === index ? "faq-item faq-item--open" : "faq-item"
                  }
                  key={item.question}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__plus">+</span>
                  </button>
                  <div className="faq-item__answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section section-shell" id="join">
          <div className="container closing-card" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="eyebrow__dot" />
                THE SIGNAL IS OPEN
              </p>
              <h2>
                ZORQ.
                <br />
                <em>THE MEME HAS LANDED.</em>
              </h2>
            </div>
            <a className="button button--primary" href="#community">
              Find the community <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <a className="brand-lockup" href="#top">
              <ZorqMark compact />
              <span className="brand-lockup__word">
                ZORQ<span className="brand-lockup__dot">.</span>
              </span>
            </a>
            <p>ZORQ. THE MEME HAS LANDED.</p>
          </div>
          <div className="site-footer__nav">
            <span>NAVIGATE</span>
            <a href="#about">About</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#arc">ARC</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="site-footer__nav">
            <span>CONNECT</span>
            <a href="#community">Discord / TBA</a>
            <a href="#community">Telegram / TBA</a>
            <a href={ZORQ_X_URL} target="_blank" rel="noreferrer">
              X / ZORQ_ON_ARC
            </a>
            <a href="#community">Community / TBA</a>
          </div>
          <div className="site-footer__status">
            <span>CONTRACT</span>
            <strong>{SHORT_ZORQ_CONTRACT}</strong>
            <button
              className="footer-contract-copy"
              type="button"
              onClick={copyContractAddress}
              aria-label="Copy full Zorq contract address"
            >
              {contractCopied ? "COPIED" : "COPY FULL ADDRESS"}
            </button>
            <small>Crypto assets are volatile. Do your own research.</small>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <span>© ZORQ / COMMUNITY-LED PROJECT</span>
          <span>FACTS PENDING WHERE NOT YET PUBLISHED</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
