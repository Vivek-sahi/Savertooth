"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { ServiceCategory } from "@/data/types";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import LogoGrid, { BrandLogo } from "@/components/shared/LogoGrid";
import PriceInput from "@/components/shared/PriceInput";

const categories: { key: ServiceCategory | "all" | "popular"; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "all", label: "All" },
  { key: "internet", label: "WiFi / Internet" },
  { key: "mobile", label: "Phone / Prepaid" },
  { key: "mobile_postpaid", label: "Postpaid" },
  { key: "dth", label: "DTH / TV" },
  { key: "electricity", label: "Electricity" },
  { key: "credit_card", label: "Credit Cards" },
  { key: "gym", label: "Gym" },
  { key: "insurance", label: "Insurance" },
];

export default function ServicePicker() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all" | "popular">("popular");
  const [configuringId, setConfiguringId] = useState<string | null>(null);

  const selectedIds = useMemo(
    () => new Set(state.selectedServices.map((s) => s.itemId)),
    [state.selectedServices]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? services
        : activeCategory === "popular"
          ? services.filter((s) => s.popular)
          : services.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const handleToggle = (id: string) => {
    if (selectedIds.has(id)) {
      dispatch({ type: "REMOVE_SERVICE", itemId: id });
      if (configuringId === id) setConfiguringId(null);
    } else {
      setConfiguringId(id);
    }
  };

  const configuringSvc = services.find((s) => s.id === configuringId);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)]">
          Services
        </h2>
        <p className="text-[var(--text-secondary)]">
          Select your services and their plans. Providers often have deals we can find — the more you add, the more you save.
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
        {configuringSvc && !selectedIds.has(configuringSvc.id) && (
          <PriceInput
            key="price-input"
            itemName={configuringSvc.name}
            itemLogo={configuringSvc.logo}
            itemImage={configuringSvc.image}
            itemColor={configuringSvc.color}
            plans={configuringSvc.plans}
            onConfirm={(planId, price) => {
              dispatch({
                type: "ADD_SERVICE",
                selection: {
                  itemId: configuringSvc.id,
                  itemType: "service",
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

      {state.selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-4"
        >
          <p className="mb-2 text-sm font-bold text-[var(--text-secondary)]">
            Selected ({state.selectedServices.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {state.selectedServices.map((sel) => {
              const svc = services.find((s) => s.id === sel.itemId);
              if (!svc) return null;
              return (
                <div
                  key={sel.itemId}
                  className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-1.5"
                >
                  <BrandLogo item={svc} size={20} />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{svc.name}</span>
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {format(sel.monthlyPrice)}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_SERVICE", itemId: sel.itemId })
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
