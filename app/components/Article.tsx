import { type ReactNode } from "react";
import { motion } from "motion/react";

import { fadeIn } from "../lib/animations";

import "./Article.css";
import { useGiscusDiscussion } from "~/lib/useGiscusDiscussion";

interface ArticleProps {
  children?: ReactNode;
  html?: string;
}

/** Wraps page/post content in the shared article layout. */
export const Article = ({ children, html }: ArticleProps) => {
  const commentsRef = useGiscusDiscussion();

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

      <div className="comments-container">
        <div className="comments-inner" ref={commentsRef} />
      </div>
    </motion.div>
  );
};
