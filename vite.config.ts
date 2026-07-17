import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import matter from "gray-matter";

function markdownPlugin() {
  return {
    name: "markdown-frontmatter",
    transform(code: string, id: string) {
      if (!id.endsWith(".md")) return;
      const { data, content } = matter(code);
      return {
        code: `export default ${JSON.stringify({ metadata: data, body: content })}`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [reactRouter(), markdownPlugin()],
});
