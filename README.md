# ReadinessRadar

A complete, ready-to-deploy AI-readiness assessment funnel: a 20-question, 6-pillar
self-assessment that scores an organization, gates a richer "Pro" view behind a paid
upgrade, and captures every lead in your own database.

Built as a lead-generation / diagnostic-tool funnel — drop in your own branding, Supabase
project, and Stripe account, and it's live.

## What it does

1. **Landing page** → visitor starts a free assessment
2. **20-question assessment** across 6 pillars (Data & Infrastructure, Team & Skills,
   Process Readiness, Governance & Risk, Leadership & Strategy, Current AI Maturity),
   each scored 1–3
3. **Email gate** → captures first name, work email, company, and company size before
   showing results (every submission is written to your database)
4. **Results page** → total score (20–60), tiered narrative ("AI Dormant" / "AI
   Awakening" / "AI Accelerating"), per-pillar progress bars, a shareable one-line
   summary, and a CTA button (configurable email/booking link)
5. **Pro upgrade** → a blurred radar chart with a "$79/mo" Stripe Payment Link;
   completing checkout unlocks the full interactive radar chart via a signed Stripe
   webhook that flips `is_pro` in the database

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- Framer Motion (page/element transitions)
- Recharts (radar chart)
- Supabase (Postgres — stores every assessment submission)
- Stripe (Payment Link + Checkout webhook via a Supabase Edge Function)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your own Supabase project

Create a free project at [supabase.com](https://supabase.com), then create the table
this app expects:

```sql
create table readiness_assessments (
  id uuid primary key,
  first_name text not null,
  email text not null,
  company_name text,
  company_size text,
  answers jsonb not null,
  total_score integer not null,
  bucket text not null,
  pillar_scores jsonb not null,
  is_pro boolean not null default false,
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

-- Allow the anon key to insert/select (adjust to your own RLS needs)
alter table readiness_assessments enable row level security;
create policy "anon insert" on readiness_assessments for insert to anon with check (true);
create policy "anon select own" on readiness_assessments for select to anon using (true);
```

### 3. Create your own Stripe Payment Link

In your Stripe dashboard, create a Payment Link for your desired price (the original
build used a $79/mo subscription). Set the link's success URL to
`https://yourdomain.com/upgrade-success?session_id={CHECKOUT_SESSION_ID}`.

### 4. Deploy the Stripe webhook

The webhook lives at `supabase/functions/stripe-webhook/index.ts`. Deploy it with the
Supabase CLI:

```bash
supabase functions deploy stripe-webhook
supabase secrets set STRIPE_SECRET_KEY=sk_live_... STRIPE_WEBHOOK_SECRET=whsec_...
```

Then add the deployed function URL as an endpoint in your Stripe dashboard listening
for `checkout.session.completed` and `customer.subscription.deleted`.

### 5. Configure environment variables

Copy `.env.example` to `.env` and fill in your own values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_STRIPE_PAYMENT_LINK` | Your Stripe Payment Link URL |
| `VITE_CONTACT_EMAIL` | Email address used in results-page CTA `mailto:` links |

### 6. Run locally

```bash
npm run dev
```

### 7. Build for production

```bash
npm run build
```

Deploys cleanly to Vercel, Netlify, or any static host (includes a `_redirects` file
for SPA routing).

## Customizing

- **Questions & scoring** — `src/data/questions.ts` (question text, pillar grouping,
  score buckets, tier narrative copy, CTA text/links)
- **Branding/colors** — Tailwind config + `src/index.css`
- **Pages** — `src/pages/` (`Landing`, `Assessment`, `EmailGate`, `Results`,
  `UpgradeSuccess`)

## License

Proprietary — transferred under a private sale agreement. Not for redistribution
without the buyer's permission.
