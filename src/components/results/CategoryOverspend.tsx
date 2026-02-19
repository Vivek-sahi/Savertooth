"use client";

import { motion } from "framer-motion";
import { CategoryInsight } from "@/data/types";
import { useCurrency } from "@/context/CurrencyContext";

interface CategoryOverspendProps {
  insights: CategoryInsight[];
}

export default function CategoryOverspend({ insights }: CategoryOverspendProps) {
  const { format } = useCurrency();
  const overspent = insights.filter((i) => i.overSpend > 0);
  const onTrack = insights.filter((i) => i.overSpend <= 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#fef3c7" }}
        >
          <svg
            className="h-5 w-5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
          </svg>
        </div>
        <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
          Your spend vs. category benchmarks
        </h3>
      </div>
      <p className="mb-5 text-sm text-[var(--text-secondary)]">
        How each category compares to what an average Indian household spends.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {overspent.map((insight) => {
          const pct = insight.benchmarkSpend > 0
            ? Math.round((insight.totalSpend / insight.benchmarkSpend) * 100)
            : 100;
          return (
            <div
              key={insight.category}
              className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {insight.categoryLabel}
                </span>
                <span className="rounded-lg bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-800">
                  +{format(insight.overSpend)}/mo
                </span>
              </div>
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-amber-200">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>You: {format(insight.totalSpend)}/mo ({insight.itemCount} item{insight.itemCount > 1 ? "s" : ""})</span>
                <span>Avg: {format(insight.benchmarkSpend)}/mo</span>
              </div>
            </div>
          );
        })}

        {onTrack.map((insight) => (
          <div
            key={insight.category}
            className="rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {insight.categoryLabel}
              </span>
              <span className="rounded-lg bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                On track
              </span>
            </div>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-green-100">
              <div
                className="h-full rounded-full bg-green-400 transition-all"
                style={{
                  width: `${Math.min(
                    insight.benchmarkSpend > 0
                      ? Math.round((insight.totalSpend / insight.benchmarkSpend) * 100)
                      : 50,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>You: {format(insight.totalSpend)}/mo ({insight.itemCount} item{insight.itemCount > 1 ? "s" : ""})</span>
              <span>Avg: {format(insight.benchmarkSpend)}/mo</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
