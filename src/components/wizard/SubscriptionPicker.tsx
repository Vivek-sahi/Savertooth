"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscriptions } from "@/data/subscriptions";
import { SubscriptionCategory } from "@/data/types";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import LogoGrid, { BrandLogo } from "@/components/shared/LogoGrid";
import PriceInput from "@/components/shared/PriceInput";

const categories: { key: SubscriptionCategory | "all" | "popular"; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "all", label: "All" },
  { key: "streaming", label: "Streaming" },
  { key: "music", label: "Music" },
  { key: "gaming", label: "Gaming" },
  { key: "productivity", label: "Productivity" },
  { key: "news", label: "News" },
  { key: "fitness", label: "Fitness" },
  { key: "cloud", label: "Cloud" },
  { key: "food", label: "Food & Delivery" },
  { key: "lifestyle", label: "Lifestyle" },
];

export default function SubscriptionPicker() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<SubscriptionCategory | "all" | "popular">("popular");
  const [configuringId, setConfiguringId] = useState<string | null>(null);

  const selectedIds = useMemo(
    () => new Set(state.selectedSubscriptions.map((s) => s.itemId)),
    [state.selectedSubscriptions]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? subscriptions
        : activeCategory === "popular"
          ? subscriptions.filter((s) => s.popular)
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
        <h2 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)]">
          Pick your subscriptions
        </h2>
        <p className="text-[var(--text-secondary)]">
          Select your subscriptions and their plans.
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-xl px-4 py-1.5 text-sm font-semibold transition-all ${
              activeCategory === cat.key
                ? "bg-[var(--text-primary)] text-white"
                : "bg-white text-[var(--text-secondary)] border-2 border-[var(--border-soft)] hover:border-[var(--border-card)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <LogoGrid items={filtered} selectedIds={selectedIds} onToggle={handleToggle} configuringId={configuringId} />

      <AnimatePresence>
        {configuringSub && !selectedIds.has(configuringSub.id) && (
          <PriceInput
            key="price-input"
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
        )}
      </AnimatePresence>

      {state.selectedSubscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-4"
        >
          <p className="mb-2 text-sm font-bold text-[var(--text-secondary)]">
            Selected ({state.selectedSubscriptions.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {state.selectedSubscriptions.map((sel) => {
              const sub = subscriptions.find((s) => s.id === sel.itemId);
              if (!sub) return null;
              return (
                <div
                  key={sel.itemId}
                  className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-1.5"
                >
                  <BrandLogo item={sub} size={20} />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{sub.name}</span>
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {format(sel.monthlyPrice)}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_SUBSCRIPTION", itemId: sel.itemId })
                    }
                    className="text-[var(--text-muted)] hover:text-red-500 font-bold"
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
