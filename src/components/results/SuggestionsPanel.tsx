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
          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              ⚡
            </span>
            Savertooth Suggestions
          </h3>
          <p className="mb-6 text-sm text-slate-500">
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
