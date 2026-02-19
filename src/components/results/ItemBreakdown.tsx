"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SavingSuggestion } from "@/data/types";
import { useCurrency } from "@/context/CurrencyContext";

interface CollapsibleSectionProps {
  title: string;
  icon: string;
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
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
            {icon}
          </span>
          <span className="text-lg font-bold text-slate-800">{title}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            {count}
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <div className="border-t border-slate-100 p-4 pt-3">
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
    <div className="space-y-3">
      {cheaper.length > 0 && (
        <CollapsibleSection
          title="Reduce your cost"
          icon="↓"
          iconBg="bg-green-100"
          iconColor="text-green-600"
          count={cheaper.length}
        >
          <div className="space-y-3">
            {cheaper.slice(0, 5).map((s, i) => (
              <div
                key={`${s.currentItemId}-${s.suggestedItemId}-${i}`}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-500 line-through">
                      {s.currentItemName}
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {s.suggestedItemName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{s.reason}</p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through">
                      {format(s.currentPrice)}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {format(s.suggestedPrice)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-green-500">
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
          icon="↑"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          count={moreValue.length}
        >
          <div className="space-y-3">
            {moreValue.slice(0, 3).map((s, i) => (
              <div
                key={`${s.currentItemId}-${s.suggestedItemId}-${i}`}
                className="flex items-center justify-between rounded-lg bg-blue-50/50 p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-500">
                      {s.currentItemName}
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {s.suggestedItemName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{s.reason}</p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <span className="text-sm font-medium text-blue-600">
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
