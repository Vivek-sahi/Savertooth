"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Stat({
  value,
  label,
  source,
  color = "var(--text-primary)",
}: {
  value: string;
  label: string;
  source: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border-2 border-[var(--border-soft)] bg-white p-5 text-center"
    >
      <p className="text-3xl font-extrabold" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="mt-2 text-[10px] font-semibold text-[var(--text-muted)]">{source}</p>
    </motion.div>
  );
}

export default function KnowledgePage() {
  return (
    <div className="min-h-screen pt-24">
      <article className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-semibold text-[var(--text-muted)]">
            7 min read
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
            The subscription trap:
            <br />
            how &ldquo;just ₹199/month&rdquo; became ₹15,000 a year
          </h1>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Most Indian households don&apos;t know how much they spend on
            subscriptions. When they find out, they&apos;re shocked. Here&apos;s
            how we got here — and what&apos;s changing.
          </p>
        </motion.header>

        {/* Section 1 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            It started with one subscription
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Remember when Netflix was the only streaming service you paid for?
            Back in 2018, most Indian households had one, maybe two digital
            subscriptions. Netflix or Hotstar for movies, and that was it.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Then came Amazon Prime — bundled with free delivery, so it felt
            like a no-brainer. JioCinema launched with IPL. Sony LIV had that
            one show everyone was talking about. Spotify replaced your pirated
            music. YouTube Premium promised no ads. Before you knew it, you
            were juggling five or six subscriptions.
          </p>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            Each one felt small. ₹149 here, ₹299 there, ₹499 for the
            &ldquo;premium&rdquo; tier because the basic plan only worked on
            one phone. Individually, they all seemed affordable.
            Collectively, they became a silent drain.
          </p>
        </motion.section>

        {/* Big pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="my-12 border-l-4 border-[var(--crayon-orange)] py-2 pl-6"
        >
          <p className="text-xl font-bold leading-snug text-[var(--text-primary)]">
            &ldquo;The average Indian household now spends ₹12,000–18,000 per
            year on digital subscriptions — and most people
            underestimate their spend by 2.5x.&rdquo;
          </p>
          <cite className="mt-2 block text-sm font-medium text-[var(--text-muted)]">
            — OTT Industry Analysis, 2025
          </cite>
        </motion.blockquote>

        {/* Section 2 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            The numbers nobody talks about
          </h2>
          <p className="mb-6 text-base leading-relaxed text-[var(--text-secondary)]">
            India&apos;s OTT universe now has 547 million users. But here&apos;s
            the thing — only 100 million of them actually pay. And those
            who pay, pay for more than they use.
          </p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <Stat
              value="2.5"
              label="Average OTT subscriptions per Indian user"
              source="Ormax Media 2024"
              color="var(--crayon-purple)"
            />
            <Stat
              value="23%"
              label="Indians paying for 2+ unused subscriptions"
              source="YouGov 2024"
              color="var(--crayon-teal)"
            />
            <Stat
              value="₹15,000"
              label="Annual household subscription spend"
              source="Industry Analysis 2025"
              color="var(--crayon-orange)"
            />
            <Stat
              value="60%+"
              label="Consumers reporting subscription fatigue"
              source="Civic Science 2024"
              color="var(--crayon-pink)"
            />
          </div>

          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            The pattern is the same everywhere. People sign up during a free
            trial, forget to cancel, auto-renew kicks in, and by the time
            they notice, three months of charges have already gone through.
            Multiply that across five platforms and you&apos;re looking at
            thousands of rupees paid for content nobody watched.
          </p>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            Prices keep going up
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            It&apos;s not just that we have more subscriptions — each one is
            getting more expensive. In 2023, the average price increase across
            major streaming platforms was nearly 25%. They call it
            &ldquo;streamflation.&rdquo;
          </p>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Netflix&apos;s cheapest plan in India went from ₹149 to ₹199.
            Disney+ Hotstar restructured its tiers. Amazon Prime jumped from
            ₹999 to ₹1,499 a year. Even Jio, which built its empire on free
            content, started putting cricket behind a paywall.
          </p>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            The companies know most people won&apos;t cancel over a ₹50
            increase. They&apos;re counting on your inertia. And for the most
            part, they&apos;re right — close to 90% of consumers say their
            income hasn&apos;t kept pace with these increases, yet
            cancellations remain low.
          </p>
        </motion.section>

        {/* Highlight card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-12 rounded-3xl bg-[var(--bg-dark)] p-8 text-white"
        >
          <p className="mb-2 text-sm font-semibold text-white/40">
            The real cost
          </p>
          <p className="text-2xl font-bold leading-snug">
            A family with Netflix Standard, Amazon Prime, Disney+ Hotstar,
            Sony LIV, and one regional platform spends at least{" "}
            <span className="text-[var(--crayon-yellow)]">₹10,584/year</span>{" "}
            — and that&apos;s with annual plans. Monthly payers easily cross{" "}
            <span className="text-[var(--crayon-yellow)]">₹18,000</span>.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            The waste nobody admits
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Here&apos;s what the subscription companies don&apos;t want you
            thinking about: most of us watch one or two platforms 90% of the
            time. The rest sit there, charging our cards, collecting dust.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            According to research, 85% of subscribers have at least one paid
            subscription they haven&apos;t used in the past month. The average
            person has 3.3 subscriptions they&apos;re not using at all. That&apos;s
            not just a few hundred rupees — across a year, it adds up to
            ₹5,000–10,000 in pure waste.
          </p>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            Why don&apos;t people cancel? Two reasons: 40% cite automatic
            renewal (they simply forget), and 35% say cancellation is
            deliberately made difficult. Sound familiar?
          </p>
        </motion.section>

        {/* Section 5 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            The tide is turning
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            People are starting to push back. The average number of OTT
            subscriptions per Indian user dropped from 2.8 to 2.5 in just
            one year. One-third of streaming subscribers globally cancelled
            at least one service in 2023 — up from one-quarter in 2020.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Smart subscribers are adopting new strategies: rotating
            subscriptions quarterly instead of keeping all of them running
            year-round. Sharing family plans with trusted friends. Timing
            annual purchases around Diwali and Prime Day sales when discounts
            hit 40–60%.
          </p>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            The families who do this are spending ₹4,000–6,000 a year
            instead of ₹15,000 — getting the same content for less than half
            the price. The difference? Awareness, and a few minutes of
            planning.
          </p>
        </motion.section>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="my-12 border-l-4 border-[var(--crayon-teal)] py-2 pl-6"
        >
          <p className="text-xl font-bold leading-snug text-[var(--text-primary)]">
            &ldquo;The difference between spending ₹15,000 and ₹5,000 a year
            on subscriptions isn&apos;t sacrifice — it&apos;s strategy.&rdquo;
          </p>
        </motion.blockquote>

        {/* Section 6 */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            That&apos;s why we built Savertooth
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            We don&apos;t think you should cancel everything. We think you
            should pay the right amount for what you actually use.
          </p>
          <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Savertooth looks at your subscription stack, compares it against
            thousands of plans, finds cheaper alternatives, discovers hidden
            perks you didn&apos;t know existed, and shows you exactly where
            you&apos;re overspending.
          </p>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            It takes two minutes. No sign-up required. You just pick what you
            pay for, and we show you where the money is leaking.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border-2 border-[var(--border-soft)] bg-white p-10 text-center"
        >
          <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
            Find out what you&apos;re really paying
          </h3>
          <p className="mb-6 text-base text-[var(--text-secondary)]">
            Takes 2 minutes. No credit card. No sign-up.
          </p>
          <Link
            href="/analyze"
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[var(--text-primary)] px-8 font-semibold text-white transition-colors hover:bg-[#3d3d4a] active:scale-[0.98]"
          >
            Analyze my subscriptions
            <svg
              className="h-4 w-4"
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

        {/* Sources */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 border-t-2 border-[var(--border-soft)] pt-8"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Sources
          </p>
          <ul className="space-y-1 text-xs text-[var(--text-muted)]">
            <li>Ormax Media — The Ormax OTT Audience Report 2024</li>
            <li>YouGov Surveys — Subscription Graveyard, Global Survey 2024</li>
            <li>Civic Science — Video Streaming Subscription Fatigue 2024</li>
            <li>BRG — Combating Subscription Fatigue: A Data-Driven Approach 2024</li>
            <li>Self Financial — The Cost of Unused Subscriptions 2024</li>
            <li>Livemint / Ormax — India OTT Users & Paid Subscriptions 2024</li>
            <li>TRAI — Indian Telecom Services Performance Indicators Q2 2025</li>
          </ul>
        </motion.footer>
      </article>
    </div>
  );
}
