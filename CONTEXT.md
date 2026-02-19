# Savertooth — Project Context

## What Is This?

Savertooth is a **group-buying platform for recurring expenses**. Users input their subscriptions and utility services, we analyze their total spend, find cheaper alternatives, and offer negotiated group rates that individuals can't get alone.

Think: **Costco for subscriptions.**

## The Problem

Consumers spend $200–400/month on subscriptions and utilities they've never optimized. Existing tools (Rocket Money, Trim) help you cancel — they don't help you **buy smarter**. Nobody aggregates consumer demand to negotiate bulk pricing on recurring services.

## Business Model

**Take-rate on savings delta.** Free for users. We negotiate group rates with providers and keep 15–20% of the difference between retail price and our group price.

Example: User pays $15/mo retail → our group rate is $12/mo → user pays $12, we keep $0.60, provider gets $11.40.

At 100K users averaging $30/month in savings → $4.5–6M ARR.

No membership fee. No ads. Aligned incentives — we only make money when users save money.

## User Journey (Step by Step)

### Landing Page
- Headline: "You're paying extra for your subscriptions."
- Two CTAs: **"Show Me"** (starts the flow) and **"Knowledge Base"** (educational content)
- Social proof: total saved by users, number of active group deals
- Tone: confident, warm, not fear-based

### Step 1 — Pick Your Subscriptions
- Grid of recognizable subscription logos (Netflix, Spotify, YouTube Premium, Amazon Prime, Disney+, Apple TV+, HBO Max, Hulu, etc.)
- User taps to select the ones they have
- Search/filter for less common ones
- "Add custom" option for unlisted subscriptions
- Each selected sub asks for their current plan tier and monthly cost

### Step 2 — Pick Your Value-Added Services
- Categories: **WiFi/Internet, Phone/Mobile, Electricity, Credit Card, Debit Card, Insurance, Cloud Storage, VPN, Gym**
- Same interaction: pick provider logo, enter plan/cost
- These are the high-spend items where real savings live ($100+ each)

### Step 3 — Review Your Stack
- Clean summary of everything selected
- Shows each item with logo, plan name, monthly cost
- Running total at the bottom
- Edit capability (tap to change plan/cost)
- "Your monthly spend: $XXX"

### Step 4 — Savings Analysis
- Animated analysis moment ("Analyzing 47,000+ plans...")
- Results screen shows:
  - **Current total** vs **Optimized total**
  - **Monthly savings** and **Annual savings** (big, bold numbers)
  - Per-item breakdown: current price → suggested price, with provider name
  - Savings score / optimization badge ("You could be saving 23%")

### Step 5 — Suggestions & Bundles
Three sections:

1. **Reduce Cost** — Same services, cheaper providers/plans
   - "Switch from X to Y, save $Z/month"
   
2. **Get More Value** — Better services at the same price
   - "For what you pay for X, you could get Y which includes Z"
   
3. **Group Deals & Bundles** — The core monetization
   - "Join 2,340 others on this AT&T family plan — $25/mo instead of $45"
   - "Bundle: Disney+ + Hulu + ESPN+ at 30% off — 8 days left"
   - Progress bars showing how many more people needed to unlock next tier
   - Urgency/scarcity mechanics (time-limited, tier-based pricing)

### Step 6 — Action & Share

**If savings are possible:**
- "Sign up to lock in these savings" → Signup flow (email + phone for now)
- After signup: detailed switching guides, one-click provider changes where possible
- Share: "I'm saving $X/month with Savertooth" with referral link

**If no/minimal savings:**
- Positive framing: "You're a smart spender" + optimization score badge
- "You're more optimized than 85% of users"
- Price-drop alert signup: "We'll notify you when cheaper options appear"
- Share: score/badge sharing mechanic (Spotify Wrapped style)
- Never make the user feel they wasted their time

### Retention Hooks (Built in from Day 1)
- **Price-drop alerts** — Monthly email: "Netflix just launched a cheaper plan"
- **Renewal calendar** — "Your Spotify annual renews in 14 days — here's a cheaper option"
- **Group deal alerts** — "47 more people needed to unlock the next tier"
- **Savings dashboard** — "You've saved $340 this year with Savertooth"
- **New bundle drops** — "New bundle available — 3 days only"

## Technical Architecture

### Stack
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **State Management**: React Context + useReducer for the multi-step wizard
- **Animations**: Framer Motion for step transitions and analysis animations
- **Icons/Logos**: SVG-based subscription logos (stored locally or CDN)
- **Backend (future)**: API routes in Next.js initially, then separate service
- **Database (future)**: PostgreSQL for user data, Redis for caching pricing
- **Auth (future)**: Email + phone (SMS OTP) — keep it simple, low friction

### Data Layer

**Subscription Catalog** (`/src/data/subscriptions.ts`)
- ID, name, logo, category, available plans with pricing
- Categories: Streaming, Music, Gaming, Productivity, News, Fitness

**Services Catalog** (`/src/data/services.ts`)
- ID, name, logo, category, available providers with plans/pricing
- Categories: Internet, Mobile, Electricity, Banking, Insurance

**Savings Engine** (`/src/lib/savings.ts`)
- Takes user's current stack (items + plans + costs)
- Compares against catalog for cheaper same-category alternatives
- Compares against bundle deals for grouped savings
- Returns: per-item suggestions, total potential savings, savings score

**Bundle/Group Deals** (`/src/data/bundles.ts`)
- Bundle ID, included services, group price, retail price, members joined, members needed
- Tier-based pricing: more members = cheaper price
- Expiration dates for urgency

### Key Design Decisions

1. **Start manual, graduate to Plaid.** Phase 1 is logo picker + manual price input. Zero auth friction. Phase 2 (post-traction) adds Plaid bank-linking as an "unlock full savings" upgrade. Users who've already seen value convert to bank-linking at higher rates.

2. **Crowdsourced + seeded pricing data.** Launch with manually researched pricing for top 50 subscriptions and services. Every user interaction validates and enriches the data. Built-in data flywheel: more users → more accurate pricing → better recommendations → more users.

3. **Auth comes after value.** Users see their savings analysis BEFORE being asked to sign up. The signup wall is at the "lock in these savings" action step, not at the front door. This maximizes top-of-funnel and lets the product earn trust first.

4. **Group deals are the moat.** The calculator is a commodity. The bundle marketplace with network effects is the defensible business. More users = better deals = more users. Every feature decision should ask: "Does this strengthen the group-buying flywheel?"

5. **Positive-sum UX.** Never show a "sorry, no savings" dead end. Every path delivers value: savings score, benchmarking, alerts, badges. The "no savings" path is a retention funnel, not an exit.

### File Structure (Target)

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── analyze/
│   │   └── page.tsx                # Multi-step wizard container
│   ├── results/
│   │   └── page.tsx                # Savings results + suggestions
│   ├── signup/
│   │   └── page.tsx                # Signup flow
│   └── knowledge/
│       └── page.tsx                # Knowledge base
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   └── HowItWorks.tsx
│   ├── wizard/
│   │   ├── WizardShell.tsx         # Step container with progress
│   │   ├── SubscriptionPicker.tsx  # Step 1
│   │   ├── ServicePicker.tsx       # Step 2
│   │   └── StackReview.tsx         # Step 3
│   ├── results/
│   │   ├── SavingsHero.tsx         # Big savings number
│   │   ├── ItemBreakdown.tsx       # Per-item comparison
│   │   ├── SuggestionsPanel.tsx    # Cheaper / More value / Bundles
│   │   ├── BundleCard.tsx          # Individual bundle deal
│   │   └── GroupDealProgress.tsx   # Members needed progress bar
│   ├── shared/
│   │   ├── LogoGrid.tsx            # Reusable selectable logo grid
│   │   ├── PriceInput.tsx          # Plan + cost input
│   │   ├── Badge.tsx               # Savings score badge
│   │   └── ShareButton.tsx         # Share CTA with referral
│   └── retention/
│       ├── PriceDropAlert.tsx      # Alert signup
│       ├── RenewalCalendar.tsx     # Upcoming renewals
│       └── SavingsDashboard.tsx    # Cumulative savings tracker
├── data/
│   ├── subscriptions.ts            # Subscription catalog + pricing
│   ├── services.ts                 # Utility/service catalog + pricing
│   ├── bundles.ts                  # Group deals and bundles
│   └── types.ts                    # Shared TypeScript types
├── lib/
│   ├── savings.ts                  # Savings calculation engine
│   ├── scoring.ts                  # Optimization score algorithm
│   └── sharing.ts                  # Share text/link generation
└── context/
    └── WizardContext.tsx            # Multi-step wizard state
```

## Design Principles

- **Speed over perfection** — Ship the manual flow. Plaid comes later.
- **Value before signup** — Users see savings before any auth wall.
- **Every path delivers value** — No dead ends, no disappointment.
- **Social by design** — Group deals, badges, scores — everything is shareable.
- **Data flywheel first** — Every user interaction improves the product for the next user.

## Visual Design Direction

- Clean, modern, generous whitespace
- Brand color: a warm amber/gold (savings, value, trust) + dark slate for contrast
- Subscription logos are the visual anchor — make them feel premium and recognizable
- Big, bold savings numbers — the "wow moment" should feel like finding money
- Progress indicators throughout the wizard — users should always know where they are
- Mobile-first — most users will arrive via shared links on mobile
- Micro-animations on selection, transitions between steps, and the analysis moment
- No stock photos. Illustrations or abstract shapes if needed.

## Competitive Landscape

| Competitor | What They Do | Our Differentiation |
|---|---|---|
| Rocket Money (Truebill) | Auto-detect + cancel subscriptions | We don't just cancel — we find better deals and group pricing |
| Trim | Negotiate bills on your behalf | We aggregate demand for structural pricing advantages |
| Bobby / Subby | Subscription tracking | We're action-oriented, not just tracking |
| Honey / Rakuten | Coupons and cashback | We optimize recurring spend, not one-time purchases |

## Open Questions (To Resolve During Build)

1. **Sharing mechanic specifics** — Referral codes? Deep links? Social cards?
2. **Knowledge base content** — What articles? Tips? Guides? Community?
3. **Notification delivery** — Email first? Push later? SMS for urgent deals?
4. **Analytics events** — What do we track at each step for funnel optimization?
5. **A/B testing hooks** — What do we want to test first? (CTA copy, pricing display, bundle layout)

## For AI Agents Working on This Project

When building features for Savertooth:
- Always reference this file for product context and design decisions
- Follow the file structure outlined above
- Use TypeScript strictly — no `any` types
- All pricing data lives in `/src/data/` — don't hardcode prices in components
- The savings engine in `/src/lib/savings.ts` is the source of truth for calculations
- Mobile-first responsive design — test at 375px width minimum
- Use Tailwind CSS — no inline styles, no CSS modules
- Framer Motion for animations — keep them subtle and purposeful
- Every user-facing string should be easy to find and change (consider a constants file for copy)
