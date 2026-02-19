"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface SavingsHeroProps {
  currentTotal: number;
  optimizedTotal: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercent: number;
  score: number;
}

function AnimatedNumber({ value, formatter }: { value: number; formatter: (v: number) => string }) {
  const [displayed, setDisplayed] = useState(0);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 1.5, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayed(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [value, motionVal, rounded]);

  return <span>{formatter(displayed)}</span>;
}

const statColors = [
  { bg: "#fff0eb", color: "var(--crayon-orange)" },
  { bg: "#e6f9f6", color: "var(--crayon-teal)" },
  { bg: "#f0ecfe", color: "var(--crayon-purple)" },
  { bg: "#ffe6ef", color: "var(--crayon-pink)" },
];

export default function SavingsHero({
  currentTotal,
  optimizedTotal,
  monthlySavings,
  annualSavings,
  savingsPercent,
  score,
}: SavingsHeroProps) {
  const { format } = useCurrency();
  const hasSavings = monthlySavings > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hasSavings ? (
        <div className="rounded-3xl bg-[var(--bg-dark)] p-8 text-white sm:p-10">
          <p className="mb-3 text-sm font-semibold text-white/40">
            We found savings for you
          </p>
          <div className="mb-8 flex items-end gap-3">
            <span className="text-5xl font-extrabold sm:text-6xl">
              <AnimatedNumber value={monthlySavings} formatter={format} />
            </span>
            <span className="mb-2 text-lg text-white/40">/month</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Current spend", value: `${format(currentTotal)}/mo` },
              { label: "Optimized", value: `${format(optimizedTotal)}/mo` },
              { label: "Annual savings", value: format(annualSavings) },
              { label: "Savings", value: `${savingsPercent}%` },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl p-3"
                style={{ backgroundColor: statColors[i].bg + "20" }}
              >
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="mt-1 text-lg font-extrabold" style={{ color: statColors[i].color }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-[var(--bg-dark)] p-8 text-white sm:p-10">
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#e6f9f6" }}
          >
            <svg className="h-6 w-6" style={{ color: "var(--crayon-teal)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-extrabold">You&apos;re a smart spender</h2>
          <p className="mb-6 text-base text-white/50">
            Your optimization score is {score}/100. You&apos;re more optimized than
            85% of users.
          </p>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs text-white/40">Monthly spend</p>
            <p className="mt-1 text-2xl font-extrabold">{format(currentTotal)}/mo</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
