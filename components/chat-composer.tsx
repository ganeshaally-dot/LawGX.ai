"use client";

import type { FormEvent, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
};

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled,
}: ChatComposerProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[30px] border border-[var(--accent)]/20 bg-[linear-gradient(180deg,rgba(12,24,49,0.98),rgba(9,18,38,0.98))] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
    >
      <div className="px-3 pb-2 pt-1">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent-soft)]">Ask LawGX AI</p>
      </div>

      <div className="flex items-end gap-3 rounded-[24px] border border-white/8 bg-[rgba(5,11,24,0.55)] px-2 py-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your legal information or intake question here..."
          rows={1}
          disabled={disabled}
          className="max-h-48 min-h-[72px] flex-1 resize-y bg-transparent px-3 py-3 text-[15px] leading-7 text-white outline-none placeholder:text-[var(--text-muted)]"
        />

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="mb-1 mr-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[var(--text-muted)]"
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
