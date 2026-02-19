export type SubscriptionCategory =
  | "streaming"
  | "music"
  | "gaming"
  | "productivity"
  | "news"
  | "fitness"
  | "cloud"
  | "vpn";

export type ServiceCategory =
  | "internet"
  | "mobile"
  | "electricity"
  | "credit_card"
  | "debit_card"
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
}

export interface Subscription {
  id: string;
  name: string;
  logo: string;
  image: string;
  color: string;
  category: SubscriptionCategory;
  plans: Plan[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  logo: string;
  image: string;
  color: string;
  category: ServiceCategory;
  plans: Plan[];
}

export interface UserSelection {
  itemId: string;
  itemType: "subscription" | "service";
  planId: string;
  monthlyPrice: number;
}

export interface SavingSuggestion {
  type: "cheaper" | "more_value" | "bundle";
  currentItemId: string;
  currentItemName: string;
  currentPrice: number;
  suggestedItemId: string;
  suggestedItemName: string;
  suggestedPrice: number;
  savingsPerMonth: number;
  reason: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  includedItems: { name: string; logo: string; image: string; color: string }[];
  retailPrice: number;
  groupPrice: number;
  savingsPercent: number;
  highlight?: string;
}

export interface SavingsResult {
  currentTotal: number;
  optimizedTotal: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercent: number;
  score: number;
  suggestions: SavingSuggestion[];
  bundles: Bundle[];
}

export interface WizardState {
  step: number;
  selectedSubscriptions: UserSelection[];
  selectedServices: UserSelection[];
  results: SavingsResult | null;
}
