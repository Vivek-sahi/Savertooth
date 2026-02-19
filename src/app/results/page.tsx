"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySwitch from "@/components/shared/CurrencySwitch";
import SavertoothLogo from "@/components/shared/SavertoothLogo";
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
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {analyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8 h-16 w-16 rounded-full border-4 border-slate-200 border-t-amber-500"
            />
            <h2 className="mb-2 text-2xl font-bold text-slate-800">
              Analyzing your stack...
            </h2>
            <p className="mb-6 text-slate-500">
              Comparing against 47,000+ plans
            </p>
            <div className="w-64">
              <div className="h-2 w-full rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-slate-400">
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
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => router.push("/")} className="cursor-pointer">
                  <SavertoothLogo size={32} />
                </button>
                <button
                  onClick={() => router.push("/analyze")}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  ← Edit stack
                </button>
              </div>
              <CurrencySwitch />
            </div>

            <div className="space-y-8">
              {/* 1. Savings hero */}
              <SavingsHero
                currentTotal={state.results.currentTotal}
                optimizedTotal={state.results.optimizedTotal}
                monthlySavings={state.results.monthlySavings}
                annualSavings={state.results.annualSavings}
                savingsPercent={state.results.savingsPercent}
                score={state.results.score}
              />

              {/* 2. Savertooth Suggestions + collapsible reduce/more-value */}
              <SuggestionsPanel results={state.results} />

              {/* 3. Price drop alerts (right after suggestions) */}
              <PriceDropAlert />

              {/* 4. Sign up CTA */}
              {state.results.monthlySavings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center text-white"
                >
                  <h3 className="mb-2 text-xl font-bold">
                    Ready to lock in these savings?
                  </h3>
                  <p className="mb-4 text-sm text-white/80">
                    Sign up to get personalized switching guides and exclusive
                    deals.
                  </p>
                  <button
                    onClick={() => router.push("/signup")}
                    className="rounded-xl bg-white px-8 py-3 font-bold text-amber-600 shadow-lg transition-all hover:shadow-xl hover:scale-105"
                  >
                    Sign Up to Save {format(state.results.monthlySavings)}/mo
                  </button>
                </motion.div>
              )}

              {/* 5. Share */}
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
