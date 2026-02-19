"use client";

import { useCurrency, currencies } from "@/context/CurrencyContext";
import { CurrencyCode } from "@/data/types";

export default function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency.code}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="rounded-xl border-2 border-[var(--border-soft)] bg-white pl-4 py-2 text-sm font-semibold text-[var(--text-secondary)] appearance-none bg-[length:12px] bg-[right_8px_center] bg-no-repeat focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9a9a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, paddingRight: "26px" }}
    >
      {Object.values(currencies).map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code}
        </option>
      ))}
    </select>
  );
}
