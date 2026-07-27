import type { MetaDescriptor } from "react-router";

import { isSectionData, type Metadata } from "~/types";

/** Site name appended to page titles and used as the default title. */
const SITE_NAME = "The24Kings@portfolio";

/** Read the section index content from possibly untyped loader data. */
export function findSectionIndex(data: unknown): Metadata | undefined {
  return isSectionData(data) ? data.index : undefined;
}

/** Normalize a front matter date to ISO 8601. */
function publishedTime(date?: string): string | undefined {
  const trimmed = date?.trim();
  if (!trimmed) return undefined;

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

/** Build document <meta> for a post/page. */
export function genMetadata(
  meta?: Metadata,
  fallbackTitle = SITE_NAME,
): MetaDescriptor[] {
  const pageTitle = meta?.title?.trim();
  const title = pageTitle || fallbackTitle;
  const desc = meta?.desc?.trim();
  const image = meta?.image?.trim();
  const documentTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : title;

  const published = publishedTime(meta?.date);
  const tags = meta?.tags?.map((tag) => tag.trim()).filter(Boolean) ?? [];
  const isArticle = published || tags.length > 0; // Good indicator that this is a blog post or project page, not a generic page.

  const publishedMeta: MetaDescriptor[] = published
    ? [{ property: "article:published_time", content: published }]
    : [];

  const tagsMeta: MetaDescriptor[] = tags.map((tag) => ({
    property: "article:tag",
    content: tag,
  }));

  const description: MetaDescriptor[] = desc
    ? [
        { name: "description", content: desc },
        { property: "og:description", content: desc },
      ]
    : [];

  const imageMeta: MetaDescriptor[] = image
    ? [
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
      ]
    : [];

  const articleMeta: MetaDescriptor[] = isArticle
    ? [...publishedMeta, ...tagsMeta]
    : [];

  return [
    { title: documentTitle },
    { property: "og:title", content: title },
    { property: "og:type", content: isArticle ? "article" : "website" },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary" },
    { name: "theme-color", content: "#007acc" }, // Discord embed color
    ...description,
    ...imageMeta,
    ...articleMeta,
  ];
}
