import type { MetaDescriptor } from 'react-router';
import type { PostResp, SectionData } from '../types';

/** Normalize the result of an `import.meta.glob` markdown import into PostResp[] */
export function normalizePosts(
    modules: Record<string, Omit<PostResp, 'slug'>>,
    stripPrefix: string,
): PostResp[] {
    return Object.entries(modules).map(([path, data]) => ({
        slug: path.replace(stripPrefix, ''),
        ...data,
        metadata: { tags: [], ...data.metadata },
    }));
}

/** Runtime guard for loader data shaped like SectionData. */
export function isSectionData(data: unknown): data is SectionData {
    return (
        typeof data === 'object' &&
        data !== null &&
        'posts' in data &&
        Array.isArray((data as SectionData).posts)
    );
}

/** Find a post by slug within (possibly untyped) section loader data. */
export function findPostBySlug(data: unknown, slug: string | undefined): PostResp | undefined {
    if (!slug || !isSectionData(data)) return undefined;
    return data.posts.find(p => p.slug === slug);
}

/** Build document <meta> for a post/page, falling back to a title when fields are missing. */
export function postMeta(post: PostResp | undefined, fallbackTitle: string): MetaDescriptor[] {
    const title = post?.metadata.title?.trim() || fallbackTitle;
    const desc = post?.metadata.desc?.trim();
    const image = post?.metadata.image?.trim();

    const description: MetaDescriptor[] = desc ? [
        { name: 'description', content: desc },
        { property: 'og:description', content: desc },
    ] : [];

    const imageMeta: MetaDescriptor[] = image ? [
        { property: 'og:image', content: image },
        { name: 'twitter:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
    ] : [];

    return [
        { title: `${title} | The24Kings@portfolio` },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'article' },
        ...description,
        ...imageMeta,
    ];
}
