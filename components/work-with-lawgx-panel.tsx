import { ArrowUpRight, FileUp, MessageCircleMore, NotebookPen } from "lucide-react";
import type { CTAAction } from "@/lib/types";

type WorkWithLawGXPanelProps = {
  actions: CTAAction[];
};

const iconMap = {
  consultation: NotebookPen,
  upload: FileUp,
  whatsapp: MessageCircleMore,
  proposal: ArrowUpRight,
};

export function WorkWithLawGXPanel({ actions }: WorkWithLawGXPanelProps) {
  return (
    <aside className="flex h-full flex-col p-5 sm:p-6">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Engagement</p>
        <h2 className="mt-4 font-display text-3xl text-white">Work with LawGX</h2>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          Move from general information and intake to a formal consultation, document review pathway,
          or scoped proposal with the LawGX team.
        </p>

        <div className="mt-6 space-y-3">
          {actions.map((action) => {
            const Icon = iconMap[action.kind];
            const isExternal = action.href.startsWith("http");

            return (
              <a
                key={action.label}
                href={action.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-4 transition hover:border-[var(--accent)]/35 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-white">{action.label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--accent)]/18 bg-[var(--accent)]/8 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Trust Notice</p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          For case-specific legal advice, formal engagement with LawGX is required.
        </p>
      </div>
    </aside>
  );
}