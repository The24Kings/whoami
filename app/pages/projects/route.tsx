import { Outlet } from "react-router";
import type { MetaFunction } from "react-router";

import { findSectionIndex, genMetadata } from "~/lib/metadata";
import { SECTIONS } from "~/lib/sections";
import { getSection } from "~/lib/site-catalog";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === SECTIONS.projects.id)?.loaderData;
  return genMetadata(findSectionIndex(data), "Projects");
};

const loadRoutes = () => getSection(SECTIONS.projects);

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadRoutes;
export const clientLoader = loadRoutes;

// Parent data route: child routes consume this loader through RouteId.projects.
export default function ProjectsRoute() {
  return <Outlet />;
}
