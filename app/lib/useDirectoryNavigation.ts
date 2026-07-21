import { useLocation, useRouteLoaderData } from "react-router";

import type { ExternalLink, PostResp, SectionData } from "../types";
import { RouteId } from ".";

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

  if (pathname === "/" && rootDirectory) {
    return directoryNavigation("", rootDirectory);
  }

  if (pathname === "/projects" && projectsDirectory) {
    return directoryNavigation("/projects", projectsDirectory);
  }

  return EMPTY_DIRECTORY;
}