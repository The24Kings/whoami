import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItGithubAlerts from 'markdown-it-github-alerts';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItLinkAttributes from 'markdown-it-link-attributes';
import anchor from 'markdown-it-anchor';
import { katex } from '@mdit/plugin-katex';
import hljs from 'highlight.js';
import parse from 'html-react-parser';
import type { ReactNode } from 'react';

import { subtext, expandableImage } from '../plugins';

import './hljs-theme.css';
import 'katex/dist/katex.min.css';

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

export const md = MarkdownIt({
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
        attrs: { target: '_blank', rel: 'noopener noreferrer' },
    })
    .use(subtext)
    .use(expandableImage)
    .use(katex)
    .use(anchor, {
        permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'after',
        }),
    });

/** Render a markdown string into React nodes. */
export function renderMarkdown(body: string): ReactNode {
    return parse(md.render(body));
}
