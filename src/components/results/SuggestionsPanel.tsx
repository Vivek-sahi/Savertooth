"use client";

import { motion } from "framer-motion";
import { SavingsResult } from "@/data/types";
import ItemBreakdown from "./ItemBreakdown";
import BundleCard from "./BundleCard";

interface SuggestionsPanelProps {
  results: SavingsResult;
}

export default function SuggestionsPanel({ results }: SuggestionsPanelProps) {
  return (
    <div className="space-y-10">
      {results.bundles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: "#fff0eb" }}
            >
              <svg
                className="h-5 w-5"
                style={{ color: "var(--crayon-orange)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
              Savertooth Suggestions
            </h3>
          </div>
          <p className="mb-6 text-sm text-[var(--text-secondary)]">
            Curated packs that give you more for less. Each suggestion is
            optimized for your current stack.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {results.bundles.map((bundle, i) => (
              <BundleCard key={bundle.id} bundle={bundle} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      <ItemBreakdown suggestions={results.suggestions} />
    </div>
  );
}
