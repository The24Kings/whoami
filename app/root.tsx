import { isRouteErrorResponse, useRouteError } from 'react-router';
import type { MetaFunction } from 'react-router';
import SiteLayout from './layout';
import type { PostResp, SectionData } from './types';
import { normalizePosts } from './lib/posts';

export { Layout } from './layout'; // Re-export for react-router

import './index.css';
import './layout.css';

export const meta: MetaFunction = () => [
    { title: 'The24Kings@portfolio: ~ _>' },
    {
        name: 'description',
        content: 'Portfolio website by The24Kings showcasing projects and writing.',
    },
    { property: 'og:title', content: 'The24Kings@portfolio' },
    {
        property: 'og:description',
        content: 'Portfolio website by The24Kings showcasing projects and writing.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'The24Kings@portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'theme-color', content: '#007acc' }, // Discord embed color
];

export function loader(): SectionData {
    const generalPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
        './markdown/*.md',
        { eager: true, import: 'default' }
    );

    const posts = normalizePosts(generalPosts, './markdown/');

    return {
        posts: [
            { slug: 'projects', metadata: { title: 'Projects', date: '', desc: '' }, body: '' },
            ...posts,
        ],
        links: [
            { name: 'github', url: 'https://github.com/The24Kings' },
        ],
    };
}

export default function Root() {
    return <SiteLayout />;
}

export function ErrorBoundary() {
    const error = useRouteError();

    let heading = 'Something went wrong';
    let message = 'An unexpected error occurred.';

    if (isRouteErrorResponse(error)) {
        heading = `${error.status} ${error.statusText}`;
        message = error.data || message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <SiteLayout>
            <div className="post">
                <h1 className="error">{heading}</h1>
                <p>{message}</p>
                <p><a href="/">Return home</a></p>
            </div>
        </SiteLayout>
    );
}
