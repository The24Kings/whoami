import { Outlet } from 'react-router';
import type { MetaFunction } from 'react-router';
import type { PostResp, SectionData } from '../types';
import { normalizePosts } from '../lib';

export function loader(): SectionData {
    const projectsPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
        '../markdown/projects/*.md',
        { eager: true, import: 'default' }
    );

    return {
        posts: normalizePosts(projectsPosts, '../markdown/projects/'),
        links: [],
    };
}

export const meta: MetaFunction = () => [
    { title: 'Projects | The24Kings@portfolio' },
    { name: 'description', content: 'Projects by The24Kings.' },
];

export default function ProjectsLayout() {
    return <Outlet />;
}
