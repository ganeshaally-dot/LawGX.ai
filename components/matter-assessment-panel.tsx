"use client";

import { cn } from "@/lib/utils";
import { matterAssessmentOptions } from "@/lib/constants";
import type { MatterAssessment } from "@/lib/types";

type MatterAssessmentPanelProps = {
  assessment: MatterAssessment;
  onChange: (next: MatterAssessment) => void;
};

type AssessmentField = keyof MatterAssessment;

const sections: Array<{ key: AssessmentField; label: string }> = [
  { key: "matterType", label: "Matter Type" },
  { key: "jurisdiction", label: "Jurisdiction" },
  { key: "objective", label: "Objective" },
  { key: "urgency", label: "Urgency" },
];

export function MatterAssessmentPanel({ assessment, onChange }: MatterAssessmentPanelProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-[rgba(20,20,20,0.78)] p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-soft)]">Matter Assessment</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Select the closest context so LawGX AI can respond in a more structured UAE advisory format.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {sections.map((section) => {
          const options = matterAssessmentOptions[section.key];
          return (
            <div key={section.key} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{section.label}</p>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const selected = assessment[section.key] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...assessment,
                          [section.key]: selected ? "" : option,
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
          );
        })}
      </div>
    </section>
  );
}
