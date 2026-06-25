export type PostResp = {
    slug: string;
    metadata: PostMetadata;
    body: string; // markdown or HTML
};

export type PostMetadata = {
    title: string;
    date: string;
    tags?: string[];
    desc: string;
}

export type ExternalLink = {
    name: string;
    url: string;
};

export type SectionData = {
    posts: PostResp[];
    links: ExternalLink[];
};