export function generateShareText(monthlySavings: number, score: number): string {
  if (monthlySavings > 0) {
    return `I just found out I can save $${monthlySavings.toFixed(0)}/month on my subscriptions with Savertooth! My optimization score: ${score}/100. Check yours:`;
  }
  return `My subscription optimization score is ${score}/100 — I'm already a smart spender! Check yours with Savertooth:`;
}

export function getShareUrl(): string {
  return "https://savertooth.app";
}

export function shareToTwitter(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`;
}

export function shareToLinkedIn(text: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
}

export function copyShareLink(text: string): Promise<void> {
  return navigator.clipboard.writeText(`${text} ${getShareUrl()}`);
}
