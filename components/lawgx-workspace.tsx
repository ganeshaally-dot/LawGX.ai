"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { CTA_PANEL_ACTIONS, navigationGroups } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";
import { createMessage, formatTimestamp } from "@/lib/utils";
import { BookingFlowModal } from "@/components/booking-flow-modal";
import { ChatComposer } from "@/components/chat-composer";
import { ChatPanel } from "@/components/chat-panel";
import { LawGXLogo } from "@/components/lawgx-logo";
import { MobileSidebarDrawer } from "@/components/mobile-sidebar-drawer";
import { QuickActionsPanel } from "@/components/quick-actions-panel";
import { Sidebar } from "@/components/sidebar";

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

export function LawGXWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [buildWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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
    <>
      <div className="relative grid min-h-[min(920px,calc(100vh-2rem))] overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(5,10,17,0.78)] shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl xl:grid-cols-[auto_minmax(0,1fr)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,154,28,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(70,92,132,0.10),transparent_24%)]" />

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

        <div className="relative flex min-h-[75vh] flex-col border-x border-white/8 bg-[linear-gradient(180deg,rgba(7,12,18,0.88),rgba(8,13,20,0.72))] xl:min-h-full">
          <div className="border-b border-white/8 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <LawGXLogo compact />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)]">LawGX AI</p>
                  <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Legal Information & Intake Assistant</h1>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                    General legal information and intake support for cross-border business matters.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <QuickActionsPanel
                  open={isActionsOpen}
                  onToggle={() => setIsActionsOpen((current) => !current)}
                  onBookConsultation={() => {
                    setIsActionsOpen(false);
                    setIsBookingOpen(true);
                  }}
                  actions={CTA_PANEL_ACTIONS}
                />
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 xl:hidden"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>

          <div ref={viewportRef} className="scrollbar-thin flex-1 overflow-y-auto px-4 pb-44 pt-6 sm:px-6">
            {hasConversation ? (
              <div className="mx-auto max-w-4xl">
                <ChatPanel messages={messages} isLoading={isLoading} />
              </div>
            ) : (
              <div className="mx-auto max-w-4xl" />
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
                <p>Open the three-dot menu to book, upload documents, request a proposal, or WhatsApp LawGX.</p>
                <p>{formatTimestamp(new Date().toISOString())}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingFlowModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}