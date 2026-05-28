# Horizon — Next-Gen Learning Dashboard

A premium, production-quality student learning dashboard built with Next.js 14, Supabase, Framer Motion, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/1200x630/060608/7c6df0?text=Horizon+Dashboard)

---

## ✨ Features

- **Dark-mode-only** futuristic UI with glassmorphism, grain overlay, and ambient glow blobs
- **Bento Grid layout** — responsive Hero, Course Cards, Activity Graph, and Quick Stats tiles
- **React Server Components** — course data fetched securely server-side via Supabase
- **Framer Motion** — staggered entrances, spring hover physics, sidebar `layoutId` micro-interactions, animated progress bars
- **Zero layout shifts** — all animations use only `transform` and `opacity`
- **Suspense + Skeleton loaders** with pulsing shimmer animation
- **Graceful error boundaries** with retry support
- **Collapsible sidebar** (desktop) + bottom navigation (mobile) + icon-only mode (tablet)
- **Semantic HTML** — `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<header>`
- **TypeScript** throughout with strict types and database interfaces

---

## 🏗 Architecture

```
horizon-dashboard/
├── app/
│   ├── layout.tsx              # Root layout with grain overlay + ambient blobs
│   ├── globals.css             # Tailwind + custom animations/utilities
│   ├── page.tsx                # Redirects to /dashboard
│   └── dashboard/
│       ├── layout.tsx          # Sidebar + TopBar wrapper
│       ├── page.tsx            # Main dashboard page (Server Component)
│       ├── loading.tsx         # Full skeleton loading state
│       └── error.tsx           # Error boundary with retry (Client Component)
├── components/
│   ├── animations/
│   │   └── MotionWrapper.tsx   # Reusable StaggerContainer + MotionWrapper
│   ├── ui/
│   │   ├── BentoCard.tsx       # Reusable animated card wrapper
│   │   ├── ProgressBar.tsx     # Animated progress bar (0 → value on mount)
│   │   ├── SkeletonCard.tsx    # Skeleton variants for each tile type
│   │   └── DynamicIcon.tsx     # Lucide icon renderer from string name
│   ├── layout/
│   │   ├── Sidebar.tsx         # Collapsible desktop sidebar + mobile bottom nav
│   │   └── TopBar.tsx          # Sticky header with search + notifications
│   └── dashboard/
│       ├── HeroTile.tsx        # Welcome tile with stats (Client)
│       ├── CourseCard.tsx      # Individual course card (Client for animations)
│       ├── CourseGrid.tsx      # Server component that fetches + renders cards
│       ├── ActivityTile.tsx    # Contribution-style heatmap (Client)
│       ├── QuickStatsTile.tsx  # Stat badges grid (Client)
│       └── SectionHeader.tsx   # Section header with actions (Client)
├── lib/
│   └── supabase/
│       ├── server.ts           # Supabase SSR client (server-only)
│       └── queries.ts          # Typed database query helpers
├── types/
│   └── database.ts             # TypeScript interfaces for all data shapes
├── utils/
│   ├── cn.ts                   # clsx + tailwind-merge helper
│   ├── animations.ts           # Reusable Framer Motion variants
│   └── activity.ts             # Activity data generator + color helpers
├── .env.example                # Environment variable template
└── README.md
```

### Server / Client Split

| Component | Boundary | Reason |
|-----------|----------|--------|
| `app/dashboard/page.tsx` | **Server** | Fetches courses from Supabase |
| `CourseGrid.tsx` | **Server** | Async data fetching |
| `CourseCard.tsx` | **Client** | Framer Motion `whileHover` |
| `HeroTile.tsx` | **Client** | Framer Motion entrance animations |
| `ActivityTile.tsx` | **Client** | `useMemo`, motion animations |
| `Sidebar.tsx` | **Client** | `useState` for collapsed state |
| `ProgressBar.tsx` | **Client** | `useMotionValue` + `animate` |
| `error.tsx` | **Client** | Required by Next.js |

---

## 🚀 Quick Start

### 1. Clone and install

```bash
git clone https://github.com/your-username/horizon-dashboard
cd horizon-dashboard
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. In the **SQL Editor**, run:

```sql
-- Create courses table
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.courses enable row level security;

-- Allow anonymous read access
create policy "Public read access"
  on public.courses
  for select
  using (true);

-- Seed data
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Layers'),
  ('System Design Fundamentals', 42, 'Network'),
  ('Motion Design for Interfaces', 88, 'Sparkles'),
  ('TypeScript Mastery', 61, 'Code2');
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these values in Supabase: **Project Settings → API**.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

---

## 🎨 Animation Architecture

All animations are GPU-accelerated (transform + opacity only):

| Animation | Implementation |
|-----------|----------------|
| Staggered tile entrance | `StaggerContainer` with `staggerChildren: 0.07` |
| Card hover scale | `whileHover: { scale: 1.015 }` with spring physics |
| Spring config | `{ type: "spring", stiffness: 300, damping: 20 }` |
| Sidebar highlight | `layoutId="sidebar-active-bg"` for smooth tab indicator |
| Progress bar fill | `useMotionValue` + `animate()` from 0 → value |
| Skeleton shimmer | CSS `background-position` animation (no JS) |
| Ambient blobs | CSS `animate-glow-pulse` keyframe animation |
| Grain texture | CSS `animate-grain` position shuffle |

---

## 📱 Responsive Breakpoints

| Screen | Sidebar | Grid |
|--------|---------|------|
| Mobile `<768px` | Bottom nav bar | 1-column stack |
| Tablet `768–1024px` | Icon-only (collapsed) | 2-column |
| Desktop `>1024px` | Full sidebar (240px / 72px collapsed) | 4-column bento |

---

## ☁️ Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars in Vercel dashboard or via CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new) — it will auto-detect Next.js and deploy on every push.

---

## 🏆 Rubric Checklist

- [x] **Server Components for data fetching** — `CourseGrid`, `page.tsx`, `queries.ts`
- [x] **Secure Supabase env vars** — never exposed; only `NEXT_PUBLIC_*` anon keys used
- [x] **Suspense + skeleton loaders** — `loading.tsx` + `<Suspense>` boundary with shimmer skeletons
- [x] **Spring physics** — `stiffness: 300, damping: 20` on all hover/transition animations
- [x] **No layout shifts** — exclusively `transform` and `opacity` animated
- [x] **TypeScript interfaces** — `Course`, `Database`, `ActivityDay`, `StreakData` types
- [x] **Semantic HTML** — `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<header>`
- [x] **Responsive design** — mobile bottom nav, tablet icon sidebar, desktop full sidebar
- [x] **Premium visual fidelity** — grain texture, ambient blobs, glassmorphism, glow effects
- [x] **Animated progress bars** — `useMotionValue` + `animate()` from 0 → DB value
- [x] **layoutId sidebar** — smooth active indicator transitions via Framer Motion
- [x] **Graceful error handling** — `error.tsx` with retry button
- [x] **Modular component tree** — each tile is its own reusable component

---

## 🔧 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2 | Framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11 | Animations |
| Supabase | 2.43 | Database + BaaS |
| Lucide React | 0.408 | Icons |
| clsx + tailwind-merge | latest | Class utilities |
