import { useParams, useRouteLoaderData } from "react-router-dom";
import { Converter } from "showdown";
import type { PostResp } from "../Types";

import './Post.css';

function Post() {
    const generalPosts = useRouteLoaderData('root') as PostResp[];
    const projectPosts = useRouteLoaderData('projects') as PostResp[] | undefined;

    const { slug } = useParams();

    const converter = new Converter();

    // Settings
    converter.setFlavor("github");
    converter.setOption("openLinksInNewWindow", true);
    converter.setOption("moreStyling", true);
    converter.setOption("customizedHeaderId", true);

    const post = projectPosts?.find(p => p.slug === slug)
        ?? generalPosts.find(p => p.slug === slug);

    if (!post) return <p>Post not found.</p>;

    const markdownHTML = converter.makeHtml(post.body);

    return (
        <>
            <div className="post post-project">
                <div id="md-content" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
            </div>
        </>
    )
}

export default Post