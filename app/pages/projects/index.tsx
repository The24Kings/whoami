import { useNavigate, useRouteLoaderData } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { Card } from "./Card";
import type { SectionData } from "../../types";
import { RouteId } from "../../lib/site-catalog";
import { useCommandContext } from "../../lib/useCommandContext";
import { useTagFilter } from "../../lib/useTagFilter";
import { fadeIn } from "../../lib/animations";

import "./projects.css";

export default function Projects() {
  const data = useRouteLoaderData<SectionData>(RouteId.projects);
  const navigate = useNavigate();
  const setCommand = useCommandContext();
  const { active } = useTagFilter();

  const posts = data?.pages ?? [];
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  const visible = sorted.filter((p) =>
    active.every((t) => p.metadata.tags?.includes(t)),
  );

  return (
    <ul className="card-list">
      <AnimatePresence mode="sync">
        {visible.map((post) => (
          <motion.li
            key={post.slug}
            layout
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card
              info={post.metadata}
              onClick={() => {
                setCommand(`cat ${post.slug}`);
                navigate(`/projects/${post.slug}`);
              }}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
