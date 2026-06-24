import { Link, useRouteLoaderData } from "react-router-dom";
import type { SectionData } from "../Types";

function Projects() {
    const { posts } = useRouteLoaderData('projects') as SectionData;

    return (
        <ul>
            {posts.map(post => (
                <li key={post.slug}>
                    <Link to={`/projects/${post.slug}`}>{post.title}</Link>
                    <span>{post.date}</span>
                </li>
            ))}
        </ul>
    );
}


export default Projects