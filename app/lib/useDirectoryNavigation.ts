import { useLocation, useRouteLoaderData } from "react-router";

import type { ExternalLink, PostResp, SectionData } from "../types";
import {
  PROJECT_ROUTE_PREFIX,
  ROOT_ROUTE_PREFIX,
  RouteId,
} from "./site-catalog";

export type DirectoryNavigation = {
  base: string;
  pages: PostResp[];
  links: ExternalLink[];
};

const EMPTY_DIRECTORY: DirectoryNavigation = {
  base: "",
  pages: [],
  links: [],
};

function directoryNavigation(
  base: string,
  section: SectionData,
): DirectoryNavigation {
  return { base, pages: section.pages, links: section.links };
}

/** Resolve the dropdown contents for routes that represent directories. */
export function useDirectoryNavigation(): DirectoryNavigation {
  const { pathname } = useLocation();
  const rootDirectory = useRouteLoaderData<SectionData>(RouteId.root);
  const projectsDirectory = useRouteLoaderData<SectionData>(RouteId.projects);

  const directoryPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  // Root directory
  if (directoryPath === ROOT_ROUTE_PREFIX && rootDirectory) {
    return directoryNavigation(ROOT_ROUTE_PREFIX, rootDirectory);
  }

  // Projects directory
  if (directoryPath === PROJECT_ROUTE_PREFIX && projectsDirectory) {
    return directoryNavigation(PROJECT_ROUTE_PREFIX, projectsDirectory);
  }

  return EMPTY_DIRECTORY;
}
