const domainMap: Record<string, string> = {
  // Streaming
  netflix: "netflix.com",
  hotstar: "hotstar.com",
  "prime-video": "primevideo.com",
  jiocinema: "jiohotstar.com",
  sonyliv: "sonyliv.com",
  zee5: "zee5.com",
  "youtube-premium": "youtube.com",
  "apple-tv": "tv.apple.com",
  mubi: "mubi.com",
  lionsgate: "lionsgateplay.com",

  // Music
  spotify: "spotify.com",
  "apple-music": "music.apple.com",
  jiosaavn: "jiosaavn.com",
  gaana: "gaana.com",
  "youtube-music": "music.youtube.com",
  audible: "audible.in",

  // Gaming
  "xbox-gamepass": "xbox.com",
  "ps-plus": "playstation.com",

  // Productivity
  notion: "notion.so",
  "chatgpt-plus": "openai.com",
  "microsoft-365": "microsoft.com",
  "canva-pro": "canva.com",
  grammarly: "grammarly.com",
  "linkedin-premium": "linkedin.com",

  // Cloud
  icloud: "icloud.com",
  "google-one": "one.google.com",
  dropbox: "dropbox.com",

  // News
  "et-prime": "economictimes.com",
  "the-hindu": "thehindu.com",
  "moneycontrol-pro": "moneycontrol.com",
  "the-ken": "the-ken.com",
  "mint-premium": "livemint.com",

  // Fitness
  cultfit: "cult.fit",
  headspace: "headspace.com",

  // Food & Delivery
  "swiggy-one": "swiggy.com",
  "zomato-gold": "zomato.com",
  blinkit: "blinkit.com",

  // Lifestyle
  "kindle-unlimited": "amazon.in",
  "x-premium": "x.com",

  // Internet
  "jio-fiber": "jio.com",
  "airtel-xstream": "airtel.in",
  "act-fibernet": "actcorp.in",
  "bsnl-fiber": "bsnl.in",
  excitel: "excitel.com",

  // Mobile Prepaid
  "jio-mobile": "jio.com",
  "airtel-mobile": "airtel.in",
  "vi-mobile": "myvi.in",
  "bsnl-mobile": "bsnl.in",

  // Mobile Postpaid
  "jio-postpaid": "jio.com",
  "airtel-postpaid": "airtel.in",
  "vi-postpaid": "myvi.in",

  // DTH
  "tata-play": "tataplay.com",
  "airtel-dth": "airtel.in",

  // Electricity
  bescom: "bescom.org",
  "tata-power": "tatapower.com",

  // Credit Cards
  "hdfc-cc": "hdfcbank.com",
  "icici-cc": "icicibank.com",
  "sbi-cc": "sbicard.com",
  "axis-cc": "axisbank.com",
  "amex-india": "americanexpress.com",

  // Insurance
  "star-health": "starhealth.in",
  "hdfc-ergo": "hdfcergo.com",
  "digit-insurance": "godigit.com",

  // Gym
  "cultfit-gym": "cult.fit",
  "golds-gym": "goldsgym.com",
};

export function getLogoUrl(id: string): string {
  const domain = domainMap[id];
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}
