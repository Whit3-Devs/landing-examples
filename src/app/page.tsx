import { redirect } from "next/navigation";

/** The demo opens on the first style; the switcher handles the rest. */
export default function RootPage() {
  redirect("/landing-1");
}
