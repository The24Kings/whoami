import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

import { Article } from "~/components/Article";
import { INDEX_FILE, SECTIONS } from "~/lib/sections";
import { genMetadata } from "~/lib/metadata";
import { loadDocument } from "~/lib/site-catalog";

async function loadPage({ params }: LoaderFunctionArgs) {
  const page = params.page ?? INDEX_FILE;
  return { document: await loadDocument(SECTIONS.root.dir, page) };
}

// loader: runs at build time so prerendered pages ship complete HTML.
// clientLoader: runs in the browser for client-side navigation.
export const loader = loadPage;
export const clientLoader = loadPage;

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const metadata = loaderData?.document?.metadata;
  return genMetadata(metadata, "Page not found");
};

function NotFound() {
  return (
    <Article>
      <h1 className="error">Page not found</h1>
    </Article>
  );
}

export default function Page() {
  const { document } = useLoaderData();

  if (!document) return <NotFound />;
  return <Article html={document.html} />;
}
