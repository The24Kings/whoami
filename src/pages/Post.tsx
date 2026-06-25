import { useParams, useRouteLoaderData } from "react-router-dom";
import { Converter } from "showdown";
import hljs from "highlight.js";

import type { SectionData } from "../Types";

import "highlight.js/styles/atom-one-dark.css";
import './Post.css';

// Converts [text]() (empty href) to plain anchor tags
const emptyLinkExtension = {
    type: 'lang' as const,
    regex: /\[([^\]]+)]\(\)/g,
    replace: '<a href="">$1</a>',
};

// Converts GitHub-style alert blockquotes: > [!NOTE], > [!TIP], etc.
const githubAlertsExtension = {
    type: 'output' as const,
    filter(text: string): string {
        return text.replace(
            /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*<br\s*\/?>)?([\s\S]*?)<\/blockquote>/gi,
            (_, type: string, rest: string) => {
                const lower = type.toLowerCase();
                const title = type[0] + type.slice(1).toLowerCase();
                let content = rest.trim();

                if (content.startsWith('</p>')) content = content.slice(4).trim();
                else if (content) content = content.endsWith('</p>') ? `<p>${content}` : `<p>${content}</p>`;
                return `<blockquote class="markdown-alert markdown-alert-${lower}"><p class="markdown-alert-title">${title}</p>${content}</blockquote>`;
            }
        );
    },
};

// Showdown markdown converter
const converter = new Converter({
    ghMentions: true,
    ghCodeBlocks: true,
    openLinksInNewWindow: true,
    customizedHeaderId: true,
    extensions: [emptyLinkExtension, githubAlertsExtension],
});
converter.setFlavor("github");

// Language aliases
const languageAliases: Record<string, string> = {
    'c#': 'csharp',
    'c++': 'cpp',
    'f#': 'fsharp',
};

function applyHighlighting(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    doc.querySelectorAll<HTMLElement>('pre code[class*="language-"]').forEach((block) => {
        for (const [alias, lang] of Object.entries(languageAliases)) {
            block.classList.replace(`language-${alias}`, `language-${lang}`);
        }
        hljs.highlightElement(block);
    });
    return doc.body.innerHTML;
}

function Post() {
    const { posts: generalPosts } = useRouteLoaderData('root') as SectionData;
    const projectSection = useRouteLoaderData('projects') as SectionData | undefined;
    const projectPosts = projectSection?.posts;

    const { slug } = useParams();

    const post = projectPosts?.find(p => p.slug === slug)
        ?? generalPosts.find(p => p.slug === slug);

    if (!post) return <div className="post"><h1>Post not found.</h1></div>;

    const markdownHTML = applyHighlighting(converter.makeHtml(post.body));

    return (
        <>
            <div className="post">
                <div id="md-content" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
            </div>
        </>
    )
}

export default Post