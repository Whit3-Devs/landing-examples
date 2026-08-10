import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Karla, Space_Grotesk } from "next/font/google";

import { StyleSwitcher } from "@/components/StyleSwitcher";
import "./globals.css";

/** Landing 1 — editorial serif. */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Landing 1 — body. */
const karla = Karla({ variable: "--font-karla", subsets: ["latin"], display: "swap" });

/** Landing 2 — bold display and body. */
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });

/** Landing 3 — grotesque used for everything. */
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://landing-examples.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rowan Ellis — Life & Career Coaching",
    template: "%s",
  },
  description:
    "Three landing page treatments for the same life coaching practice: warm editorial, bold nocturne, and Swiss minimal.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${karla.variable} ${grotesk.variable} ${archivo.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <StyleSwitcher />
      </body>
    </html>
  );
}
