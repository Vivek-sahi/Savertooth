"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SocialProof from "@/components/landing/SocialProof";

const researchStats = [
  {
    value: "₹15,000/yr",
    label: "Average Indian household OTT & subscription spend, often on services barely used",
    source: "OTT Industry Analysis 2025",
    color: "var(--crayon-orange)",
    bg: "#fff0eb",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "23%",
    label: "Indians paying for 2+ subscriptions they haven\u2019t used in 6 months",
    source: "YouGov Global Survey 2024",
    color: "var(--crayon-teal)",
    bg: "#e6f9f6",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "2.8 → 2.5",
    label: "Average OTT subs per Indian user dropped as subscription fatigue rises",
    source: "Ormax Media 2024",
    color: "var(--crayon-purple)",
    bg: "#f0ecfe",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    value: "₹10,000+",
    label: "Potential yearly savings with smart subscription rotation & bundling",
    source: "OTT Industry Analysis 2025",
    color: "var(--crayon-pink)",
    bg: "#ffe6ef",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function ResearchStrip() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
            Indians are overpaying for subscriptions
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Research shows most households pay for services they barely use.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {researchStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)] leading-snug">
                {stat.label}
              </div>
              <div className="mt-2 text-[10px] font-semibold text-[var(--text-muted)]">
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function PreFooterCTA() {
  return (
    <section className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl rounded-[2rem] border-2 border-[var(--border-soft)] bg-white p-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-16"
      >
        <h2 className="mb-5 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          See what Savertooth can do for you
        </h2>
        <p className="mb-10 text-base text-[var(--text-secondary)]">
          Two minutes to analyze. Real money saved every month.
          No credit card required.
        </p>
        <Link
          href="/analyze"
          className="inline-flex h-14 items-center gap-2 rounded-2xl bg-[var(--text-primary)] px-10 text-lg font-semibold text-white transition-all hover:bg-[#3d3d4a] active:scale-[0.98]"
        >
          Save my money
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-[var(--border-soft)] bg-white px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <p
            className="text-lg tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
          >
            savertooth
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Stop overpaying for subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            How it works
          </Link>
          <Link href="/knowledge" className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            Learn more
          </Link>
          <Link href="/analyze" className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            Try it out
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-5xl text-center text-xs text-[var(--text-muted)]">
        &copy; {new Date().getFullYear()} Savertooth
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ResearchStrip />
      <HowItWorks />
      <SocialProof />
      <PreFooterCTA />
      <Footer />
    </main>
  );
}
