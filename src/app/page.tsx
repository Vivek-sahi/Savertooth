import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SocialProof from "@/components/landing/SocialProof";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <SocialProof />
      <footer className="bg-slate-950 px-6 py-12 text-center border-t border-slate-800">
        <p className="text-lg font-bold text-white">
          <span className="text-amber-400">Saver</span>tooth
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Find cheaper alternatives. Get curated packs. Save money.
        </p>
        <p className="mt-4 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Savertooth. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
