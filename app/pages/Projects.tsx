import { useNavigate, useRouteLoaderData } from 'react-router';
import { Card } from '../components';
import { isSectionData } from '../lib';

import './Projects.css';
import { useSetCommand } from '../context';

export default function Projects() {
    const data = useRouteLoaderData('routes/projects');
    const posts = isSectionData(data) ? data.posts : [];
    const navigate = useNavigate();
    const setCommand = useSetCommand();

    const sorted = [...posts].sort((a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    return (
        <ul className="card-list">
            {sorted.map(post => (
                <Card
                    key={post.slug}
                    info={post.metadata}
                    onClick={() => {
                        setCommand(`cat ${post.slug}`)
                        navigate(`/projects/${post.slug}`)
                    }}
                />
            ))}
        </ul>
    );
}
