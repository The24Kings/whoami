import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

import { isProjectMarkdownFile, projectPrerenderPaths } from "./app/lib";

const projectSlugs = readdirSync("app/markdown").filter(isProjectMarkdownFile);

export default {
  ssr: false,
  prerender: [
    "/",
    "/projects",
    ...projectPrerenderPaths(projectSlugs),
    "/about.md",
    "/contact.md",
  ],
} satisfies Config;
