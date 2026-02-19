"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import { calculateSavings } from "@/lib/savings";
import ProgressBar from "@/components/shared/ProgressBar";
import CurrencySwitch from "@/components/shared/CurrencySwitch";
import SavertoothLogo from "@/components/shared/SavertoothLogo";
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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="cursor-pointer">
            <SavertoothLogo size={32} />
          </button>
          <div className="flex items-center gap-3">
            <CurrencySwitch />
            <span className="text-sm text-slate-400">
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

        <div className="min-h-[500px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
            className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-6 font-medium text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
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
