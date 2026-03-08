"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Mail, MessageCircleMore, X } from "lucide-react";
import { cn } from "@/lib/utils";

type BookingFlowModalProps = {
  open: boolean;
  onClose: () => void;
};

type BookingDay = {
  iso: string;
  label: string;
  dayLabel: string;
};

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"];

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

export function BookingFlowModal({ open, onClose }: BookingFlowModalProps) {
  const bookingDays = useMemo(() => buildBookingDays(), []);
  const [selectedDay, setSelectedDay] = useState<string>(bookingDays[0]?.iso ?? "");
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [matterSummary, setMatterSummary] = useState("");

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const selectedDate = bookingDays.find((day) => day.iso === selectedDay);
  const summary = [
    `Requested consultation with LawGX`,
    `Name: ${fullName || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Jurisdiction: ${jurisdiction || "Not provided"}`,
    `Preferred date: ${selectedDate?.label ?? "Not selected"}`,
    `Preferred time: ${selectedTime || "Not selected"}`,
    `Matter summary: ${matterSummary || "Not provided"}`,
  ].join("\n");

  const mailtoHref = `mailto:info@lawgx.ai?subject=${encodeURIComponent(`Consultation Request - ${fullName || "LawGX website"}`)}&body=${encodeURIComponent(summary)}`;
  const whatsappHref = `https://wa.me/971553716225?text=${encodeURIComponent(summary)}`;
  const canSubmit = Boolean(fullName.trim() && email.trim() && selectedDay && selectedTime);

  return (
    <div className={cn("fixed inset-0 z-[70] transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={cn("absolute inset-0 bg-black/70 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-2xl border-l border-white/10 bg-[linear-gradient(180deg,rgba(9,13,20,0.98),rgba(11,16,25,0.98))] p-5 shadow-2xl shadow-black/60 transition-transform duration-300 sm:p-7",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Consultation Booking</p>
            <h2 className="mt-3 font-display text-4xl text-white">Choose a preferred slot</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              A Calendly-style intake flow for scheduling a LawGX consultation. Submit your preferred
              time and intake summary, and the team can confirm the appointment directly.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10"
            aria-label="Close booking flow"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scrollbar-thin mt-6 h-[calc(100%-7.5rem)] overflow-y-auto pr-1">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[var(--accent)]" />
                  <h3 className="text-lg font-semibold text-white">1. Pick a date</h3>
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
                  <h3 className="text-lg font-semibold text-white">2. Pick a time</h3>
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

              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[var(--accent)]" />
                  <h3 className="text-lg font-semibold text-white">3. Share your details</h3>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                  <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                  <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company / group" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                  <input value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)} placeholder="Jurisdiction(s) involved" className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                  <textarea value={matterSummary} onChange={(event) => setMatterSummary(event.target.value)} placeholder="Brief matter summary" rows={4} className="sm:col-span-2 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)]" />
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-soft)]">Consultation Summary</p>
                <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Preferred date</p>
                    <p className="mt-1 text-white">{selectedDate?.label ?? "Select a date"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Preferred time</p>
                    <p className="mt-1 text-white">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Format</p>
                    <p className="mt-1 text-white">Video call / intake consultation</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--accent)]/20 bg-[var(--accent)]/8 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    This request does not itself create a lawyer-client relationship. LawGX will confirm
                    the appointment and engagement process separately.
                  </p>
                </div>
              </div>

              <a
                href={mailtoHref}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold transition",
                  canSubmit ? "bg-white text-slate-950 hover:bg-[var(--accent)]" : "pointer-events-none bg-white/10 text-[var(--text-muted)]",
                )}
              >
                Request Appointment by Email
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                  canSubmit ? "border-white/15 bg-black/15 text-white hover:border-[var(--accent)]/40 hover:bg-white/8" : "pointer-events-none border-white/10 bg-black/10 text-[var(--text-muted)]",
                )}
              >
                Continue on WhatsApp
                <MessageCircleMore className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}