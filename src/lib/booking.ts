/**
 * Booking contract and slot generation. Shared by the three landings — the
 * widget looks different on each one, the logic does not.
 *
 * Availability is derived from a hash of the date so it is stable: the same day
 * always shows the same open slots, on the server and in the browser, without
 * needing a database.
 */

import { slotTimes } from "@/content/coach";

export type BookingField = "service" | "date" | "time" | "name" | "email" | "note";

export type BookingState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<BookingField, string>>;
  /** Echoed back so the confirmation panel can restate the appointment. */
  booking?: { service: string; date: string; time: string; name: string };
};

export const initialBookingState: BookingState = { status: "idle" };

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Deterministic 32-bit hash — same input, same slots, every time. */
function hash(input: string) {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

export type Day = {
  /** ISO date, e.g. "2026-08-11" */
  iso: string;
  weekday: string;
  dayNumber: string;
  month: string;
  slots: string[];
};

function isoOf(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * The next `count` working days, starting tomorrow, each with its open slots.
 * Weekends are skipped: this is a coaching practice, not a call centre.
 */
export function availableDays(from: Date, count = 10): Day[] {
  const days: Day[] = [];
  const cursor = new Date(from);
  cursor.setUTCHours(12, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() + 1);

  while (days.length < count) {
    const weekday = cursor.getUTCDay();
    if (weekday !== 0 && weekday !== 6) {
      const iso = isoOf(cursor);
      const seed = hash(iso);
      // Between three and six of the eight slots are open on any given day.
      const open = slotTimes.filter((time, index) => (seed >> index) % 3 !== 0);
      days.push({
        iso,
        weekday: cursor.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
        dayNumber: cursor.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }),
        month: cursor.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
        slots: open.length >= 3 ? open : [...slotTimes].slice(0, 3),
      });
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

export function formatBookingDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
