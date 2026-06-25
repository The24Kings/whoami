import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';

import RootLayout from './layout';
import type { PostResp, SectionData } from './types';

import './index.css';
import './layout.css';

export function loader(): SectionData {
    const generalPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
        './markdown/*.md',
        { eager: true, import: 'default' }
    );

    const posts = Object.entries(generalPosts).map(([path, data]) => ({
        slug: path.replace('./markdown/', ''),
        ...data,
        metadata: { tags: [], ...data.metadata },
    }));

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
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>The24Kings@portfolio: ~ _&gt;</title>
                <Meta />
                <Links />
            </head>
            <body>
                <div id="root">
                    <RootLayout />
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
