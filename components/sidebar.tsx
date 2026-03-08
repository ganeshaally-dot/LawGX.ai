"use client";

import { ChevronLeft, ChevronRight, CircleHelp, FileText, Shield, Menu } from "lucide-react";
import { LawGXLogo } from "@/components/lawgx-logo";
import type { CTAAction, CTAActionKind } from "@/lib/types";
import { cn } from "@/lib/utils";

type SidebarProps = {
  collapsed: boolean;
  onCollapseToggle: () => void;
  onMobileOpen: () => void;
  onAction: (kind: CTAActionKind) => void;
  actions: CTAAction[];
};

const supportLinks = [
  { label: "About", href: "#about", icon: CircleHelp },
  { label: "Privacy", href: "#privacy", icon: Shield },
  { label: "Terms", href: "#terms", icon: FileText },
];

export function Sidebar({ collapsed, onCollapseToggle, onMobileOpen, onAction, actions }: SidebarProps) {
  return (
    <>
      <div className="hidden xl:flex">
        <aside
          className={cn(
            "flex h-full flex-col border-r border-white/8 bg-[var(--sidebar)] transition-all duration-300",
            collapsed ? "w-[96px]" : "w-[292px]",
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-5">
            <div className={cn("overflow-hidden transition-all", collapsed ? "w-0 opacity-0" : "w-full opacity-100")}>
              <LawGXLogo className="max-w-[178px]" />
            </div>

            {collapsed ? <LawGXLogo compact className="shrink-0" /> : null}

            <button
              type="button"
              onClick={onCollapseToggle}
              className="rounded-2xl border border-white/10 bg-white/5 p-2 text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          <div className="px-3">
            <p className={cn("px-3 text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]", collapsed && "text-center")}>
              {collapsed ? "Desk" : "Advisory Desk"}
            </p>
            <div className="mt-3 space-y-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.kind}
                    type="button"
                    onClick={() => onAction(action.kind)}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-left transition hover:border-[var(--accent)]/30 hover:bg-white/[0.05]",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--accent)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={cn("min-w-0", collapsed && "hidden")}>
                      <p className="text-sm font-semibold text-white">{action.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{action.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto border-t border-white/8 px-3 py-4">
            <div className="space-y-1">
              {supportLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-muted)] transition hover:bg-white/6 hover:text-white",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className={cn(collapsed && "hidden")}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="flex items-center justify-between border-b border-white/8 bg-[var(--sidebar)] px-4 py-3 xl:hidden">
        <div className="min-w-0 flex-1">
          <LawGXLogo className="max-w-[144px]" />
        </div>

        <button
          type="button"
          onClick={onMobileOpen}
          className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
