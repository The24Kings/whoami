import { useEffect, useRef } from "react";

/**
 * Giscus discussion widget script
 *
 * <script
 *  src="https://giscus.app/client.js"
 *  data-repo="The24Kings/the24kings.github.io"
 *  data-repo-id="R_kgDOJ04nAg"
 *  data-category="Articles"
 *  data-category-id="DIC_kwDOJ04nAs4DDrOI"
 *  data-mapping="og:title"
 *  data-strict="1"
 *  data-reactions-enabled="1"
 *  data-emit-metadata="0"
 *  data-input-position="top"
 *  data-theme="preferred_color_scheme"
 *  data-lang="en"
 *  data-loading="lazy"
 *  crossOrigin="anonymous"
 *  async
 * ></script>
 */

/**
 * Free Open Source CDN for testing the theme in dev.
 * The css needs to be hosted somewhere for it to load properly.
 */
const THEME_URL =
  "https://cdn.jsdelivr.net/gh/The24Kings/whoami@main/public/giscus.css";

export function useGiscusDiscussion() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = commentsRef.current;

    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    Object.entries({
      repo: "The24Kings/the24kings.github.io",
      "repo-id": "R_kgDOJ04nAg",
      category: "Articles",
      "category-id": "DIC_kwDOJ04nAs4DDrOI",
      mapping: "url",
      strict: "1",
      "reactions-enabled": "1",
      "emit-metadata": "0",
      "input-position": "bottom",
      theme: THEME_URL,
      lang: "en",
      loading: "lazy",
    }).forEach(([k, v]) => script.setAttribute(`data-${k}`, v));

    container.appendChild(script);

    return () => {
      container.innerHTML = ""; // drop the widget when the route changes
    };
  }, [commentsRef]);

  return commentsRef;
}
