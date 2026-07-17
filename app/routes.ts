import { type RouteConfig, route, index } from "@react-router/dev/routes";

import { RouteId } from "./lib";

export default [
  index("pages/root.tsx"),
  route("projects", "pages/projects/layout.tsx", { id: RouteId.projects }, [
    index("pages/projects/index.tsx"),
    route(":slug", "pages/projects/post.tsx"),
  ]),
  route("about.md", "pages/about.tsx"),
  route("contact.md", "pages/contact.tsx"),
  route("*", "pages/error.tsx"),
] satisfies RouteConfig;
