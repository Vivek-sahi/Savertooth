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
  configuringId?: string | null;
}

function BrandLogo({ item, size = 48 }: { item: BrandLogoItem; size?: number }) {
  const googleLogo = item.id ? getLogoUrl(item.id) : "";
  const sources = [googleLogo, item.image].filter(Boolean);
  const [sourceIdx, setSourceIdx] = useState(0);

  const src = sources[sourceIdx];

  if (!src) {
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
      onError={() => setSourceIdx((i) => i + 1)}
      loading="lazy"
    />
  );
}

export { BrandLogo };

export default function LogoGrid({ items, selectedIds, onToggle, configuringId }: LogoGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {items.map((item, i) => {
        const selected = selectedIds.has(item.id);
        const configuring = configuringId === item.id;
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            onClick={() => onToggle(item.id)}
            className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${
              selected
                ? "border-[var(--crayon-teal)] bg-[#f0faf8] shadow-[0_2px_8px_rgba(46,196,182,0.1)]"
                : configuring
                ? "border-[var(--text-primary)] bg-[var(--bg-warm)] shadow-[0_0_0_3px_rgba(45,45,58,0.08)] -translate-y-1"
                : "border-[var(--border-soft)] bg-white hover:border-[var(--border-card)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
            }`}
          >
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-xl bg-[var(--crayon-teal)] text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            {configuring && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-xl bg-[var(--text-primary)] text-white"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16l-4 4m4-4l4 4" />
                </svg>
              </motion.div>
            )}
            <BrandLogo item={item} size={48} />
            <span className="text-xs font-semibold text-[var(--text-secondary)] text-center leading-tight">
              {item.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
