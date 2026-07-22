import type { MetaFunction } from "react-router";

import { Article } from "../components/Article";
import { findSectionIndex, genMetadata } from "../lib/posts";
import { RouteId } from "../lib/site-catalog";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === RouteId.root)?.loaderData;
  const metadata = findSectionIndex(data);
  return genMetadata(metadata, "The24Kings@portfolio", "website");
};

export default function Home() {
  return (
    <Article>
      <h1>Welcome</h1>
    </Article>
  );
}
