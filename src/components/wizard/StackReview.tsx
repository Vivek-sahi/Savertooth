"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import { subscriptions } from "@/data/subscriptions";
import { services } from "@/data/services";
import { BrandLogo } from "@/components/shared/LogoGrid";

export default function StackReview() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();

  const allItems = useMemo(
    () => [
      ...state.selectedSubscriptions.map((sel) => {
        const sub = subscriptions.find((s) => s.id === sel.itemId);
        return {
          ...sel,
          name: sub?.name ?? sel.itemId,
          logo: sub?.logo ?? "?",
          image: sub?.image ?? "",
          color: sub?.color ?? "#999",
          category: sub?.category ?? "streaming",
          type: "subscription" as const,
        };
      }),
      ...state.selectedServices.map((sel) => {
        const svc = services.find((s) => s.id === sel.itemId);
        return {
          ...sel,
          name: svc?.name ?? sel.itemId,
          logo: svc?.logo ?? "?",
          image: svc?.image ?? "",
          color: svc?.color ?? "#999",
          category: svc?.category ?? "internet",
          type: "service" as const,
        };
      }),
    ],
    [state.selectedSubscriptions, state.selectedServices]
  );

  const total = allItems.reduce((sum, item) => sum + item.monthlyPrice, 0);

  const subCount = state.selectedSubscriptions.length;
  const svcCount = state.selectedServices.length;

  const sortedItems = useMemo(
    () => [...allItems].sort((a, b) => b.monthlyPrice - a.monthlyPrice),
    [allItems]
  );

  if (allItems.length === 0) {
    return (
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)]">Your spend snapshot</h2>
          <p className="text-[var(--text-secondary)]">Add subscriptions and services to see your spend patterns.</p>
        </motion.div>
        <div className="rounded-3xl border-2 border-dashed border-[var(--border-soft)] p-12 text-center">
          <p className="text-base text-[var(--text-muted)]">
            No items selected yet. Go back and pick your subscriptions and services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="mb-1 text-2xl font-extrabold text-[var(--text-primary)]">Your spend snapshot</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Here&apos;s where your money goes every month.
        </p>
      </motion.div>

      {/* Hero spend card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 rounded-3xl bg-[var(--bg-dark)] p-6 text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Monthly spend</p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight">{format(total)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Per year</p>
            <p className="mt-1 text-2xl font-bold text-[var(--crayon-yellow)]">{format(total * 12)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
            {subCount} subscription{subCount !== 1 ? "s" : ""}
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
            {svcCount} service{svcCount !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.div>

      {/* Compact item chips with remove */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-4"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Your stack ({allItems.length} items)
        </p>
        <div className="flex flex-wrap gap-2">
          {sortedItems.map((item) => (
            <div
              key={item.itemId}
              className="group flex items-center gap-2 rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-2.5 py-1.5 transition-all hover:border-red-200"
            >
              <BrandLogo item={item} size={20} />
              <span className="text-xs font-semibold text-[var(--text-primary)]">{item.name}</span>
              <span className="text-xs font-bold text-[var(--accent)]">{format(item.monthlyPrice)}</span>
              <button
                onClick={() => {
                  if (item.type === "subscription") {
                    dispatch({ type: "REMOVE_SUBSCRIPTION", itemId: item.itemId });
                  } else {
                    dispatch({ type: "REMOVE_SERVICE", itemId: item.itemId });
                  }
                }}
                className="ml-0.5 text-[var(--text-muted)] opacity-0 transition-all group-hover:opacity-100 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
