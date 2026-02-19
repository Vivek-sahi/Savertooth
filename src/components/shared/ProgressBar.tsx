"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between">
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white transition-all duration-300 ${
                  isComplete
                    ? "bg-[var(--crayon-teal)]"
                    : isActive
                      ? "bg-[var(--crayon-orange)]"
                      : "bg-[var(--border-soft)] text-[var(--text-muted)]"
                }`}
              >
                {isComplete ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`hidden text-[11px] font-semibold sm:block ${
                  isComplete
                    ? "text-[var(--crayon-teal)]"
                    : isActive
                      ? "text-[var(--crayon-orange)]"
                      : "text-[var(--text-muted)]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--border-soft)]">
        <motion.div
          className="h-full rounded-full bg-[var(--crayon-orange)]"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
