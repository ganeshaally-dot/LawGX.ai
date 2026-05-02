function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo">
            LawGX<span className="dot">.ai</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#what">What we build</a>
            </li>
            <li>
              <a href="#how">How it works</a>
            </li>
            <li>
              <a href="#why">Why us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <a href="#contact" className="nav-cta">
            Book discovery call
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-eyebrow">AI Agents &middot; Built for the Mid-Market</div>
          <h1>
            The work that runs your business shouldn&apos;t <em>run your people</em>.
          </h1>
          <p className="hero-sub">
            LawGX.ai builds custom AI agents that take over the repetitive, high-volume workflows your team spends most of their hours on - across HR, sales operations, compliance, customer support, and procurement. Discovery sprint to deployed agent in weeks, not quarters.
          </p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">
              Book a discovery call
              <ArrowIcon />
            </a>
            <a href="#what" className="btn-ghost">
              See what we build
            </a>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Headquarters</span>
              <span className="hero-meta-value">DIFC, Dubai</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Built for</span>
              <span className="hero-meta-value">UAE &amp; GCC</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Time to first agent</span>
              <span className="hero-meta-value">4-8 weeks</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Engagement</span>
              <span className="hero-meta-value">Sprint - Build - Operate</span>
            </div>
          </div>
        </div>
      </header>

      <section className="problem">
        <div className="container">
          <div className="section-eyebrow">The Problem</div>
          <h2 className="section-title">
            Mid-market teams are <em>drowning in operational work</em> that doesn&apos;t need a human.
          </h2>
          <p className="section-intro">
            Every corporate operations team in the GCC tells the same story: too many tickets, too many invoices, too many CVs, too many contracts to review, too many vendors to track. Hiring more people is slow and expensive. AI agents do this work continuously, accurately, and at a fraction of the cost.
          </p>

          <div className="problem-grid">
            <article className="problem-card">
              <div className="problem-card-stat">68%</div>
              <div className="problem-card-title">of operational hours are repetitive</div>
              <div className="problem-card-desc">
                Mid-market knowledge workers spend the majority of their week on workflows that follow predictable patterns - exactly what AI agents excel at.
              </div>
            </article>
            <article className="problem-card">
              <div className="problem-card-stat">3x</div>
              <div className="problem-card-title">slower in the GCC than peers</div>
              <div className="problem-card-desc">
                Regional mid-market firms are on average three years behind global peers in operational AI adoption - and the gap is widening every quarter.
              </div>
            </article>
            <article className="problem-card">
              <div className="problem-card-stat">∞</div>
              <div className="problem-card-title">capacity, once deployed</div>
              <div className="problem-card-desc">
                A well-built agent doesn&apos;t take leave, doesn&apos;t churn, and scales overnight. Your team gets back to the work humans should actually be doing.
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="what">
        <div className="container">
          <div className="section-eyebrow">What We Build</div>
          <h2 className="section-title">
            Production-grade AI agents for <em>the work that matters</em>.
          </h2>
          <p className="section-intro">
            We build, deploy, and operate AI agents across five flagship corporate functions - and one that&apos;s whatever your business actually needs. Each agent is custom-fitted to your tools, your data, and the way your team already works.
          </p>

          <div className="agents-grid">
            <article className="agent-card">
              <div className="agent-num">01 / HR &amp; Talent</div>
              <h3 className="agent-title">Hire, onboard, answer.</h3>
              <p className="agent-desc">
                Resume screening at scale, structured candidate scoring, automated onboarding workflows, and an internal policy Q&amp;A agent that knows your handbook better than anyone.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">resume_screening</span>
                <span className="agent-tag">onboarding_flows</span>
                <span className="agent-tag">policy_qa</span>
              </div>
            </article>

            <article className="agent-card">
              <div className="agent-num">02 / Sales &amp; RevOps</div>
              <h3 className="agent-title">A pipeline that runs itself.</h3>
              <p className="agent-desc">
                Inbound lead qualification, CRM hygiene that actually stays clean, AI-drafted proposals, and pipeline forecasting that surfaces what your reps are about to miss.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">lead_qualification</span>
                <span className="agent-tag">crm_hygiene</span>
                <span className="agent-tag">proposal_drafting</span>
              </div>
            </article>

            <article className="agent-card">
              <div className="agent-num">03 / Compliance &amp; Legal Ops</div>
              <h3 className="agent-title">Review, flag, file.</h3>
              <p className="agent-desc">
                Contract review with risk scoring, automated KYC and AML pipelines, regulatory monitoring across UAE and GCC frameworks, and audit-ready compliance documentation.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">contract_review</span>
                <span className="agent-tag">kyc_aml</span>
                <span className="agent-tag">regulatory_monitoring</span>
              </div>
            </article>

            <article className="agent-card">
              <div className="agent-num">04 / Customer Support</div>
              <h3 className="agent-title">Triage, resolve, escalate.</h3>
              <p className="agent-desc">
                Tier-1 ticket resolution at the speed of typing, knowledge-base agents grounded in your actual SOPs, and intelligent escalation that gets the right human involved at the right moment.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">ticket_triage</span>
                <span className="agent-tag">knowledge_base</span>
                <span className="agent-tag">smart_escalation</span>
              </div>
            </article>

            <article className="agent-card">
              <div className="agent-num">05 / Procurement &amp; Vendors</div>
              <h3 className="agent-title">Source, score, monitor.</h3>
              <p className="agent-desc">
                RFQ analysis, vendor evaluation, contract lifecycle tracking, spend pattern analysis, and continuous vendor risk monitoring across your supplier base.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">vendor_evaluation</span>
                <span className="agent-tag">spend_analysis</span>
                <span className="agent-tag">risk_monitoring</span>
              </div>
            </article>

            <article className="agent-card">
              <div className="agent-num">06 / Finance Ops</div>
              <h3 className="agent-title">Books that close themselves.</h3>
              <p className="agent-desc">
                Invoice processing, AP/AR reconciliation, expense auditing, and financial close workflows - the connective tissue of finance, automated end-to-end.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">invoice_processing</span>
                <span className="agent-tag">reconciliation</span>
                <span className="agent-tag">close_automation</span>
              </div>
            </article>

            <article className="agent-card custom-card">
              <div>
                <div className="agent-num">07 / Custom &amp; Bespoke</div>
                <h3 className="agent-title">Whatever your business actually needs.</h3>
                <p className="agent-desc">
                  Most of our most valuable engagements start with a workflow we&apos;d never have predicted. If your team spends real hours on something repetitive, we can almost certainly build an agent for it. Bring us the bottleneck - we&apos;ll show you the agent.
                </p>
              </div>
              <a href="#contact" className="btn-primary custom-cta">
                Tell us your workflow
                <ArrowIcon />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="how" className="process">
        <div className="container">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">
            From whiteboard to deployed agent in <em>weeks, not quarters</em>.
          </h2>
          <p className="section-intro">
            Our engagement model is built for mid-market velocity. No 18-month digital transformation programmes. No theoretical strategy decks. We start with a focused discovery sprint, build the first agent against a real production workflow, and stay alongside you to operate and improve it.
          </p>

          <div className="process-steps">
            <article className="process-step">
              <div className="process-step-num">i.</div>
              <div className="process-step-label">Phase One</div>
              <h3 className="process-step-title">Discovery Sprint</h3>
              <p className="process-step-desc">
                Two-week structured engagement: we map your highest-friction workflows, score them on AI suitability, and surface the one that delivers the strongest first win. You leave with a concrete agent specification, ROI model, and build plan.
              </p>
              <div className="process-step-meta">2 weeks - Fixed fee</div>
            </article>

            <article className="process-step">
              <div className="process-step-num">ii.</div>
              <div className="process-step-label">Phase Two</div>
              <h3 className="process-step-title">Custom Build</h3>
              <p className="process-step-desc">
                We build, integrate, and deploy your agent. Connected to your real systems - CRM, ERP, ticketing, document stores. Tested against real workflows. Production-ready, with proper observability, evaluation, and human-in-the-loop controls.
              </p>
              <div className="process-step-meta">4-6 weeks - Project fee</div>
            </article>

            <article className="process-step">
              <div className="process-step-num">iii.</div>
              <div className="process-step-label">Phase Three</div>
              <h3 className="process-step-title">Ongoing Operation</h3>
              <p className="process-step-desc">
                Agents need stewardship - model improvements, prompt updates, edge-case handling, expansion to adjacent workflows. We stay on as your AI operations partner so the agent compounds in value rather than degrading.
              </p>
              <div className="process-step-meta">Monthly retainer - Cancellable</div>
            </article>
          </div>
        </div>
      </section>

      <section id="why">
        <div className="container">
          <div className="section-eyebrow">Why LawGX.ai</div>
          <h2 className="section-title">
            Built in the region, <em>for the region</em>.
          </h2>

          <div className="why-grid">
            <div className="why-points">
              <article className="why-point">
                <div className="why-point-num">i.</div>
                <div>
                  <h3 className="why-point-title">DIFC-domiciled, regulated environment</h3>
                  <p className="why-point-desc">
                    We operate from the DIFC - the GCC&apos;s most mature legal and regulatory environment for technology. Your data and our work are governed by DIFC Data Protection Law 2020 and English-law principles, not improvised offshore arrangements.
                  </p>
                </div>
              </article>

              <article className="why-point">
                <div className="why-point-num">ii.</div>
                <div>
                  <h3 className="why-point-title">Mid-market velocity, not enterprise drag</h3>
                  <p className="why-point-desc">
                    We&apos;re built for companies of 50 to 500 people that need results in weeks, not the kind of glacial transformation programmes the Big Four sell to enterprise. Lean teams. Fast cycles. Production agents on real workflows.
                  </p>
                </div>
              </article>

              <article className="why-point">
                <div className="why-point-num">iii.</div>
                <div>
                  <h3 className="why-point-title">Domain expertise, not just engineering</h3>
                  <p className="why-point-desc">
                    Our team combines AI engineering with deep operational and regulatory experience across UAE and GCC corporate functions. We&apos;ve sat in the seats your team sits in - we know which workflows are actually worth automating and which aren&apos;t.
                  </p>
                </div>
              </article>

              <article className="why-point">
                <div className="why-point-num">iv.</div>
                <div>
                  <h3 className="why-point-title">Outcome-aligned engagement</h3>
                  <p className="why-point-desc">
                    We don&apos;t sell licences for software you might use. Our discovery sprint is fixed-fee. Our builds are project-fee. Our ongoing operation is a cancellable retainer. You stay because the agent works - not because you&apos;re locked in.
                  </p>
                </div>
              </article>
            </div>

            <aside className="why-aside">
              <div className="why-aside-eyebrow">A Note from the Founder</div>
              <h3 className="why-aside-title">&quot;We started LawGX.ai because we kept seeing the same wasted hours.&quot;</h3>
              <p>
                Across hundreds of corporate engagements, the pattern was identical: smart, expensive professionals spending most of their week on work no human should have to do. AI agents, properly built, give those hours back. That&apos;s the entire premise.
              </p>
              <div className="why-aside-stamp">- LawGX.ai - DIFC, Dubai</div>
            </aside>
          </div>
        </div>
      </section>

      <section id="contact" className="pilot">
        <div className="container pilot-inner">
          <div className="pilot-eyebrow">&#9670; Pilot Programme - Now Open</div>
          <h2>
            Be one of our <em>first ten</em> clients.
          </h2>
          <p>
            We&apos;re working with a small cohort of UAE and GCC mid-market firms as our first production deployments. Discounted discovery sprints, founder-led engagements, deep partnership.
          </p>
          <a href="mailto:hello@lawgx.ai?subject=Discovery%20Call%20-%20LawGX.ai" className="pilot-cta">
            Book a discovery call
            <ArrowIcon />
          </a>

          <div className="pilot-meta">
            <span>Founder-led calls</span>
            <span>2-week discovery sprints</span>
            <span>Pilot pricing through Q2</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                LawGX<span className="dot">.ai</span>
              </div>
              <p>AI agents for corporate operations, built for mid-market companies in the UAE and wider GCC.</p>
              <p className="footer-brand-meta">LAWGX.AI LIMITED - DIFC, DUBAI</p>
            </div>

            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#what">Agents</a>
                </li>
                <li>
                  <a href="#how">How it works</a>
                </li>
                <li>
                  <a href="#why">Why us</a>
                </li>
                <li>
                  <a href="#contact">Pilot programme</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Privacy notice</a>
                </li>
                <li>
                  <a href="#">Terms of use</a>
                </li>
                <li>
                  <a href="#">Data protection</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; 2026 LawGX.ai Limited. All rights reserved.</span>
            <span className="footer-bottom-meta">Built in DIFC - Hosted globally</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
