# Landing examples — three styles, one business

Three complete landing pages for the same fictional life-coaching practice
(Rowan Ellis), built to show three different design directions against identical
content. A small floating switcher moves between them.

| Route | Style | Character |
| --- | --- | --- |
| [`/landing-1`](/landing-1) | **Warm editorial** | Cream paper, clay and sage, Instrument Serif headlines, arch-cropped photography, parallax and soft blur reveals |
| [`/landing-2`](/landing-2) | **Bold nocturne** | Near-black canvas, lime and violet, oversized Space Grotesk, marquee, scroll-progress rail, counters |
| [`/landing-3`](/landing-3) | **Swiss minimal** | White and graphite with one signal blue, numbered sections, hairline rules, spec-sheet tables, masked line reveals |

`/` redirects to `/landing-1`.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · [`motion`](https://motion.dev)
- **Rendering:** fully static — all three pages prerender at build time. The only
  server code is one action behind the booking form.
- **Verified at:** 390 and 1280 px, plus a scripted pass over the switcher and
  the complete booking flow on each landing.

## The brief this answers

> A simple, professional website for my life coaching business — information
> about me, my services, and an option for clients to book an appointment.

Each landing covers exactly that: who the coach is, three services with real
prices and scope, how the work runs, references, and a working booking flow.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

## Booking

The booking widget is the one piece of genuine interaction, so it is shared
rather than tripled:

- **Logic once** — `src/lib/booking.ts` generates the next eight working days
  and the open slots for each. Availability comes from a hash of the date, so
  the same day always shows the same slots without needing a database.
- **Skin three times** — `BookingWidget` takes a `BookingTheme` of class
  strings. Each landing supplies its own, so the three widgets look nothing
  alike while behaving identically.
- **Server-side validation** — `src/app/actions.ts` re-checks everything, so a
  submission cannot be faked by disabling JavaScript. There is a honeypot field
  for bots.

Dates depend on "today", which differs between build time and view time. The day
strip therefore renders only once hydrated, via `useSyncExternalStore` rather
than an effect, which keeps the markup hydration-safe and satisfies React's
`set-state-in-effect` rule.

## Project layout

```
src/
  app/
    layout.tsx          fonts for all three styles + the switcher
    page.tsx            redirect to /landing-1
    landing-1/page.tsx  warm editorial   ┐ each landing is one self-contained
    landing-2/page.tsx  bold nocturne    │ file, so no style can leak into
    landing-3/page.tsx  swiss minimal    ┘ another
    actions.ts          booking server action
    globals.css         three palettes, one per landing
  components/
    StyleSwitcher.tsx   the demo control
    booking/            shared, themed booking widget
    motion/index.tsx    Reveal · Stagger · Parallax · ScrollProgress · LineReveal · Counter
  content/
    coach.ts            every fact about the business
    variants.ts         per-landing copy and voice
  lib/                  booking contract, cn helper
scripts/fetch-images.mjs  re-downloads all photography from Openverse
```

Two decisions worth knowing:

**Each landing is one file.** Normally shared section components would be the
right call, but the entire point here is that the three pages look nothing
alike. Keeping them self-contained means no abstraction has to bend to
accommodate three visual languages, and each file reads as a complete design.

**Three palettes, not one semantic layer.** `globals.css` defines separate
colour names per landing (`clay`/`sage`, `neon`/`plasma`, `graphite`/`signal`)
rather than shared tokens like `primary`. A landing's classes then read
literally, and no design can accidentally inherit another's colours.

## Photography

All ten photographs come from [Openverse](https://openverse.org), restricted to
**CC0 / public-domain** images from curated stock sources, cover-cropped and
converted to WebP (332 KB total). `scripts/fetch-images.mjs` holds the manifest,
so the set is reproducible:

```bash
node scripts/fetch-images.mjs --dry   # show candidates
node scripts/fetch-images.mjs         # download + convert
```

Attribution for every file: [CREDITS.md](./CREDITS.md).

## Accessibility

Skip link, one `h1` per landing, real `<fieldset>`/`<legend>` grouping in the
booking form, `aria-pressed` on every chip, `aria-current` on the active
switcher item, `role="alert"` and `role="status"` on form outcomes, labelled
inputs, visible focus rings, and full `prefers-reduced-motion` support — every
animation collapses to a fade or nothing.

## Still open

- `TODO(delivery)` in `src/app/actions.ts` — the booking validates and logs
  server-side. Wire it to a calendar and a confirmation email (Cal.com, Google
  Calendar, Resend) to make it real.
- Slot availability is synthetic. Real availability needs a calendar
  integration; the `availableDays()` signature is the seam for it.
- Copy and imagery are placeholders for a real coach's own.
