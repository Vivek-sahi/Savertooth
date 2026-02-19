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
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--crayon-teal)]"
          >
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="mb-3 text-3xl font-extrabold text-[var(--text-primary)]">
            You&apos;re in!
          </h1>
          <p className="mb-2 text-base text-[var(--text-secondary)]">
            {state.results && state.results.monthlySavings > 0
              ? `We'll help you save ${format(state.results.monthlySavings)}/month.`
              : "We'll notify you when savings opportunities appear."}
          </p>
          <p className="mb-8 text-sm text-[var(--text-muted)]">
            Check your email for next steps — including switching guides and
            exclusive deals.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/results")}
              className="w-full rounded-2xl bg-[var(--text-primary)] py-3 font-semibold text-white transition-colors hover:bg-[#3d3d4a]"
            >
              Back to My Results
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full rounded-2xl border-2 border-[var(--border-soft)] bg-white py-3 font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-warm)]"
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1.5 rounded-xl border-2 border-[var(--border-soft)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-warm)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="rounded-3xl border-2 border-[var(--border-soft)] bg-white p-8 shadow-[0_6px_30px_rgba(0,0,0,0.05)]">
          <h1 className="mb-2 text-2xl font-extrabold text-[var(--text-primary)]">
            Lock in your savings
          </h1>
          <p className="mb-6 text-[var(--text-secondary)]">
            Create your account to get switching guides, exclusive deals, and
            price-drop alerts.
          </p>

          {state.results && state.results.monthlySavings > 0 && (
            <div className="mb-6 rounded-2xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] p-4 text-center">
              <p className="text-sm text-[var(--text-secondary)]">Your potential savings</p>
              <p className="text-2xl font-extrabold text-[var(--accent)]">
                {format(state.results.monthlySavings)}/mo
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {format(state.results.annualSavings)} per year
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--text-primary)]">
                Full name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="Vivek Sahi"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--text-primary)]">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="vivek@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--text-primary)]">
                Phone (for deal alerts)
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-warm)] px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[var(--text-primary)] py-3 font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
            We&apos;ll never share your data. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
