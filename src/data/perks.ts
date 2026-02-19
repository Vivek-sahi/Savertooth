import { Perk } from "./types";

/**
 * Maps service/subscription plans to their included (free) subscriptions.
 * Each entry says: "If you have [source] on [planIds], you get [subscription] free."
 *
 * Sources: carrier/ISP promo pages, validated as of early 2025.
 * These should be kept updated (planned: Google Sheet sync).
 */
export const perks: Perk[] = [
  // ── Jio Fiber → OTT perks ─────────────────────────────
  {
    sourceId: "jio-fiber",
    sourceType: "service",
    planIds: ["jio-999"],
    includesSubscription: "netflix",
    includedPlanId: "netflix-mobile",
    note: "Netflix Mobile included with Jio Fiber ₹999+ plans",
  },
  {
    sourceId: "jio-fiber",
    sourceType: "service",
    planIds: ["jio-1000", "jio-999"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-mobile",
    note: "Disney+ Hotstar Mobile included with Jio Fiber ₹999+ plans",
  },
  {
    sourceId: "jio-fiber",
    sourceType: "service",
    planIds: ["jio-1000", "jio-999"],
    includesSubscription: "sonyliv",
    includedPlanId: "sony-mobile",
    note: "SonyLIV included with Jio Fiber ₹999+ plans",
  },
  {
    sourceId: "jio-fiber",
    sourceType: "service",
    planIds: ["jio-1000", "jio-999"],
    includesSubscription: "zee5",
    includedPlanId: "zee5-all",
    note: "ZEE5 included with Jio Fiber ₹999+ plans",
  },
  {
    sourceId: "jio-fiber",
    sourceType: "service",
    planIds: ["jio-1000", "jio-999", "jio-300"],
    includesSubscription: "jiocinema",
    includedPlanId: "jio-premium",
    note: "JioCinema Premium included with Jio Fiber ₹999+ plans",
  },

  // ── Airtel Xstream Fiber → OTT perks ──────────────────
  {
    sourceId: "airtel-xstream",
    sourceType: "service",
    planIds: ["airtel-200", "airtel-300", "airtel-1000"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-mobile",
    note: "Disney+ Hotstar included with Airtel Xstream ₹999+ plans",
  },
  {
    sourceId: "airtel-xstream",
    sourceType: "service",
    planIds: ["airtel-200", "airtel-300", "airtel-1000"],
    includesSubscription: "sonyliv",
    includedPlanId: "sony-mobile",
    note: "SonyLIV included with Airtel Xstream ₹999+ plans",
  },
  {
    sourceId: "airtel-xstream",
    sourceType: "service",
    planIds: ["airtel-200", "airtel-300", "airtel-1000"],
    includesSubscription: "zee5",
    includedPlanId: "zee5-all",
    note: "ZEE5 included with Airtel Xstream ₹999+ plans",
  },
  {
    sourceId: "airtel-xstream",
    sourceType: "service",
    planIds: ["airtel-300", "airtel-1000"],
    includesSubscription: "netflix",
    includedPlanId: "netflix-mobile",
    note: "Netflix Mobile included with Airtel Xstream ₹1499+ plans",
  },
  {
    sourceId: "airtel-xstream",
    sourceType: "service",
    planIds: ["airtel-1000"],
    includesSubscription: "prime-video",
    includedPlanId: "prime-annual",
    note: "Amazon Prime included with Airtel Xstream ₹3999 plan",
  },

  // ── Jio Postpaid → OTT perks ──────────────────────────
  {
    sourceId: "jio-postpaid",
    sourceType: "service",
    planIds: ["jio-post-599", "jio-post-799", "jio-post-999", "jio-post-1499"],
    includesSubscription: "netflix",
    includedPlanId: "netflix-mobile",
    note: "Netflix Mobile included with Jio Postpaid ₹599+ plans",
  },
  {
    sourceId: "jio-postpaid",
    sourceType: "service",
    planIds: ["jio-post-399", "jio-post-599", "jio-post-799", "jio-post-999", "jio-post-1499"],
    includesSubscription: "jiocinema",
    includedPlanId: "jio-premium",
    note: "JioCinema Premium included with all Jio Postpaid plans",
  },
  {
    sourceId: "jio-postpaid",
    sourceType: "service",
    planIds: ["jio-post-799", "jio-post-999", "jio-post-1499"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-super",
    note: "Disney+ Hotstar Super included with Jio Postpaid ₹799+ plans",
  },
  {
    sourceId: "jio-postpaid",
    sourceType: "service",
    planIds: ["jio-post-999", "jio-post-1499"],
    includesSubscription: "prime-video",
    includedPlanId: "prime-annual",
    note: "Amazon Prime included with Jio Postpaid ₹999+ plans",
  },

  // ── Airtel Postpaid → OTT perks ───────────────────────
  {
    sourceId: "airtel-postpaid",
    sourceType: "service",
    planIds: ["airtel-post-549", "airtel-post-749", "airtel-post-999", "airtel-post-1599"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-mobile",
    note: "Disney+ Hotstar Mobile included with Airtel Postpaid ₹549+ plans",
  },
  {
    sourceId: "airtel-postpaid",
    sourceType: "service",
    planIds: ["airtel-post-749", "airtel-post-999", "airtel-post-1599"],
    includesSubscription: "prime-video",
    includedPlanId: "prime-annual",
    note: "Amazon Prime included with Airtel Postpaid ₹749+ plans",
  },
  {
    sourceId: "airtel-postpaid",
    sourceType: "service",
    planIds: ["airtel-post-999", "airtel-post-1599"],
    includesSubscription: "netflix",
    includedPlanId: "netflix-mobile",
    note: "Netflix Mobile included with Airtel Postpaid ₹999+ plans",
  },

  // ── Vi Postpaid → OTT perks ───────────────────────────
  {
    sourceId: "vi-postpaid",
    sourceType: "service",
    planIds: ["vi-post-499", "vi-post-699"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-mobile",
    note: "Disney+ Hotstar Mobile included with Vi Postpaid ₹499+ plans",
  },
  {
    sourceId: "vi-postpaid",
    sourceType: "service",
    planIds: ["vi-post-699"],
    includesSubscription: "sonyliv",
    includedPlanId: "sony-mobile",
    note: "SonyLIV included with Vi Postpaid ₹699 plan",
  },

  // ── Tata Play DTH → OTT perks ─────────────────────────
  {
    sourceId: "tata-play",
    sourceType: "service",
    planIds: ["tata-play-binge"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-super",
    note: "Disney+ Hotstar Super included with Tata Play Binge+",
  },
  {
    sourceId: "tata-play",
    sourceType: "service",
    planIds: ["tata-play-binge"],
    includesSubscription: "sonyliv",
    includedPlanId: "sony-premium",
    note: "SonyLIV Premium included with Tata Play Binge+",
  },
  {
    sourceId: "tata-play",
    sourceType: "service",
    planIds: ["tata-play-binge"],
    includesSubscription: "zee5",
    includedPlanId: "zee5-all",
    note: "ZEE5 included with Tata Play Binge+",
  },

  // ── Airtel DTH → OTT perks ────────────────────────────
  {
    sourceId: "airtel-dth",
    sourceType: "service",
    planIds: ["airtel-xstream-box"],
    includesSubscription: "hotstar",
    includedPlanId: "hotstar-mobile",
    note: "Disney+ Hotstar Mobile included with Airtel Xstream Box",
  },
  {
    sourceId: "airtel-dth",
    sourceType: "service",
    planIds: ["airtel-xstream-box"],
    includesSubscription: "zee5",
    includedPlanId: "zee5-all",
    note: "ZEE5 included with Airtel Xstream Box",
  },

  // ── Subscription → Subscription perks ──────────────────
  {
    sourceId: "youtube-premium",
    sourceType: "subscription",
    planIds: ["yt-individual", "yt-family"],
    includesSubscription: "youtube-music",
    includedPlanId: "ytm-individual",
    note: "YouTube Music is included free with YouTube Premium",
  },
  {
    sourceId: "prime-video",
    sourceType: "subscription",
    planIds: ["prime-monthly", "prime-quarterly", "prime-annual"],
    includesSubscription: "prime-video",
    includedPlanId: "prime-annual",
    note: "Amazon Prime includes Prime Video, Prime Music, and free delivery",
  },
];
