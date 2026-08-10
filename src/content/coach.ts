/**
 * One coach, three landing pages. Everything factual lives here so the three
 * designs are genuinely the same business presented three ways — the only
 * things that change per landing are layout, palette, motion and voice
 * (see `variants.ts`).
 */

export const coach = {
  name: "Rowan Ellis",
  firstName: "Rowan",
  credential: "ICF-Certified Life & Career Coach",
  location: "Asheville, NC · online worldwide",
  email: "hello@rowanellis.coach",
  phone: "+1 (828) 555-0142",
  yearsCoaching: 12,
  clientsServed: 340,
  photo: "/images/coach-portrait.webp",
  candid: "/images/coach-candid.webp",
  session: "/images/session.webp",
} as const;

export const credentials = [
  "Professional Certified Coach (PCC), International Coaching Federation",
  "MA in Organisational Psychology, UNC Chapel Hill",
  "Certified in Acceptance & Commitment Training",
  "Former HR director — fourteen years inside organisations",
] as const;

export const bio = [
  "I spent fourteen years inside organisations watching capable people stall — not because they lacked ability, but because nobody had ever helped them work out what they actually wanted.",
  "So I retrained. For the last twelve years I have coached people through the decisions that do not have a clean answer: leaving a career that looks good on paper, stepping into leadership without losing yourself, rebuilding after a change you did not choose.",
  "I am not a cheerleader and I do not do affirmations. What I do is ask better questions than the ones you have been asking yourself, hold you to what you say matters, and stay with you while you do the hard part.",
] as const;

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: number;
  price: number;
  priceLabel: string;
  cadence: string;
  includes: string[];
  bestFor: string;
};

export const services: Service[] = [
  {
    slug: "clarity-call",
    name: "Clarity Call",
    tagline: "One conversation, one decision",
    description:
      "A single deep session on one specific question you are stuck on. You leave with the decision made or the next three steps written down.",
    duration: 60,
    price: 120,
    priceLabel: "$120",
    cadence: "one session",
    includes: [
      "60-minute video session",
      "A written summary within 24 hours",
      "One follow-up email exchange",
    ],
    bestFor: "You have one clear question and want it resolved.",
  },
  {
    slug: "coaching-programme",
    name: "Three-Month Programme",
    tagline: "The work that actually changes something",
    description:
      "Six fortnightly sessions with structured work between them. This is where career changes, promotions and genuinely new habits happen.",
    duration: 75,
    price: 1450,
    priceLabel: "$1,450",
    cadence: "six sessions over three months",
    includes: [
      "Six 75-minute sessions",
      "A written plan you keep updating",
      "Messaging support between sessions",
      "Two 20-minute check-ins if you need them",
    ],
    bestFor: "You want a real change and you are ready to work at it.",
  },
  {
    slug: "leadership-intensive",
    name: "Leadership Intensive",
    tagline: "For the first ninety days in a bigger role",
    description:
      "A focused engagement for new managers and directors: stakeholder mapping, delegation, difficult conversations, and holding your own standards without burning out.",
    duration: 90,
    price: 2400,
    priceLabel: "$2,400",
    cadence: "eight sessions over four months",
    includes: [
      "Eight 90-minute sessions",
      "360 feedback gathering and debrief",
      "Live prep before your hardest conversations",
      "Optional session with your manager",
    ],
    bestFor: "You have just stepped up, or are about to.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const process = [
  {
    title: "A free 20-minute call",
    body: "We talk about what is going on and whether I am the right person for it. If I am not, I will tell you and suggest who might be.",
  },
  {
    title: "We agree the work",
    body: "You pick the format that fits. I send a simple agreement, the first session goes in the calendar, and you get a short questionnaire.",
  },
  {
    title: "The sessions",
    body: "We meet on video. You do the thinking; I keep it honest and keep it moving. Between sessions you have something specific to try.",
  },
  {
    title: "You keep going without me",
    body: "The point is not to need a coach forever. We finish when you have the decision, the habit or the role — and the way of thinking that got you there.",
  },
] as const;

export const testimonials = [
  {
    name: "Nadia Okonjo",
    role: "Product Lead",
    photo: "/images/client-1.webp",
    quote:
      "I came to Rowan certain I needed to quit. Six sessions later I had renegotiated my role instead, which is what I actually wanted and had not let myself say out loud.",
    outcome: "Renegotiated her role rather than leaving",
  },
  {
    name: "Peter Halloran",
    role: "Engineering Manager",
    photo: "/images/client-2.webp",
    quote:
      "She is not soft. In our second session she pointed out I had described the same problem four different ways to avoid the actual one. That was uncomfortable and it was the turning point.",
    outcome: "Promoted to director within eight months",
  },
  {
    name: "Sarah Beaumont",
    role: "Founder",
    photo: "/images/client-3.webp",
    quote:
      "What I valued most was that Rowan never handed me an answer. I finished the programme trusting my own judgement, which no amount of advice would have done.",
    outcome: "Launched her practice and kept her weekends",
  },
] as const;

export const faq = [
  {
    q: "How do I know if coaching is the right thing?",
    a: "Coaching works when you have a decision to make or a change to lead, and you are willing to do the work between sessions. If what you are carrying is grief, trauma or clinical anxiety, therapy is the right support and I will happily point you towards it.",
  },
  {
    q: "Where do sessions happen?",
    a: "On video, wherever you are — most of my clients are not in Asheville. If you are local, we can walk instead; some of the best sessions I have run happened outdoors.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Move any session up to 24 hours beforehand at no cost, as often as you need. Life happens, and I would rather you came to a session ready than turned up to tick a box.",
  },
  {
    q: "Is anything we discuss confidential?",
    a: "Everything. That holds even when an employer is paying — they receive confirmation that sessions happened, and nothing else, and that is agreed in writing before we start.",
  },
] as const;

/** Fixed slot grid offered every working day. */
export const slotTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"] as const;
