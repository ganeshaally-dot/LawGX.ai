export function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse-soft [animation-delay:0ms]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse-soft [animation-delay:160ms]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse-soft [animation-delay:320ms]" />
    </div>
  );
}