import { useParams, useRouteLoaderData } from "react-router-dom";
import markdownit from 'markdown-it'
import markdownitfootnote from 'markdown-it-footnote'
import markdownItGithubAlerts from 'markdown-it-github-alerts'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import anchor from 'markdown-it-anchor'
import hljs from "highlight.js";

import type { SectionData } from "../Types";

import "highlight.js/styles/atom-one-dark.css";
import './Post.css';

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
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
        })
    })

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

    const markdownHTML = applyHighlighting(md.render(post.body));

    return (
        <>
            <div className="post">
                <div id="md-content" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
            </div>
        </>
    )
}

export default Post