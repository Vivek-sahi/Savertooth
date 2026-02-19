"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CurrencyCode, CurrencyConfig } from "@/data/types";

export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", label: "INR (₹)", rateFromINR: 1 },
  USD: { code: "USD", symbol: "$", label: "USD ($)", rateFromINR: 0.012 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", rateFromINR: 0.011 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", rateFromINR: 0.0095 },
};

interface CurrencyContextValue {
  currency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountINR: number) => string;
  convert: (amountINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: currencies.INR,
  setCurrency: () => {},
  format: (v) => `₹${v.toFixed(0)}`,
  convert: (v) => v,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(currencies.INR);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(currencies[code]);
  }, []);

  const convert = useCallback(
    (amountINR: number) => +(amountINR * currency.rateFromINR).toFixed(2),
    [currency]
  );

  const format = useCallback(
    (amountINR: number) => {
      const converted = amountINR * currency.rateFromINR;
      if (currency.code === "INR") {
        return `₹${Math.round(converted).toLocaleString("en-IN")}`;
      }
      return `${currency.symbol}${converted.toFixed(2)}`;
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
