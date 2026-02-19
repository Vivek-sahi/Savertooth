"use client";

import { motion } from "framer-motion";
import { useWizard } from "@/context/WizardContext";
import { useCurrency } from "@/context/CurrencyContext";
import { subscriptions } from "@/data/subscriptions";
import { services } from "@/data/services";
import { BrandLogo } from "@/components/shared/LogoGrid";

export default function StackReview() {
  const { state, dispatch } = useWizard();
  const { format } = useCurrency();

  const allItems = [
    ...state.selectedSubscriptions.map((sel) => {
      const sub = subscriptions.find((s) => s.id === sel.itemId);
      return {
        ...sel,
        name: sub?.name ?? sel.itemId,
        logo: sub?.logo ?? "?",
        image: sub?.image ?? "",
        color: sub?.color ?? "#999",
        type: "subscription" as const,
      };
    }),
    ...state.selectedServices.map((sel) => {
      const svc = services.find((s) => s.id === sel.itemId);
      return {
        ...sel,
        name: svc?.name ?? sel.itemId,
        logo: svc?.logo ?? "?",
        image: svc?.image ?? "",
        color: svc?.color ?? "#999",
        type: "service" as const,
      };
    }),
  ];

  const total = allItems.reduce((sum, item) => sum + item.monthlyPrice, 0);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Review your stack
        </h2>
        <p className="text-slate-500">
          Here&apos;s everything you&apos;re paying for. Make sure it looks right before we
          analyze.
        </p>
      </motion.div>

      {allItems.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <p className="text-lg text-slate-400">
            No items selected yet. Go back and pick your subscriptions and
            services.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {allItems.map((item, i) => (
              <motion.div
                key={item.itemId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <BrandLogo item={item} size={40} />
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      {item.type === "subscription" ? "Subscription" : "Service"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-slate-800">
                    {format(item.monthlyPrice)}
                  </span>
                  <span className="text-sm text-slate-400">/mo</span>
                  <button
                    onClick={() => {
                      if (item.type === "subscription") {
                        dispatch({ type: "REMOVE_SUBSCRIPTION", itemId: item.itemId });
                      } else {
                        dispatch({ type: "REMOVE_SERVICE", itemId: item.itemId });
                      }
                    }}
                    className="ml-2 rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Your monthly spend</p>
                <p className="text-3xl font-bold">{format(total)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Annual total</p>
                <p className="text-xl font-semibold text-amber-400">
                  {format(total * 12)}/yr
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-slate-300">
              <span className="text-amber-400">⚡</span>
              {allItems.length} items &bull; Let&apos;s see how much you can save
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
