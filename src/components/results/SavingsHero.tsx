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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {hasSavings ? (
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-8 text-white shadow-2xl shadow-amber-500/20 sm:p-10">
          <p className="mb-2 text-sm font-medium text-white/80">
            We found savings for you
          </p>
          <div className="mb-6 flex items-end gap-3">
            <span className="text-5xl font-bold sm:text-6xl">
              <AnimatedNumber value={monthlySavings} formatter={format} />
            </span>
            <span className="mb-2 text-xl text-white/80">/month</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
              <p className="text-xs text-white/60">Current spend</p>
              <p className="text-lg font-bold">{format(currentTotal)}/mo</p>
            </div>
            <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
              <p className="text-xs text-white/60">Optimized</p>
              <p className="text-lg font-bold">{format(optimizedTotal)}/mo</p>
            </div>
            <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
              <p className="text-xs text-white/60">Annual savings</p>
              <p className="text-lg font-bold">{format(annualSavings)}</p>
            </div>
            <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
              <p className="text-xs text-white/60">Savings</p>
              <p className="text-lg font-bold">{savingsPercent}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-2xl sm:p-10">
          <div className="mb-4 text-5xl">🏆</div>
          <h2 className="mb-2 text-3xl font-bold">You&apos;re a smart spender!</h2>
          <p className="mb-6 text-lg text-white/80">
            Your optimization score is {score}/100. You&apos;re more optimized than
            85% of users.
          </p>
          <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
            <p className="text-sm text-white/60">Monthly spend</p>
            <p className="text-2xl font-bold">{format(currentTotal)}/mo</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
