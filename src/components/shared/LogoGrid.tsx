"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getLogoUrl } from "@/lib/logos";

interface LogoItem {
  id: string;
  name: string;
  logo: string;
  image: string;
  color: string;
}

type BrandLogoItem = { id?: string; name: string; logo: string; image: string; color: string };

interface LogoGridProps {
  items: LogoItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

function BrandLogo({ item, size = 48 }: { item: BrandLogoItem; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const googleLogo = item.id ? getLogoUrl(item.id) : "";
  const src = googleLogo || item.image;

  if (imgError || !src) {
    return (
      <div
        className="flex items-center justify-center rounded-xl font-bold text-white"
        style={{
          backgroundColor: item.color,
          width: size,
          height: size,
          fontSize: size * 0.35,
        }}
      >
        {item.logo}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={item.name}
      width={size}
      height={size}
      className="rounded-xl bg-white object-contain p-1"
      style={{ width: size, height: size }}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

export { BrandLogo };

export default function LogoGrid({ items, selectedIds, onToggle }: LogoGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {items.map((item, i) => {
        const selected = selectedIds.has(item.id);
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            onClick={() => onToggle(item.id)}
            className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${
              selected
                ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
            }`}
          >
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs text-white"
              >
                ✓
              </motion.div>
            )}
            <BrandLogo item={item} size={48} />
            <span className="text-xs font-medium text-slate-700 text-center leading-tight">
              {item.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
