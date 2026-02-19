"use client";

import { SavingsResult } from "@/data/types";
import ItemBreakdown from "./ItemBreakdown";
import CategoryOverspend from "./CategoryOverspend";

interface SuggestionsPanelProps {
  results: SavingsResult;
}

export default function SuggestionsPanel({ results }: SuggestionsPanelProps) {
  return (
    <div className="space-y-10">
      <ItemBreakdown suggestions={results.suggestions} />
      {results.categoryInsights.length > 0 && (
        <CategoryOverspend insights={results.categoryInsights} />
      )}
    </div>
  );
}
