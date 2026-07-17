import type { MetaFunction } from "react-router";

import { Article } from "../components";

export const meta: MetaFunction = () => [
  { title: "The24Kings@portfolio" },
  {
    name: "description",
    content: "Portfolio website by The24Kings showcasing projects and writing.",
  },
  { property: "og:title", content: "The24Kings@portfolio" },
  {
    property: "og:description",
    content: "Portfolio website by The24Kings showcasing projects and writing.",
  },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "The24Kings@portfolio" },
  { name: "twitter:card", content: "summary" },
  { name: "theme-color", content: "#007acc" }, // Discord embed color
];

export default function Home() {
  return (
    <Article>
      <h1>Welcome</h1>
    </Article>
  );
}
