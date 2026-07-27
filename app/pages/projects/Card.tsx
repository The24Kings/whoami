import React from "react";
import { motion } from "motion/react";

import type { Metadata } from "~/types";
import { useTagFilter } from "~/lib/useTagFilter";
import { useCommandContext } from "~/lib/useCommandContext";
import { hoverScale, tapScale } from "~/lib/animations";

import "./Card.css";

export interface CardProps {
  info: Metadata;
  onClick?: () => void;
}

function onKeyDown(e: React.KeyboardEvent, onClick?: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick?.();
  }
}

export const Card = ({ info, onClick }: CardProps) => {
  const { active, toggleTag } = useTagFilter();
  const setCommand = useCommandContext();
  const date = info.date?.split("T")[0];
  const src = info.image?.trim();

  const tags = info.tags ?? [];
  const sorted = [...tags].sort((a, b) => a.localeCompare(b));

  const onTagSelect = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    const next = toggleTag(tag);
    setCommand(next.length ? next.map((t) => `grep ${t}`).join(" | ") : "");
  };

  return (
    <motion.div
      className="card"
      whileHover={hoverScale}
      whileTap={tapScale}
      onClick={onClick}
    >
      {src && (
        <div className="img">
          <img src={src} alt={info.title} />
        </div>
      )}
      <div className="body">
        {/* Only the title is focusable, so tags stay reachable without nesting
            interactive elements inside a clickable card. */}
        <h2 className="title">
          <button
            type="button"
            className="title-action"
            aria-label={`View ${info.title}`}
            onClick={onClick}
            onKeyDown={(e) => onKeyDown(e, onClick)}
          >
            {info.title}
          </button>
        </h2>
        <time className="date" dateTime={info.date}>
          {date}
        </time>
        <pre className="desc">
          <code>{info.desc}</code>
        </pre>
        <blockquote className="tags">
          {sorted?.map((tag) => (
            <button
              key={tag}
              type="button"
              className={active.includes(tag) ? "tag active" : "tag"}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => onTagSelect(e, tag)}
            >
              {tag}
            </button>
          ))}
        </blockquote>
      </div>
    </motion.div>
  );
};
