import { useSearchParams } from "react-router";

/** Provide ability to set and filter on project tags */
export function useTagFilter() {
  const [params, setParams] = useSearchParams();
  const active = params.get("tags")?.split(",").filter(Boolean) ?? [];

  const toggleTag = (tag: string) => {
    const next = active.includes(tag)
      ? active.filter((t) => t !== tag)
      : [...active, tag];
    setParams(next.length ? { tags: next.join(",") } : {});

    return next;
  };

  return { active, toggleTag };
}
