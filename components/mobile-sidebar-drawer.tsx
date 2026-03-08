"use client";

import Link from "next/link";
import { CircleHelp, FileText, Shield, X } from "lucide-react";
import { LawGXLogo } from "@/components/lawgx-logo";
import type { NavigationGroup } from "@/lib/types";

type MobileSidebarDrawerProps = {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
  items: NavigationGroup;
};

export function MobileSidebarDrawer({ open, onClose, onNewChat, items }: MobileSidebarDrawerProps) {
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
        className={`absolute left-0 top-0 flex h-full w-[88%] max-w-[340px] flex-col border-r border-white/10 bg-[var(--sidebar)] p-5 shadow-2xl shadow-black/50 transition-transform duration-300 ${
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

        <button
          type="button"
          onClick={onNewChat}
          className="mt-6 rounded-2xl border border-[var(--accent)]/25 bg-[rgba(248,154,28,0.08)] px-4 py-3 text-left text-sm font-medium text-white"
        >
          New Chat
        </button>

        <nav className="mt-8 flex-1 space-y-2">
          {items.primary.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-white/6 hover:text-white"
            >
              <Icon className="h-4 w-4 text-[var(--accent)]" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/8 pt-4">
          {items.secondary.map(({ label, href, icon }) => {
            const Icon = icon === "about" ? CircleHelp : icon === "privacy" ? Shield : FileText;

            return (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-muted)] transition hover:bg-white/6 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}