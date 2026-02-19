"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generateShareText, shareToTwitter, copyShareLink } from "@/lib/sharing";
import { useCurrency } from "@/context/CurrencyContext";

interface ShareSectionProps {
  monthlySavings: number;
  score: number;
}

export default function ShareSection({ monthlySavings, score }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const { format } = useCurrency();
  const text = generateShareText(monthlySavings > 0 ? format(monthlySavings) : "", score);

  const handleCopy = async () => {
    await copyShareLink(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      <h3 className="mb-2 text-base font-extrabold text-[var(--text-primary)]">
        Share your results
      </h3>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        {monthlySavings > 0
          ? "Help your friends save too — every person who joins makes group deals cheaper."
          : "Challenge your friends to beat your optimization score."}
      </p>

      <div className="mb-4 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-3 text-sm text-[var(--text-secondary)]">
        {text}
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={shareToTwitter(text)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-[var(--bg-dark)] px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-soft)] px-4 py-2.5 text-sm font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-warm)]"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" style={{ color: "var(--crayon-teal)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
