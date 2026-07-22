import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

import {
  isMarkdownFile,
  preRenderPaths,
  ROOT_ROUTE_PREFIX,
  PROJECT_ROUTE_PREFIX,
} from "./app/lib/site-catalog";

const rootSlugs = readdirSync("app/markdown").filter(isMarkdownFile);
const projectSlugs = readdirSync("app/markdown/projects").filter(
  isMarkdownFile,
);

export default {
  ssr: false,
  prerender: [
    ROOT_ROUTE_PREFIX,
    PROJECT_ROUTE_PREFIX,
    ...preRenderPaths(projectSlugs, PROJECT_ROUTE_PREFIX),
    ...preRenderPaths(rootSlugs, ROOT_ROUTE_PREFIX),
  ],
} satisfies Config;
