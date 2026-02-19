"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import { calculateSavings } from "@/lib/savings";
import ProgressBar from "@/components/shared/ProgressBar";
import CurrencySwitch from "@/components/shared/CurrencySwitch";
import SubscriptionPicker from "./SubscriptionPicker";
import ServicePicker from "./ServicePicker";
import StackReview from "./StackReview";

const STEPS = ["Subscriptions", "Services", "Review"];

export default function WizardShell() {
  const { state, dispatch } = useWizard();
  const router = useRouter();

  const canProceed = () => {
    switch (state.step) {
      case 1:
        return state.selectedSubscriptions.length > 0;
      case 2:
        return true;
      case 3:
        return (
          state.selectedSubscriptions.length > 0 ||
          state.selectedServices.length > 0
        );
      default:
        return false;
    }
  };

  const handleNext = useCallback(() => {
    if (state.step < 3) {
      dispatch({ type: "SET_STEP", step: state.step + 1 });
    } else {
      const results = calculateSavings(
        state.selectedSubscriptions,
        state.selectedServices
      );
      dispatch({ type: "SET_RESULTS", results });
      router.push("/results");
    }
  }, [state.step, state.selectedSubscriptions, state.selectedServices, dispatch, router]);

  const handleBack = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", step: state.step - 1 });
    }
  }, [state.step, dispatch]);

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <CurrencySwitch />
            <span className="text-sm font-semibold text-[var(--text-muted)]">
              Step {state.step} of {STEPS.length}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <ProgressBar
            currentStep={state.step}
            totalSteps={STEPS.length}
            labels={STEPS}
          />
        </div>

        <div className="min-h-[500px] rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 shadow-[0_6px_30px_rgba(0,0,0,0.05)] sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {state.step === 1 && <SubscriptionPicker />}
              {state.step === 2 && <ServicePicker />}
              {state.step === 3 && <StackReview />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            disabled={state.step === 1}
            className="flex h-12 items-center gap-2 rounded-2xl border-2 border-[var(--border-soft)] bg-white px-6 font-semibold text-[var(--text-secondary)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] disabled:opacity-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex h-12 items-center gap-2 rounded-2xl bg-[var(--text-primary)] px-8 font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-[var(--text-primary)]"
          >
            {state.step === 3 ? "Analyze My Stack" : "Continue"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
