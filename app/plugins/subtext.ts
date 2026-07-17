import type MarkdownIt from "markdown-it";
import type StateBlock from "markdown-it/lib/rules_block/state_block.mjs";

const PREFIX = "-# ";

function lineText(state: StateBlock, line: number): string {
  return state.src.slice(
    state.bMarks[line] + state.tShift[line],
    state.eMarks[line],
  );
}

// A caption is centered when it immediately follows a paragraph containing only an image.
// Inline children aren't parsed yet at this point in block parsing, so the raw paragraph
// content is matched against an image-only pattern instead of inspecting `children`.
function followsImage(state: StateBlock): boolean {
  const tokens = state.tokens;
  const prevClose = tokens[tokens.length - 1];
  const prevInline = tokens[tokens.length - 2];

  return (
    prevClose?.type === "paragraph_close" &&
    prevInline?.type === "inline" &&
    /^!\[[^\]]*\]\([^)]*\)\s*$/.test(prevInline.content)
  );
}

export function subtext(md: MarkdownIt) {
  md.block.ruler.before(
    "paragraph",
    "subtext",
    (state, startLine, endLine, silent) => {
      if (!lineText(state, startLine).startsWith(PREFIX)) return false;
      if (silent) return true;

      // Merge consecutive `-# ` lines into a single caption block so a multiline caption
      // isn't split across several elements (which would break image-caption detection
      // for every line after the first).
      const lines: string[] = [];
      let line = startLine;
      while (line < endLine && lineText(state, line).startsWith(PREFIX)) {
        lines.push(lineText(state, line).slice(PREFIX.length).trim());
        line++;
      }

      const className = followsImage(state)
        ? "subtext subtext-caption"
        : "subtext";

      let token = state.push("subtext_open", "p", 1);
      token.attrSet("class", className);
      token.map = [startLine, line];

      token = state.push("inline", "", 0);
      token.content = lines.join("<br>");
      token.children = [];

      state.push("subtext_close", "p", -1);

      state.line = line;
      return true;
    },
  );
}
