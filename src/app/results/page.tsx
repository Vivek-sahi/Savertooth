"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySwitch from "@/components/shared/CurrencySwitch";
import SavingsHero from "@/components/results/SavingsHero";
import SuggestionsPanel from "@/components/results/SuggestionsPanel";
import PriceDropAlert from "@/components/retention/PriceDropAlert";
import ShareSection from "@/components/results/ShareSection";

export default function ResultsPage() {
  const { state } = useWizard();
  const { format } = useCurrency();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!state.results) {
      router.push("/analyze");
      return;
    }

    const steps = [
      { delay: 300, progress: 15 },
      { delay: 700, progress: 35 },
      { delay: 1100, progress: 58 },
      { delay: 1500, progress: 79 },
      { delay: 1900, progress: 94 },
      { delay: 2300, progress: 100 },
    ];

    const timers = steps.map((step) =>
      setTimeout(() => setProgress(step.progress), step.delay)
    );

    const doneTimer = setTimeout(() => setAnalyzing(false), 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [state.results, router]);

  if (!state.results) return null;

  return (
    <div className="min-h-screen pt-20">
      <AnimatePresence mode="wait">
        {analyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[80vh] flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8 h-14 w-14 rounded-2xl border-4 border-[var(--border-soft)] border-t-[var(--accent)]"
            />
            <h2 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)]">
              Analyzing your stack...
            </h2>
            <p className="mb-6 text-[var(--text-secondary)]">
              Comparing against 47,000+ plans
            </p>
            <div className="w-64">
              <div className="h-2.5 w-full rounded-full bg-[var(--border-soft)]">
                <motion.div
                  className="h-full rounded-full bg-[var(--accent)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-center text-sm font-semibold text-[var(--text-muted)]">
                {progress}%
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-3xl px-4 py-8 sm:px-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => router.push("/analyze")}
                className="flex items-center gap-1.5 rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Edit stack
              </button>
              <CurrencySwitch />
            </div>

            <div className="space-y-8">
              <SavingsHero
                currentTotal={state.results.currentTotal}
                optimizedTotal={state.results.optimizedTotal}
                monthlySavings={state.results.monthlySavings}
                annualSavings={state.results.annualSavings}
                savingsPercent={state.results.savingsPercent}
                score={state.results.score}
              />

              <SuggestionsPanel results={state.results} />

              <PriceDropAlert />

              {state.results.monthlySavings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-3xl bg-[var(--bg-dark)] p-8 text-center text-white"
                >
                  <h3 className="mb-2 text-xl font-extrabold">
                    Ready to lock in these savings?
                  </h3>
                  <p className="mb-6 text-sm text-white/50">
                    Sign up to get personalized switching guides and exclusive
                    deals.
                  </p>
                  <button
                    onClick={() => router.push("/signup")}
                    className="rounded-2xl bg-white px-8 py-3 font-semibold text-[var(--text-primary)] transition-colors hover:bg-white/90 active:scale-[0.98]"
                  >
                    Sign Up to Save {format(state.results.monthlySavings)}/mo
                  </button>
                </motion.div>
              )}

              <ShareSection
                monthlySavings={state.results.monthlySavings}
                score={state.results.score}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
