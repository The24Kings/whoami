import { useParams, useRouteLoaderData } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useMemo } from 'react';
import { Article } from '../components';
import { findPostBySlug, postMeta, renderMarkdown } from '../lib';
import NoPage from './no-page';

import 'highlight.js/styles/atom-one-dark.css';

export const meta: MetaFunction = ({ params, matches }) => {
    const data = matches.find(m => m.id === 'root')?.loaderData;
    return postMeta(findPostBySlug(data, params.slug), 'Not found');
};

export default function Page() {
    const { slug } = useParams();
    const data = useRouteLoaderData('root');
    const post = findPostBySlug(data, slug);
    const content = useMemo(() => (post ? renderMarkdown(post.body) : null), [post]);

    if (!post) return <NoPage />;
    return <Article>{content}</Article>;
}
