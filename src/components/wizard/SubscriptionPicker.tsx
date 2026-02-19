"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscriptions } from "@/data/subscriptions";
import { SubscriptionCategory } from "@/data/types";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import LogoGrid, { BrandLogo } from "@/components/shared/LogoGrid";
import PriceInput from "@/components/shared/PriceInput";

const categories: { key: SubscriptionCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "streaming", label: "Streaming" },
  { key: "music", label: "Music" },
  { key: "gaming", label: "Gaming" },
  { key: "productivity", label: "Productivity" },
  { key: "news", label: "News" },
  { key: "fitness", label: "Fitness" },
  { key: "cloud", label: "Cloud" },
];

export default function SubscriptionPicker() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<SubscriptionCategory | "all">("all");
  const [configuringId, setConfiguringId] = useState<string | null>(null);

  const selectedIds = useMemo(
    () => new Set(state.selectedSubscriptions.map((s) => s.itemId)),
    [state.selectedSubscriptions]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? subscriptions
        : subscriptions.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const handleToggle = (id: string) => {
    if (selectedIds.has(id)) {
      dispatch({ type: "REMOVE_SUBSCRIPTION", itemId: id });
      if (configuringId === id) setConfiguringId(null);
    } else {
      setConfiguringId(id);
    }
  };

  const configuringSub = subscriptions.find((s) => s.id === configuringId);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Pick your subscriptions
        </h2>
        <p className="text-slate-500">
          Select everything you&apos;re currently paying for. We&apos;ll find where you can
          save.
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat.key
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <LogoGrid items={filtered} selectedIds={selectedIds} onToggle={handleToggle} />

      <AnimatePresence>
        {configuringSub && !selectedIds.has(configuringSub.id) && (
          <motion.div
            key="price-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <PriceInput
              itemName={configuringSub.name}
              itemLogo={configuringSub.logo}
              itemImage={configuringSub.image}
              itemColor={configuringSub.color}
              plans={configuringSub.plans}
              onConfirm={(planId, price) => {
                dispatch({
                  type: "ADD_SUBSCRIPTION",
                  selection: {
                    itemId: configuringSub.id,
                    itemType: "subscription",
                    planId,
                    monthlyPrice: price,
                  },
                });
                setConfiguringId(null);
              }}
              onCancel={() => setConfiguringId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {state.selectedSubscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-xl bg-slate-50 p-4"
        >
          <p className="mb-2 text-sm font-medium text-slate-500">
            Selected ({state.selectedSubscriptions.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {state.selectedSubscriptions.map((sel) => {
              const sub = subscriptions.find((s) => s.id === sel.itemId);
              if (!sub) return null;
              return (
                <div
                  key={sel.itemId}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm"
                >
                  <BrandLogo item={sub} size={20} />
                  <span className="text-sm text-slate-700">{sub.name}</span>
                  <span className="text-sm font-medium text-amber-600">
                    {format(sel.monthlyPrice)}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_SUBSCRIPTION", itemId: sel.itemId })
                    }
                    className="text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
