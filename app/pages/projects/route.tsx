import { Outlet } from "react-router";
import type { MetaFunction } from "react-router";

import type { SectionData } from "../../types";
import { createProjectSection, type ProjectModule } from "../../lib";

function loadProjects(): SectionData {
  const posts = import.meta.glob<ProjectModule>("/app/markdown/*.md", {
    eager: true,
    import: "default",
  });

  return createProjectSection(posts);
}

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadProjects;
export const clientLoader = loadProjects;

export const meta: MetaFunction = () => [
  { title: "Projects | The24Kings@portfolio" },
  { name: "description", content: "Projects by The24Kings." },
];

// Parent data route: child routes consume this loader through RouteId.projects.
export default function ProjectsRoute() {
  return <Outlet />;
}
