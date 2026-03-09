"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileStack,
  LoaderCircle,
  Mail,
  MessageCircleMore,
  NotebookPen,
  ScrollText,
  X,
} from "lucide-react";
import type { ChatMessage, CTAActionKind, MatterAssessment } from "@/lib/types";
import { buildChatSummary, cn } from "@/lib/utils";

type SupportModalProps = {
  open: boolean;
  mode: Exclude<CTAActionKind, "whatsapp">;
  messages: ChatMessage[];
  assessment: MatterAssessment;
  onClose: () => void;
};

type BookingDay = {
  iso: string;
  label: string;
  dayLabel: string;
};

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"];

const modeCopy = {
  consultation: {
    eyebrow: "Consultation Booking",
    title: "Reserve a lawyer review slot",
    body: "Choose a preferred consultation window and, if you wish, include a structured summary of this chat for the reviewing lawyer.",
    submitLabel: "Send Consultation Request",
  },
  upload: {
    eyebrow: "Document Review Request",
    title: "Arrange secure document submission",
    body: "Tell LawGX what documents you need reviewed and the team will respond with the next submission step and review pathway.",
    submitLabel: "Request Document Review",
  },
  proposal: {
    eyebrow: "Proposal Request",
    title: "Request a scoped fee proposal",
    body: "Share the matter outline and commercial objective so LawGX can consider the appropriate engagement scope and proposal route.",
    submitLabel: "Send Proposal Request",
  },
} as const;

function buildBookingDays(): BookingDay[] {
  const formatter = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const days: BookingDay[] = [];
  const date = new Date();

  while (days.length < 6) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day === 0 || day === 6) continue;

    const iso = date.toISOString();
    days.push({
      iso,
      label: formatter.format(date),
      dayLabel: day === 5 ? "Limited slots" : "Available",
    });
  }

  return days;
}

function inferJurisdiction(assessment: MatterAssessment) {
  const joined = [assessment.subType, assessment.transactionType, assessment.partyRole].join(" ").toLowerCase();

  if (joined.includes("difc")) return "DIFC";
  if (joined.includes("adgm")) return "ADGM";
  if (joined.includes("free zone")) return "UAE free zone";
  if (joined.includes("mainland")) return "UAE Mainland";
  if (assessment.matterType) return "UAE / to be confirmed";
  return "";
}

export function BookingFlowModal({ open, mode, messages, assessment, onClose }: SupportModalProps) {
  const bookingDays = useMemo(() => buildBookingDays(), []);
  const generatedSummary = useMemo(() => buildChatSummary(messages, assessment), [messages, assessment]);
  const inferredJurisdiction = useMemo(() => inferJurisdiction(assessment), [assessment]);
  const [selectedDay, setSelectedDay] = useState<string>(bookingDays[0]?.iso ?? "");
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jurisdiction, setJurisdiction] = useState(inferredJurisdiction);
  const [matterSummary, setMatterSummary] = useState("");
  const [includeChatSummary, setIncludeChatSummary] = useState(true);
  const [lawyerSummary, setLawyerSummary] = useState(generatedSummary);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setJurisdiction(inferredJurisdiction);
    setLawyerSummary(generatedSummary);
    setStatus("idle");
    setErrorMessage("");
  }, [open, inferredJurisdiction, generatedSummary, mode]);

  const selectedDate = bookingDays.find((day) => day.iso === selectedDay);
  const isConsultation = mode === "consultation";
  const canSubmit = Boolean(
    fullName.trim() &&
      email.trim() &&
      matterSummary.trim() &&
      (!isConsultation || (selectedDay && selectedTime)),
  );

  const whatsappMessage = [
    `Hello LawGX, I would like assistance with a legal or commercial matter.`,
    `Request type: ${modeCopy[mode].eyebrow}`,
    `Name: ${fullName || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Jurisdiction: ${jurisdiction || "Not provided"}`,
    isConsultation ? `Preferred slot: ${selectedDate?.label ?? "Not selected"} at ${selectedTime || "Not selected"}` : "",
    `Matter summary: ${matterSummary || "Not provided"}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/971553716225?text=${encodeURIComponent(whatsappMessage)}`;

  async function handleSubmit() {
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: mode,
          fullName,
          email,
          company,
          jurisdiction,
          preferredDate: isConsultation ? selectedDate?.label ?? "" : "",
          preferredTime: isConsultation ? selectedTime : "",
          matterSummary,
          includeChatSummary,
          chatSummary: includeChatSummary ? lawyerSummary : "",
        }),
      });

      let payload: { success?: boolean; error?: string } = {};

      try {
        payload = (await response.json()) as { success?: boolean; error?: string };
      } catch {
        payload = {};
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "The request could not be submitted right now.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "The request could not be submitted.");
    }
  }

  function handleClose() {
    if (status === "submitting") return;
    onClose();
  }

  return (
    <div className={cn("fixed inset-0 z-[70] transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={cn("absolute inset-0 bg-black/70 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={handleClose}
      />

      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-2xl border-l border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(11,11,11,0.98))] p-5 shadow-2xl shadow-black/60 transition-transform duration-300 sm:p-7",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">{modeCopy[mode].eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl text-white">{modeCopy[mode].title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">{modeCopy[mode].body}</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10"
            aria-label="Close support flow"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scrollbar-thin mt-6 h-[calc(100%-7.5rem)] overflow-y-auto pr-1">
          {status === "success" ? (
            <div className="rounded-[28px] border border-[var(--accent)]/20 bg-[var(--accent)]/8 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-[var(--accent)]" />
                <div>
                  <h3 className="text-2xl font-semibold text-white">Request submitted</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    LawGX has received your request at <strong className="text-white">support@lawgx.ai</strong>. A confirmation has been sent from <strong className="text-white">noreply@lawgx.ai</strong> to {email || "your email address"}.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 inline-flex items-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                {isConsultation ? (
                  <>
                    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 text-[var(--accent)]" />
                        <h3 className="text-lg font-semibold text-white">1. Choose a date</h3>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {bookingDays.map((day) => (
                          <button
                            key={day.iso}
                            type="button"
                            onClick={() => setSelectedDay(day.iso)}
                            className={cn(
                              "rounded-2xl border px-4 py-4 text-left transition",
                              selectedDay === day.iso
                                ? "border-[var(--accent)]/50 bg-[var(--accent)]/12"
                                : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/[0.04]",
                            )}
                          >
                            <p className="text-sm font-semibold text-white">{day.label}</p>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">{day.dayLabel}</p>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex items-center gap-3">
                        <Clock3 className="h-5 w-5 text-[var(--accent)]" />
                        <h3 className="text-lg font-semibold text-white">2. Choose a time</h3>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "rounded-2xl border px-4 py-4 text-left transition",
                              selectedTime === slot
                                ? "border-[var(--accent)]/50 bg-[var(--accent)]/12"
                                : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/[0.04]",
                            )}
                          >
                            <p className="text-sm font-semibold text-white">{slot}</p>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">Dubai time (GST)</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  </>
                ) : null}

                <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--accent)]" />
                    <h3 className="text-lg font-semibold text-white">{isConsultation ? "3. Share your details" : "1. Share your details"}</h3>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                    <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                    <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company / group" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                    <input value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)} placeholder="Jurisdiction(s) involved" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                    <textarea value={matterSummary} onChange={(event) => setMatterSummary(event.target.value)} placeholder={mode === "upload" ? "Describe the documents, transaction, or dispute file you want reviewed" : mode === "proposal" ? "Describe the scope, service need, and commercial objective" : "Briefly describe the matter and the support you need"} rows={5} className="sm:col-span-2 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-3">
                    <ScrollText className="h-5 w-5 text-[var(--accent)]" />
                    <h3 className="text-lg font-semibold text-white">{isConsultation ? "4. Lawyer review summary" : "2. Optional summary"}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {isConsultation
                      ? "Would you like to include a summary of this chat for the lawyer's review?"
                      : "You may include a structured summary of the current discussion for faster review."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { label: "Include summary", value: true },
                      { label: "Do not include", value: false },
                    ].map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setIncludeChatSummary(option.value)}
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          includeChatSummary === option.value
                            ? "border-[var(--accent)]/55 bg-[var(--accent)]/12 text-white"
                            : "border-white/10 bg-white/[0.03] text-[var(--text-secondary)] hover:border-white/20 hover:text-white",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {includeChatSummary ? (
                    <textarea
                      value={lawyerSummary}
                      onChange={(event) => setLawyerSummary(event.target.value)}
                      rows={9}
                      className="mt-4 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm leading-7 text-white outline-none"
                    />
                  ) : null}
                </section>
              </div>

              <aside className="space-y-5">
                <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Submission Summary</p>
                  <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Request type</p>
                      <p className="mt-1 text-white">{modeCopy[mode].eyebrow}</p>
                    </div>
                    {isConsultation ? (
                      <>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Preferred date</p>
                          <p className="mt-1 text-white">{selectedDate?.label ?? "Select a date"}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Preferred time</p>
                          <p className="mt-1 text-white">{selectedTime}</p>
                        </div>
                      </>
                    ) : null}
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">LawGX inbox</p>
                      <p className="mt-1 text-white">support@lawgx.ai</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Client confirmation</p>
                      <p className="mt-1 text-white">noreply@lawgx.ai</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[var(--accent)]/20 bg-[var(--accent)]/8 p-5">
                  <div className="flex items-start gap-3">
                    {isConsultation ? <NotebookPen className="mt-0.5 h-5 w-5 text-[var(--accent)]" /> : <FileStack className="mt-0.5 h-5 w-5 text-[var(--accent)]" />}
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">
                      Submission through this interface does not itself create a lawyer-client relationship. LawGX will confirm the next step, consultation, or engagement pathway separately.
                    </p>
                  </div>
                </div>

                {status === "error" ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {errorMessage}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    void handleSubmit();
                  }}
                  disabled={!canSubmit || status === "submitting"}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold transition",
                    canSubmit && status !== "submitting"
                      ? "bg-[var(--accent)] text-slate-950 hover:brightness-105"
                      : "cursor-not-allowed bg-white/10 text-[var(--text-muted)]",
                  )}
                >
                  {status === "submitting" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {status === "submitting" ? "Submitting request" : modeCopy[mode].submitLabel}
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/15 px-4 py-4 text-sm font-semibold text-white transition hover:border-[var(--accent)]/40 hover:bg-white/8"
                >
                  Continue on WhatsApp
                  <MessageCircleMore className="h-4 w-4" />
                </a>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
