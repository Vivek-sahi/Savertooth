"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SavertoothLogo from "@/components/shared/SavertoothLogo";

const articles = [
  {
    title: "How group buying saves you money",
    description:
      "When thousands of people buy the same subscription together, providers offer bulk discounts. Here's exactly how it works.",
    tag: "How It Works",
    readTime: "3 min",
  },
  {
    title: "The hidden cost of subscription creep",
    description:
      "The average American spends $273/month on subscriptions — and underestimates their spend by 2.5x. Here's how to audit yourself.",
    tag: "Insights",
    readTime: "5 min",
  },
  {
    title: "When to downgrade vs. switch vs. cancel",
    description:
      "Not every subscription needs to go. A framework for deciding what to keep, what to downgrade, and what to replace.",
    tag: "Guide",
    readTime: "4 min",
  },
  {
    title: "Bundle deals: how to get streaming for 40% less",
    description:
      "Disney, Hulu, and ESPN+ together costs less than two of them separately. Here are all the bundles worth knowing about.",
    tag: "Deals",
    readTime: "3 min",
  },
  {
    title: "Why your phone plan is probably too expensive",
    description:
      "MVNOs like Mint Mobile use the same towers as AT&T and Verizon at half the price. Here's what you need to know.",
    tag: "Guide",
    readTime: "4 min",
  },
  {
    title: "The Savertooth approach: save together",
    description:
      "We're building the Costco for subscriptions. More members = better deals = more savings for everyone.",
    tag: "About",
    readTime: "2 min",
  },
];

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-4">
          <Link href="/">
            <SavertoothLogo size={32} />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-3 text-4xl font-bold text-slate-800">
            Knowledge Base
          </h1>
          <p className="text-lg text-slate-500">
            Learn how to optimize your recurring spend. Guides, insights, and
            deal breakdowns.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-amber-200 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {article.tag}
                </span>
                <span className="text-xs text-slate-400">
                  {article.readTime}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                {article.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/analyze"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:scale-105"
          >
            Analyze My Subscriptions
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
