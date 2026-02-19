"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function VisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const base = 14 + (new Date().getMinutes() % 11);
    setCount(base);
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(30, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (count === 0) return null;
  return <span>{count}</span>;
}

const trustedLogos = [
  { name: "Netflix", domain: "netflix.com", color: "#E50914" },
  { name: "Spotify", domain: "spotify.com", color: "#1DB954" },
  { name: "Hotstar", domain: "hotstar.com", color: "#1F74EB" },
  { name: "Jio", domain: "jio.com", color: "#0A3D91" },
  { name: "Airtel", domain: "airtel.in", color: "#ED1C24" },
  { name: "YouTube", domain: "youtube.com", color: "#FF0000" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
      {/* Playful background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-[var(--crayon-orange)] opacity-[0.06] blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[var(--crayon-teal)] opacity-[0.06] blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[var(--crayon-purple)] opacity-[0.04] blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--border-soft)] bg-white px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <span className="flex h-2 w-2 rounded-full bg-[var(--crayon-green)] animate-pulse" />
          <span className="text-sm font-semibold text-[var(--text-secondary)]">
            <VisitorCount /> people on this page right now
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
          Stop{" "}
          <span className="relative inline-block">
            <span className="relative z-10">overpaying</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 rounded-sm bg-[var(--crayon-yellow)] opacity-50 sm:h-4" />
          </span>{" "}
          for subscriptions
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
          We analyze your recurring spend, find cheaper alternatives, and
          surface curated packs — so you keep the same services and pay less.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/analyze"
            className="group flex h-14 items-center gap-2 rounded-2xl bg-[var(--text-primary)] px-8 text-lg font-semibold text-white transition-all hover:bg-[#3d3d4a] active:scale-[0.98]"
          >
            Save my money
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
            className="flex h-14 items-center rounded-2xl border-2 border-[var(--border-soft)] bg-white px-8 text-lg font-semibold text-[var(--text-primary)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:border-[var(--border-card)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:scale-[1.02]"
          >
            Learn more
          </Link>
        </div>
      </motion.div>

      {/* Trusted-by logo bar */}
      <div className="relative z-10 mx-auto mt-24 max-w-2xl">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
          Works with services you already use
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {trustedLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-105"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${logo.domain}&sz=64`}
                alt={logo.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
