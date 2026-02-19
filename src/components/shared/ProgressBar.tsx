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
      <div className="mb-2 flex justify-between">
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-amber-500 text-white"
                    : isActive
                      ? "bg-amber-500 text-white ring-4 ring-amber-500/20"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {isComplete ? "✓" : stepNum}
              </div>
              <span
                className={`text-[10px] font-medium hidden sm:block ${
                  isActive ? "text-amber-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
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
