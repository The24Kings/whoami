import type MarkdownIt from "markdown-it";

export function subtext(md: MarkdownIt) {
    md.block.ruler.before('paragraph', 'subtext', (state, startLine, _, silent) => {
        const start = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];
        const line = state.src.slice(start, max);

        if (!line.startsWith('-# ')) return false;
        if (silent) return true;

        const content = line.slice(3).trim();

        let token = state.push('subtext_open', 'small', 1);
        token.attrSet('class', 'subtext');
        token.map = [startLine, startLine + 1];

        token = state.push('inline', '', 0);
        token.content = content;
        token.children = [];

        state.push('subtext_close', 'small', -1);

        state.line = startLine + 1;
        return true;
    });
}