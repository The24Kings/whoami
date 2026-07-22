import { useLocation, useMatches } from "react-router";

import type { ExternalLink, PostResp, SectionData } from "../types";
import { isSectionData } from "./posts";
import { normalizeUrlPath } from "./site-catalog";

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

/** Resolve the dropdown contents for routes that represent directories. */
export function useDirectoryNavigation(): DirectoryNavigation {
  const { pathname } = useLocation();
  const sections = useMatches().filter((m) => isSectionData(m.loaderData));

  const currentSection = sections.at(-1);

  if (!currentSection) {
    return EMPTY_DIRECTORY;
  }

  const currentPath = normalizeUrlPath(pathname);
  const sectionPath = normalizeUrlPath(currentSection.pathname);

  if (currentPath !== sectionPath) {
    return EMPTY_DIRECTORY;
  }

  const section = currentSection.loaderData as SectionData;

  return {
    base: sectionPath === "/" ? "" : sectionPath,
    pages: section.pages,
    links: section.links,
  };
}
