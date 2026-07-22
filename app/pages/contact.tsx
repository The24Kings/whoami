import type { MetaFunction } from "react-router";

import { Article } from "../components/Article";
import { RouteId } from "../lib/site-catalog";
import { findPageBySlug, genMetadata } from "../lib/posts";

export const meta: MetaFunction = ({ matches }) => {
  const data = matches.find((m) => m.id === RouteId.root)?.loaderData;
  const metadata = findPageBySlug(data, "contact.md")?.metadata;
  return genMetadata(metadata, "Contact");
};

export default function Contact() {
  return (
    <Article>
      <h1>Contact</h1>
    </Article>
  );
}
