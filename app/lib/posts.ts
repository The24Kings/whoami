import type { MetaDescriptor } from "react-router";

import type { PostMetadata, PostResp, SectionData } from "../types";

/** Runtime guard for loader data shaped like SectionData. */
export function isSectionData(data: unknown): data is SectionData {
  return (
    typeof data === "object" &&
    data !== null &&
    "pages" in data &&
    Array.isArray((data as SectionData).pages)
  );
}

/** Read the section index content from possibly untyped loader data. */
export function findSectionIndex(data: unknown): PostMetadata | undefined {
  return isSectionData(data) ? data.index : undefined;
}

/** Find a post by slug within (possibly untyped) section loader data. */
export function findPageBySlug(
  data: unknown,
  slug: string | undefined,
): PostResp | undefined {
  if (!slug || !isSectionData(data)) return undefined;
  return data.pages.find((p) => p.slug === slug);
}

/** Build document <meta> for a post/page, falling back to a title when fields are missing. */
export function genMetadata(
  meta?: PostMetadata,
  fallbackTitle = "",
  type: "article" | "website" = "article",
): MetaDescriptor[] {
  const title = meta?.title?.trim() || fallbackTitle;
  const desc = meta?.desc?.trim();
  const image = meta?.image?.trim();

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

  return [
    { title: `${title} | The24Kings@portfolio` },
    { property: "og:title", content: title },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "The24Kings@portfolio" },
    { name: "twitter:card", content: "summary" },
    { name: "theme-color", content: "#007acc" }, // Discord embed color
    ...description,
    ...imageMeta,
  ];
}
