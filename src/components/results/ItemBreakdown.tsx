"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SavingSuggestion } from "@/data/types";
import { useCurrency } from "@/context/CurrencyContext";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  description,
  icon,
  iconBg,
  iconColor,
  count,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-[var(--border-soft)] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[var(--bg-warm)]"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              {icon}
            </span>
            <span className="text-base font-extrabold text-[var(--text-primary)]">{title}</span>
            <span
              className="rounded-xl px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              {count}
            </span>
          </div>
          {description && (
            <p className="mt-1.5 ml-12 text-xs text-[var(--text-muted)]">{description}</p>
          )}
        </div>
        <svg
          className={`ml-3 h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-[var(--border-soft)] p-5 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ItemBreakdownProps {
  suggestions: SavingSuggestion[];
}

export default function ItemBreakdown({ suggestions }: ItemBreakdownProps) {
  const { format } = useCurrency();

  const perkSuggestions = suggestions.filter((s) => s.type === "hidden_perk");
  const benchmarkSuggestions = suggestions.filter((s) => s.type === "benchmark");
  const cheaperSuggestions = suggestions.filter((s) => s.type === "cheaper");
  const cheaperItemCount = new Set(cheaperSuggestions.map((s) => s.currentItemId)).size;

  if (perkSuggestions.length === 0 && benchmarkSuggestions.length === 0 && cheaperSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {perkSuggestions.length > 0 && (
        <CollapsibleSection
          title="Included free with your plans"
          description="Your existing services already bundle these subscriptions at no extra cost."
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          }
          iconBg="#fef3c7"
          iconColor="#d97706"
          count={perkSuggestions.length}
          defaultOpen={true}
        >
          <div className="space-y-3">
            {perkSuggestions.map((s, i) => (
              <div
                key={`perk-${s.currentItemId}-${i}`}
                className="flex items-center justify-between rounded-2xl border-2 border-amber-200 bg-amber-50 p-4"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center rounded-lg bg-green-100 px-2 py-0.5 text-xs font-extrabold text-green-700">
                      FREE
                    </span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {s.currentItemName}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      — via {s.suggestedItemName}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{s.perkNote ?? s.reason}</p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    {format(s.currentPrice)}/mo
                  </span>
                  <p className="text-lg font-extrabold text-green-600">
                    {format(0)}
                  </p>
                  <p className="text-xs font-bold text-green-600">
                    Save {format(s.savingsPerMonth)}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {benchmarkSuggestions.length > 0 && (
        <CollapsibleSection
          title="Paying more than most people"
          description="These subscriptions have a cheaper popular plan you could switch to."
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          }
          iconBg="#ede9fe"
          iconColor="#7c3aed"
          count={benchmarkSuggestions.length}
        >
          <div className="space-y-3">
            {benchmarkSuggestions.slice(0, 5).map((s, i) => (
              <div
                key={`bench-${s.currentItemId}-${i}`}
                className="flex items-center justify-between rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-[var(--text-muted)] line-through">
                      {s.currentItemName}
                    </span>
                    <svg className="h-3.5 w-3.5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {s.suggestedItemName}
                    </span>
                    <span className="rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-600">
                      MOST POPULAR
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{s.reason}</p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      {format(s.currentPrice)}
                    </span>
                    <span className="text-lg font-extrabold text-violet-600">
                      {format(s.suggestedPrice)}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-violet-600">
                    Save {format(s.savingsPerMonth)}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {cheaperSuggestions.length > 0 && (
        <CollapsibleSection
          title="Potential downgrades to save more"
          description="Cheaper plans or alternatives that could reduce your monthly bill."
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          }
          iconBg="#e6f9f6"
          iconColor="var(--crayon-teal)"
          count={cheaperItemCount}
        >
          <div className="space-y-3">
            {cheaperSuggestions.slice(0, 8).map((s, i) => (
              <div
                key={`cheap-${s.currentItemId}-${s.suggestedItemId}-${i}`}
                className="flex items-center justify-between rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-[var(--text-muted)] line-through">
                      {s.currentItemName}
                    </span>
                    <svg className="h-3.5 w-3.5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {s.suggestedItemName}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{s.reason}</p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      {format(s.currentPrice)}
                    </span>
                    <span className="text-lg font-extrabold" style={{ color: "var(--crayon-teal)" }}>
                      {format(s.suggestedPrice)}
                    </span>
                  </div>
                  <p className="text-xs font-bold" style={{ color: "var(--crayon-teal)" }}>
                    Save {format(s.savingsPerMonth)}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}
