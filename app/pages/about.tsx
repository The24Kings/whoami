import type { MetaFunction } from "react-router";

import { Article } from "../components/Article";
import { RouteId } from "../lib/site-catalog";
import { findPageBySlug, genMetadata } from "../lib/posts";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === RouteId.root)?.loaderData;
  const metadata = findPageBySlug(data, "about.md")?.metadata;
  return genMetadata(metadata, "About");
};

export default function About() {
  return (
    <Article>
      <h1>About</h1>
    </Article>
  );
}
