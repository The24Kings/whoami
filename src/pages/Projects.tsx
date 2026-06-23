import { Link, useRouteLoaderData } from "react-router-dom";
import type { PostResp } from "../Types";

function Projects() {
    const posts = useRouteLoaderData('projects') as PostResp[];

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