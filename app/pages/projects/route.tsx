import { Outlet } from "react-router";
import type { MetaFunction } from "react-router";

import type { SectionData } from "../../types";
import { findSectionIndex, genMetadata } from "../../lib/posts";
import { initSection, RouteId, type RouteInfo } from "../../lib/site-catalog";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === RouteId.projects)?.loaderData;
  return genMetadata(findSectionIndex(data), "Projects", "website");
};

function loadRoutes(): SectionData {
  const files = import.meta.glob<RouteInfo>("/app/markdown/projects/*.md", {
    eager: true,
    import: "default",
  });

  return initSection({ files });
}

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadRoutes;
export const clientLoader = loadRoutes;

// Parent data route: child routes consume this loader through RouteId.projects.
export default function ProjectsRoute() {
  return <Outlet />;
}
