"use client";

import { Copy, Scale } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/lib/types";
import { cn, formatTimestamp } from "@/lib/utils";
import { LoadingDots } from "@/components/loading-dots";

type ChatPanelProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

export function ChatPanel({ messages, isLoading }: ChatPanelProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <article
          key={message.id}
          className={cn(
            "animate-fade-up flex",
            message.role === "user" ? "justify-end" : "justify-start",
          )}
        >
          <div
            className={cn(
              "max-w-[90%] rounded-[26px] border p-5 shadow-lg shadow-black/20 sm:max-w-[82%]",
              message.role === "user"
                ? "border-[var(--accent)]/25 bg-[linear-gradient(135deg,rgba(198,163,102,0.14),rgba(65,53,31,0.22))]"
                : "border-white/8 bg-[rgba(24,24,24,0.88)]",
            )}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl border",
                    message.role === "user"
                      ? "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-soft)]"
                      : "border-white/10 bg-[var(--panel-strong)] text-[var(--accent)]",
                  )}
                >
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {message.role === "user" ? "You" : "LawGX AI"}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{formatTimestamp(message.timestamp)}</p>
                </div>
              </div>

              {message.role === "assistant" ? <CopyReplyButton content={message.content} /> : null}
            </div>

            {message.role === "assistant" ? (
              <div className="prose-lawgx">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-sm leading-7 text-white">{message.content}</p>
            )}
          </div>
        </article>
      ))}

      {isLoading ? (
        <article className="flex justify-start">
          <div className="max-w-[82%] rounded-[26px] border border-white/8 bg-[rgba(24,24,24,0.88)] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[var(--panel-strong)] text-[var(--accent)]">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">LawGX AI</p>
                <p className="text-xs text-[var(--text-muted)]">Preparing an initial advisory view</p>
              </div>
            </div>
            <LoadingDots />
          </div>
        </article>
      ) : null}
    </div>
  );
}

function CopyReplyButton({ content }: { content: string }) {
  async function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(content);
  }

  return (
    <button
      type="button"
      onClick={() => {
        void handleCopy();
      }}
      className="rounded-xl border border-white/10 bg-white/5 p-2 text-[var(--text-muted)] transition hover:bg-white/10 hover:text-white"
      aria-label="Copy reply"
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}
