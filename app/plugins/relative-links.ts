import type MarkdownIt from "markdown-it";

import { INDEX_FILE, SECTION_LIST } from "../lib/sections";

// Any URI scheme (http:, https:, mailto:, etc.) - leave external links untouched.
const SCHEME_RE = /^[a-z][a-z\d+.-]*:/i;

/** Resolve `./`, `../` and bare segments into a normalized content-relative path. */
function resolveContentPath(dir: string, href: string): string {
  const segments = dir ? dir.split("/") : [];

  for (const segment of href.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") segments.pop();
    else segments.push(segment);
  }

  return segments.join("/");
}

/** Map a content-relative Markdown path onto the site route that renders it. */
function toRoute(contentPath: string): string {
  const segments = contentPath.split("/");
  const fileName = segments.pop() ?? "";
  const dir = segments.join("/");
  const section = SECTION_LIST.find((section) => section.dir === dir);

  // A section's index.md is rendered at the section root, not as a file route.
  if (fileName === INDEX_FILE) return section ? `/${section.path}` : "/";

  return section ? `/${section.path}/${fileName}` : `/${fileName}`;
}

/**
 * Rewrites relative links between markdown posts (e.g. `budgetcraft.md`,
 * `./machine-learning.md#heading`, `../about.md`) into absolute site routes,
 * resolved against the directory of the file currently being rendered.
 */
export function relativeLinks(md: MarkdownIt) {
  md.core.ruler.push("relative_links", (state) => {
    const dir = typeof state.env?.dir === "string" ? state.env.dir : "";

    const resolveHref = (href: string): string => {
      if (!href.includes(".md")) return href;
      if (SCHEME_RE.test(href)) return href;
      if (href.startsWith("/")) return href;

      const [pathPart, hash] = href.split("#");
      if (!pathPart.endsWith(".md")) return href;

      const base = toRoute(resolveContentPath(dir, pathPart));
      return hash ? `${base}#${hash}` : base;
    };

    for (const blockToken of state.tokens) {
      if (blockToken.type !== "inline" || !blockToken.children) continue;

      for (const token of blockToken.children) {
        if (token.type !== "link_open") continue;

        const href = token.attrGet("href");
        if (href) token.attrSet("href", resolveHref(href));
      }
    }

    return true;
  });
}
