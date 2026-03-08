"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { CTA_PANEL_ACTIONS, navigationGroups, starterPrompts } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";
import { createMessage, formatTimestamp } from "@/lib/utils";
import { ChatComposer } from "@/components/chat-composer";
import { ChatPanel } from "@/components/chat-panel";
import { MobileSidebarDrawer } from "@/components/mobile-sidebar-drawer";
import { Sidebar } from "@/components/sidebar";
import { StarterPrompts } from "@/components/starter-prompts";
import { WorkWithLawGXPanel } from "@/components/work-with-lawgx-panel";

function buildWelcomeMessage() {
  return createMessage(
    "assistant",
    [
      "Welcome to **LawGX AI**.",
      "I can help with general legal information and intake support for cross-border business matters, including corporate structuring, governance, disputes, and debt recovery intake.",
      "For case-specific legal advice, formal engagement with LawGX is required.",
    ].join("\n\n"),
  );
}

const signalCards = [
  {
    title: "General Information Only",
    description: "Designed for early-stage legal information and structured intake, not final legal advice.",
    icon: ShieldCheck,
  },
  {
    title: "Commercially Aware Intake",
    description: "Built to surface jurisdiction, urgency, counterparties, and next-step engagement signals.",
    icon: CheckCircle2,
  },
];

export function LawGXWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [buildWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);

  const hasConversation = messages.length > 1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  function resetConversation() {
    activeRequestIdRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setMessages([buildWelcomeMessage()]);
    setInput("");
    setIsLoading(false);
    setIsMobileSidebarOpen(false);
  }

  async function submitMessage(rawMessage: string) {
    const content = rawMessage.trim();
    if (!content || isLoading) return;

    const nextUserMessage = createMessage("user", content);
    const nextMessages = [...messages, nextUserMessage];
    const requestId = activeRequestIdRef.current + 1;
    const controller = new AbortController();

    activeRequestIdRef.current = requestId;
    abortControllerRef.current?.abort();
    abortControllerRef.current = controller;

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
        signal: controller.signal,
      });

      let payload: { reply?: string; error?: string } = {};

      try {
        payload = (await response.json()) as { reply?: string; error?: string };
      } catch {
        payload = {};
      }

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to reach the assistant.");
      }

      if (activeRequestIdRef.current !== requestId) {
        return;
      }

      setMessages((current) => [...current, createMessage("assistant", payload.reply ?? "")]);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting LawGX AI.";

      if (activeRequestIdRef.current !== requestId) {
        return;
      }

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `${message}\n\nIf your matter is time-sensitive or jurisdiction-specific, please book a consultation with LawGX.`,
        ),
      ]);
    } finally {
      if (activeRequestIdRef.current === requestId) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  }

  return (
    <div className="relative grid min-h-[min(980px,calc(100vh-2rem))] overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(5,10,17,0.72)] shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl xl:grid-cols-[auto_minmax(0,1fr)_360px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,107,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(75,108,146,0.12),transparent_28%)]" />

      <Sidebar
        collapsed={isSidebarCollapsed}
        onCollapseToggle={() => setIsSidebarCollapsed((current) => !current)}
        onMobileOpen={() => setIsMobileSidebarOpen(true)}
        onNewChat={resetConversation}
        items={navigationGroups}
      />

      <MobileSidebarDrawer
        open={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onNewChat={resetConversation}
        items={navigationGroups}
      />

      <div className="relative flex min-h-[75vh] flex-col border-x border-white/8 bg-[linear-gradient(180deg,rgba(7,12,18,0.85),rgba(8,13,20,0.68))] xl:min-h-full">
        <div className="border-b border-white/8 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)]">LawGX AI</p>
              <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Legal Information & Intake Assistant</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                General legal information and intake support for cross-border business matters.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 xl:hidden"
            >
              Menu
            </button>
          </div>

          <div className="mt-4 hidden gap-3 md:grid md:grid-cols-2">
            {signalCards.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[var(--panel-strong)] text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={viewportRef} className="scrollbar-thin flex-1 overflow-y-auto px-4 pb-44 pt-6 sm:px-6">
          {!hasConversation ? (
            <div className="mx-auto flex h-full max-w-4xl flex-col justify-center">
              <div className="animate-fade-up rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 shadow-2xl shadow-black/20 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">
                  Intake-first legal-tech experience
                </div>
                <h2 className="mt-4 max-w-2xl font-display text-4xl text-white sm:text-5xl">
                  Frame the issue well. Qualify the engagement faster.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
                  Use LawGX AI for general legal information and intake support only. It can help you
                  organize facts, compare structures, and prepare for a formal consultation with LawGX.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-[var(--accent)]">
                    Book Consultation
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <span className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    Formal engagement required for case-specific advice
                  </span>
                </div>
                <StarterPrompts prompts={starterPrompts} onSelect={submitMessage} />
              </div>

              <div className="mt-8">
                <ChatPanel messages={messages} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <ChatPanel messages={messages} isLoading={isLoading} />
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/8 bg-[linear-gradient(180deg,rgba(8,13,20,0.2),rgba(8,13,20,0.95)_30%)] px-4 pb-4 pt-6 backdrop-blur-xl sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-col gap-2 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>This assistant provides general information only and does not constitute legal advice.</p>
              <p>Enter to send. Shift + Enter for a new line.</p>
            </div>
            <ChatComposer
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              onKeyDown={handleComposerKeyDown}
              disabled={isLoading}
            />
            <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
              <p>For urgent or jurisdiction-specific matters, book a consultation with LawGX.</p>
              <p>{formatTimestamp(new Date().toISOString())}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(12,18,28,0.9),rgba(10,14,22,0.96))] xl:border-l xl:border-t-0">
        <WorkWithLawGXPanel actions={CTA_PANEL_ACTIONS} />
      </div>
    </div>
  );
}