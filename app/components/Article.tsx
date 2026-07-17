import type { ReactNode } from "react";
import { motion } from "motion/react";

import { fadeIn } from "../lib";

import "./Article.css";

interface ArticleProps {
  children: ReactNode;
}

/** Wraps page/post content in the shared article layout. */
export const Article = ({ children }: ArticleProps) => {
  return (
    <motion.div
      className="post"
      variants={fadeIn}
      initial={false}
      animate="animate"
    >
      <div id="md-content">{children}</div>
    </motion.div>
  );
};
