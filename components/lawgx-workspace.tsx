"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { defaultMatterAssessment, supportActions } from "@/lib/constants";
import type { ChatMessage, CTAActionKind, MatterAssessment } from "@/lib/types";
import { buildAssessmentContext, createMessage, formatTimestamp } from "@/lib/utils";
import { BookingFlowModal } from "@/components/booking-flow-modal";
import { ChatComposer } from "@/components/chat-composer";
import { ChatPanel } from "@/components/chat-panel";
import { MatterAssessmentPanel } from "@/components/matter-assessment-panel";
import { MobileSidebarDrawer } from "@/components/mobile-sidebar-drawer";
import { QuickActionsPanel } from "@/components/quick-actions-panel";
import { Sidebar } from "@/components/sidebar";

export function LawGXWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [assessment, setAssessment] = useState<MatterAssessment>(defaultMatterAssessment);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [activeSupportMode, setActiveSupportMode] = useState<Exclude<CTAActionKind, "whatsapp"> | null>(null);
  const [isMobileComposer, setIsMobileComposer] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileComposer(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  function handleSupportAction(kind: CTAActionKind) {
    setIsActionsOpen(false);

    if (kind === "whatsapp") {
      const whatsappAction = supportActions.find((action) => action.kind === "whatsapp");
      if (whatsappAction && typeof window !== "undefined") {
        window.open(whatsappAction.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    setActiveSupportMode(kind);
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
          assessment,
          assessmentContext: buildAssessmentContext(assessment),
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
        throw new Error(payload.error || "Unable to reach the LawGX advisory interface.");
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
          `${message}\n\nFor time-sensitive, contentious, or document-heavy matters, please use Book Consultation or Share with LawGX Lawyer.`,
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
    if (isMobileComposer) {
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  }

  return (
    <>
      <div className="relative grid min-h-[calc(100vh-4.8rem)] overflow-hidden rounded-[28px] border border-white/8 bg-[rgba(9,9,9,0.9)] shadow-[0_32px_110px_rgba(0,0,0,0.52)] backdrop-blur-xl xl:grid-cols-[auto_minmax(0,1fr)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,163,102,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(54,54,54,0.14),transparent_26%)]" />

        <Sidebar
          collapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed((current) => !current)}
          onMobileOpen={() => setIsMobileSidebarOpen(true)}
          onAction={handleSupportAction}
          actions={supportActions}
        />

        <MobileSidebarDrawer
          open={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onAction={handleSupportAction}
          actions={supportActions}
        />

        <div className="relative flex min-h-[76vh] flex-col bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(10,10,10,0.94))] xl:min-h-full">
          <div className="border-b border-white/8 px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-soft)]">LawGX Advisory Interface</p>
                <p className="mt-1 truncate text-sm text-[var(--text-secondary)] sm:text-base">
                  Preliminary legal guidance and structured matter assessment, with UAE context assumed unless clarified otherwise.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSupportMode("consultation")}
                  className="hidden rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent)]/16 sm:inline-flex"
                >
                  Book Consultation
                </button>
                <QuickActionsPanel
                  open={isActionsOpen}
                  onToggle={() => setIsActionsOpen((current) => !current)}
                  onAction={handleSupportAction}
                  actions={supportActions}
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

          <div ref={viewportRef} className="scrollbar-thin flex-1 overflow-y-auto px-4 pb-72 pt-5 sm:px-6 sm:pb-76">
            <div className="mx-auto max-w-5xl space-y-5">
              <MatterAssessmentPanel assessment={assessment} onChange={setAssessment} />

              {hasConversation ? (
                <div className="max-w-4xl">
                  <ChatPanel messages={messages} isLoading={isLoading} />
                </div>
              ) : (
                <div className="rounded-[28px] border border-white/8 bg-[rgba(19,19,19,0.74)] px-5 py-6 sm:px-6">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-soft)]">Initial Advisory Review</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
                    Use the structured selections above, then describe the issue below in plain language. LawGX AI will respond in a consultation-first format, identify the likely UAE pathway, and flag where formal review should take over.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,10,10,0.14),rgba(10,10,10,0.98)_22%)] px-3 pb-3 pt-5 backdrop-blur-xl sm:px-5 sm:pb-5">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex flex-col gap-2 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
                <p>This interface provides preliminary guidance only and does not constitute legal advice.</p>
                <p>{isMobileComposer ? "Use the Send button to submit your message." : "Press Enter to send on desktop. Shift + Enter adds a new line."}</p>
              </div>
              <ChatComposer
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                onKeyDown={handleComposerKeyDown}
                disabled={isLoading}
              />
              <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                <p>Consultation and lawyer review options remain available from the sidebar and the three-dot menu.</p>
                <p>{formatTimestamp(new Date().toISOString())}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingFlowModal
        open={activeSupportMode !== null}
        mode={activeSupportMode ?? "consultation"}
        messages={messages}
        assessment={assessment}
        onClose={() => setActiveSupportMode(null)}
      />
    </>
  );
}
