import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Card } from "../components";

import type { SectionData } from "../Types";

import './Projects.css';

function Projects() {
    const { posts } = useRouteLoaderData('projects') as SectionData;
    const navigate = useNavigate();

    const sorted = [...posts].sort((a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    return (
        <ul className="card-list">
            {sorted.map(post => (
                <Card key={post.slug} info={post.metadata} onClick={() => navigate(`/projects/${post.slug}`)}></Card>
            ))}
        </ul>
    );
}


export default Projects