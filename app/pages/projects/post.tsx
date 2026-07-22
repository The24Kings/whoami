import { Link, useParams, useRouteLoaderData } from "react-router";
import type { MetaFunction } from "react-router";

import { useMemo } from "react";
import { Article } from "../../components/Article";
import { RouteId } from "../../lib/site-catalog";
import { findPageBySlug, genMetadata } from "../../lib/posts";
import { renderMarkdown } from "../../lib/markdown";

export const meta: MetaFunction = ({ params, matches }) => {
  const data = matches.find((m) => m.id === RouteId.projects)?.loaderData;
  const metadata = findPageBySlug(data, params.slug)?.metadata;
  return genMetadata(metadata, "Post not found");
};

function Error() {
  return (
    <Article>
      <h1 className="error">Post Not Found</h1>
      <p>
        <Link to="/projects">Back to projects</Link>
      </p>
    </Article>
  );
}

export default function Post() {
  const { slug } = useParams();
  const data = useRouteLoaderData(RouteId.projects);
  const post = findPageBySlug(data, slug);
  const content = useMemo(
    () => (post ? renderMarkdown(post.body) : null),
    [post],
  );

  if (!post) return <Error />;
  return <Article>{content}</Article>;
}
