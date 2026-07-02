import type MarkdownIt from "markdown-it";

/**
 * Deterministic id derived from the image src, used to link an image to its lightbox overlay.
 */
function toId(src: string): string {
    return src.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Renders images as a click-to-expand lightbox using a plain anchor/`:target` pair.
 */
export function expandableImage(md: MarkdownIt) {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet('src') ?? '';
        const title = token.attrGet('title');
        const alt = self.renderInlineAsText(token.children ?? [], options, env);

        const srcAttr = md.utils.escapeHtml(src);
        const altAttr = md.utils.escapeHtml(alt);
        const titleAttr = title ? ` title="${md.utils.escapeHtml(title)}"` : '';
        const id = `lightbox-${toId(src)}`;

        return `<a class="expandable-img-trigger" href="#${id}">`
            + `<img src="${srcAttr}" alt="${altAttr}"${titleAttr} loading="lazy" />`
            + `</a>`
            + `<a href="#" class="expandable-img-overlay" id="${id}">`
            + `<img src="${srcAttr}" alt="${altAttr}"${titleAttr} />`
            + `</a>`;
    };
}
