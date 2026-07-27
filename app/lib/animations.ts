import type { Transition, Variants } from "motion/react";

/** Shared easing for "settle in" motion across the site. */
export const easeOut: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

/** Slide-down + fade for the NextPages navigation panel. */
export const slideDown: Variants = {
  initial: { opacity: 0, y: -45 },
  animate: { opacity: 1, y: 0, transition: easeOut },
  exit: { opacity: 0, y: -45, transition: { duration: 0.18, ease: "easeIn" } },
};

/** Container that staggers its motion children as they enter. */
export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: {},
};

/** Small fade/slide for individual staggered list entries. */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0, transition: easeOut },
  exit: { opacity: 0, y: -6, transition: { duration: 0.02 } },
};

/** Fade up for cards and page content as they mount / filter in. */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: easeOut },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

/** Reusable interaction scales for hover/tap. */
export const hoverScale = { scale: 1.01 };
export const tapScale = { scale: 0.99 };
