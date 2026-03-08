"use client";

import { CircleHelp, FileText, Shield, X } from "lucide-react";
import { LawGXLogo } from "@/components/lawgx-logo";
import type { CTAAction, CTAActionKind } from "@/lib/types";

const supportLinks = [
  { label: "About", href: "#about", icon: CircleHelp },
  { label: "Privacy", href: "#privacy", icon: Shield },
  { label: "Terms", href: "#terms", icon: FileText },
];

type MobileSidebarDrawerProps = {
  open: boolean;
  onClose: () => void;
  onAction: (kind: CTAActionKind) => void;
  actions: CTAAction[];
};

export function MobileSidebarDrawer({ open, onClose, onAction, actions }: MobileSidebarDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 flex h-full w-[88%] max-w-[360px] flex-col border-r border-white/10 bg-[var(--sidebar)] p-5 shadow-2xl shadow-black/50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <LawGXLogo className="max-w-[180px]" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.kind}
                type="button"
                onClick={() => {
                  onAction(action.kind);
                  onClose();
                }}
                className="flex w-full items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-left transition hover:border-[var(--accent)]/30 hover:bg-white/[0.05]"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--accent)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{action.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto border-t border-white/8 pt-4">
          {supportLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-muted)] transition hover:bg-white/6 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
