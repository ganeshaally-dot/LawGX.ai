import { ArrowUpRight, BadgeCheck, Building2, Gavel, Scale, ShieldCheck, Sparkles, Globe2, Handshake } from "lucide-react";
import { LawGXWorkspace } from "@/components/lawgx-workspace";

const practiceAreas = [
  {
    title: "Corporate Structuring",
    description:
      "Entity setup pathways, holding structures, jurisdiction comparisons, and operational governance planning.",
    icon: Building2,
  },
  {
    title: "Governance & Compliance",
    description:
      "Board processes, policy frameworks, internal approvals, and compliance intake for regulated growth.",
    icon: ShieldCheck,
  },
  {
    title: "Transactions & M&A",
    description:
      "Commercial deal flow support, diligence intake, and practical issue-spotting for cross-border transactions.",
    icon: Scale,
  },
  {
    title: "Disputes & Recovery",
    description:
      "Early-stage dispute triage, enforcement considerations, and debt recovery intake support.",
    icon: Gavel,
  },
];

const differentiators = [
  "Structured intake for cross-border business matters",
  "Commercially aware summaries with clear next-step prompts",
  "Always framed as general information, never final legal advice",
];

const trustSignals = [
  {
    title: "Cross-Border Orientation",
    description: "Built to surface jurisdictional context, entity structure, counterparties, and risk posture early.",
    icon: Globe2,
  },
  {
    title: "Engagement Funnel",
    description: "Every interaction supports qualification, intake clarity, and transition to formal consultation.",
    icon: Handshake,
  },
  {
    title: "Premium User Experience",
    description: "A restrained, executive-facing interface designed to feel trustworthy, calm, and commercially sharp.",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(170,140,94,0.18),transparent_32%),radial-gradient(circle_at_right,rgba(74,102,139,0.16),transparent_28%)]" />

      <section id="home" className="relative px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <LawGXWorkspace />
        </div>
      </section>

      <section className="relative px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {trustSignals.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.05]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[var(--panel-strong)] text-[var(--accent)]">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">
              <BadgeCheck className="h-4 w-4" />
              About LawGX AI
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-4xl text-white sm:text-5xl">
                A premium intake and legal information layer for sophisticated business matters.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                LawGX AI is designed to help founders, investors, general counsel, and family offices
                frame legal questions, organize preliminary facts, and move efficiently toward a
                formal consultation with LawGX.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Why it works
            </p>
            <div className="mt-6 space-y-4">
              {differentiators.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="practice-areas" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent-soft)]">Practice Areas</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Built for commercially important moments across the legal lifecycle.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              The assistant helps users structure early inquiries, gather intake details, and surface
              where formal advice is likely required.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {practiceAreas.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[var(--panel-strong)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="relative px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Privacy</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Confidentiality expectations should be set formally.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Do not submit highly sensitive facts until LawGX confirms the appropriate engagement,
              confidentiality framework, and document handling process.
            </p>
          </article>
          <article id="terms" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Terms</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Use of the assistant is informational only.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Using LawGX AI does not create a lawyer-client or consultant-client relationship unless
              LawGX expressly agrees to act under a formal engagement.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(170,140,94,0.16),rgba(22,28,39,0.65),rgba(74,102,139,0.16))] p-8 shadow-2xl shadow-black/20 lg:flex lg:items-end lg:justify-between lg:p-12">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent-soft)]">Contact LawGX</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Move from preliminary intake to formal engagement.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              For case-specific or jurisdiction-specific advice, LawGX can transition the conversation
              into a formal consultation and scoped engagement.
            </p>
            <p className="mt-6 text-sm text-[var(--text-muted)]">Email: info@lawgx.ai</p>
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:mt-0 lg:min-w-[280px]">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-[var(--accent)] hover:text-slate-950"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/15 px-5 py-4 text-sm font-semibold text-white transition hover:border-[var(--accent)]/40 hover:bg-white/8"
            >
              WhatsApp Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-4 py-8 text-center text-sm text-[var(--text-muted)] sm:px-6 lg:px-8">
        Use of this site does not create a lawyer-client or consultant-client relationship unless formally agreed.
      </footer>
    </main>
  );
}