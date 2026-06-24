export type PostResp = {
    slug: string;
    title: string;
    date: string;
    tags?: string[];
    body: string; // markdown or HTML
};

export type ExternalLink = {
    name: string;
    url: string;
};

export type SectionData = {
    posts: PostResp[];
    links: ExternalLink[];
};