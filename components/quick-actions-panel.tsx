"use client";

import { ArrowUpRight, Ellipsis, FileUp, MessageCircleMore, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CTAAction } from "@/lib/types";

type QuickActionsPanelProps = {
  open: boolean;
  onToggle: () => void;
  onBookConsultation: () => void;
  actions: CTAAction[];
};

const iconMap = {
  consultation: NotebookPen,
  upload: FileUp,
  whatsapp: MessageCircleMore,
  proposal: ArrowUpRight,
};

export function QuickActionsPanel({ open, onToggle, onBookConsultation, actions }: QuickActionsPanelProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
        aria-label="Open quick actions"
      >
        <Ellipsis className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "absolute right-0 top-14 z-30 w-[min(340px,calc(100vw-2rem))] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,38,0.99),rgba(7,14,28,0.99))] p-4 shadow-2xl shadow-black/50 transition duration-200",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <p className="px-2 text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Quick Actions</p>
        <div className="mt-3 space-y-2">
          {actions.map((action) => {
            const Icon = iconMap[action.kind];
            const isBook = action.kind === "consultation";
            const isExternal = action.href.startsWith("http");

            return isBook ? (
              <button
                key={action.label}
                type="button"
                onClick={onBookConsultation}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition hover:border-[var(--accent)]/35 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{action.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">Private booking request</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" />
              </button>
            ) : (
              <a
                key={action.label}
                href={action.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-[var(--accent)]/35 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{action.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {action.kind === "whatsapp" ? "Open direct WhatsApp conversation" : "Open support path"}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
