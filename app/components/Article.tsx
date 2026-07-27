import type { ReactNode } from "react";
import { motion } from "motion/react";

import { fadeIn } from "../lib/animations";

import "./Article.css";

interface ArticleProps {
  children?: ReactNode;
  html?: string;
}

/** Wraps page/post content in the shared article layout. */
export const Article = ({ children, html }: ArticleProps) => {
  return (
    <motion.div
      className="post"
      variants={fadeIn}
      initial={false}
      animate="animate"
    >
      {html === undefined ? (
        <div id="md-content">{children}</div>
      ) : (
        <div id="md-content" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </motion.div>
  );
};
