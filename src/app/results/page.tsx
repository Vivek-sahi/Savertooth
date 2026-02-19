"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
    </div>
  );
}
