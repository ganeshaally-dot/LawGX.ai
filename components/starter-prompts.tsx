"use client";

import { ArrowUpRight } from "lucide-react";

type StarterPromptsProps = {
  prompts: string[];
  onSelect: (prompt: string) => void | Promise<void>;
};

export function StarterPrompts({ prompts, onSelect }: StarterPromptsProps) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => {
            void onSelect(prompt);
          }}
          className="group rounded-[24px] border border-white/10 bg-black/10 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:bg-white/[0.05]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="max-w-[14rem] text-sm leading-6 text-[var(--text-secondary)] transition group-hover:text-white">
              {prompt}
            </p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" />
          </div>
        </button>
      ))}
    </div>
  );
}