import type { PostResp, SectionData } from "../types";

/**
 * Strongly typed route IDs for use in the application. These IDs are used
 * to identify different routes in the application and can be used for
 * navigation, routing, and other purposes.
 */
export const RouteId = {
  root: "root",
  projects: "projects",
};

export type RouteInfo = Omit<PostResp, "slug">;

export type SectionOptions = {
  files: Record<string, RouteInfo>;
  folders?: Record<string, RouteInfo>;
};

export const INDEX_FILE = "index.md";

export const ROOT_ROUTE_PREFIX = "/";
export const PROJECT_ROUTE_PREFIX = "/projects/";

/** Determine whether a discovered file name is the index file; marking the section to render as a folder. */
export function isIndexFile(fileName: string): boolean {
  return slug(fileName) === INDEX_FILE;
}

/** Determine whether a discovered file name belongs to the project catalog. */
export function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

/** Convert a Markdown module path into the slug used by the projects route. */
function slug(path: string): string {
  return normalizePath(path).split("/").at(-1) ?? path; // Get just the file name from the path, ignoring directories.
}

function folder(path: string): string {
  return normalizePath(path).split("/").at(-2) ?? path;
}

/** Build the section data consumed by the projects route. */
export function initSection({
  files,
  folders = {},
}: SectionOptions): SectionData {
  // Shorthand for filtering out the index file from the list of entries.
  const isIndex = (entry: PostResp) => isIndexFile(entry.slug);
  const isNotIndex = (entry: PostResp) => !isIndexFile(entry.slug);

  const fileEntries = createFileEntries(files);
  const folderEntries = createDirectoryEntries(folders);
  const index = fileEntries.find(isIndex);

  return {
    index: fileEntries.find(isIndex)?.metadata,
    pages: [...folderEntries, ...fileEntries.filter(isNotIndex)],
    links: index?.metadata.links ?? [],
  };
}

export function createFileEntries(
  routes: Record<string, RouteInfo>,
): PostResp[] {
  return Object.entries(routes).map(([path, data]) => ({
    slug: slug(path),
    ...data,
    metadata: { tags: [], ...data.metadata },
  }));
}

/** Build navigation entries from child-directory index Markdown files. */
export function createDirectoryEntries(
  routes: Record<string, RouteInfo>,
): PostResp[] {
  return Object.entries(routes).map(([path, data]) => {
    return {
      slug: folder(path),
      ...data,
      metadata: { tags: [], ...data.metadata },
    };
  });
}

/** Build static article paths from Markdown file names. */
export function preRenderPaths(
  fileNames: Iterable<string>,
  basePath: string,
): string[] {
  return Array.from(fileNames)
    .filter((fileName) => !isIndexFile(fileName))
    .map((fileName) => `${basePath}${slug(fileName)}`);
}
