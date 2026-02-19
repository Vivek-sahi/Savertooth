"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import { subscriptions } from "@/data/subscriptions";
import { services } from "@/data/services";
import { BrandLogo } from "@/components/shared/LogoGrid";

const categoryLabels: Record<string, string> = {
  streaming: "Streaming",
  music: "Music",
  gaming: "Gaming",
  productivity: "Productivity",
  news: "News",
  fitness: "Fitness",
  cloud: "Cloud",
  vpn: "VPN",
  food: "Food & Delivery",
  lifestyle: "Lifestyle",
  internet: "Internet",
  mobile: "Mobile (Prepaid)",
  mobile_postpaid: "Postpaid",
  dth: "DTH / TV",
  electricity: "Electricity",
  credit_card: "Credit Cards",
  insurance: "Insurance",
  gym: "Gym",
};

const categoryColors: Record<string, string> = {
  streaming: "var(--crayon-orange)",
  music: "var(--crayon-purple)",
  gaming: "var(--crayon-teal)",
  productivity: "var(--crayon-blue)",
  news: "var(--crayon-yellow)",
  fitness: "var(--crayon-pink)",
  cloud: "var(--crayon-green)",
  vpn: "var(--crayon-coral)",
  food: "var(--crayon-orange)",
  lifestyle: "var(--crayon-coral)",
  internet: "var(--crayon-teal)",
  mobile: "var(--crayon-blue)",
  mobile_postpaid: "var(--crayon-blue)",
  dth: "var(--crayon-purple)",
  electricity: "var(--crayon-yellow)",
  credit_card: "var(--crayon-purple)",
  insurance: "var(--crayon-orange)",
  gym: "var(--crayon-pink)",
};

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

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    allItems.forEach((item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + item.monthlyPrice);
    });
    return Array.from(map.entries())
      .map(([cat, amount]) => ({
        category: cat,
        label: categoryLabels[cat] ?? cat,
        amount,
        percent: total > 0 ? Math.round((amount / total) * 100) : 0,
        color: categoryColors[cat] ?? "var(--crayon-orange)",
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [allItems, total]);

  const topCategory = categoryBreakdown[0];
  const subCount = state.selectedSubscriptions.length;
  const svcCount = state.selectedServices.length;

  const sortedItems = useMemo(
    () => [...allItems].sort((a, b) => b.monthlyPrice - a.monthlyPrice),
    [allItems]
  );
  const topSpender = sortedItems[0];

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

      {/* Category breakdown bar + legend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-5 rounded-3xl border-2 border-[var(--border-soft)] bg-white p-5"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Where it goes
        </p>

        {/* Stacked bar */}
        <div className="mb-4 flex h-4 overflow-hidden rounded-full">
          {categoryBreakdown.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ width: 0 }}
              animate={{ width: `${cat.percent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: cat.color, minWidth: cat.percent > 0 ? 6 : 0 }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {categoryBreakdown.map((cat) => (
            <div key={cat.category} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {cat.label}
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {cat.percent}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Insight pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-5 flex flex-wrap gap-2"
      >
        {topCategory && (
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-3.5 py-2">
            <span className="text-sm">📊</span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">{topCategory.label}</strong> is your biggest category at{" "}
              <strong style={{ color: topCategory.color }}>{format(topCategory.amount)}/mo</strong>
            </span>
          </div>
        )}
        {topSpender && (
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-3.5 py-2">
            <span className="text-sm">💸</span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">{topSpender.name}</strong> costs the most at{" "}
              <strong className="text-[var(--accent)]">{format(topSpender.monthlyPrice)}/mo</strong>
            </span>
          </div>
        )}
        {total * 12 > 10000 && (
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-3.5 py-2">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              You spend <strong className="text-[var(--text-primary)]">{format(total * 12)}/year</strong> — let&apos;s find savings
            </span>
          </div>
        )}
      </motion.div>

      {/* Compact item chips with remove */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
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
