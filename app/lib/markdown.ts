import markdownit from 'markdown-it';
import markdownitfootnote from 'markdown-it-footnote';
import markdownItGithubAlerts from 'markdown-it-github-alerts';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import anchor from 'markdown-it-anchor';
import hljs from 'highlight.js';
import parse from 'html-react-parser';
import type { ReactNode } from 'react';

const languageAliases: Record<string, string> = {
    'c#': 'csharp',
    'c++': 'cpp',
    'f#': 'fsharp',
};

function highlight(str: string, lang: string): string {
    const normalizedLang = languageAliases[lang?.toLowerCase()] ?? lang;

    if (normalizedLang && hljs.getLanguage(normalizedLang)) {
        try {
            const escapedLang = md.utils.escapeHtml(normalizedLang);
            return `<pre><code class="hljs language-${escapedLang}">${hljs.highlight(str, { language: normalizedLang }).value}</code></pre>`;
        } catch {
            // Fall back to the escaped, unhighlighted output below.
        }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
}

export const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight,
})
    .use(markdownitfootnote)
    .use(markdownItGithubAlerts)
    .use(markdownItTaskLists)
    .use(markdownItLinkAttributes, {
        matcher: (href: string) => /^https?:\/\//.test(href),
        attrs: { target: '_blank', rel: 'noopener noreferrer' },
    })
    .use(anchor, {
        permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'before',
        }),
    });

/** Render a markdown string into React nodes. */
export function renderMarkdown(body: string): ReactNode {
    return parse(md.render(body));
}
