import { Outlet } from 'react-router';
import type { MetaFunction } from 'react-router';
import type { PostResp, SectionData } from '../types';
import { normalizePosts } from '../lib';

function loadProjects(): SectionData {
    const posts = import.meta.glob<Omit<PostResp, 'slug'>>(
        '../markdown/projects/*.md',
        { eager: true, import: 'default' }
    );

    return {
        posts: normalizePosts(posts, '../markdown/projects/'),
        links: [],
    };
}

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadProjects;
export const clientLoader = loadProjects;

export const meta: MetaFunction = () => [
    { title: 'Projects | The24Kings@portfolio' },
    { name: 'description', content: 'Projects by The24Kings.' },
];

export default function ProjectsLayout() {
    return <Outlet />;
}
