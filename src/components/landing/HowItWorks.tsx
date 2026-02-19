"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Pick your subscriptions",
    desc: "Select the services you pay for — streaming, music, phone, internet, and more.",
    color: "var(--crayon-orange)",
    bg: "#fff0eb",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "We compare your plans",
    desc: "Your stack is compared against thousands of plans to spot where you're overpaying.",
    color: "var(--crayon-teal)",
    bg: "#e6f9f6",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "See your savings",
    desc: "Get a clear breakdown with better-value alternatives and potential savings.",
    color: "var(--crayon-purple)",
    bg: "#f0ecfe",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Switch and save",
    desc: "Use the insights to switch plans, drop unused services, and keep more money.",
    color: "var(--crayon-pink)",
    bg: "#ffe6ef",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        className="mx-auto max-w-xl"
      >
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
            How Savertooth works
          </h2>
          <p className="mx-auto max-w-md text-base text-[var(--text-secondary)]">
            Four steps. Two minutes. Real savings.
          </p>
        </div>

        <div className="relative">
          {/* Rope/ladder — dashed center line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 border-l-[3px] border-dashed border-[var(--border-soft)]" />

          <div className="space-y-10">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.num} className="relative flex items-start gap-5">
                  {/* Node on the rope */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Outer ring */}
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] shadow-sm"
                      style={{
                        borderColor: step.color,
                        backgroundColor: step.bg,
                      }}
                    >
                      <div style={{ color: step.color }}>{step.icon}</div>
                    </div>
                    {/* Knot — small circle on the rope */}
                    {i < steps.length - 1 && (
                      <div
                        className="mt-4 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: steps[i + 1].color }}
                      />
                    )}
                  </div>

                  {/* Content — alternates subtle bg */}
                  <div
                    className={`flex-1 rounded-2xl px-5 py-4 ${
                      isEven ? "bg-[var(--bg-warm)]" : ""
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: step.color }}
                      >
                        Step {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
