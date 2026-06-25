import { Outlet } from 'react-router';
import type { PostResp, SectionData } from '../types';

export function loader(): SectionData {
    const projectsPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
        '../markdown/projects/*.md',
        { eager: true, import: 'default' }
    );

    const posts = Object.entries(projectsPosts).map(([path, data]) => ({
        slug: path.replace('../markdown/projects/', ''),
        ...data,
        metadata: { tags: [], ...data.metadata },
    }));

    return {
        posts,
        links: [],
    };
}

export default function ProjectsLayout() {
    return <Outlet />;
}
