import type { Metadata } from "next";
import Image from "next/image";

import { bio, coach, credentials, faq, process, services, testimonials } from "@/content/coach";
import { variants } from "@/content/variants";
import { BookingWidget, type BookingTheme } from "@/components/booking/BookingWidget";
import { Counter, LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion";

const v = variants["landing-3"];

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/landing-3" },
  openGraph: { title: v.meta.title, description: v.meta.description, url: "/landing-3" },
};

/* -------------------------------------------------------------------------- */
/* Swiss minimal: white, graphite, one signal blue. Grid, hairlines, numbers. */
/* -------------------------------------------------------------------------- */

const bookingTheme: BookingTheme = {
  panel: "flex flex-col gap-6 border border-graphite bg-paper p-6 sm:p-8",
  heading: "font-grid font-semibold text-graphite",
  muted: "text-graphite-soft",
  stepLabel: "micro-label text-graphite",
  chip: "border border-rule px-4 py-3 text-sm text-graphite transition-colors hover:border-graphite",
  chipActive: "border border-graphite bg-graphite px-4 py-3 text-sm text-paper transition-colors",
  field:
    "w-full border border-rule px-4 py-3 text-sm text-graphite outline-none transition-colors placeholder:text-graphite-soft/70 focus:border-signal",
  submit:
    "w-full bg-graphite px-6 py-4 micro-label text-paper transition-colors hover:bg-signal disabled:opacity-60",
  summary: "flex items-center justify-between gap-4 border-y border-graphite py-4 text-graphite",
  error: "mt-1.5 text-xs font-semibold text-signal",
  successPanel: "border border-graphite bg-paper p-8 text-graphite",
  successIcon: "grid size-12 place-items-center border border-signal text-signal",
  divider: "h-px bg-rule",
};

/** Section wrapper: a numbered hairline header, the signature of this layout. */
function Numbered({
  index,
  label,
  children,
  id,
  className,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-rule px-5 py-16 sm:px-8 lg:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1180px]">
        <Reveal y={12}>
          <div className="flex items-baseline gap-4 border-b border-rule pb-4">
            <span className="micro-label text-signal tabular-nums">{index}</span>
            <h2 className="micro-label text-graphite">{label}</h2>
          </div>
        </Reveal>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

export default function LandingThree() {
  const specs = [
    ["Practice", "Life & career coaching"],
    ["Certification", "ICF · PCC"],
    ["Experience", `${coach.yearsCoaching} years`],
    ["Clients", `${coach.clientsServed}+`],
    ["Format", "Video · worldwide"],
    ["Based", "Asheville, NC"],
  ];

  return (
    <div className="bg-paper font-grid text-graphite selection:bg-signal selection:text-paper">
      {/* Hairline header — the only chrome this design allows itself. */}
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3.5 sm:px-8">
          <p className="text-sm font-semibold tracking-tight">{coach.name}</p>
          <div className="flex items-center gap-6">
            <span className="hidden micro-label text-graphite-soft sm:block">{coach.credential}</span>
            <a href="#booking" className="micro-label border-b border-signal pb-0.5 text-signal">
              Book
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------------------------------------------------------------- Hero */}
        <section className="px-5 pt-14 pb-16 sm:px-8 lg:pt-20">
          <div className="mx-auto max-w-[1180px]">
            <Reveal y={10}>
              <p className="micro-label text-signal">{v.hero.eyebrow}</p>
            </Reveal>

            <h1 className="mt-8 text-[2.9rem] font-semibold sm:text-[4.4rem] lg:text-[5.6rem]">
              <LineReveal lines={v.hero.headline} delay={0.1} />
            </h1>

            <div className="mt-14 grid gap-12 border-t border-rule pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              <div>
                <Reveal delay={0.3}>
                  <p className="max-w-xl text-lg leading-relaxed text-graphite-soft sm:text-xl">
                    {v.hero.lead}
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <a
                      href="#booking"
                      className="micro-label bg-graphite px-7 py-4 text-paper transition-colors hover:bg-signal"
                    >
                      {v.hero.primaryCta}
                    </a>
                    <a
                      href="#method"
                      className="micro-label border border-rule px-7 py-4 text-graphite transition-colors hover:border-graphite"
                    >
                      {v.hero.secondaryCta}
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-graphite-soft">{v.hero.note}</p>
                </Reveal>
              </div>

              {/* Spec sheet — the detail that makes this design feel precise. */}
              <Reveal delay={0.35}>
                <dl className="divide-y divide-rule border-y border-rule">
                  {specs.map(([term, detail]) => (
                    <div key={term} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="micro-label text-graphite-soft">{term}</dt>
                      <dd className="text-sm font-medium tabular-nums">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={20}>
              <div className="mt-14 overflow-hidden">
                <Image
                  src="/images/mood-minimal.webp"
                  alt=""
                  width={1200}
                  height={800}
                  priority
                  sizes="100vw"
                  className="h-56 w-full object-cover grayscale sm:h-72 lg:h-96"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- Practitioner */}
        <Numbered index="02" label={v.sections.about}>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <Image
                src={coach.photo}
                alt={`${coach.name}, life and career coach`}
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 90vw, 380px"
                className="w-full object-cover"
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="text-[1.6rem] font-semibold leading-snug sm:text-[2.1rem]">
                  {coach.name} — {coach.credential}
                </p>
              </Reveal>
              <div className="mt-7 space-y-5">
                {bio.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.05 * index}>
                    <p className="text-base leading-relaxed text-graphite-soft">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2}>
                <ol className="mt-10 divide-y divide-rule border-t border-rule">
                  {credentials.map((item, index) => (
                    <li key={item} className="flex gap-5 py-3.5">
                      <span className="micro-label text-signal tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-graphite">{item}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </Numbered>

        {/* ---------------------------------------------------------- Engagements */}
        <Numbered index="03" label={v.sections.services} id="services">
          <div className="divide-y divide-rule border-y border-rule">
            {services.map((service, index) => (
              <Reveal key={service.slug} y={14} delay={index * 0.05}>
                <article className="group grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-12">
                  <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                    <p className="micro-label text-graphite-soft tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold sm:text-2xl">{service.name}</h3>
                      <p className="mt-1 text-sm text-signal">{service.tagline}</p>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite-soft">
                        {service.description}
                      </p>
                      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                        {[
                          ["Duration", `${service.duration} min`],
                          ["Scope", service.cadence],
                          ["Best for", service.bestFor],
                        ].map(([term, detail]) => (
                          <div key={term}>
                            <dt className="micro-label text-graphite-soft">{term}</dt>
                            <dd className="mt-0.5 text-sm">{detail}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:flex-col sm:items-end">
                    <p className="text-3xl font-semibold tabular-nums">{service.priceLabel}</p>
                    <a
                      href="#booking"
                      className="micro-label border border-rule px-5 py-3 transition-colors group-hover:border-graphite group-hover:bg-graphite group-hover:text-paper"
                    >
                      Select
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Numbered>

        {/* -------------------------------------------------------------- Method */}
        <Numbered index="04" label={v.sections.process} id="method" className="bg-paper-warm">
          <Stagger className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
            {process.map((step, index) => (
              <StaggerItem key={step.title}>
                <p className="text-5xl font-semibold tabular-nums text-rule">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 border-t border-graphite pt-4 text-base font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-graphite-soft">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <dl className="mt-16 grid gap-8 border-t border-graphite pt-10 sm:grid-cols-3">
              {[
                { value: coach.yearsCoaching, suffix: " yrs", label: "Coaching practice" },
                { value: coach.clientsServed, suffix: "+", label: "Clients to date" },
                { value: 24, suffix: " h", label: "Reschedule window" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dd className="text-[2.6rem] font-semibold leading-none tabular-nums">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="micro-label mt-3 text-graphite-soft">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Numbered>

        {/* ---------------------------------------------------------- References */}
        <Numbered index="05" label={v.sections.testimonials}>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.07}>
                <figure className="flex h-full flex-col border-t border-graphite pt-6">
                  <p className="micro-label text-signal">{item.outcome}</p>
                  <blockquote className="mt-5 grow text-[1.05rem] leading-relaxed">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-rule pt-4">
                    <Image
                      src={item.photo}
                      alt=""
                      width={300}
                      height={300}
                      sizes="40px"
                      className="size-10 object-cover grayscale"
                    />
                    <span className="text-sm">
                      <span className="font-semibold">{item.name}</span>
                      <span className="block text-graphite-soft">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Numbered>

        {/* -------------------------------------------------------- Availability */}
        <Numbered index="06" label={v.sections.booking} id="booking" className="bg-paper-warm">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="text-[1.6rem] font-semibold leading-snug sm:text-[2.1rem]">
                  Select an engagement, then a time.
                </p>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-graphite-soft">
                  Confirmation arrives by email the same working day. The first twenty minutes are a
                  consultation at no charge, with no obligation on either side.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <dl className="mt-10 divide-y divide-rule border-y border-rule">
                  {[
                    ["Email", coach.email],
                    ["Telephone", coach.phone],
                    ["Hours", "Mon–Fri · 09:00–18:00 ET"],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="micro-label text-graphite-soft">{term}</dt>
                      <dd className="text-sm font-medium">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <BookingWidget theme={bookingTheme} />
            </Reveal>
          </div>
        </Numbered>

        {/* ----------------------------------------------------------- Questions */}
        <Numbered index="07" label={v.sections.faq}>
          <dl className="divide-y divide-rule border-y border-rule">
            {faq.map((item) => (
              <Reveal key={item.q} y={12}>
                <div className="grid gap-3 py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-12">
                  <dt className="text-base font-semibold">{item.q}</dt>
                  <dd className="text-sm leading-relaxed text-graphite-soft">{item.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Numbered>
      </main>

      <footer className="border-t border-graphite px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">{coach.name}</p>
          <p className="micro-label text-graphite-soft">
            {coach.location} · {coach.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
