import type { PostResp, SectionData } from "../types";

export type ProjectModule = Omit<PostResp, "slug">;

const PROJECT_ROUTE_PREFIX = "/projects/";

/** Determine whether a discovered file name belongs to the project catalog. */
export function isProjectMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

/** Convert a Markdown module path into the slug used by the projects route. */
function projectSlug(path: string): string {
  return path.split(/[\\/]/).at(-1) ?? path; // Get just the file name from the path, ignoring directories.
}

/** Build the public path for a project article slug. */
function projectPath(slug: string): string {
  return `${PROJECT_ROUTE_PREFIX}${slug}`;
}

/** Build the section data consumed by the projects route. */
export function createProjectSection(
  modules: Record<string, ProjectModule>,
): SectionData {
  return {
    pages: Object.entries(modules).map(([path, data]) => ({
      slug: projectSlug(path),
      ...data,
      metadata: { tags: [], ...data.metadata },
    })),
    links: [],
  };
}

/** Build static article paths from Markdown file names. */
export function projectPrerenderPaths(fileNames: Iterable<string>): string[] {
  return Array.from(fileNames, (fileName) => projectPath(fileName));
}