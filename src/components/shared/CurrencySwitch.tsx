"use client";

import { useCurrency, currencies } from "@/context/CurrencyContext";
import { CurrencyCode } from "@/data/types";

export default function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency.code}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
    >
      {Object.values(currencies).map((c) => (
        <option key={c.code} value={c.code}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
