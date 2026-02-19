import { subscriptions } from "@/data/subscriptions";
import { services } from "@/data/services";
import { perks } from "@/data/perks";
import { getBenchmark } from "@/data/benchmarks";
import {
  UserSelection,
  SavingSuggestion,
  SavingsResult,
  CategoryInsight,
  Subscription,
  ServiceProvider,
} from "@/data/types";

// ─── Helpers ──────────────────────────────────────────────

const allItems: (Subscription | ServiceProvider)[] = [...subscriptions, ...services];
function findItem(id: string) {
  return allItems.find((i) => i.id === id);
}

const CATEGORY_LABELS: Record<string, string> = {
  streaming: "Streaming",
  music: "Music",
  gaming: "Gaming",
  productivity: "Productivity",
  news: "News",
  fitness: "Fitness",
  cloud: "Cloud",
  food: "Food & Delivery",
  lifestyle: "Lifestyle",
  vpn: "VPN",
  internet: "WiFi / Internet",
  mobile: "Phone / Prepaid",
  mobile_postpaid: "Postpaid",
  dth: "DTH / TV",
  electricity: "Electricity",
  credit_card: "Credit Cards",
  insurance: "Insurance",
  gym: "Gym",
};

// ─── Layer 1: Hidden Perks ────────────────────────────────
// "You're paying for X, but it's already free with your Y plan."

function findHiddenPerks(
  selectedSubscriptions: UserSelection[],
  selectedServices: UserSelection[]
): SavingSuggestion[] {
  const suggestions: SavingSuggestion[] = [];
  const allSelected = [...selectedSubscriptions, ...selectedServices];

  const selectedMap = new Map<string, UserSelection>();
  for (const sel of allSelected) {
    selectedMap.set(sel.itemId, sel);
  }

  for (const perk of perks) {
    const sourceSel = selectedMap.get(perk.sourceId);
    if (!sourceSel) continue;
    if (!perk.planIds.includes(sourceSel.planId)) continue;

    const subSel = selectedMap.get(perk.includesSubscription);
    if (!subSel) continue;

    if (perk.sourceId === perk.includesSubscription) continue;

    const sourceItem = findItem(perk.sourceId);
    const subItem = findItem(perk.includesSubscription);
    if (!sourceItem || !subItem) continue;

    const includedPlan = subItem.plans.find((p) => p.id === perk.includedPlanId);
    const userPlan = subItem.plans.find((p) => p.id === subSel.planId);

    const coveredValue = includedPlan?.monthlyPrice ?? 0;
    const isSamePlanOrCheaper =
      userPlan && includedPlan && userPlan.monthlyPrice <= includedPlan.monthlyPrice;

    const savings = isSamePlanOrCheaper ? subSel.monthlyPrice : coveredValue;

    if (savings <= 0) continue;

    suggestions.push({
      type: "hidden_perk",
      currentItemId: subSel.itemId,
      currentItemName: subItem.name,
      currentPrice: subSel.monthlyPrice,
      suggestedItemId: perk.sourceId,
      suggestedItemName: sourceItem.name,
      suggestedPrice: 0,
      savingsPerMonth: savings,
      reason: isSamePlanOrCheaper
        ? `Already included free with your ${sourceItem.name} plan`
        : `${includedPlan?.name ?? "Base"} plan included free with ${sourceItem.name}`,
      perkNote: perk.note,
    });
  }

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const key = `${s.currentItemId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Layer 2: Benchmark Comparison ────────────────────────
// "You're paying ₹X for streaming — avg Indian household pays ₹Y."
// Generates per-plan suggestions: downgrade to popular plan as anchor.

function findBenchmarkSuggestions(
  selections: UserSelection[],
  itemType: "subscription" | "service"
): SavingSuggestion[] {
  const catalog = itemType === "subscription" ? subscriptions : services;
  const suggestions: SavingSuggestion[] = [];

  for (const sel of selections) {
    const currentItem = catalog.find((c) => c.id === sel.itemId);
    if (!currentItem) continue;

    const popularPlan = currentItem.plans.find((p) => p.isPopular);
    if (!popularPlan || popularPlan.id === sel.planId) continue;

    if (sel.monthlyPrice <= popularPlan.monthlyPrice) continue;

    const saving = sel.monthlyPrice - popularPlan.monthlyPrice;
    if (saving < 10) continue;

    const currentPlan = currentItem.plans.find((p) => p.id === sel.planId);

    suggestions.push({
      type: "benchmark",
      currentItemId: sel.itemId,
      currentItemName: `${currentItem.name} (${currentPlan?.name ?? sel.planId})`,
      currentPrice: sel.monthlyPrice,
      suggestedItemId: sel.itemId,
      suggestedItemName: `${currentItem.name} (${popularPlan.name})`,
      suggestedPrice: popularPlan.monthlyPrice,
      savingsPerMonth: +saving.toFixed(2),
      reason: `Most popular plan is ${popularPlan.name} — save ₹${Math.round(saving)}/mo by switching`,
    });
  }

  return suggestions;
}

// ─── Layer 3: Category Overspend ──────────────────────────
// "You spend ₹1200/mo on streaming — avg is ₹500."

function findCategoryOverspend(
  selectedSubscriptions: UserSelection[],
  selectedServices: UserSelection[]
): CategoryInsight[] {
  const allSelections = [...selectedSubscriptions, ...selectedServices];
  const categorySpend = new Map<string, { total: number; count: number }>();

  for (const sel of allSelections) {
    const item = findItem(sel.itemId);
    if (!item) continue;
    const cat = item.category;
    const existing = categorySpend.get(cat) ?? { total: 0, count: 0 };
    existing.total += sel.monthlyPrice;
    existing.count += 1;
    categorySpend.set(cat, existing);
  }

  const insights: CategoryInsight[] = [];

  for (const [cat, spend] of categorySpend.entries()) {
    const benchmark = getBenchmark(cat);
    if (!benchmark) continue;

    const overSpend = spend.total - benchmark.avgMonthlySpend;
    const label = CATEGORY_LABELS[cat] ?? cat;

    let recommendation = "";
    if (overSpend > 0) {
      const pct = Math.round((overSpend / benchmark.avgMonthlySpend) * 100);
      recommendation = `You're spending ${pct}% more than average on ${label.toLowerCase()}. Consider reviewing your plans.`;
    } else if (overSpend < -100) {
      recommendation = `Great — you're spending less than average on ${label.toLowerCase()}.`;
    } else {
      recommendation = `Your ${label.toLowerCase()} spend is close to average.`;
    }

    insights.push({
      category: cat,
      categoryLabel: label,
      totalSpend: +spend.total.toFixed(2),
      benchmarkSpend: benchmark.avgMonthlySpend,
      itemCount: spend.count,
      benchmarkCount: benchmark.avgItemCount,
      overSpend: +overSpend.toFixed(2),
      recommendation,
    });
  }

  insights.sort((a, b) => b.overSpend - a.overSpend);
  return insights;
}

// ─── Layer 4: Category-specific Cheaper Alternatives ──────
// "Switch from Netflix Premium to Netflix Standard — save ₹150/mo."

function findCheaperAlternatives(
  selections: UserSelection[],
  itemType: "subscription" | "service"
): SavingSuggestion[] {
  const catalog = itemType === "subscription" ? subscriptions : services;
  const suggestions: SavingSuggestion[] = [];

  for (const sel of selections) {
    const currentItem = catalog.find((c) => c.id === sel.itemId);
    if (!currentItem) continue;

    const currentPlan = currentItem.plans.find((p) => p.id === sel.planId);
    const cheaperSameBrand = currentItem.plans.filter(
      (p) => p.monthlyPrice < sel.monthlyPrice && p.id !== sel.planId && p.monthlyPrice > 0
    );

    for (const plan of cheaperSameBrand) {
      const saving = sel.monthlyPrice - plan.monthlyPrice;
      if (saving < 10) continue;

      suggestions.push({
        type: "cheaper",
        currentItemId: sel.itemId,
        currentItemName: `${currentItem.name} (${currentPlan?.name ?? sel.planId})`,
        currentPrice: sel.monthlyPrice,
        suggestedItemId: sel.itemId,
        suggestedItemName: `${currentItem.name} (${plan.name})`,
        suggestedPrice: plan.monthlyPrice,
        savingsPerMonth: +saving.toFixed(2),
        reason: `Downgrade to a cheaper plan — save ₹${Math.round(saving)}/mo`,
      });
    }

    const sameCategory = catalog.filter(
      (c) => c.category === currentItem.category && c.id !== currentItem.id
    );

    for (const alt of sameCategory) {
      const cheaperPlan = alt.plans
        .filter((p) => p.monthlyPrice < sel.monthlyPrice && p.monthlyPrice > 0)
        .sort((a, b) => b.monthlyPrice - a.monthlyPrice)[0];

      if (cheaperPlan) {
        const saving = sel.monthlyPrice - cheaperPlan.monthlyPrice;
        if (saving < 20) continue;

        suggestions.push({
          type: "cheaper",
          currentItemId: sel.itemId,
          currentItemName: currentItem.name,
          currentPrice: sel.monthlyPrice,
          suggestedItemId: alt.id,
          suggestedItemName: `${alt.name} (${cheaperPlan.name})`,
          suggestedPrice: cheaperPlan.monthlyPrice,
          savingsPerMonth: +saving.toFixed(2),
          reason: `Switch to ${alt.name} — similar service, ${Math.round((saving / sel.monthlyPrice) * 100)}% cheaper`,
        });
      }
    }
  }

  suggestions.sort((a, b) => b.savingsPerMonth - a.savingsPerMonth);

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const key = `${s.currentItemId}-${s.suggestedItemId}-${s.suggestedItemName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Main Calculator ──────────────────────────────────────

export function calculateSavings(
  selectedSubscriptions: UserSelection[],
  selectedServices: UserSelection[]
): SavingsResult {
  const allSelections = [...selectedSubscriptions, ...selectedServices];
  const currentTotal = allSelections.reduce((sum, s) => sum + s.monthlyPrice, 0);

  // Layer 1: Hidden perks (biggest aha)
  const perkSuggestions = findHiddenPerks(selectedSubscriptions, selectedServices);

  // Layer 2: Benchmark anchors (popular plan comparison)
  const benchmarkSubs = findBenchmarkSuggestions(selectedSubscriptions, "subscription");
  const benchmarkSvcs = findBenchmarkSuggestions(selectedServices, "service");

  // Layer 3: Category overspend
  const categoryInsights = findCategoryOverspend(selectedSubscriptions, selectedServices);

  // Layer 4: Cheaper alternatives
  const cheaperSubs = findCheaperAlternatives(selectedSubscriptions, "subscription");
  const cheaperSvcs = findCheaperAlternatives(selectedServices, "service");

  const allSuggestions = [
    ...perkSuggestions,
    ...benchmarkSubs,
    ...benchmarkSvcs,
    ...cheaperSubs,
    ...cheaperSvcs,
  ];

  // Deduplicate: if a perk already covers an item, skip cheaper/benchmark for same item
  const perkItemIds = new Set(perkSuggestions.map((s) => s.currentItemId));
  const dedupedSuggestions = allSuggestions.filter((s) => {
    if (s.type !== "hidden_perk" && perkItemIds.has(s.currentItemId)) return false;
    return true;
  });

  // Calculate max savings per item (pick best suggestion for each)
  const maxSavingsPerItem = new Map<string, number>();
  for (const s of dedupedSuggestions) {
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
    suggestions: dedupedSuggestions,
    categoryInsights,
  };
}
