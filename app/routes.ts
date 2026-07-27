import { type RouteConfig, route, index } from "@react-router/dev/routes";

import { SECTIONS } from "./lib/sections";

// Shorthand for formatting.
const projects = SECTIONS.projects;

export default [
  index("pages/page.tsx", { id: "home" }),
  route(":page", "pages/page.tsx", { id: "page" }),
  route(projects.path, "pages/projects/route.tsx", { id: projects.id }, [
    index("pages/projects/index.tsx"),
    route(":slug", "pages/projects/post.tsx"),
  ]),
  route("*", "pages/error.tsx"),
] satisfies RouteConfig;
