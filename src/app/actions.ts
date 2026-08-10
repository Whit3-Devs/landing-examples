"use server";

import { getService } from "@/content/coach";
import { emailPattern, type BookingField, type BookingState } from "@/lib/booking";

/**
 * Confirms an appointment request. Runs on the server so validation cannot be
 * skipped, while the pages themselves stay statically rendered.
 */
export async function bookAppointment(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Hidden field — bots fill it, people never see it.
  if (formData.get("referral_code")) {
    return { status: "success", message: "Thanks — check your inbox for the confirmation." };
  }

  const read = (field: BookingField) => String(formData.get(field) ?? "").trim();
  const values = {
    service: read("service"),
    date: read("date"),
    time: read("time"),
    name: read("name"),
    email: read("email"),
    note: read("note"),
  };

  const errors: Partial<Record<BookingField, string>> = {};

  const service = getService(values.service);
  if (!service) errors.service = "Choose which session you want.";
  if (!values.date) errors.date = "Pick a day.";
  if (!values.time) errors.time = "Pick a time.";
  if (!values.name) errors.name = "We need a name for the booking.";
  if (!values.email) errors.email = "We need an email to send the confirmation to.";
  else if (!emailPattern.test(values.email)) errors.email = "That email looks incomplete.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Almost there — check the highlighted fields.",
      errors,
    };
  }

  // TODO(delivery): create the calendar event and send the confirmation email
  // (Cal.com, Google Calendar, Resend…). Until that is wired, requests are
  // logged server-side so nothing is silently lost.
  console.info("[booking]", values);

  return {
    status: "success",
    message: `You are booked in. A confirmation is on its way to ${values.email}.`,
    booking: {
      service: service!.name,
      date: values.date,
      time: values.time,
      name: values.name,
    },
  };
}
