import type { MetaFunction } from "react-router";

import { Article } from "../components";
import { findPostBySlug, postMeta, RouteId } from "../lib";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === RouteId.root)?.loaderData;
  return postMeta(findPostBySlug(data, "about.md"), "About");
};

export default function About() {
  return (
    <Article>
      <h1>About</h1>
    </Article>
  );
}
