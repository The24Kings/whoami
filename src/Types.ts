export type PostResp = {
    slug: string;
    title: string;
    date: string;
    tags?: string[];
    body: string; // markdown or HTML
};