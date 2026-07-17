import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

const projectSlugs = readdirSync("app/markdown").filter((f) =>
  f.endsWith(".md"),
);

export default {
  ssr: false,
  prerender: [
    "/",
    "/projects",
    ...projectSlugs.map((s) => `/projects/${s}`),
    "/about.md",
    "/contact.md",
  ],
} satisfies Config;
