import { useParams, useRouteLoaderData } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useMemo } from 'react';
import { Article } from '../components';
import { findPostBySlug, postMeta, renderMarkdown } from '../lib';
import NoPost from './no-post';

export const meta: MetaFunction = ({ params, matches }) => {
    const data = matches.find(m => m.id === 'routes/projects')?.loaderData;
    return postMeta(findPostBySlug(data, params.slug), 'Post not found');
};

export default function Post() {
    const { slug } = useParams();
    const data = useRouteLoaderData('routes/projects');
    const post = findPostBySlug(data, slug);
    const content = useMemo(() => (post ? renderMarkdown(post.body) : null), [post]);

    if (!post) return <NoPost />;
    return <Article>{content}</Article>;
}
