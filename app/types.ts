// Parsed output of a given markdown post
export type PostResp = {
  slug: string;
  metadata: PostMetadata;
  body: string; // markdown or HTML
};

export type PostMetadata = {
  image: string; // filepath
  title: string;
  date: string;
  tags?: string[];
  desc: string;
  links?: ExternalLink[];
};

export type ExternalLink = {
  name: string;
  url: string;
};

// Used to build the section data consumed by the shell component
export type SectionData = {
  index?: PostMetadata; // Used for root index metadata and links
  pages: PostResp[];
  links: ExternalLink[];
};
