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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
      >
        <div className="mb-2 text-3xl">🔔</div>
        <h3 className="mb-1 text-lg font-bold text-green-800">You&apos;re set!</h3>
        <p className="text-sm text-green-600">
          We&apos;ll email you when prices drop on your subscriptions or new group
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
      className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6"
    >
      <h3 className="mb-2 text-lg font-bold text-slate-800">
        Get price-drop alerts
      </h3>
      <p className="mb-4 text-sm text-slate-500">
        Prices change all the time. We&apos;ll notify you when a cheaper option
        appears for your subscriptions — or when new group deals drop.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
        >
          Notify Me
        </button>
      </form>
    </motion.div>
  );
}
