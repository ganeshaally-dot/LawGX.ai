"use client";

import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CTAAction, CTAActionKind } from "@/lib/types";

type QuickActionsPanelProps = {
  open: boolean;
  onToggle: () => void;
  onAction: (kind: CTAActionKind) => void;
  actions: CTAAction[];
};

export function QuickActionsPanel({ open, onToggle, onAction, actions }: QuickActionsPanelProps) {
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
          "absolute right-0 top-14 z-30 w-[min(360px,calc(100vw-2rem))] rounded-[28px] border border-white/10 bg-[rgba(16,16,16,0.98)] p-4 shadow-2xl shadow-black/60 transition duration-200",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <p className="px-2 text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">LawGX Support Actions</p>
        <div className="mt-3 space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.kind}
                type="button"
                onClick={() => onAction(action.kind)}
                className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition hover:border-[var(--accent)]/35 hover:bg-white/[0.06]"
              >
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--accent)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{action.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
