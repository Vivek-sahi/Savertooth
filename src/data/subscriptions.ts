import { Subscription } from "./types";

export const subscriptions: Subscription[] = [
  // ── Streaming ──────────────────────────────────────────
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    image: "",
    color: "#E50914",
    category: "streaming",
    popular: true,
    plans: [
      { id: "netflix-mobile", name: "Mobile", monthlyPrice: 149 },
      { id: "netflix-basic", name: "Basic", monthlyPrice: 199 },
      { id: "netflix-standard", name: "Standard", monthlyPrice: 499, isPopular: true },
      { id: "netflix-premium", name: "Premium", monthlyPrice: 649 },
    ],
  },
  {
    id: "hotstar",
    name: "Disney+ Hotstar",
    logo: "H",
    image: "",
    color: "#1F2A63",
    category: "streaming",
    popular: true,
    plans: [
      { id: "hotstar-mobile", name: "Mobile", monthlyPrice: 149 },
      { id: "hotstar-super", name: "Super", monthlyPrice: 299, isPopular: true },
      { id: "hotstar-premium", name: "Premium", monthlyPrice: 499 },
    ],
  },
  {
    id: "prime-video",
    name: "Amazon Prime",
    logo: "P",
    image: "",
    color: "#00A8E1",
    category: "streaming",
    popular: true,
    plans: [
      { id: "prime-monthly", name: "Monthly", monthlyPrice: 299 },
      { id: "prime-quarterly", name: "Quarterly (monthly equiv.)", monthlyPrice: 166 },
      { id: "prime-annual", name: "Annual (monthly equiv.)", monthlyPrice: 125, isPopular: true },
    ],
  },
  {
    id: "jiocinema",
    name: "JioCinema",
    logo: "J",
    image: "",
    color: "#E72079",
    category: "streaming",
    plans: [
      { id: "jio-premium", name: "Premium", monthlyPrice: 29, isPopular: true },
      { id: "jio-family", name: "Family", monthlyPrice: 89 },
    ],
  },
  {
    id: "sonyliv",
    name: "SonyLIV",
    logo: "S",
    image: "",
    color: "#000000",
    category: "streaming",
    plans: [
      { id: "sony-mobile", name: "Mobile Only", monthlyPrice: 99 },
      { id: "sony-premium", name: "Premium", monthlyPrice: 299, isPopular: true },
    ],
  },
  {
    id: "zee5",
    name: "ZEE5",
    logo: "Z",
    image: "",
    color: "#8230C6",
    category: "streaming",
    plans: [
      { id: "zee5-all", name: "All Access", monthlyPrice: 149, isPopular: true },
    ],
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    logo: "Y",
    image: "",
    color: "#FF0000",
    category: "streaming",
    popular: true,
    plans: [
      { id: "yt-individual", name: "Individual", monthlyPrice: 149, isPopular: true },
      { id: "yt-family", name: "Family", monthlyPrice: 189 },
    ],
  },
  {
    id: "apple-tv",
    name: "Apple TV+",
    logo: "A",
    image: "",
    color: "#000000",
    category: "streaming",
    plans: [
      { id: "atv-monthly", name: "Monthly", monthlyPrice: 99, isPopular: true },
    ],
  },
  {
    id: "mubi",
    name: "MUBI",
    logo: "M",
    image: "",
    color: "#001489",
    category: "streaming",
    plans: [
      { id: "mubi-monthly", name: "Monthly", monthlyPrice: 499 },
      { id: "mubi-annual", name: "Annual (monthly equiv.)", monthlyPrice: 199, isPopular: true },
    ],
  },
  {
    id: "lionsgate",
    name: "Lionsgate Play",
    logo: "L",
    image: "",
    color: "#E4A40C",
    category: "streaming",
    plans: [
      { id: "lg-monthly", name: "Monthly", monthlyPrice: 99, isPopular: true },
      { id: "lg-annual", name: "Annual (monthly equiv.)", monthlyPrice: 66 },
    ],
  },

  // ── Music ──────────────────────────────────────────────
  {
    id: "spotify",
    name: "Spotify",
    logo: "S",
    image: "",
    color: "#1DB954",
    category: "music",
    popular: true,
    plans: [
      { id: "spotify-individual", name: "Individual", monthlyPrice: 119, isPopular: true },
      { id: "spotify-duo", name: "Duo", monthlyPrice: 149 },
      { id: "spotify-family", name: "Family", monthlyPrice: 179 },
    ],
  },
  {
    id: "apple-music",
    name: "Apple Music",
    logo: "♫",
    image: "",
    color: "#FC3C44",
    category: "music",
    plans: [
      { id: "am-individual", name: "Individual", monthlyPrice: 99, isPopular: true },
      { id: "am-family", name: "Family", monthlyPrice: 149 },
    ],
  },
  {
    id: "jiosaavn",
    name: "JioSaavn",
    logo: "J",
    image: "",
    color: "#2BC5B4",
    category: "music",
    plans: [
      { id: "saavn-pro", name: "Pro", monthlyPrice: 99, isPopular: true },
    ],
  },
  {
    id: "youtube-music",
    name: "YouTube Music",
    logo: "Y",
    image: "",
    color: "#FF0000",
    category: "music",
    plans: [
      { id: "ytm-individual", name: "Individual", monthlyPrice: 109, isPopular: true },
      { id: "ytm-family", name: "Family", monthlyPrice: 169 },
    ],
  },
  {
    id: "gaana",
    name: "Gaana",
    logo: "G",
    image: "",
    color: "#E72C30",
    category: "music",
    plans: [
      { id: "gaana-plus", name: "Plus", monthlyPrice: 99, isPopular: true },
    ],
  },
  {
    id: "audible",
    name: "Audible",
    logo: "A",
    image: "",
    color: "#F8991C",
    category: "music",
    plans: [
      { id: "audible-monthly", name: "Monthly", monthlyPrice: 199, isPopular: true },
    ],
  },

  // ── Gaming ─────────────────────────────────────────────
  {
    id: "xbox-gamepass",
    name: "Xbox Game Pass",
    logo: "X",
    image: "",
    color: "#107C10",
    category: "gaming",
    plans: [
      { id: "gp-core", name: "Core", monthlyPrice: 499, isPopular: true },
      { id: "gp-ultimate", name: "Ultimate", monthlyPrice: 999 },
    ],
  },
  {
    id: "ps-plus",
    name: "PlayStation Plus",
    logo: "P",
    image: "",
    color: "#003087",
    category: "gaming",
    plans: [
      { id: "ps-essential", name: "Essential", monthlyPrice: 499, isPopular: true },
      { id: "ps-extra", name: "Extra", monthlyPrice: 749 },
      { id: "ps-premium", name: "Premium", monthlyPrice: 849 },
    ],
  },

  // ── Productivity ───────────────────────────────────────
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    logo: "G",
    image: "",
    color: "#10A37F",
    category: "productivity",
    popular: true,
    plans: [
      { id: "chatgpt-plus-plan", name: "Plus", monthlyPrice: 1700, isPopular: true },
      { id: "chatgpt-pro", name: "Pro", monthlyPrice: 16700 },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    logo: "N",
    image: "",
    color: "#000000",
    category: "productivity",
    plans: [
      { id: "notion-plus", name: "Plus", monthlyPrice: 650, isPopular: true },
      { id: "notion-business", name: "Business", monthlyPrice: 1300 },
    ],
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    logo: "M",
    image: "",
    color: "#D83B01",
    category: "productivity",
    plans: [
      { id: "ms365-personal", name: "Personal", monthlyPrice: 489, isPopular: true },
      { id: "ms365-family", name: "Family", monthlyPrice: 649 },
    ],
  },
  {
    id: "canva-pro",
    name: "Canva Pro",
    logo: "C",
    image: "",
    color: "#00C4CC",
    category: "productivity",
    plans: [
      { id: "canva-monthly", name: "Monthly", monthlyPrice: 499 },
      { id: "canva-annual", name: "Annual (monthly equiv.)", monthlyPrice: 275, isPopular: true },
    ],
  },
  {
    id: "grammarly",
    name: "Grammarly",
    logo: "G",
    image: "",
    color: "#15C39A",
    category: "productivity",
    plans: [
      { id: "grammarly-monthly", name: "Premium Monthly", monthlyPrice: 984 },
      { id: "grammarly-annual", name: "Premium Annual (monthly equiv.)", monthlyPrice: 500, isPopular: true },
    ],
  },
  {
    id: "linkedin-premium",
    name: "LinkedIn Premium",
    logo: "L",
    image: "",
    color: "#0A66C2",
    category: "productivity",
    plans: [
      { id: "li-career", name: "Career", monthlyPrice: 1500, isPopular: true },
      { id: "li-business", name: "Business", monthlyPrice: 2200 },
    ],
  },

  // ── Cloud ──────────────────────────────────────────────
  {
    id: "icloud",
    name: "iCloud+",
    logo: "☁",
    image: "",
    color: "#3693F3",
    category: "cloud",
    plans: [
      { id: "icloud-50", name: "50 GB", monthlyPrice: 75 },
      { id: "icloud-200", name: "200 GB", monthlyPrice: 219, isPopular: true },
      { id: "icloud-2tb", name: "2 TB", monthlyPrice: 749 },
    ],
  },
  {
    id: "google-one",
    name: "Google One",
    logo: "G",
    image: "",
    color: "#4285F4",
    category: "cloud",
    popular: true,
    plans: [
      { id: "go-basic", name: "100 GB", monthlyPrice: 130, isPopular: true },
      { id: "go-standard", name: "200 GB", monthlyPrice: 210 },
      { id: "go-premium", name: "2 TB", monthlyPrice: 650 },
    ],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    logo: "D",
    image: "",
    color: "#0061FF",
    category: "cloud",
    plans: [
      { id: "db-plus", name: "Plus (2 TB)", monthlyPrice: 978, isPopular: true },
    ],
  },

  // ── News ───────────────────────────────────────────────
  {
    id: "et-prime",
    name: "ET Prime",
    logo: "E",
    image: "",
    color: "#1A3A6D",
    category: "news",
    plans: [
      { id: "et-monthly", name: "Monthly", monthlyPrice: 399, isPopular: true },
    ],
  },
  {
    id: "the-hindu",
    name: "The Hindu",
    logo: "T",
    image: "",
    color: "#1A1A6C",
    category: "news",
    plans: [
      { id: "hindu-digital", name: "Digital", monthlyPrice: 250, isPopular: true },
    ],
  },
  {
    id: "moneycontrol-pro",
    name: "MoneyControl Pro",
    logo: "M",
    image: "",
    color: "#5B2F8C",
    category: "news",
    plans: [
      { id: "mc-monthly", name: "Monthly", monthlyPrice: 299 },
      { id: "mc-annual", name: "Annual (monthly equiv.)", monthlyPrice: 99, isPopular: true },
    ],
  },
  {
    id: "the-ken",
    name: "The Ken",
    logo: "K",
    image: "",
    color: "#FF6B35",
    category: "news",
    plans: [
      { id: "ken-monthly", name: "Monthly", monthlyPrice: 650 },
      { id: "ken-annual", name: "Annual (monthly equiv.)", monthlyPrice: 325, isPopular: true },
    ],
  },
  {
    id: "mint-premium",
    name: "Mint Premium",
    logo: "M",
    image: "",
    color: "#EC6608",
    category: "news",
    plans: [
      { id: "mint-monthly", name: "Monthly", monthlyPrice: 250 },
      { id: "mint-annual", name: "Annual (monthly equiv.)", monthlyPrice: 125, isPopular: true },
    ],
  },

  // ── Fitness ────────────────────────────────────────────
  {
    id: "cultfit",
    name: "cult.fit",
    logo: "C",
    image: "",
    color: "#E83E34",
    category: "fitness",
    plans: [
      { id: "cult-pro", name: "Pro", monthlyPrice: 833 },
      { id: "cult-elite", name: "Elite", monthlyPrice: 1167, isPopular: true },
    ],
  },
  {
    id: "headspace",
    name: "Headspace",
    logo: "H",
    image: "",
    color: "#F47D31",
    category: "fitness",
    plans: [
      { id: "headspace-monthly", name: "Monthly", monthlyPrice: 649 },
      { id: "headspace-annual", name: "Annual (monthly equiv.)", monthlyPrice: 380, isPopular: true },
    ],
  },

  // ── Food & Delivery ────────────────────────────────────
  {
    id: "swiggy-one",
    name: "Swiggy One",
    logo: "S",
    image: "",
    color: "#FC8019",
    category: "food",
    popular: true,
    plans: [
      { id: "swiggy-one-monthly", name: "Monthly", monthlyPrice: 149 },
      { id: "swiggy-one-quarterly", name: "3 Months (monthly equiv.)", monthlyPrice: 100, isPopular: true },
    ],
  },
  {
    id: "zomato-gold",
    name: "Zomato Gold",
    logo: "Z",
    image: "",
    color: "#E23744",
    category: "food",
    popular: true,
    plans: [
      { id: "zomato-gold-monthly", name: "Monthly", monthlyPrice: 149 },
      { id: "zomato-gold-annual", name: "Annual (monthly equiv.)", monthlyPrice: 50, isPopular: true },
    ],
  },
  {
    id: "blinkit",
    name: "Blinkit Plus",
    logo: "B",
    image: "",
    color: "#F8CB46",
    category: "food",
    plans: [
      { id: "blinkit-monthly", name: "Monthly", monthlyPrice: 50, isPopular: true },
    ],
  },

  // ── Lifestyle ──────────────────────────────────────────
  {
    id: "kindle-unlimited",
    name: "Kindle Unlimited",
    logo: "K",
    image: "",
    color: "#FF9900",
    category: "lifestyle",
    plans: [
      { id: "kindle-monthly", name: "Monthly", monthlyPrice: 169, isPopular: true },
    ],
  },
  {
    id: "x-premium",
    name: "X Premium",
    logo: "X",
    image: "",
    color: "#000000",
    category: "lifestyle",
    plans: [
      { id: "x-basic", name: "Basic", monthlyPrice: 216 },
      { id: "x-premium-plan", name: "Premium", monthlyPrice: 566, isPopular: true },
      { id: "x-premium-plus", name: "Premium+", monthlyPrice: 1133 },
    ],
  },
];
