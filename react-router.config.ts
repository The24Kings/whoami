import type { Config } from "@react-router/dev/config";
import { Dirent, readdirSync } from "node:fs";
import { join } from "node:path";

import { CONTENT_ROOT, INDEX_FILE, SECTION_LIST } from "./app/lib/sections";

const SECTION_DIRS: ReadonlySet<string> = new Set(
  SECTION_LIST.map((section) => section.dir),
);

function isIndexFile(file: Dirent<string>): boolean {
  return file.isFile() && file.name === INDEX_FILE;
}

function isArticleFile(file: Dirent<string>): boolean {
  return file.isFile() && file.name.endsWith(".md") && file.name !== INDEX_FILE;
}

function joinPath(base: string, segment: string): string {
  return base === "/" ? `/${segment}` : `${base}/${segment}`;
}

function hasIndex(directory: string): boolean {
  return readdirSync(directory, { withFileTypes: true }).some(isIndexFile);
}

/**
 * Walk the content tree and collect every route that should be prerendered.
 *
 * Top-level `.md` files are served by the dynamic `:page` route.
 * Directories are different: they only become routes when declared in `SECTIONS`.
 * Undeclared files are a mistake worth failing on rather than silently resolving as a 404.
 */
function prerenderPaths(directory = CONTENT_ROOT, routePath = "/"): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });

  const files = entries.flatMap((entry) => {
    if (entry.isDirectory()) {
      const childDirectory = join(directory, entry.name);

      // Directories without an index.md aren't rendered as routes.
      if (!hasIndex(childDirectory)) return [];

      if (!SECTION_DIRS.has(entry.name)) {
        throw new Error(
          `Markdown directory "${entry.name}" has an ${INDEX_FILE} but is not declared in SECTIONS `,
        );
      }

      return prerenderPaths(childDirectory, joinPath(routePath, entry.name));
    }

    if (!isArticleFile(entry)) return [];

    return [joinPath(routePath, entry.name)];
  });

  return entries.some(isIndexFile) ? [routePath, ...files] : files;
}

export default { ssr: false, prerender: prerenderPaths() } satisfies Config;
