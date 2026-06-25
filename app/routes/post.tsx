import { useParams, useRouteLoaderData } from 'react-router';
import { md } from '../lib/markdown';

import type { SectionData } from '../types';

import 'highlight.js/styles/atom-one-dark.css';
import './post.css';

export default function Post() {
    const { posts: generalPosts } = useRouteLoaderData('root') as SectionData;
    const projectSection = useRouteLoaderData('routes/projects') as SectionData | undefined;
    const projectPosts = projectSection?.posts;

    const { slug } = useParams();

    const post =
        projectPosts?.find(p => p.slug === slug) ??
        generalPosts.find(p => p.slug === slug);

    if (!post) return <div className="post"><h1>Post not found.</h1></div>;

    const markdownHTML = md.render(post.body);

    return (
        <>
            <div className="post">
                <div id="md-content" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
            </div>
        </>
    );
}
