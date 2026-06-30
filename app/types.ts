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
}

export type ExternalLink = {
    name: string;
    url: string;
};

// Defines the output of the `ls` command in NextPages
export type SectionData = {
    posts: PostResp[];
    links: ExternalLink[];
};