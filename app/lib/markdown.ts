import markdownit from 'markdown-it';
import markdownitfootnote from 'markdown-it-footnote';
import markdownItGithubAlerts from 'markdown-it-github-alerts';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import anchor from 'markdown-it-anchor';
import hljs from 'highlight.js';

const languageAliases: Record<string, string> = {
    'c#': 'csharp',
    'c++': 'cpp',
    'f#': 'fsharp',
};

function highlight(str: string, lang: string): string {
    const normalizedLang = languageAliases[lang?.toLowerCase()] ?? lang;
    if (normalizedLang && hljs.getLanguage(normalizedLang)) {
        try {
            return `<pre><code class="hljs language-${normalizedLang}">${hljs.highlight(str, { language: normalizedLang }).value}</code></pre>`;
        } catch { }
    }
    return md.utils.escapeHtml(str);
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
