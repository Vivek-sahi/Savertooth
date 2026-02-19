"use client";

import { useState } from "react";
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-5"
    >
      <div className="mb-4 flex items-center gap-3">
        {!imgError && itemImage ? (
          <img
            src={itemImage}
            alt={itemName}
            width={40}
            height={40}
            className="rounded-lg object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: itemColor }}
          >
            {itemLogo}
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-800">{itemName}</h3>
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium text-slate-600">Select your plan:</p>
        <div className="flex flex-wrap gap-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                setSelectedPlan(plan.id);
                setUseCustom(false);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                selectedPlan === plan.id && !useCustom
                  ? "bg-amber-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {plan.name} — {format(plan.monthlyPrice)}/mo
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setUseCustom(!useCustom)}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          {useCustom ? "← Use plan pricing" : "Enter custom price →"}
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-slate-200 py-2 pl-7 pr-12 text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  /mo
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-800">
          {format(finalPrice)}/mo
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Remove
          </button>
          <button
            onClick={() => onConfirm(useCustom ? "custom" : selectedPlan, finalPrice)}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-amber-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}
