"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Pick your subscriptions",
    desc: "Select the services you pay for — streaming, music, phone, internet, and more.",
    icon: "🎯",
  },
  {
    num: "02",
    title: "We analyze your spend",
    desc: "Our engine compares your stack against 47,000+ plans to find where you're overpaying.",
    icon: "🔍",
  },
  {
    num: "03",
    title: "See your savings",
    desc: "Get a personalized report with cheaper alternatives, better-value options, and curated packs.",
    icon: "💰",
  },
  {
    num: "04",
    title: "Get the deals",
    desc: "One-tap access to Savertooth suggestions — switch, save, and track your savings over time.",
    icon: "⚡",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            How Savertooth works
          </h2>
          <p className="text-lg text-slate-500">
            Four steps. Two minutes. Real savings.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{step.icon}</div>
              <div className="mb-2 text-xs font-bold text-amber-500">
                STEP {step.num}
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-800">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
