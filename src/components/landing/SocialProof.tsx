"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    quote: "I was paying ₹8,500/month on subscriptions I barely used. Savertooth cut it to ₹5,800.",
    name: "Ananya K.",
    savings: "₹2,700/mo",
  },
  {
    quote: "Switched from Airtel to Jio based on the suggestion. Same speed, ₹300 less every month.",
    name: "Rahul T.",
    savings: "₹300/mo",
  },
  {
    quote: "I thought I was already optimized. Turns out I was overpaying on 4 different services.",
    name: "Priya R.",
    savings: "₹1,400/mo",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            People are saving real money
          </h2>
          <p className="text-lg text-slate-400">
            Join thousands who&apos;ve already optimized their recurring spend.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 text-2xl font-bold text-amber-400">
                {t.savings}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-medium text-slate-500">— {t.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/analyze"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 text-lg font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:scale-105"
          >
            Find My Savings
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
