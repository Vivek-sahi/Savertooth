export type SubscriptionCategory =
  | "streaming"
  | "music"
  | "gaming"
  | "productivity"
  | "news"
  | "fitness"
  | "cloud"
  | "vpn"
  | "food"
  | "lifestyle";

export type ServiceCategory =
  | "internet"
  | "mobile"
  | "mobile_postpaid"
  | "dth"
  | "electricity"
  | "credit_card"
  | "insurance"
  | "gym";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateFromINR: number;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  features?: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  logo: string;
  image: string;
  color: string;
  category: SubscriptionCategory;
  plans: Plan[];
  popular?: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  logo: string;
  image: string;
  color: string;
  category: ServiceCategory;
  plans: Plan[];
  popular?: boolean;
}

export interface Perk {
  sourceId: string;
  sourceType: "service" | "subscription";
  planIds: string[];
  includesSubscription: string;
  includedPlanId: string;
  note: string;
}

export interface CategoryBenchmark {
  category: SubscriptionCategory | ServiceCategory;
  avgMonthlySpend: number;
  avgItemCount: number;
  source: string;
}

export interface UserSelection {
  itemId: string;
  itemType: "subscription" | "service";
  planId: string;
  monthlyPrice: number;
}

export interface SavingSuggestion {
  type: "hidden_perk" | "benchmark" | "cheaper" | "category_overspend";
  currentItemId: string;
  currentItemName: string;
  currentPrice: number;
  suggestedItemId: string;
  suggestedItemName: string;
  suggestedPrice: number;
  savingsPerMonth: number;
  reason: string;
  perkNote?: string;
}

export interface CategoryInsight {
  category: string;
  categoryLabel: string;
  totalSpend: number;
  benchmarkSpend: number;
  itemCount: number;
  benchmarkCount: number;
  overSpend: number;
  recommendation: string;
}

export interface SavingsResult {
  currentTotal: number;
  optimizedTotal: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercent: number;
  score: number;
  suggestions: SavingSuggestion[];
  categoryInsights: CategoryInsight[];
}

export interface WizardState {
  step: number;
  selectedSubscriptions: UserSelection[];
  selectedServices: UserSelection[];
  results: SavingsResult | null;
}
