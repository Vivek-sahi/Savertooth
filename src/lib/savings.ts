import { subscriptions } from "@/data/subscriptions";
import { services } from "@/data/services";
import { bundles } from "@/data/bundles";
import {
  UserSelection,
  SavingSuggestion,
  SavingsResult,
  Bundle,
} from "@/data/types";

function findCheaperAlternatives(
  selections: UserSelection[],
  itemType: "subscription" | "service"
): SavingSuggestion[] {
  const catalog = itemType === "subscription" ? subscriptions : services;
  const suggestions: SavingSuggestion[] = [];

  for (const sel of selections) {
    const currentItem = catalog.find((c) => c.id === sel.itemId);
    if (!currentItem) continue;

    const sameCategory = catalog.filter(
      (c) => c.category === currentItem.category && c.id !== currentItem.id
    );

    for (const alt of sameCategory) {
      const cheaperPlan = alt.plans.find(
        (p) => p.monthlyPrice < sel.monthlyPrice && p.monthlyPrice > 0
      );
      if (cheaperPlan && sel.monthlyPrice - cheaperPlan.monthlyPrice >= 2) {
        suggestions.push({
          type: "cheaper",
          currentItemId: sel.itemId,
          currentItemName: currentItem.name,
          currentPrice: sel.monthlyPrice,
          suggestedItemId: alt.id,
          suggestedItemName: `${alt.name} (${cheaperPlan.name})`,
          suggestedPrice: cheaperPlan.monthlyPrice,
          savingsPerMonth: +(sel.monthlyPrice - cheaperPlan.monthlyPrice).toFixed(2),
          reason: `Same category, ${Math.round(((sel.monthlyPrice - cheaperPlan.monthlyPrice) / sel.monthlyPrice) * 100)}% cheaper`,
        });
      }
    }

    const currentPlan = currentItem.plans.find((p) => p.id === sel.planId);
    const cheaperSameBrand = currentItem.plans.filter(
      (p) => p.monthlyPrice < sel.monthlyPrice && p.id !== sel.planId && p.monthlyPrice > 0
    );
    for (const plan of cheaperSameBrand) {
      if (sel.monthlyPrice - plan.monthlyPrice >= 2) {
        suggestions.push({
          type: "cheaper",
          currentItemId: sel.itemId,
          currentItemName: `${currentItem.name} (${currentPlan?.name ?? sel.planId})`,
          currentPrice: sel.monthlyPrice,
          suggestedItemId: sel.itemId,
          suggestedItemName: `${currentItem.name} (${plan.name})`,
          suggestedPrice: plan.monthlyPrice,
          savingsPerMonth: +(sel.monthlyPrice - plan.monthlyPrice).toFixed(2),
          reason: "Downgrade to a cheaper plan on the same service",
        });
      }
    }
  }

  suggestions.sort((a, b) => b.savingsPerMonth - a.savingsPerMonth);

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const key = `${s.currentItemId}-${s.suggestedItemId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function findMoreValueAlternatives(
  selections: UserSelection[],
  itemType: "subscription" | "service"
): SavingSuggestion[] {
  const catalog = itemType === "subscription" ? subscriptions : services;
  const suggestions: SavingSuggestion[] = [];

  for (const sel of selections) {
    const currentItem = catalog.find((c) => c.id === sel.itemId);
    if (!currentItem) continue;

    const sameCategory = catalog.filter(
      (c) => c.category === currentItem.category && c.id !== currentItem.id
    );

    for (const alt of sameCategory) {
      const betterPlan = alt.plans.find(
        (p) =>
          p.monthlyPrice <= sel.monthlyPrice * 1.05 &&
          p.monthlyPrice >= sel.monthlyPrice * 0.85
      );
      if (betterPlan) {
        suggestions.push({
          type: "more_value",
          currentItemId: sel.itemId,
          currentItemName: currentItem.name,
          currentPrice: sel.monthlyPrice,
          suggestedItemId: alt.id,
          suggestedItemName: `${alt.name} (${betterPlan.name})`,
          suggestedPrice: betterPlan.monthlyPrice,
          savingsPerMonth: +(sel.monthlyPrice - betterPlan.monthlyPrice).toFixed(2),
          reason: `Similar price, potentially better features from ${alt.name}`,
        });
      }
    }
  }

  return suggestions;
}

function findMatchingBundles(selections: UserSelection[]): Bundle[] {
  const selectedIds = new Set(selections.map((s) => s.itemId));
  const selectedNames = new Set(
    selections.map((s) => {
      const sub = subscriptions.find((x) => x.id === s.itemId);
      const svc = services.find((x) => x.id === s.itemId);
      return sub?.name ?? svc?.name ?? "";
    })
  );

  return bundles.filter((bundle) => {
    const overlap = bundle.includedItems.filter(
      (item) => selectedNames.has(item.name) || selectedIds.has(item.name.toLowerCase().replace(/[^a-z]/g, "-"))
    );
    return overlap.length >= 1;
  });
}

export function calculateSavings(
  selectedSubscriptions: UserSelection[],
  selectedServices: UserSelection[]
): SavingsResult {
  const allSelections = [...selectedSubscriptions, ...selectedServices];
  const currentTotal = allSelections.reduce((sum, s) => sum + s.monthlyPrice, 0);

  const cheaperSubs = findCheaperAlternatives(selectedSubscriptions, "subscription");
  const cheaperSvcs = findCheaperAlternatives(selectedServices, "service");
  const moreValueSubs = findMoreValueAlternatives(selectedSubscriptions, "subscription");
  const moreValueSvcs = findMoreValueAlternatives(selectedServices, "service");
  const matchingBundles = findMatchingBundles(allSelections);

  const allSuggestions = [
    ...cheaperSubs,
    ...cheaperSvcs,
    ...moreValueSubs,
    ...moreValueSvcs,
  ];

  const topCheaper = allSuggestions
    .filter((s) => s.type === "cheaper")
    .slice(0, 5);

  const maxSavingsPerItem = new Map<string, number>();
  for (const s of topCheaper) {
    const existing = maxSavingsPerItem.get(s.currentItemId) ?? 0;
    maxSavingsPerItem.set(s.currentItemId, Math.max(existing, s.savingsPerMonth));
  }

  const monthlySavings = Array.from(maxSavingsPerItem.values()).reduce(
    (sum, v) => sum + v,
    0
  );

  const optimizedTotal = +(currentTotal - monthlySavings).toFixed(2);
  const annualSavings = +(monthlySavings * 12).toFixed(2);
  const savingsPercent =
    currentTotal > 0 ? Math.round((monthlySavings / currentTotal) * 100) : 0;

  const score = Math.max(0, Math.min(100, 100 - savingsPercent * 2));

  return {
    currentTotal: +currentTotal.toFixed(2),
    optimizedTotal,
    monthlySavings: +monthlySavings.toFixed(2),
    annualSavings,
    savingsPercent,
    score,
    suggestions: allSuggestions,
    bundles: matchingBundles,
  };
}
