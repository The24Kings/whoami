import { useNavigate, useRouteLoaderData } from 'react-router';
import { Card } from '../components';
import { useSetCommand } from '../context';
import { isSectionData, useTagFilter } from '../lib';

import './Projects.css';

export default function Projects() {
    const data = useRouteLoaderData('routes/projects');
    const posts = isSectionData(data) ? data.posts : [];
    const navigate = useNavigate();
    const setCommand = useSetCommand();
    const { active } = useTagFilter();

    const sorted = [...posts].sort((a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    const visible = sorted.filter(p => active.every(t => p.metadata.tags?.includes(t)));

    return (
        <ul className="card-list">
            {visible.map(post => (
                <li>
                    <Card
                        key={post.slug}
                        info={post.metadata}
                        onClick={() => {
                            setCommand(`cat ${post.slug}`)
                            navigate(`/projects/${post.slug}`)
                        }}
                    />
                </li>
            ))}
        </ul>
    );
}
