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

export function MatterAssessmentPanel({ assessment, onChange }: MatterAssessmentPanelProps) {
  const contextualGroups = assessment.matterType
    ? [...(matterFlowOptions[assessment.matterType] ?? []), ...sharedMatterFollowUps]
    : [];

  return (
    <section className="rounded-[28px] border border-white/8 bg-[rgba(20,20,20,0.78)] p-4 sm:p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-soft)]">Matter Assessment</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Start with the matter type. Relevant follow-up options will appear automatically.
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Matter Type</p>
          <div className="flex flex-wrap gap-2">
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
                    "rounded-full border px-3 py-2 text-sm transition",
                    selected
                      ? "border-[var(--accent)]/55 bg-[var(--accent)]/12 text-white"
                      : "border-white/10 bg-white/[0.03] text-[var(--text-secondary)] hover:border-white/20 hover:text-white",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {contextualGroups.map((group) => (
          <div key={group.key} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const selected = assessment[group.key] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...assessment,
                        [group.key]: selected ? "" : option,
                      })
                    }
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition",
                      selected
                        ? "border-[var(--accent)]/55 bg-[var(--accent)]/12 text-white"
                        : "border-white/10 bg-white/[0.03] text-[var(--text-secondary)] hover:border-white/20 hover:text-white",
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
