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
      className="rounded-[28px] border border-white/10 bg-[rgba(10,14,22,0.92)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-end gap-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Describe your matter, jurisdiction, or intake question..."
          rows={1}
          disabled={disabled}
          className="max-h-48 min-h-[60px] flex-1 resize-y bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[var(--text-muted)]"
        />

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[var(--text-muted)]"
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}