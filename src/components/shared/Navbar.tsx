"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SavertoothLogo from "./SavertoothLogo";
import CurrencySwitch from "./CurrencySwitch";

const SHARE_TEXT = "Found this tool that shows you hidden perks in your phone/internet plans and where you're overpaying on subscriptions. Worth a look:";
const SHARE_URL = "https://savertooth.vercel.app";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSpread = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Savertooth", text: SHARE_TEXT, url: SHARE_URL });
        return;
      } catch {
        // user cancelled or API unavailable — fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="shrink-0">
          <SavertoothLogo size={38} />
        </Link>

        <div className="flex items-center gap-6">
          <CurrencySwitch />
          <button
            onClick={handleSpread}
            className="rounded-xl border-2 border-[var(--border-soft)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border-card)] hover:bg-white active:scale-[0.98]"
          >
            {shared ? "Link copied" : "Spread the word"}
          </button>
          <Link
            href="/analyze"
            className="rounded-xl bg-[var(--text-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98]"
          >
            Save my money
          </Link>
        </div>
      </div>
    </nav>
  );
}
