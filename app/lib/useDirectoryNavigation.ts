import { useLocation, useMatches } from "react-router";

import { isSectionData } from "~/types";
import type { DirectoryNavigation, SectionData } from "~/types";
import { normalizePath } from "./site-catalog";

const EMPTY_DIRECTORY: DirectoryNavigation = {
  base: "",
  pages: [],
  links: [],
};

/** Normalize a URL path by replacing backslashes with forward slashes and removing trailing slashes. */
function normalizeUrlPath(path: string): string {
  return normalizePath(path).replace(/\/+$/, "") || "/";
}

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
