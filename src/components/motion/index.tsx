"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* Reveal — the shared entrance. Each landing tunes distance and blur so the   */
/* motion vocabulary differs even though the mechanism does not.              */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  blur = false,
  duration = 0.6,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  duration?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0,
        y: reduced ? 0 : y,
        filter: blur && !reduced ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: reduced ? 0.2 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: reduced ? 0 : gap, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const itemReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.2 } },
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Tag className={className} variants={reduced ? itemReduced : itemVariants}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Parallax — moves a block against the scroll. Used for the warm landing's   */
/* imagery.                                                                   */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(y, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y: smooth }}>{children}</motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ScrollProgress — a hairline that fills as the page scrolls (landing 2).    */
/* -------------------------------------------------------------------------- */

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn("fixed inset-x-0 top-0 z-[75] h-[3px] origin-left", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* LineReveal — each line slides up from behind a mask (landing 3).           */
/* -------------------------------------------------------------------------- */

export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  // The trigger lives on the wrapper, never on the moving line. Each line starts
  // translated fully out of its own overflow-hidden box, and IntersectionObserver
  // clips against that ancestor — so a line watching itself reports 0% visible,
  // never animates, and stays hidden for good. The wrapper is not transformed,
  // so it is always observable.
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: reduced ? 0 : "110%" },
              shown: {
                y: "0%",
                transition: {
                  duration: reduced ? 0.2 : 0.75,
                  delay: reduced ? 0 : delay + index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* Counter — counts up once in view (landing 2 and 3 stat rows).              */
/* -------------------------------------------------------------------------- */

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.6"] });
  const value = useTransform(scrollYProgress, [0, 1], [0, to]);
  const rounded = useTransform(value, (latest) => Math.round(latest).toLocaleString("en-US"));

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? to.toLocaleString("en-US") : <motion.span>{rounded}</motion.span>}
      {suffix}
    </span>
  );
}
