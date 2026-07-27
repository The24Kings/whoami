/** Single source of truth for the site's content layout. */
export type Section = {
  /** Route id used with `useRouteLoaderData` to reach this section's loader. */
  id: string;
  /** URL path segment, e.g. `projects` -> `/projects`. */
  path: string;
  /** Directory under `CONTENT_ROOT` holding this section's Markdown files. */
  dir: string;
};

/** Directory (relative to the project root) holding every Markdown source file. */
export const CONTENT_ROOT = "app/markdown";

/** File name that marks a directory as a browsable section. */
export const INDEX_FILE = "index.md";

/** Route id for the root route, which owns the top-level page catalog. */
const ROOT_ROUTE_ID = "root";

/** The implicit top-level section: `app/markdown/*.md` served from `/`. */
export const ROOT_SECTION: Section = {
  id: ROOT_ROUTE_ID,
  path: "",
  dir: "",
};

/**
 * Explicitly declared sub-level sections. Top-level `.md` files are routed
 * dynamically and need no entry here; a directory must be listed to be routed.
 */
export const SECTIONS: Record<string, Section> = {
  root: ROOT_SECTION,
  projects: { id: "projects", path: "projects", dir: "projects" },
};

export const SECTION_LIST: readonly Section[] = Object.values(SECTIONS);
