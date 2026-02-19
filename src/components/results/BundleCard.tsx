"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bundle } from "@/data/types";
import { useCurrency } from "@/context/CurrencyContext";

interface BundleCardProps {
  bundle: Bundle;
  index: number;
}

function BundleItemLogo({ item }: { item: { name: string; logo: string; image: string; color: string } }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !item.image) {
    return (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold text-white"
        style={{ backgroundColor: item.color }}
      >
        {item.logo}
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt={item.name}
      width={24}
      height={24}
      className="rounded-lg bg-white object-contain p-0.5"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

export default function BundleCard({ bundle, index }: BundleCardProps) {
  const { format } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      {bundle.highlight && (
        <span className="absolute -top-3 left-4 rounded-xl bg-[var(--text-primary)] px-3 py-1 text-xs font-semibold text-white">
          {bundle.highlight}
        </span>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="text-base font-extrabold text-[var(--text-primary)]">{bundle.name}</h4>
          <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{bundle.description}</p>
        </div>
        <span
          className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold"
          style={{ backgroundColor: "#e6f9f6", color: "var(--crayon-teal)" }}
        >
          -{bundle.savingsPercent}%
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {bundle.includedItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-1.5 rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-2.5 py-1.5"
          >
            <BundleItemLogo item={item} />
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-5 flex items-end gap-3">
        <span className="text-sm text-[var(--text-muted)] line-through">
          {format(bundle.retailPrice)}/mo
        </span>
        <span className="text-2xl font-extrabold text-[var(--text-primary)]">
          {format(bundle.groupPrice)}
        </span>
        <span className="mb-0.5 text-sm text-[var(--text-muted)]">/mo</span>
      </div>

      <button className="w-full rounded-2xl bg-[var(--text-primary)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98]">
        Get This
      </button>
    </motion.div>
  );
}
