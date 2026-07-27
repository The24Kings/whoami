declare module "markdown-it-task-lists";

/**
 * Markdown files are compiled by the Vite plugin in vite.config.ts into two
 * module shapes: frontmatter by default, and the build-rendered body when
 * imported with the `?content` query.
 */
declare module "*.md" {
  export const metadata: import("./types").Metadata;
}

declare module "*.md?content" {
  export const html: string;
}
