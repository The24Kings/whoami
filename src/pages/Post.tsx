import { useParams, useRouteLoaderData } from "react-router-dom";
import { Converter } from "showdown";
import hljs from "highlight.js";

import type { SectionData } from "../Types";

import "highlight.js/styles/atom-one-dark.css";
import './Post.css';

// Showdown markdown converter
const converter = new Converter({
    ghMentions: true,
    ghCodeBlocks: true,
    openLinksInNewWindow: true,
    customizedHeaderId: true,
    extensions: [{
        type: 'lang',
        regex: /\[([^\]]+)]\(\)/g,
        replace: '<a href="">$1</a>'
    }]
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

    if (!post) return <p>Post not found.</p>;

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