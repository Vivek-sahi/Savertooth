"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "I was paying \u20B98,500/month on subscriptions I barely used. Savertooth cut it to \u20B95,800.",
    name: "Ananya K.",
    role: "Product Designer, Bengaluru",
    savings: "\u20B92,700/mo",
    color: "var(--crayon-orange)",
    bgColor: "#fff0eb",
  },
  {
    quote:
      "Switched from Airtel to Jio based on the suggestion. Same speed, \u20B9300 less every month.",
    name: "Rahul T.",
    role: "Software Engineer, Bengaluru",
    savings: "\u20B9300/mo",
    color: "var(--crayon-teal)",
    bgColor: "#e6f9f6",
  },
  {
    quote:
      "I thought I was already optimized. Turns out I was overpaying on 4 different services.",
    name: "Priya R.",
    role: "Marketing Manager, Mumbai",
    savings: "\u20B91,400/mo",
    color: "var(--crayon-purple)",
    bgColor: "#f0ecfe",
  },
];

export default function SocialProof() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
            What our users say about us
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Join thousands who&apos;ve already optimized their recurring spend.
          </p>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-8 text-center shadow-[0_6px_30px_rgba(0,0,0,0.06)] sm:p-12"
            >
              <div
                className="mx-auto mb-6 inline-flex rounded-2xl px-4 py-2 text-sm font-bold"
                style={{
                  backgroundColor: testimonials[active].bgColor,
                  color: testimonials[active].color,
                }}
              >
                Saved {testimonials[active].savings}
              </div>
              <p className="mb-8 text-xl font-semibold leading-relaxed text-[var(--text-primary)] sm:text-2xl">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="mb-1 text-sm font-bold text-[var(--text-primary)]">
                {testimonials[active].name}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {testimonials[active].role}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-3 rounded-full transition-all"
                style={{
                  width: i === active ? 32 : 12,
                  backgroundColor: i === active ? t.color : "var(--border-soft)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
