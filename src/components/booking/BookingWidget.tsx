"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useId, useMemo, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import { services } from "@/content/coach";
import { bookAppointment } from "@/app/actions";
import {
  availableDays,
  formatBookingDate,
  initialBookingState,
  type Day,
} from "@/lib/booking";

/**
 * Class strings supplied by each landing. The booking logic is shared; only the
 * skin changes, so the three pages can look nothing alike without forking any
 * behaviour.
 */
export type BookingTheme = {
  panel: string;
  heading: string;
  muted: string;
  stepLabel: string;
  /** Applied when a chip is NOT selected. */
  chip: string;
  /**
   * Applied INSTEAD of `chip` when selected — not alongside it. Tailwind
   * resolves conflicting utilities by stylesheet order rather than attribute
   * order, so overlaying the two would make the winner unpredictable.
   */
  chipActive: string;
  field: string;
  submit: string;
  summary: string;
  error: string;
  successPanel: string;
  successIcon: string;
  divider: string;
};

/** No external store to watch — the snapshot alone tells us we are hydrated. */
const subscribeNever = () => () => {};

export function BookingWidget({ theme, className }: { theme: BookingTheme; className?: string }) {
  const [state, formAction, pending] = useActionState(bookAppointment, initialBookingState);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [serviceSlug, setServiceSlug] = useState(services[1].slug);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  // Dates depend on "today", which differs between build time and view time, so
  // the day strip renders only once hydrated. useSyncExternalStore gives the
  // server `false` and the client `true` without an effect.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  const days = useMemo<Day[]>(() => (mounted ? availableDays(new Date(), 8) : []), [mounted]);
  const selectedDay = days.find((day) => day.iso === dateIso) ?? null;
  const service = services.find((item) => item.slug === serviceSlug)!;

  // Choosing a different day drops a time that day does not offer.
  const chooseDay = (iso: string) => {
    setDateIso(iso);
    const day = days.find((item) => item.iso === iso);
    if (time && day && !day.slots.includes(time)) setTime(null);
  };

  if (state.status === "success" && state.booking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className={cn(theme.successPanel, className)}
      >
        <span className={theme.successIcon}>
          <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className={cn(theme.heading, "mt-5 text-2xl")}>You are booked in</h3>
        <dl className={cn("mt-5 space-y-2 text-sm", theme.muted)}>
          <div className="flex justify-between gap-6">
            <dt>Session</dt>
            <dd className="font-semibold">{state.booking.service}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt>When</dt>
            <dd className="font-semibold">
              {formatBookingDate(state.booking.date)} · {state.booking.time}
            </dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt>Name</dt>
            <dd className="font-semibold">{state.booking.name}</dd>
          </div>
        </dl>
        <p className={cn("mt-5 text-sm", theme.muted)}>{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className={cn(theme.panel, className)} noValidate>
      <input type="text" name="referral_code" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="service" value={serviceSlug} />
      <input type="hidden" name="date" value={dateIso ?? ""} />
      <input type="hidden" name="time" value={time ?? ""} />

      {/* Step 1 — which session */}
      <fieldset>
        <legend className={theme.stepLabel}>1 · Choose a session</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {services.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={serviceSlug === item.slug}
              onClick={() => setServiceSlug(item.slug)}
              className={cn(serviceSlug === item.slug ? theme.chipActive : theme.chip, "text-left")}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="mt-0.5 block text-xs opacity-70">
                {item.duration} min · {item.priceLabel}
              </span>
            </button>
          ))}
        </div>
        {state.errors?.service && <p className={theme.error}>{state.errors.service}</p>}
      </fieldset>

      <div className={theme.divider} />

      {/* Step 2 — which day */}
      <fieldset>
        <legend className={theme.stepLabel}>2 · Pick a day</legend>
        {mounted ? (
          <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {days.map((day) => (
              <button
                key={day.iso}
                type="button"
                aria-pressed={dateIso === day.iso}
                onClick={() => chooseDay(day.iso)}
                className={cn(
                  dateIso === day.iso ? theme.chipActive : theme.chip,
                  "shrink-0 text-center leading-tight",
                )}
              >
                <span className="block text-xs uppercase opacity-70">{day.weekday}</span>
                <span className="block text-lg font-semibold">{day.dayNumber}</span>
                <span className="block text-xs uppercase opacity-70">{day.month}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex gap-2" aria-hidden>
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className={cn(theme.chip, "h-[72px] w-16 shrink-0 animate-pulse opacity-40")} />
            ))}
          </div>
        )}
        {state.errors?.date && <p className={theme.error}>{state.errors.date}</p>}
      </fieldset>

      {/* Step 3 — which time */}
      <AnimatePresence initial={false}>
        {selectedDay && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={theme.divider} />
            <fieldset>
              <legend className={theme.stepLabel}>3 · Pick a time</legend>
              <p className={cn("mt-1 text-xs", theme.muted)}>
                {selectedDay.slots.length} slots open on {formatBookingDate(selectedDay.iso)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedDay.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={time === slot}
                    onClick={() => setTime(slot)}
                    className={cn(time === slot ? theme.chipActive : theme.chip, "tabular-nums")}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {state.errors?.time && <p className={theme.error}>{state.errors.time}</p>}
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={theme.divider} />

      {/* Step 4 — who you are */}
      <fieldset>
        <legend className={theme.stepLabel}>4 · Your details</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={id("name")} className="sr-only">
              Your name
            </label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(state.errors?.name)}
              className={theme.field}
            />
            {state.errors?.name && <p className={theme.error}>{state.errors.name}</p>}
          </div>
          <div>
            <label htmlFor={id("email")} className="sr-only">
              Email
            </label>
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              aria-invalid={Boolean(state.errors?.email)}
              className={theme.field}
            />
            {state.errors?.email && <p className={theme.error}>{state.errors.email}</p>}
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor={id("note")} className="sr-only">
            What would you like to work on?
          </label>
          <textarea
            id={id("note")}
            name="note"
            rows={3}
            placeholder="Optional — what would you like to work on?"
            className={cn(theme.field, "resize-y")}
          />
        </div>
      </fieldset>

      {/* Summary + submit */}
      <div className={theme.summary}>
        <div>
          <p className="text-sm font-semibold">{service.name}</p>
          <p className={cn("text-xs", theme.muted)}>
            {selectedDay && time
              ? `${formatBookingDate(selectedDay.iso)} at ${time}`
              : "Choose a day and time above"}
          </p>
        </div>
        <p className="text-lg font-bold tabular-nums">{service.priceLabel}</p>
      </div>

      <button type="submit" disabled={pending} className={theme.submit}>
        {pending ? "Confirming…" : "Confirm booking"}
      </button>

      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(theme.error, "text-center")}
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
