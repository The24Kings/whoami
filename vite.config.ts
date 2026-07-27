import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import matter from "gray-matter";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { renderToHtml } from "./app/lib/markdown.node";
import { CONTENT_ROOT } from "./app/lib/sections";

/** Query suffix that requests the rendered body instead of just the frontmatter. */
const CONTENT_QUERY = "content";

/**
 * Compiles Markdown at build time so markdown-it, highlight.js and KaTeX never
 * reach the browser.
 *
 * Each `.md` file resolves to one of two module shapes:
 *   `foo.md`          -> `export const metadata` (frontmatter only, small)
 *   `foo.md?content`  -> `export const html`     (rendered, its own lazy chunk)
 *
 * Keeping them separate lets catalog globs pull metadata eagerly while article
 * bodies stay in chunks that are only fetched when a page is actually visited.
 */
function markdownPlugin() {
  return {
    name: "markdown-compiler",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      const [filePath, query] = id.split("?");
      if (!filePath.endsWith(".md")) return;

      const { data, content } = matter(code);

      if (query === CONTENT_QUERY) {
        // Directory relative to the content root, used to resolve relative links.
        const dir = relative(CONTENT_ROOT, dirname(filePath)).replace(
          /\\/g,
          "/",
        );

        return {
          code: `export const html = ${JSON.stringify(renderToHtml(content, { dir }))};`,
          map: null,
        };
      }

      return {
        code: `export const metadata = ${JSON.stringify(data)};`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [reactRouter(), markdownPlugin()],
});
