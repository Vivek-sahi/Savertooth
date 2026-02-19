"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import SavingsHero from "@/components/results/SavingsHero";
import SuggestionsPanel from "@/components/results/SuggestionsPanel";
import PriceDropAlert from "@/components/retention/PriceDropAlert";
import ShareSection from "@/components/results/ShareSection";

export default function ResultsPage() {
  const { state } = useWizard();
  const router = useRouter();

  useEffect(() => {
    if (!state.results) {
      router.push("/analyze");
    }
  }, [state.results, router]);

  if (!state.results) return null;

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
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


              <ShareSection
                monthlySavings={state.results.monthlySavings}
                score={state.results.score}
              />
            </div>
      </motion.div>
    </div>
  );
}
