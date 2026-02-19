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
        className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white"
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
      className="rounded bg-white object-contain p-0.5"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

export default function BundleCard({ bundle, index }: BundleCardProps) {
  const { format } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="relative rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 shadow-lg shadow-amber-500/5"
    >
      {bundle.highlight && (
        <span className="absolute -top-3 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
          {bundle.highlight}
        </span>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-800">{bundle.name}</h4>
          <p className="text-sm text-slate-500">{bundle.description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
          -{bundle.savingsPercent}%
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {bundle.includedItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 shadow-sm"
          >
            <BundleItemLogo item={item} />
            <span className="text-xs font-medium text-slate-600">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-5 flex items-end gap-3">
        <span className="text-sm text-slate-400 line-through">
          {format(bundle.retailPrice)}/mo
        </span>
        <span className="text-2xl font-bold text-slate-800">
          {format(bundle.groupPrice)}
        </span>
        <span className="mb-0.5 text-sm text-slate-400">/mo</span>
      </div>

      <button className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-white transition-all hover:bg-amber-600 hover:shadow-lg">
        Get This
      </button>
    </motion.div>
  );
}
