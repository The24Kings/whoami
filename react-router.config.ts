import type { Config } from "@react-router/dev/config";
import { Dirent, readdirSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = "app/markdown";

function isIndexFile(file: Dirent<string>): boolean {
  return file.isFile() && file.name === "index.md";
}

function isArticleFile(file: Dirent<string>): boolean {
  return file.isFile() && file.name.endsWith(".md") && file.name !== "index.md";
}

function joinPath(base: string, segment: string): string {
  return base === "/" ? `/${segment}` : `${base}/${segment}`;
}

function prerenderPaths(directory = CONTENT_ROOT, routePath = "/"): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const hasIndex = entries.some(isIndexFile);

  const files = entries.flatMap((entry) => {
    if (entry.isDirectory()) {
      // Ignore directories that don't have an index.md file, since they won't be rendered as a route in navigational components.
      const childDirectory = join(directory, entry.name);
      const childEntries = readdirSync(childDirectory, { withFileTypes: true });

      if (!childEntries.some(isIndexFile)) return [];

      // Recurse into the child directory to find all files that should be prerendered.
      const childRoute = joinPath(routePath, entry.name);
      return prerenderPaths(join(directory, entry.name), childRoute);
    }

    if (!isArticleFile(entry)) return [];

    return [joinPath(routePath, entry.name)];
  });

  return hasIndex ? [routePath, ...files] : files;
}

export default {
  ssr: false,
  prerender: prerenderPaths(),
} satisfies Config;
