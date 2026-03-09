"use client";

import { cn } from "@/lib/utils";
import { matterFlowOptions, matterTypeOptions, sharedMatterFollowUps } from "@/lib/constants";
import type { MatterAssessment } from "@/lib/types";

type MatterAssessmentPanelProps = {
  assessment: MatterAssessment;
  onChange: (next: MatterAssessment) => void;
};

const dependentKeys: Array<Exclude<keyof MatterAssessment, "matterType">> = [
  "subType",
  "partyRole",
  "transactionType",
  "objective",
  "urgency",
];

function resetFrom(key: Exclude<keyof MatterAssessment, "matterType">) {
  switch (key) {
    case "subType":
      return { subType: "", partyRole: "", transactionType: "", objective: "", urgency: "" };
    case "partyRole":
      return { partyRole: "", transactionType: "", objective: "", urgency: "" };
    case "transactionType":
      return { transactionType: "", objective: "", urgency: "" };
    case "objective":
      return { objective: "", urgency: "" };
    case "urgency":
      return { urgency: "" };
  }
}

export function MatterAssessmentPanel({ assessment, onChange }: MatterAssessmentPanelProps) {
  const contextualGroups = assessment.matterType
    ? [...(matterFlowOptions[assessment.matterType] ?? []), ...sharedMatterFollowUps]
    : [];

  const sequentialGroups = contextualGroups.filter((group, index) => {
    if (index === 0) return true;
    const previousGroup = contextualGroups[index - 1];
    return Boolean(assessment[previousGroup.key]);
  });

  return (
    <section className="rounded-[28px] border border-white/8 bg-[rgba(20,20,20,0.78)] p-4 sm:p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-soft)]">Matter Assessment</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Start with the matter type. Each next selection will appear once the previous one is chosen.
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Matter Type</p>
          <div className="flex flex-wrap gap-3">
            {matterTypeOptions.map((option) => {
              const selected = assessment.matterType === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...assessment,
                      matterType: selected ? "" : option,
                      ...(selected
                        ? Object.fromEntries(dependentKeys.map((key) => [key, ""]))
                        : {
                            subType: "",
                            partyRole: "",
                            transactionType: "",
                            objective: "",
                            urgency: "",
                          }),
                    })
                  }
                  className={cn(
                    "rounded-[18px] border px-4 py-3 text-sm transition duration-300",
                    selected
                      ? "border-[var(--accent)]/60 bg-[linear-gradient(180deg,rgba(198,163,102,0.2),rgba(73,57,30,0.22))] text-white shadow-[0_12px_30px_rgba(198,163,102,0.12)]"
                      : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-[var(--text-secondary)] hover:border-white/18 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {sequentialGroups.map((group, index) => (
          <div key={group.key} className="animate-fade-up space-y-3 rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 text-xs font-semibold text-[var(--accent-soft)]">
                {index + 2}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{group.label}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {group.options.map((option) => {
                const selected = assessment[group.key] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...assessment,
                        ...resetFrom(group.key),
                        [group.key]: selected ? "" : option,
                      })
                    }
                    className={cn(
                      "rounded-[18px] border px-4 py-3 text-sm transition duration-300",
                      selected
                        ? "border-[var(--accent)]/60 bg-[linear-gradient(180deg,rgba(198,163,102,0.18),rgba(76,58,31,0.24))] text-white shadow-[0_12px_30px_rgba(198,163,102,0.1)]"
                        : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-[var(--text-secondary)] hover:border-white/18 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
