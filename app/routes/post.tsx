import { useParams, useRouteLoaderData } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useMemo } from 'react';
import { isSectionData, md } from '../lib';
import type { SectionData } from '../types';

import 'highlight.js/styles/atom-one-dark.css';
import './post.css';

function findPost(slug: string | undefined, ...sections: (SectionData | undefined)[]) {
    if (!slug) return undefined;
    for (const section of sections) {
        const match = section?.posts.find(p => p.slug === slug);
        if (match) return match;
    }
    return undefined;
}

export const meta: MetaFunction = ({ params, matches }) => {
    const slug = params.slug;
    const sections = matches
        .map(m => m.loaderData)
        .filter(isSectionData);
    const post = slug
        ? sections.flatMap(s => s.posts).find(p => p.slug === slug)
        : undefined;

    const title = post?.metadata.title ?? slug?.replace(/\.md$/, '') ?? 'Post';
    const description = post?.metadata.desc;

    return [
        { title: `${title} | The24Kings@portfolio` },
        ...(description
            ? [
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:type', content: 'article' },
            ]
            : []),
    ];
};

export default function Post() {
    const rootData = useRouteLoaderData('root');
    const projectData = useRouteLoaderData('routes/projects');

    const generalPosts = isSectionData(rootData) ? rootData : undefined;
    const projectPosts = isSectionData(projectData) ? projectData : undefined;

    const { slug } = useParams();

    const post = findPost(slug, projectPosts, generalPosts);

    const markdownHTML = useMemo(
        () => (post ? md.render(post.body) : ''),
        [post]
    );

    if (!post) return <div className="post"><h1>Post not found.</h1></div>;

    return (
        <>
            <div className="post">
                <div id="md-content" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
            </div>
        </>
    );
}
