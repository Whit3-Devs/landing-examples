/**
 * The three landings share every fact about the business and differ in voice
 * as well as visual style — a warm editorial page should not read in the same
 * register as a high-contrast performance page.
 */

export type VariantKey = "landing-1" | "landing-2" | "landing-3";

export type Variant = {
  key: VariantKey;
  /** Shown in the switcher bar. */
  label: string;
  styleName: string;
  styleNote: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string[];
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };
  sections: {
    about: string;
    services: string;
    process: string;
    testimonials: string;
    booking: string;
    faq: string;
  };
};

export const variants: Record<VariantKey, Variant> = {
  "landing-1": {
    key: "landing-1",
    label: "Warm",
    styleName: "Warm editorial",
    styleNote: "Serif display, clay and sage, generous whitespace, gentle motion",
    meta: {
      title: "Rowan Ellis — Life & Career Coaching",
      description:
        "ICF-certified life and career coaching for people facing decisions without a clean answer. Book a free 20-minute call.",
    },
    hero: {
      eyebrow: "Life & career coaching",
      headline: ["You already know", "something has to change."],
      lead: "I help thoughtful people work out what they actually want — and then do something about it. Twelve years, three hundred and forty clients, no affirmations.",
      primaryCta: "Book a free call",
      secondaryCta: "See how I work",
      note: "Free 20 minutes · no obligation · online worldwide",
    },
    sections: {
      about: "Who you would be working with",
      services: "Ways we can work together",
      process: "What happens, step by step",
      testimonials: "In their words",
      booking: "Find a time that works",
      faq: "Before you book",
    },
  },

  "landing-2": {
    key: "landing-2",
    label: "Bold",
    styleName: "Bold nocturne",
    styleNote: "Near-black canvas, lime and violet, oversized type, kinetic motion",
    meta: {
      title: "Rowan Ellis — Coaching for people who are done waiting",
      description:
        "High-accountability life and career coaching. Twelve years, 340 clients, one question: what are you actually going to do about it?",
    },
    hero: {
      eyebrow: "Coaching · 12 years · 340 clients",
      headline: ["Stop", "circling", "the decision."],
      lead: "Twelve years of coaching people through the calls nobody else can make for them. You bring the ambition. I bring the questions you have been avoiding.",
      primaryCta: "Claim a slot",
      secondaryCta: "How it works",
      note: "First 20 minutes free · straight answers only",
    },
    sections: {
      about: "Who is asking",
      services: "Pick your intensity",
      process: "The four moves",
      testimonials: "Receipts",
      booking: "Lock in a time",
      faq: "Objections, handled",
    },
  },

  "landing-3": {
    key: "landing-3",
    label: "Minimal",
    styleName: "Swiss minimal",
    styleNote: "Grid, hairlines, numbered sections, one signal colour, precise motion",
    meta: {
      title: "Rowan Ellis · Life and Career Coaching",
      description:
        "Structured coaching engagements for career decisions, leadership transitions and change. ICF-certified. Clear scope, clear pricing.",
    },
    hero: {
      eyebrow: "01 — Coaching practice",
      headline: ["Clear thinking,", "on the record."],
      lead: "Structured coaching for decisions that resist a clean answer. Defined scope, defined price, defined end point.",
      primaryCta: "Book a session",
      secondaryCta: "Read the method",
      note: "Twenty-minute consultation at no charge",
    },
    sections: {
      about: "Practitioner",
      services: "Engagements",
      process: "Method",
      testimonials: "References",
      booking: "Availability",
      faq: "Questions",
    },
  },
};

export const variantList = Object.values(variants);
