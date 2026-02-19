"use client";

import { useCurrency, currencies } from "@/context/CurrencyContext";
import { CurrencyCode } from "@/data/types";

export default function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency.code}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
    >
      {Object.values(currencies).map((c) => (
        <option key={c.code} value={c.code}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
