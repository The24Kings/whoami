import { isRouteErrorResponse, useRouteError } from 'react-router';
import SiteContainer from './layout';
import type { SectionData } from './types';
import { Article } from './components';

export { Layout } from './layout'; // Re-export for react-router

import './index.css';

function loadSite(): SectionData {
    return {
        pages: [
            { slug: 'projects', metadata: { image: '', title: 'Projects', date: '', desc: '' }, body: '' },
            { slug: 'about.md', metadata: { image: '', title: 'About', date: '', desc: 'About The24Kings and this portfolio.' }, body: '' },
            { slug: 'contact.md', metadata: { image: '', title: 'Contact', date: '', desc: 'How to get in touch with The24Kings.' }, body: '' },
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

export function HydrateFallback() {
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
