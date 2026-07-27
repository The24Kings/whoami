import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

import { Article } from "~/components/Article";
import { SECTIONS } from "~/lib/sections";
import { genMetadata } from "~/lib/metadata";
import { loadDocument } from "~/lib/site-catalog";

async function loadPost({ params }: LoaderFunctionArgs) {
  const post = params.slug;
  return { document: await loadDocument(SECTIONS.projects.dir, post) };
}

// loader: runs at build time so prerendered posts ship complete HTML.
// clientLoader: runs in the browser for client-side navigation.
export const loader = loadPost;
export const clientLoader = loadPost;

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const metadata = loaderData?.document?.metadata;
  return genMetadata(metadata, "Post not found");
};

function NotFound() {
  return (
    <Article>
      <h1 className="error">Post Not Found</h1>
      <p>
        <Link to={`/${SECTIONS.projects.path}`}>Back to projects</Link>
      </p>
    </Article>
  );
}

export default function Post() {
  const { document } = useLoaderData();

  if (!document) return <NotFound />;
  return <Article html={document.html} />;
}
