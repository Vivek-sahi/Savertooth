import { CategoryBenchmark } from "./types";

/**
 * Per-category benchmarks: what an average Indian household spends.
 * Used to anchor user's spend (over/under benchmark).
 *
 * Methodology: weighted average of popular plans marked isPopular.
 * Source: internal analysis of plan pricing, 2025.
 */
export const benchmarks: CategoryBenchmark[] = [
  // Subscriptions
  { category: "streaming", avgMonthlySpend: 500, avgItemCount: 2, source: "Avg: Netflix Standard + 1 regional OTT" },
  { category: "music", avgMonthlySpend: 119, avgItemCount: 1, source: "Avg: 1 music service (Spotify/Apple Music)" },
  { category: "gaming", avgMonthlySpend: 499, avgItemCount: 1, source: "Avg: 1 console pass" },
  { category: "productivity", avgMonthlySpend: 650, avgItemCount: 1, source: "Avg: 1 productivity tool" },
  { category: "news", avgMonthlySpend: 300, avgItemCount: 1, source: "Avg: 1 news subscription" },
  { category: "fitness", avgMonthlySpend: 800, avgItemCount: 1, source: "Avg: 1 fitness app" },
  { category: "cloud", avgMonthlySpend: 200, avgItemCount: 1, source: "Avg: 1 cloud storage plan" },
  { category: "food", avgMonthlySpend: 150, avgItemCount: 1, source: "Avg: 1 food delivery membership" },
  { category: "lifestyle", avgMonthlySpend: 200, avgItemCount: 1, source: "Avg: 1 lifestyle subscription" },
  { category: "vpn", avgMonthlySpend: 300, avgItemCount: 1, source: "Avg: 1 VPN service" },

  // Services
  { category: "internet", avgMonthlySpend: 900, avgItemCount: 1, source: "Avg: 1 broadband connection ~150 Mbps" },
  { category: "mobile", avgMonthlySpend: 250, avgItemCount: 1, source: "Avg: 1 prepaid plan" },
  { category: "mobile_postpaid", avgMonthlySpend: 599, avgItemCount: 1, source: "Avg: 1 postpaid plan" },
  { category: "dth", avgMonthlySpend: 350, avgItemCount: 1, source: "Avg: 1 HD DTH pack" },
  { category: "electricity", avgMonthlySpend: 1500, avgItemCount: 1, source: "Avg: typical 2BHK monthly bill" },
  { category: "credit_card", avgMonthlySpend: 200, avgItemCount: 1, source: "Avg: 1 card annual fee / 12" },
  { category: "insurance", avgMonthlySpend: 800, avgItemCount: 1, source: "Avg: 1 health insurance (₹5L cover)" },
  { category: "gym", avgMonthlySpend: 1500, avgItemCount: 1, source: "Avg: 1 gym membership" },
];

export function getBenchmark(category: string): CategoryBenchmark | undefined {
  return benchmarks.find((b) => b.category === category);
}
