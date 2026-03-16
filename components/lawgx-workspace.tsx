"use client";

import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { defaultMatterAssessment, supportActions } from "@/lib/constants";
import type { ChatMessage, CTAActionKind, MatterAssessment } from "@/lib/types";
import { buildAssessmentContext, buildAssessmentUserMessage, createMessage, formatTimestamp } from "@/lib/utils";
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
  const [showManualEntry, setShowManualEntry] = useState(false);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileComposer(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  function openConsultation() {
    setIsActionsOpen(false);
    setIsMobileSidebarOpen(false);
    setActiveSupportMode("consultation");
  }

  function handleSupportAction(kind: CTAActionKind) {
    setIsActionsOpen(false);

    if (kind === "whatsapp") {
      const whatsappAction = supportActions.find((action) => action.kind === "whatsapp");
      if (whatsappAction && typeof window !== "undefined") {
        window.open(whatsappAction.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (kind === "consultation") {
      openConsultation();
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

      setMessages((current) => [...current, createMessage("assistant", payload.reply ?? "")]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting LawGX AI.";

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `${message}\n\nThis is for legal information purposes only.\n\n[Book a consultation with LawGX Consultants and Experts](#book-consultation)`,
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function submitAssessmentAnswers() {
    const summary = buildAssessmentUserMessage(assessment);
    if (!summary || isLoading) return;
    void submitMessage(summary);
  }

  function handleFollowUpSelection(prompt: string, option: string) {
    if (isLoading) return;
    void submitMessage(`${prompt}: ${option}`);
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
      <div className="relative grid min-h-[100dvh] overflow-hidden border-y border-white/8 bg-[rgba(9,9,9,0.9)] shadow-[0_32px_110px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:min-h-[calc(100vh-4.8rem)] sm:rounded-[28px] sm:border xl:grid-cols-[auto_minmax(0,1fr)]">
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

        <div className="relative flex min-h-[100dvh] flex-col bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(10,10,10,0.94))] sm:min-h-[76vh] xl:min-h-full">
          <div className="border-b border-white/8 px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-soft)]">LawGX Advisory Interface</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)] sm:truncate sm:text-base">
                  Preliminary legal guidance and structured matter assessment, with UAE context assumed unless clarified otherwise.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openConsultation}
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

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:pb-10">
            <div className="mx-auto max-w-5xl space-y-6 pb-8">
              <MatterAssessmentPanel
                assessment={assessment}
                onChange={setAssessment}
                onSubmitSelection={submitAssessmentAnswers}
                disabled={isLoading}
              />

              {hasConversation ? (
                <div className="max-w-4xl pb-12">
                  <ChatPanel
                    messages={messages}
                    isLoading={isLoading}
                    onOpenConsultation={openConsultation}
                    onSelectFollowUp={handleFollowUpSelection}
                  />
                </div>
              ) : (
                <div className="flex min-h-[28vh] items-center justify-center text-center text-[15px] text-[var(--text-muted)]">
                  <p>Choose the relevant options above to continue without typing.</p>
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,10,10,0.14),rgba(10,10,10,0.98)_20%)] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:px-5 sm:pb-5">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex flex-col gap-2 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
                <p>This interface provides preliminary guidance only and does not constitute legal advice.</p>
                <button
                  type="button"
                  onClick={() => setShowManualEntry((current) => !current)}
                  className="inline-flex items-center gap-2 text-left text-[var(--text-secondary)] transition hover:text-white"
                >
                  {showManualEntry ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {showManualEntry ? "Hide manual entry" : "Type manually instead"}
                </button>
              </div>

              {showManualEntry ? (
                <ChatComposer
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSubmit}
                  onKeyDown={handleComposerKeyDown}
                  disabled={isLoading}
                />
              ) : (
                <div className="rounded-[26px] border border-white/8 bg-[rgba(16,16,16,0.8)] px-4 py-4 text-sm text-[var(--text-secondary)]">
                  Use the guided buttons above. When LawGX AI needs confirmations, it will present clickable answers here.
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                <p className="max-w-[72%] sm:max-w-none">Consultation and lawyer review options remain available from the sidebar and the three-dot menu.</p>
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
