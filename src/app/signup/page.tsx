"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function SignupPage() {
  const { state } = useWizard();
  const { format } = useCurrency();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", phone: "", name: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="mb-6 text-6xl">🎉</div>
          <h1 className="mb-3 text-3xl font-bold text-slate-800">
            You&apos;re in!
          </h1>
          <p className="mb-2 text-lg text-slate-600">
            {state.results && state.results.monthlySavings > 0
              ? `We'll help you save ${format(state.results.monthlySavings)}/month.`
              : "We'll notify you when savings opportunities appear."}
          </p>
          <p className="mb-8 text-sm text-slate-400">
            Check your email for next steps — including switching guides and
            exclusive deals.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/results")}
              className="w-full rounded-xl bg-amber-500 py-3 font-bold text-white hover:bg-amber-600 transition-colors"
            >
              Back to My Results
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full rounded-xl border border-slate-200 py-3 font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Back
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-slate-800">
            Lock in your savings
          </h1>
          <p className="mb-6 text-slate-500">
            Create your account to get switching guides, exclusive deals, and
            price-drop alerts.
          </p>

          {state.results && state.results.monthlySavings > 0 && (
            <div className="mb-6 rounded-xl bg-amber-50 p-4 text-center">
              <p className="text-sm text-amber-600">Your potential savings</p>
              <p className="text-2xl font-bold text-amber-600">
                {format(state.results.monthlySavings)}/mo
              </p>
              <p className="text-xs text-amber-500">
                {format(state.results.annualSavings)} per year
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Vivek Sahi"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="vivek@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone (for deal alerts)
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            We&apos;ll never share your data. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
