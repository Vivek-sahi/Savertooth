"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
}

interface PriceInputProps {
  itemName: string;
  itemLogo: string;
  itemImage: string;
  itemColor: string;
  plans: Plan[];
  onConfirm: (planId: string, price: number) => void;
  onCancel: () => void;
}

export default function PriceInput({
  itemName,
  itemImage,
  itemLogo,
  itemColor,
  plans,
  onConfirm,
  onCancel,
}: PriceInputProps) {
  const { format } = useCurrency();
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0]?.id ?? "");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [useCustom, setUseCustom] = useState(false);
  const [imgError, setImgError] = useState(false);

  const activePlan = plans.find((p) => p.id === selectedPlan);
  const finalPrice = useCustom
    ? parseFloat(customPrice) || 0
    : activePlan?.monthlyPrice ?? 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full max-w-md rounded-3xl border-2 border-[var(--crayon-orange)]/20 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-warm)] hover:text-[var(--text-primary)]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5 flex items-center gap-3">
          {!imgError && itemImage ? (
            <img
              src={itemImage}
              alt={itemName}
              width={48}
              height={48}
              className="rounded-xl object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: itemColor }}
            >
              {itemLogo}
            </div>
          )}
          <div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">{itemName}</h3>
            <p className="text-xs text-[var(--text-muted)]">Select your plan</p>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setUseCustom(false);
                }}
                className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                  selectedPlan === plan.id && !useCustom
                    ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-white"
                    : "border-[var(--border-soft)] bg-white text-[var(--text-secondary)] hover:border-[var(--border-card)] hover:bg-[var(--bg-warm)]"
                }`}
              >
                <span className="block font-bold">{plan.name}</span>
                <span className="block text-xs mt-0.5 opacity-80">{format(plan.monthlyPrice)}/mo</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <button
            onClick={() => setUseCustom(!useCustom)}
            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold"
          >
            {useCustom ? "← Use plan pricing" : "Enter custom price instead"}
          </button>
          <AnimatePresence>
            {useCustom && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 overflow-hidden"
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="0"
                    autoFocus
                    className="w-full rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] py-2.5 pl-7 pr-12 text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">
                    /mo
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[var(--bg-warm)] p-4">
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">Monthly cost</p>
            <p className="text-xl font-extrabold text-[var(--text-primary)]">
              {format(finalPrice)}<span className="text-sm font-semibold text-[var(--text-muted)]">/mo</span>
            </p>
          </div>
          <button
            onClick={() => onConfirm(useCustom ? "custom" : selectedPlan, finalPrice)}
            className="rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98]"
          >
            Add to stack
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
