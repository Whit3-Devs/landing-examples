import type { Metadata } from "next";
import Image from "next/image";

import { bio, coach, credentials, faq, process, services, testimonials } from "@/content/coach";
import { variants } from "@/content/variants";
import { BookingWidget, type BookingTheme } from "@/components/booking/BookingWidget";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";

const v = variants["landing-1"];

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/landing-1" },
  openGraph: { title: v.meta.title, description: v.meta.description, url: "/landing-1" },
};

/* -------------------------------------------------------------------------- */
/* Warm editorial: cream paper, clay and sage, serif headlines, soft motion.  */
/* -------------------------------------------------------------------------- */

const bookingTheme: BookingTheme = {
  panel: "flex flex-col gap-6 rounded-[2rem] border border-clay-soft bg-cream p-6 sm:p-8",
  heading: "font-editorial text-bark",
  muted: "text-bark-muted",
  stepLabel: "micro-label text-clay",
  chip: "rounded-2xl border border-clay-soft bg-shell/60 px-4 py-3 text-sm text-bark transition-colors hover:border-clay/50",
  chipActive: "rounded-2xl border border-clay bg-clay px-4 py-3 text-sm text-cream transition-colors",
  field:
    "w-full rounded-2xl border border-clay-soft bg-shell/50 px-4 py-3 text-sm text-bark outline-none transition-colors placeholder:text-bark-muted/70 focus:border-clay",
  submit:
    "w-full rounded-full bg-bark px-6 py-4 font-editorial text-lg text-cream transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60",
  summary:
    "flex items-center justify-between gap-4 rounded-2xl border border-dashed border-clay/40 bg-shell/40 px-5 py-4 text-bark",
  error: "mt-1.5 text-xs font-semibold text-clay",
  successPanel: "rounded-[2rem] border border-sage/40 bg-sage-soft p-8 text-bark",
  successIcon: "grid size-12 place-items-center rounded-full bg-sage text-cream",
  divider: "h-px bg-clay-soft/70",
};

export default function LandingOne() {
  return (
    <div className="bg-cream font-[family-name:var(--font-editorial-body)] text-bark selection:bg-clay-soft">
      <main id="main">
        {/* ---------------------------------------------------------------- Hero */}
        <section className="relative overflow-hidden px-5 pt-14 pb-20 sm:px-8 sm:pt-20 lg:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="animate-drift-slow absolute -left-40 -top-32 size-[36rem] rounded-full bg-clay-soft/50 blur-3xl" />
            <div className="animate-drift-slow absolute -right-32 top-40 size-[28rem] rounded-full bg-sage-soft/70 blur-3xl [animation-delay:-8s]" />
          </div>

          <div className="mx-auto max-w-[1120px]">
            <Reveal blur>
              <p className="micro-label text-clay">{v.hero.eyebrow}</p>
            </Reveal>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
              <div>
                <h1 className="font-editorial text-[2.7rem] sm:text-[3.8rem] lg:text-[4.6rem]">
                  {v.hero.headline.map((line, index) => (
                    <Reveal key={line} as="span" className="block" delay={0.08 + index * 0.12} blur y={30}>
                      {index === 1 ? (
                        <span className="relative inline-block">
                          {line}
                          <svg
                            aria-hidden
                            viewBox="0 0 400 14"
                            preserveAspectRatio="none"
                            className="absolute -bottom-2 left-0 h-3 w-full text-clay/60"
                          >
                            <path
                              d="M3 9c90-6 220-8 394-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        line
                      )}
                    </Reveal>
                  ))}
                </h1>

                <Reveal delay={0.34}>
                  <p className="mt-9 max-w-xl text-lg leading-relaxed text-bark-muted sm:text-xl">
                    {v.hero.lead}
                  </p>
                </Reveal>

                <Reveal delay={0.44}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <a
                      href="#booking"
                      className="group inline-flex items-center gap-3 rounded-full bg-bark px-7 py-4 text-cream transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span className="font-editorial text-lg">{v.hero.primaryCta}</span>
                      <span className="grid size-6 place-items-center rounded-full bg-cream/15 transition-transform duration-300 group-hover:translate-x-1">
                        <svg viewBox="0 0 20 20" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 10h11m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                    <a
                      href="#process"
                      className="text-base font-medium text-bark underline decoration-clay decoration-2 underline-offset-4 transition-colors hover:text-clay"
                    >
                      {v.hero.secondaryCta}
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-bark-muted">{v.hero.note}</p>
                </Reveal>
              </div>

              <Reveal delay={0.2} blur y={40}>
                <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
                  <Parallax distance={28}>
                    <Image
                      src={coach.photo}
                      alt={`${coach.name}, life and career coach`}
                      width={800}
                      height={1000}
                      priority
                      sizes="(max-width: 1024px) 80vw, 420px"
                      className="w-full rounded-t-[13rem] rounded-b-[2rem] object-cover"
                    />
                  </Parallax>
                  <div className="absolute -left-6 bottom-8 hidden w-40 rotate-[-4deg] rounded-2xl border border-clay-soft bg-cream/95 p-4 shadow-lg backdrop-blur sm:block">
                    <p className="font-editorial text-3xl text-clay">{coach.yearsCoaching}</p>
                    <p className="mt-1 text-xs leading-snug text-bark-muted">
                      years coaching, {coach.clientsServed}+ clients
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- About */}
        <section className="border-y border-clay-soft/60 bg-shell px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal blur>
              <div className="relative">
                <Image
                  src="/images/mood-warm.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="w-full rounded-[2rem] object-cover"
                />
                <Parallax distance={22} className="absolute -bottom-10 -right-6 w-44 sm:w-52">
                  <Image
                    src={coach.candid}
                    alt=""
                    width={1000}
                    height={750}
                    sizes="220px"
                    className="w-full rounded-2xl border-4 border-shell object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="micro-label text-sage">{v.sections.about}</p>
                <h2 className="mt-4 font-editorial text-[2.1rem] sm:text-[2.7rem]">
                  {coach.name}, {coach.credential}
                </h2>
              </Reveal>

              <div className="mt-7 space-y-5">
                {bio.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.05 * index}>
                    <p className="text-base leading-relaxed text-bark-muted sm:text-[1.075rem]">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2}>
                <ul className="mt-9 space-y-3 border-t border-clay-soft pt-7">
                  {credentials.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-bark">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Services */}
        <section id="services" className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <p className="micro-label text-clay">{v.sections.services}</p>
              <h2 className="mt-4 max-w-2xl font-editorial text-[2.1rem] sm:text-[2.9rem]">
                Three ways in, depending on how much you want to move.
              </h2>
            </Reveal>

            <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.12}>
              {services.map((service, index) => (
                <StaggerItem key={service.slug} className="h-full">
                  <article
                    className={`flex h-full flex-col rounded-[2rem] border p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                      index === 1
                        ? "border-bark bg-bark text-cream"
                        : "border-clay-soft bg-shell/70 text-bark"
                    }`}
                  >
                    <p className={`micro-label ${index === 1 ? "text-clay-soft" : "text-sage"}`}>
                      {service.cadence}
                    </p>
                    <h3 className="mt-4 font-editorial text-[1.7rem]">{service.name}</h3>
                    <p className={`mt-1 text-sm italic ${index === 1 ? "text-cream/70" : "text-bark-muted"}`}>
                      {service.tagline}
                    </p>
                    <p className={`mt-5 text-sm leading-relaxed ${index === 1 ? "text-cream/80" : "text-bark-muted"}`}>
                      {service.description}
                    </p>

                    <ul className="mt-6 space-y-2 text-sm">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden className={index === 1 ? "text-clay-soft" : "text-clay"}>
                            —
                          </span>
                          <span className={index === 1 ? "text-cream/85" : "text-bark"}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`mt-auto flex items-end justify-between gap-4 border-t pt-6 ${
                        index === 1 ? "border-cream/20" : "border-clay-soft"
                      }`}
                    >
                      <div>
                        <p className="font-editorial text-3xl">{service.priceLabel}</p>
                        <p className={`text-xs ${index === 1 ? "text-cream/60" : "text-bark-muted"}`}>
                          {service.duration} minutes per session
                        </p>
                      </div>
                      <a
                        href="#booking"
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          index === 1
                            ? "bg-cream text-bark hover:bg-clay-soft"
                            : "bg-bark text-cream hover:bg-clay"
                        }`}
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
        <section id="process" className="border-y border-clay-soft/60 bg-sage-soft/50 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <p className="micro-label text-sage">{v.sections.process}</p>
              <h2 className="mt-4 font-editorial text-[2.1rem] sm:text-[2.7rem]">
                No mystery about it.
              </h2>
            </Reveal>

            <Stagger className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2" gap={0.1}>
              {process.map((step, index) => (
                <StaggerItem key={step.title} className="flex gap-6">
                  <span className="font-editorial text-[2.6rem] leading-none text-clay/40">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-editorial text-[1.4rem]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bark-muted sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* -------------------------------------------------------- Testimonials */}
        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <p className="micro-label text-clay">{v.sections.testimonials}</p>
            </Reveal>

            <div className="mt-12 space-y-16">
              {testimonials.map((item, index) => {
                const mirrored = index % 2 === 1;
                return (
                <Reveal key={item.name} blur delay={0.05 * index}>
                  <figure
                    className={`grid items-center gap-8 sm:gap-10 ${
                      mirrored ? "sm:grid-cols-[1fr_auto]" : "sm:grid-cols-[auto_1fr]"
                    }`}
                  >
                    <Image
                      src={item.photo}
                      alt={`${item.name}`}
                      width={300}
                      height={300}
                      sizes="128px"
                      className={`size-24 rounded-full object-cover sm:size-32 ${
                        mirrored ? "sm:order-2" : ""
                      }`}
                    />
                    <div className={mirrored ? "sm:order-1 sm:text-right" : ""}>
                      <blockquote className="font-editorial text-[1.5rem] leading-snug sm:text-[1.9rem]">
                        “{item.quote}”
                      </blockquote>
                      <figcaption className="mt-5 text-sm text-bark-muted">
                        <span className="font-semibold text-bark">{item.name}</span> · {item.role}
                        <span className="mt-1 block text-xs text-sage">{item.outcome}</span>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Booking */}
        <section id="booking" className="border-t border-clay-soft/60 bg-shell px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="micro-label text-clay">{v.sections.booking}</p>
                <h2 className="mt-4 font-editorial text-[2.1rem] sm:text-[2.7rem]">
                  Let us start with twenty minutes.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-bark-muted">
                  Pick a session, choose a time that suits you, and I will confirm by email the same
                  day. If it turns out I am not the right fit, I will say so and point you elsewhere.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 space-y-4 border-t border-clay-soft pt-8 text-sm text-bark-muted">
                  <p>
                    <span className="font-semibold text-bark">Where</span>
                    <br />
                    {coach.location}
                  </p>
                  <p>
                    <span className="font-semibold text-bark">Or just write to me</span>
                    <br />
                    <a href={`mailto:${coach.email}`} className="underline decoration-clay underline-offset-4">
                      {coach.email}
                    </a>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-10 space-y-5">
                  {faq.slice(0, 2).map((item) => (
                    <li key={item.q}>
                      <p className="font-editorial text-lg">{item.q}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-bark-muted">{item.a}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1} blur>
              <BookingWidget theme={bookingTheme} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-bark px-5 py-12 text-cream/70 sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-editorial text-xl text-cream">{coach.name}</p>
          <p className="text-sm">
            {coach.credential} · {coach.location}
          </p>
        </div>
      </footer>
    </div>
  );
}
