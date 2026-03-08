"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Menu,
  MessageSquarePlus,
  Shield,
} from "lucide-react";
import { LawGXLogo } from "@/components/lawgx-logo";
import type { NavigationGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type SidebarProps = {
  collapsed: boolean;
  onCollapseToggle: () => void;
  onMobileOpen: () => void;
  onNewChat: () => void;
  items: NavigationGroup;
};

export function Sidebar({ collapsed, onCollapseToggle, onMobileOpen, onNewChat, items }: SidebarProps) {
  return (
    <>
      <div className="hidden xl:flex">
        <aside
          className={cn(
            "flex h-full flex-col border-r border-white/8 bg-[var(--sidebar)] transition-all duration-300",
            collapsed ? "w-[92px]" : "w-[280px]",
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-5">
            <div className={cn("overflow-hidden transition-all", collapsed ? "w-0 opacity-0" : "w-full opacity-100")}>
              <LawGXLogo className="max-w-[172px]" />
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
            <button
              type="button"
              onClick={onNewChat}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border border-[var(--accent)]/25 bg-[rgba(248,154,28,0.08)] px-4 py-3 text-sm font-medium text-white transition hover:border-[var(--accent)]/45 hover:bg-[rgba(248,154,28,0.14)]",
                collapsed && "justify-center px-2",
              )}
            >
              <MessageSquarePlus className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span className={cn("truncate", collapsed && "hidden")}>New Chat</span>
            </button>
          </div>

          <nav className="mt-6 flex-1 px-3">
            <p className={cn("px-3 text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]", collapsed && "text-center")}>
              {collapsed ? "AI" : "Menu"}
            </p>

            <div className="mt-3 space-y-1">
              {items.primary.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-white/6 hover:text-white",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" />
                  <span className={cn("truncate", collapsed && "hidden")}>{label}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/8 px-3 py-4">
            <div className="space-y-1">
              {items.secondary.map(({ label, href, icon }) => {
                const Icon = icon === "about" ? CircleHelp : icon === "privacy" ? Shield : FileText;

                return (
                  <Link
                    key={label}
                    href={href}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[var(--text-muted)] transition hover:bg-white/6 hover:text-white",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className={cn(collapsed && "hidden")}>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <div className="flex items-center justify-between border-b border-white/8 bg-[var(--sidebar)] px-4 py-3 xl:hidden">
        <div className="flex items-center gap-3">
          <LawGXLogo compact />
          <div>
            <p className="text-sm font-semibold text-white">LawGX AI</p>
            <p className="text-xs text-[var(--text-secondary)]">General legal information and intake support</p>
          </div>
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