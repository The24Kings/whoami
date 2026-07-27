import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItGithubAlerts from "markdown-it-github-alerts";
import MarkdownItTaskLists from "markdown-it-task-lists";
import MarkdownItLinkAttributes from "markdown-it-link-attributes";
import anchor from "markdown-it-anchor";
import { katex } from "@mdit/plugin-katex";
import hljs from "highlight.js";

import { subtext, expandableImage, relativeLinks } from "../plugins";

const languageAliases: Record<string, string> = {
  "c#": "csharp",
  "c++": "cpp",
  "f#": "fsharp",
};

function highlight(str: string, lang: string): string {
  const normalizedLang = languageAliases[lang?.toLowerCase()] ?? lang;

  if (normalizedLang && hljs.getLanguage(normalizedLang)) {
    try {
      const escapedLang = MarkdownIt().utils.escapeHtml(normalizedLang);
      return `<pre><code class="hljs language-${escapedLang}">${hljs.highlight(str, { language: normalizedLang }).value}</code></pre>`;
    } catch {
      // Fall back to the escaped, unhighlighted output below.
    }
  }
  return `<pre><code class="hljs">${MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
}

/** Build-time Markdown renderer. */
const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
})
  .use(MarkdownItFootnote)
  .use(MarkdownItGithubAlerts)
  .use(MarkdownItTaskLists)
  .use(MarkdownItLinkAttributes, {
    matcher: (href: string) => /^https?:\/\//.test(href),
    attrs: { target: "_blank", rel: "noopener noreferrer" },
  })
  .use(relativeLinks)
  .use(subtext)
  .use(expandableImage)
  .use(katex)
  .use(anchor, {
    permalink: anchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "after",
    }),
  });

/** Environment threaded through markdown-it so plugins know where a file lives. */
export type RenderEnv = {
  /** Directory name under the content root, or "" for a top-level page. */
  dir: string;
};

/** Render a Markdown source string to HTML at build time. */
export function renderToHtml(source: string, env: RenderEnv): string {
  return md.render(source, env);
}
