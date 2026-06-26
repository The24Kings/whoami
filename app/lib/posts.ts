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
