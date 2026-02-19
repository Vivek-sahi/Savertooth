import { Bundle } from "./types";

const g = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const bundles: Bundle[] = [
  {
    id: "streaming-combo",
    name: "Streaming Combo",
    description:
      "Netflix Standard + Disney+ Hotstar Super + Amazon Prime — one price, all your streaming sorted",
    includedItems: [
      { name: "Netflix", logo: "N", image: g("netflix.com"), color: "#E50914" },
      { name: "Disney+ Hotstar", logo: "H", image: g("hotstar.com"), color: "#1F2A63" },
      { name: "Amazon Prime", logo: "P", image: g("primevideo.com"), color: "#00A8E1" },
    ],
    retailPrice: 923,
    groupPrice: 599,
    savingsPercent: 35,
    highlight: "Most popular",
  },
  {
    id: "music-everywhere",
    name: "Music Everywhere",
    description:
      "Spotify Premium + YouTube Music — ad-free music on every platform",
    includedItems: [
      { name: "Spotify", logo: "S", image: g("spotify.com"), color: "#1DB954" },
      { name: "YouTube Music", logo: "Y", image: g("youtube.com"), color: "#FF0000" },
    ],
    retailPrice: 228,
    groupPrice: 149,
    savingsPercent: 35,
  },
  {
    id: "connected-home",
    name: "Connected Home",
    description:
      "Jio Fiber 150 Mbps + Jio Mobile Unlimited — bundle your connectivity",
    includedItems: [
      { name: "Jio Fiber", logo: "J", image: g("jio.com"), color: "#0A3A7A" },
      { name: "Jio Mobile", logo: "J", image: g("jio.com"), color: "#0A3A7A" },
    ],
    retailPrice: 1332,
    groupPrice: 999,
    savingsPercent: 25,
    highlight: "Best value",
  },
  {
    id: "productivity-pack",
    name: "Productivity Pack",
    description:
      "ChatGPT Plus + Notion Plus + Google One 2TB — tools for builders",
    includedItems: [
      { name: "ChatGPT Plus", logo: "G", image: g("openai.com"), color: "#10A37F" },
      { name: "Notion", logo: "N", image: g("notion.so"), color: "#000000" },
      { name: "Google One", logo: "G", image: g("one.google.com"), color: "#4285F4" },
    ],
    retailPrice: 3000,
    groupPrice: 2199,
    savingsPercent: 27,
  },
  {
    id: "fitness-wellness",
    name: "Fitness & Wellness",
    description:
      "cult.fit Elite + Star Health ₹5L cover — stay fit, stay insured",
    includedItems: [
      { name: "cult.fit", logo: "C", image: g("cult.fit"), color: "#E83E34" },
      { name: "Star Health", logo: "S", image: g("starhealth.in"), color: "#0072BC" },
    ],
    retailPrice: 1917,
    groupPrice: 1499,
    savingsPercent: 22,
  },
];
