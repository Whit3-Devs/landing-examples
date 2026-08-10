"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { variantList } from "@/content/variants";

/**
 * The demo control: a fixed bar that switches between the three landings.
 * Dark and solid on purpose — it has to stay legible over a cream page, a
 * near-black page and a white page, and it has to be obvious enough that a
 * first-time viewer notices there is more than one design to look at.
 */
export function StyleSwitcher() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const active = variantList.find((variant) => pathname === `/${variant.key}`);
  const shown = variantList.find((variant) => variant.key === hovered) ?? active;

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-3 sm:pb-5">
      <div className="pointer-events-auto w-full max-w-[min(34rem,100%)] overflow-hidden rounded-2xl bg-[#0b0b0f] shadow-[0_10px_40px_-6px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.12)]">
        {/* Which style you are looking at, or hovering over. */}
        <motion.p
          key={shown?.key ?? "none"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="hidden px-4 pt-2.5 text-center text-[0.7rem] leading-tight text-white/55 sm:block"
        >
          {shown?.styleNote}
        </motion.p>

        <nav aria-label="Landing page style" className="flex items-stretch gap-1.5 p-2">
          <span className="hidden shrink-0 items-center px-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40 sm:flex">
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
                  "relative flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors sm:px-4",
                  isActive ? "text-[#0b0b0f]" : "text-white/65 hover:bg-white/10 hover:text-white",
                )}
              >
                {/* The pill and the label are both positioned, so DOM order —
                    not z-index — decides what paints on top. A negative z-index
                    here would drop the pill behind the bar's own background,
                    since the bar creates no stacking context. */}
                {isActive && (
                  <motion.span
                    layoutId="switcher-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-white"
                  />
                )}
                <span
                  className={cn(
                    "relative grid size-5 shrink-0 place-items-center rounded-full text-[0.7rem] tabular-nums",
                    isActive ? "bg-[#0b0b0f] text-white" : "bg-white/15 text-white/80",
                  )}
                >
                  {index + 1}
                </span>
                <span className="relative">{variant.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
