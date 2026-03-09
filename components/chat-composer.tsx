"use client";

import { useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Mic, MicOff } from "lucide-react";

type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled,
}: ChatComposerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const speechRecognition = useMemo(() => {
    if (typeof window === "undefined") return null;

    const speechWindow = window as Window & {
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
      SpeechRecognition?: SpeechRecognitionConstructor;
    };

    return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
  }, []);

  function handleVoiceToggle() {
    if (!speechRecognition || disabled) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new speechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index]?.[0]?.transcript ?? "")
        .join(" ")
        .trim();

      if (transcript) {
        onChange(value ? `${value.trim()} ${transcript}`.trim() : transcript);
      }
    };

    recognition.onerror = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[30px] border border-[var(--accent)]/20 bg-[linear-gradient(180deg,rgba(20,20,20,0.99),rgba(12,12,12,0.99))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
    >
      <div className="flex items-end gap-2 rounded-[24px] border border-white/8 bg-[rgba(5,5,5,0.55)] px-2 py-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything"
          rows={1}
          disabled={disabled}
          className="max-h-56 min-h-[88px] flex-1 resize-y bg-transparent px-3 py-3 text-[16px] leading-7 text-white outline-none placeholder:text-[var(--text-muted)]"
        />

        {speechRecognition ? (
          <button
            type="button"
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`mb-1 flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
              isRecording
                ? "border-[var(--accent)]/40 bg-[var(--accent)]/12 text-[var(--accent)]"
                : "border-white/10 bg-white/5 text-[var(--text-secondary)] hover:bg-white/10 hover:text-white"
            }`}
            aria-label={isRecording ? "Stop voice input" : "Start voice input"}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        ) : null}

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="mb-1 mr-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[var(--text-muted)]"
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
