import type MarkdownIt from "markdown-it";

const TOP_LEVEL_PAGES = new Set(["about.md", "contact.md"]);

// Any URI scheme (http:, https:, mailto:, etc.) - leave external links untouched.
const SCHEME_RE = /^[a-z][a-z\d+.-]*:/i;

/**
 * Resolves a relative markdown filename (optionally with a `#fragment`) into the
 * corresponding site route, e.g. `budgetcraft.md#budgetcraft` -> `/projects/budgetcraft.md#budgetcraft`.
 */
function resolveHref(href: string): string {
  if (!href.includes(".md")) return href;
  if (SCHEME_RE.test(href)) return href;
  if (href.startsWith("//")) return href;

  const [pathPart, hash] = href.split("#");
  if (!pathPart.endsWith(".md")) return href;

  const filename = pathPart.split("/").pop()!;
  const base = TOP_LEVEL_PAGES.has(filename)
    ? `/${filename}`
    : `/projects/${filename}`;

  return hash ? `${base}#${hash}` : base;
}

/**
 * Rewrites relative links between markdown posts (e.g. `budgetcraft.md`, `./machine-learning.md#heading`)
 * into their absolute site routes.
 */
export function relativeLinks(md: MarkdownIt) {
  md.core.ruler.push("relative_links", (state) => {
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
