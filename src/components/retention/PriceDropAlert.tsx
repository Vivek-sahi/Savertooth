"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PriceDropAlert() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
      >
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#e6f9f6" }}
        >
          <svg className="h-6 w-6" style={{ color: "var(--crayon-teal)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-1 text-base font-extrabold text-[var(--text-primary)]">You&apos;re set!</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          We&apos;ll email you when prices drop on your subscriptions or new
          deals open up.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      <h3 className="mb-2 text-base font-extrabold text-[var(--text-primary)]">
        Get price-drop alerts
      </h3>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        Prices change all the time. We&apos;ll notify you when a cheaper option
        appears for your subscriptions — or when new deals drop.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-[var(--text-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d3d4a]"
        >
          Notify Me
        </button>
      </form>
    </motion.div>
  );
}
