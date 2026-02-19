"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { ServiceCategory } from "@/data/types";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import LogoGrid, { BrandLogo } from "@/components/shared/LogoGrid";
import PriceInput from "@/components/shared/PriceInput";

const categories: { key: ServiceCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "internet", label: "WiFi / Internet" },
  { key: "mobile", label: "Phone / Mobile" },
  { key: "electricity", label: "Electricity" },
  { key: "credit_card", label: "Credit Cards" },
  { key: "gym", label: "Gym" },
  { key: "insurance", label: "Insurance" },
];

export default function ServicePicker() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [configuringId, setConfiguringId] = useState<string | null>(null);

  const selectedIds = useMemo(
    () => new Set(state.selectedServices.map((s) => s.itemId)),
    [state.selectedServices]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? services
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
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Your essential services
        </h2>
        <p className="text-slate-500">
          These are the big-ticket items — internet, phone, utilities. This is
          where the real savings live.
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
        {configuringSvc && !selectedIds.has(configuringSvc.id) && (
          <motion.div
            key="price-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <PriceInput
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
          </motion.div>
        )}
      </AnimatePresence>

      {state.selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-xl bg-slate-50 p-4"
        >
          <p className="mb-2 text-sm font-medium text-slate-500">
            Selected ({state.selectedServices.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {state.selectedServices.map((sel) => {
              const svc = services.find((s) => s.id === sel.itemId);
              if (!svc) return null;
              return (
                <div
                  key={sel.itemId}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm"
                >
                  <BrandLogo item={svc} size={20} />
                  <span className="text-sm text-slate-700">{svc.name}</span>
                  <span className="text-sm font-medium text-amber-600">
                    {format(sel.monthlyPrice)}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_SERVICE", itemId: sel.itemId })
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
