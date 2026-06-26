import { isRouteErrorResponse, useRouteError } from 'react-router';
import type { MetaFunction } from 'react-router';
import SiteContainer from './layout';
import type { PostResp, SectionData } from './types';
import { normalizePosts } from './lib';
import { Article } from './components';

export { Layout } from './layout'; // Re-export for react-router

import './index.css';

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

function loadSite(): SectionData {
    const posts = import.meta.glob<Omit<PostResp, 'slug'>>(
        './markdown/*.md',
        { eager: true, import: 'default' }
    );

    return {
        posts: [
            { slug: 'projects', metadata: { title: 'Projects', date: '', desc: '' }, body: '' },
            ...normalizePosts(posts, './markdown/'),
        ],
        links: [
            { name: 'github', url: 'https://github.com/The24Kings' },
        ],
    };
}

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadSite;
export const clientLoader = loadSite;

export default function Root() {
    return <SiteContainer />;
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
        <SiteContainer>
            <Article>
                <h1 className="error">{heading}</h1>
                <p>{message}</p>
                <p><a href="/">Return home</a></p>
            </Article>
        </SiteContainer>
    );
}
