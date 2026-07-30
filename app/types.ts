// Frontmatter parsed out of a Markdown post.
export type Metadata = {
  title: string;
  desc: string;
  image: string; // filepath
  date: string;
  tags?: string[];
  links?: ExternalLink[];
};

/** Lightweight catalog entry. Carries everything needed to list, sort, filter and link to a page.  */
export type Summary = {
  /** The URL-friendly identifier for the page, usually derived from the file name. */
  slug: string;
  /** The frontmatter metadata for the page. */
  metadata: Metadata;
};

/** A summary plus its build-rendered HTML, loaded on demand for a single page. */
export type PageDocument = Summary & {
  html: string;
};

/** External link metadata. */
export type ExternalLink = {
  /** The display name of the link. */
  name: string;
  /** The URL the link points to. */
  url: string;
  /** Optional display text shown instead of the raw URL. */
  alias?: string;
};

/** The browsable contents of a directory.  */
export type DirectoryContents = {
  pages: Summary[];
  links: ExternalLink[];
};

/** A section's contents resolved for the current URL, with the prefix to link them against. */
export type DirectoryNavigation = DirectoryContents & {
  /** The URL prefix to link the pages against. */
  base: string;
};

/** Loader data for a directory route: its contents plus its `index.md` frontmatter. */
export type SectionData = DirectoryContents & {
  index?: Metadata; // Used for root index metadata and links
};

/** Runtime guard for loader data shaped like SectionData. */
export function isSectionData(data: unknown): data is SectionData {
  return (
    typeof data === "object" &&
    data !== null &&
    "pages" in data &&
    Array.isArray((data as SectionData).pages) &&
    "links" in data &&
    Array.isArray((data as SectionData).links)
  );
}
