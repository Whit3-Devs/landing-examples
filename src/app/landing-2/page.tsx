import type { Metadata } from "next";
import Image from "next/image";

import { coach, credentials, faq, process, services, testimonials } from "@/content/coach";
import { variants } from "@/content/variants";
import { BookingWidget, type BookingTheme } from "@/components/booking/BookingWidget";
import { Counter, Reveal, ScrollProgress, Stagger, StaggerItem } from "@/components/motion";

const v = variants["landing-2"];

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/landing-2" },
  openGraph: { title: v.meta.title, description: v.meta.description, url: "/landing-2" },
};

/* -------------------------------------------------------------------------- */
/* Bold nocturne: near-black canvas, lime and violet, oversized type, kinetic. */
/* -------------------------------------------------------------------------- */

const bookingTheme: BookingTheme = {
  panel:
    "flex flex-col gap-6 rounded-3xl border border-white/10 bg-void-soft/80 p-6 backdrop-blur-xl sm:p-8",
  heading: "font-nocturne text-chalk",
  muted: "text-mist",
  stepLabel: "micro-label text-neon",
  chip: "rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-chalk transition-colors hover:border-neon/60 hover:bg-white/10",
  chipActive:
    "rounded-xl border border-neon bg-neon px-4 py-3 text-sm font-semibold text-void transition-colors",
  field:
    "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-chalk outline-none transition-colors placeholder:text-mist/60 focus:border-neon",
  submit:
    "w-full rounded-xl bg-neon px-6 py-4 font-nocturne text-lg uppercase tracking-tight text-void transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60",
  summary:
    "flex items-center justify-between gap-4 rounded-xl border border-plasma/40 bg-plasma/10 px-5 py-4 text-chalk",
  error: "mt-1.5 text-xs font-semibold text-[#ff6b6b]",
  successPanel: "rounded-3xl border border-neon/40 bg-void-soft p-8 text-chalk",
  successIcon: "grid size-12 place-items-center rounded-full bg-neon text-void",
  divider: "h-px bg-white/10",
};

const marquee = [
  "No affirmations",
  "Straight answers",
  "12 years in the room",
  "340 clients",
  "ICF certified",
  "Confidential, always",
];

export default function LandingTwo() {
  return (
    <div className="min-h-dvh bg-void font-[family-name:var(--font-bold-display)] text-chalk selection:bg-neon selection:text-void">
      <ScrollProgress className="bg-neon" />

      <main id="main">
        {/* ---------------------------------------------------------------- Hero */}
        <section className="relative overflow-hidden px-5 pt-16 pb-16 sm:px-8 sm:pt-24">
          {/* Grid + glow, the two things doing the atmospheric work. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="animate-drift-slow absolute -top-40 left-1/4 size-[34rem] rounded-full bg-plasma/25 blur-[120px]" />
            <div className="animate-drift-slow absolute right-0 top-32 size-[26rem] rounded-full bg-neon/15 blur-[120px] [animation-delay:-10s]" />
          </div>

          <div className="mx-auto max-w-[1180px]">
            <Reveal y={16}>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 rounded-full bg-neon" />
                  <span className="animate-pulse-ring absolute size-2 rounded-full bg-neon" />
                </span>
                {v.hero.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-10 font-nocturne text-[3.4rem] uppercase sm:text-[5.5rem] lg:text-[7.5rem]">
              {v.hero.headline.map((word, index) => (
                <Reveal key={word} as="span" className="block" delay={index * 0.1} y={40}>
                  <span className={index === 2 ? "text-neon" : undefined}>{word}</span>
                </Reveal>
              ))}
            </h1>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <Reveal delay={0.3}>
                <p className="max-w-xl text-lg leading-relaxed text-mist sm:text-xl">{v.hero.lead}</p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#booking"
                    className="group relative overflow-hidden rounded-xl bg-neon px-8 py-4 font-nocturne text-lg uppercase text-void transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">{v.hero.primaryCta}</span>
                    <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[420%] motion-reduce:hidden" />
                  </a>
                  <a
                    href="#process"
                    className="rounded-xl border border-white/20 px-8 py-4 font-nocturne text-lg uppercase transition-colors hover:border-neon hover:text-neon"
                  >
                    {v.hero.secondaryCta}
                  </a>
                </div>
                <p className="mt-4 text-sm text-mist">{v.hero.note}</p>
              </Reveal>

              <Reveal delay={0.4} y={30}>
                <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 lg:w-[22rem]">
                  <Image
                    src="/images/mood-energy.webp"
                    alt=""
                    width={1200}
                    height={800}
                    priority
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="h-56 w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-nocturne text-4xl text-neon">
                      <Counter to={coach.clientsServed} suffix="+" />
                    </p>
                    <p className="mt-1 text-sm text-mist">people who stopped circling</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Marquee */}
        <div className="overflow-hidden border-y border-white/10 bg-void-soft py-4">
          <ul className="marquee-track flex w-max items-center gap-10 pr-10">
            {[...marquee, ...marquee].map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-nocturne text-lg uppercase text-mist">{item}</span>
                <span aria-hidden className="size-1.5 rounded-full bg-neon" />
              </li>
            ))}
          </ul>
        </div>

        {/* --------------------------------------------------------------- About */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="micro-label text-neon">{v.sections.about}</p>
                <h2 className="mt-5 font-nocturne text-[2.4rem] uppercase sm:text-[3.4rem]">
                  I sat on the other side of the table for fourteen years.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 text-lg leading-relaxed text-mist">
                  HR director. I watched capable people stall because nobody had helped them work out
                  what they wanted. Then I retrained, and for twelve years I have been the person who
                  asks the question you have been dodging.
                </p>
              </Reveal>

              <Stagger className="mt-10 grid gap-3 sm:grid-cols-2" gap={0.08}>
                {credentials.map((item) => (
                  <StaggerItem key={item}>
                    <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-mist">
                      {item}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.15} y={30}>
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-plasma/40 via-transparent to-neon/30 blur-2xl" />
                <Image
                  src={coach.photo}
                  alt={`${coach.name}, life and career coach`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="w-full rounded-[1.75rem] border border-white/10 object-cover grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-void/80 p-4 backdrop-blur">
                  <p className="font-nocturne text-xl uppercase">{coach.name}</p>
                  <p className="mt-0.5 text-xs text-mist">{coach.credential}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ Services */}
        <section id="services" className="border-y border-white/10 bg-void-soft px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="micro-label text-neon">{v.sections.services}</p>
              <h2 className="mt-5 font-nocturne text-[2.4rem] uppercase sm:text-[3.4rem]">
                Three gears. Pick one.
              </h2>
            </Reveal>

            <Stagger className="mt-14 space-y-4" gap={0.1}>
              {services.map((service, index) => (
                <StaggerItem key={service.slug}>
                  <article className="group relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 p-7 transition-colors hover:border-neon/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10 sm:p-9">
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-neon/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <p className="font-nocturne text-5xl text-white/15 transition-colors duration-300 group-hover:text-neon sm:text-6xl">
                      0{index + 1}
                    </p>

                    <div>
                      <h3 className="font-nocturne text-2xl uppercase sm:text-3xl">{service.name}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                        {service.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
                      <div className="sm:text-right">
                        <p className="font-nocturne text-3xl text-neon">{service.priceLabel}</p>
                        <p className="text-xs text-mist">{service.cadence}</p>
                      </div>
                      <a
                        href="#booking"
                        className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold transition-colors group-hover:border-neon group-hover:bg-neon group-hover:text-void"
                      >
                        Book
                      </a>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ------------------------------------------------------------- Process */}
        <section id="process" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="micro-label text-neon">{v.sections.process}</p>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
              {process.map((step, index) => (
                <StaggerItem key={step.title} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1.5">
                    <span className="grid size-9 place-items-center rounded-lg bg-plasma/25 font-nocturne text-plasma">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 font-nocturne text-lg uppercase leading-tight">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{step.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* -------------------------------------------------------- Testimonials */}
        <section className="border-y border-white/10 bg-void-soft px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="micro-label text-neon">{v.sections.testimonials}</p>
              <h2 className="mt-5 font-nocturne text-[2.4rem] uppercase sm:text-[3.4rem]">
                What changed, specifically.
              </h2>
            </Reveal>

            <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.12}>
              {testimonials.map((item) => (
                <StaggerItem key={item.name} className="h-full">
                  <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7">
                    <p className="font-nocturne text-sm uppercase text-neon">{item.outcome}</p>
                    <blockquote className="mt-5 grow text-[0.95rem] leading-relaxed text-chalk/85">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                      <Image
                        src={item.photo}
                        alt=""
                        width={300}
                        height={300}
                        sizes="48px"
                        className="size-11 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-mist">{item.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ------------------------------------------------------------- Booking */}
        <section id="booking" className="relative overflow-hidden px-5 py-24 sm:px-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-plasma/20 blur-[130px]" />
          </div>

          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="micro-label text-neon">{v.sections.booking}</p>
                <h2 className="mt-5 font-nocturne text-[2.6rem] uppercase leading-none sm:text-[3.6rem]">
                  Twenty minutes.
                  <br />
                  <span className="text-neon">Free.</span>
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
                  Pick a session, take a slot, and I confirm by email the same day. If I am not the
                  right coach for this, I will tell you in that first call.
                </p>
              </Reveal>

              <Stagger className="mt-10 space-y-4" gap={0.08}>
                {faq.slice(0, 3).map((item) => (
                  <StaggerItem key={item.q}>
                    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                      <summary className="cursor-pointer list-none font-semibold marker:hidden">
                        <span className="flex items-center justify-between gap-4">
                          {item.q}
                          <span
                            aria-hidden
                            className="text-neon transition-transform duration-200 group-open:rotate-45"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-mist">{item.a}</p>
                    </details>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1} y={30}>
              <BookingWidget theme={bookingTheme} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-nocturne text-2xl uppercase">{coach.name}</p>
          <p className="text-sm text-mist">
            {coach.credential} · {coach.location} ·{" "}
            <a href={`mailto:${coach.email}`} className="text-neon hover:underline">
              {coach.email}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
