"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SavertoothLogoDark } from "@/components/shared/SavertoothLogo";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-amber-600/8 blur-3xl" />
      </div>

      {/* Top bar logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-20"
      >
        <SavertoothLogoDark size={36} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            2,340 people saving this week
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          You&apos;re paying{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            extra
          </span>{" "}
          for your subscriptions.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 sm:text-xl"
        >
          We find cheaper alternatives and curated packs for your subscriptions
          and services. Same quality. Less money. It takes two minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/analyze"
            className="group flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 text-lg font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
          >
            Show Me
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
          <Link
            href="/knowledge"
            className="flex h-14 items-center rounded-full border border-slate-700 px-8 text-lg font-medium text-slate-300 transition-all hover:border-slate-500 hover:text-white"
          >
            Knowledge Base
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-slate-800 pt-10"
        >
          {[
            { value: "₹1.8Cr+", label: "Saved by users" },
            { value: "47K+", label: "Active members" },
            { value: "23%", label: "Average savings" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-amber-400 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
