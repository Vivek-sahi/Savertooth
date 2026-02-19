"use client";

import { useCallback, useState, useEffect } from "react";
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

const analyzingMessages = [
  "Scanning your subscriptions…",
  "Comparing against 47,000+ plans…",
  "Finding cheaper alternatives…",
  "Building your savings report…",
];

function AnalyzingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % analyzingMessages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      {/* Animated sabertooth — eyes scan left-right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={96}
          height={96}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="10" width="28" height="18" rx="4" fill="var(--text-primary)" />
          <rect x="7" y="4" width="8" height="10" rx="2" fill="var(--text-primary)" />
          <rect x="25" y="4" width="8" height="10" rx="2" fill="var(--text-primary)" />
          <rect x="9" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />
          <rect x="27" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />
          <rect x="11" y="15" width="6" height="5" rx="1.5" fill="white" />
          <rect x="23" y="15" width="6" height="5" rx="1.5" fill="white" />

          {/* Scanning pupils */}
          <animateTransform attributeName="transform" type="translate" values="0,0" dur="0s" />
          <g>
            <rect x="14" y="16" width="3" height="3" rx="1" fill="var(--text-primary)">
              <animate attributeName="x" values="12;15;12" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="26" y="16" width="3" height="3" rx="1" fill="var(--text-primary)">
              <animate attributeName="x" values="24;27;24" dur="1.2s" repeatCount="indefinite" />
            </rect>
            {/* Shine follows pupils */}
            <rect x="15" y="16.5" width="1.2" height="1.2" rx="0.6" fill="white">
              <animate attributeName="x" values="13;16;13" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="27" y="16.5" width="1.2" height="1.2" rx="0.6" fill="white">
              <animate attributeName="x" values="25;28;25" dur="1.2s" repeatCount="indefinite" />
            </rect>
          </g>

          <rect x="17.5" y="22" width="5" height="3" rx="1.5" fill="var(--crayon-orange)" />
          <rect x="11" y="26" width="4" height="11" rx="1.5" fill="white" stroke="var(--border-soft)" strokeWidth="0.8" />
          <rect x="25" y="26" width="4" height="11" rx="1.5" fill="white" stroke="var(--border-soft)" strokeWidth="0.8" />
          <path d="M13 36L11.5 37.5Q13 38.5 14.5 37.5Z" fill="white" />
          <path d="M27 36L25.5 37.5Q27 38.5 28.5 37.5Z" fill="white" />
          <rect x="16" y="27" width="8" height="2" rx="1" fill="#3d3d4a" />
        </svg>
      </motion.div>

      <div className="text-center">
        <p
          className="mb-3 text-xl tracking-tight text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
        >
          Analyzing your stack
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-[var(--text-secondary)]"
          >
            {analyzingMessages[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WizardShell() {
  const { state, dispatch } = useWizard();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);

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
      setAnalyzing(true);
      setTimeout(() => {
        const results = calculateSavings(
          state.selectedSubscriptions,
          state.selectedServices
        );
        dispatch({ type: "SET_RESULTS", results });
        router.push("/results");
      }, 3200);
    }
  }, [state.step, state.selectedSubscriptions, state.selectedServices, dispatch, router]);

  const handleBack = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", step: state.step - 1 });
    }
  }, [state.step, dispatch]);

  if (analyzing) {
    return <AnalyzingScreen />;
  }

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
