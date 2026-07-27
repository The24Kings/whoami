import type { PageDocument, Metadata, SectionData } from "~/types";
import type { Section } from "./sections";
import { CONTENT_ROOT, INDEX_FILE, ROOT_SECTION } from "./sections";

/**
 * The site catalog.
 *
 * Frontmatter for every Markdown file is inlined eagerly. Rendered bodies are compiled
 * at build time into separate modules that are only fetched when a page is
 * actually visited - see `loadDocument`.
 *
 * NOTE: Vite requires glob patterns to be string literals, so the content root
 * is spelled out below. It must stay in sync with `CONTENT_ROOT`.
 */

/** Prefix for module ids that point to Markdown content. */
const CONTENT_PREFIX = `/${CONTENT_ROOT}/`;

const metadataModules = import.meta.glob<Metadata>("/app/markdown/**/*.md", {
  eager: true,
  import: "metadata",
});

const contentModules = import.meta.glob<string>("/app/markdown/**/*.md", {
  query: "?content",
  import: "html",
});

/** A single entry in the site catalog. */
export type CatalogEntry = {
  /** Directory relative to the content root; `""` for top-level pages. */
  dir: string;
  /** File name, e.g. `lurk.md`. Used as the route slug. */
  slug: string;
  /** Path relative to the content root, e.g. `projects/lurk.md`. */
  path: string;
  /** Frontmatter parsed out of a Markdown post. */
  metadata: Metadata;
};

export function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

/** Strip the content root prefix off a module id. */
function contentRelative(id: string): string {
  const normalized = normalizePath(id);
  const at = normalized.indexOf(CONTENT_PREFIX);

  return at === -1
    ? normalized.replace(/^\/+/, "")
    : normalized.slice(at + CONTENT_PREFIX.length);
}

/** Determine whether a discovered file name is the index file, marking a folder. */
function isIndexFile(fileName: string): boolean {
  return fileName === INDEX_FILE;
}

function toEntry(id: string, metadata: Metadata): CatalogEntry {
  const path = contentRelative(id);
  const segments = path.split("/");
  const slug = segments.pop() ?? path;

  return {
    dir: segments.join("/"),
    slug,
    path,
    metadata: { tags: [], ...metadata },
  };
}

/** Every Markdown file on the site, keyed by its content-relative path. */
export const CATALOG: readonly CatalogEntry[] = Object.entries(
  metadataModules,
).map(([id, metadata]) => toEntry(id, metadata));

/** Whether `dir` is an immediate subdirectory of `parent`. */
function isChildDir(parent: string, dir: string): boolean {
  if (dir === parent) return false;
  if (parent !== "" && !dir.startsWith(`${parent}/`)) return false;

  const relative = parent === "" ? dir : dir.slice(parent.length + 1);
  return relative !== "" && !relative.includes("/");
}

/**
 * Build the navigation/listing data for one directory: its index frontmatter,
 * its child folders, and its sibling files. Works for any depth, so a new
 * section only needs a route entry, not new catalog code.
 */
export function getSection(section: Section = ROOT_SECTION): SectionData {
  const { dir } = section;

  const index = CATALOG.find(
    (entry) => entry.dir === dir && isIndexFile(entry.slug),
  );

  const folders = CATALOG.filter(
    (entry) => isIndexFile(entry.slug) && isChildDir(dir, entry.dir),
  ).map((entry) => ({
    slug: dir === "" ? entry.dir : entry.dir.slice(dir.length + 1),
    metadata: entry.metadata,
  }));

  const files = CATALOG.filter(
    (entry) => entry.dir === dir && !isIndexFile(entry.slug),
  ).map((entry) => ({
    slug: entry.slug,
    metadata: entry.metadata,
  }));

  return {
    index: index?.metadata,
    pages: [...folders, ...files],
    links: index?.metadata.links ?? [],
  };
}

/** Look up a catalog entry by directory and file name. */
function findEntry(dir: string, slug?: string): CatalogEntry | undefined {
  if (!slug) return undefined;
  return CATALOG.find((entry) => entry.dir === dir && entry.slug === slug);
}

/**
 * Fetch a single page's build-rendered HTML. The body lives in its own chunk,
 * so this is the only place a Markdown body enters the client.
 */
export async function loadDocument(
  dir: string,
  slug?: string,
): Promise<PageDocument | undefined> {
  const entry = findEntry(dir, slug);
  if (!entry) return undefined;

  const load = contentModules[`${CONTENT_PREFIX}${entry.path}`];
  if (!load) return undefined;

  return { slug: entry.slug, metadata: entry.metadata, html: await load() };
}
