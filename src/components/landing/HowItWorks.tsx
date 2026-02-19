"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Pick your subscriptions",
    desc: "Select the services you pay for — streaming, music, phone, internet, and more.",
    color: "var(--crayon-orange)",
    bgColor: "#fff0eb",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We analyze your spend",
    desc: "Our engine compares your stack against 47,000+ plans to find where you're overpaying.",
    color: "var(--crayon-teal)",
    bgColor: "#e6f9f6",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "See your savings",
    desc: "Get a personalized report with cheaper alternatives, better-value options, and curated packs.",
    color: "var(--crayon-purple)",
    bgColor: "#f0ecfe",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Switch and save",
    desc: "One-tap access to Savertooth suggestions — switch, save, and track your savings over time.",
    color: "var(--crayon-pink)",
    bgColor: "#ffe6ef",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
            How Savertooth works
          </h2>
          <p className="mx-auto max-w-md text-base text-[var(--text-secondary)]">
            Four steps. Two minutes. Real savings.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-3xl border-2 border-[var(--border-soft)] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: step.bgColor, color: step.color }}
              >
                {step.icon}
              </div>
              <div
                className="mb-2 text-xs font-bold uppercase tracking-wider"
                style={{ color: step.color }}
              >
                Step {step.num}
              </div>
              <h3 className="mb-2 text-base font-bold text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
