"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { variantList } from "@/content/variants";

/**
 * The demo control: a small fixed pill that switches between the three
 * landings. Deliberately neutral so it never reads as part of any one design,
 * and small enough to stay out of the way on a phone.
 */
export function StyleSwitcher() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const active = variantList.find((variant) => pathname === `/${variant.key}`);
  const shown = variantList.find((variant) => variant.key === hovered) ?? active;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4 sm:bottom-5">
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        {/* Name of the style you are looking at, or hovering over. */}
        <motion.p
          key={shown?.key ?? "none"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="hidden rounded-full bg-black/80 px-3 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur sm:block"
        >
          {shown ? `${shown.styleName} — ${shown.styleNote}` : "Three styles, one business"}
        </motion.p>

        <nav
          aria-label="Landing page style"
          className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <span className="px-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-black/45">
            Style
          </span>
          {variantList.map((variant, index) => {
            const isActive = pathname === `/${variant.key}`;
            return (
              <Link
                key={variant.key}
                href={`/${variant.key}`}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setHovered(variant.key)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-colors",
                  isActive ? "text-white" : "text-black/60 hover:text-black",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="switcher-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-black"
                  />
                )}
                <span className="tabular-nums">{index + 1}</span>
                <span className="ml-1.5 hidden sm:inline">{variant.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
