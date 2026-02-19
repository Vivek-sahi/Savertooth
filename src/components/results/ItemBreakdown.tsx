"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SavingSuggestion } from "@/data/types";
import { useCurrency } from "@/context/CurrencyContext";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
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
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
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
        <svg
          className={`h-5 w-5 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
  const cheaper = suggestions.filter((s) => s.type === "cheaper");
  const moreValue = suggestions.filter((s) => s.type === "more_value");

  if (cheaper.length === 0 && moreValue.length === 0) return null;

  return (
    <div className="space-y-4">
      {cheaper.length > 0 && (
        <CollapsibleSection
          title="Reduce your cost"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          }
          iconBg="#e6f9f6"
          iconColor="var(--crayon-teal)"
          count={cheaper.length}
        >
          <div className="space-y-3">
            {cheaper.slice(0, 5).map((s, i) => (
              <div
                key={`${s.currentItemId}-${s.suggestedItemId}-${i}`}
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

      {moreValue.length > 0 && (
        <CollapsibleSection
          title="Get more for your money"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          }
          iconBg="#f0ecfe"
          iconColor="var(--crayon-purple)"
          count={moreValue.length}
        >
          <div className="space-y-3">
            {moreValue.slice(0, 3).map((s, i) => (
              <div
                key={`${s.currentItemId}-${s.suggestedItemId}-${i}`}
                className="flex items-center justify-between rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
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
                  <span className="text-sm font-bold" style={{ color: "var(--crayon-purple)" }}>
                    ~{format(s.suggestedPrice)}/mo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}
