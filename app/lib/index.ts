export { md, renderMarkdown } from "./markdown";
export { isSectionData, findPostBySlug, postMeta } from "./posts";
export { useCwdPath } from "./useCwdPath";
export { useTagFilter } from "./useTagFilter";
export { useDirectoryNavigation } from "./useDirectoryNavigation";
export type { DirectoryNavigation } from "./useDirectoryNavigation";
export {
  createProjectSection,
  isProjectMarkdownFile,
  projectPrerenderPaths,
} from "./project-catalog";
export type { ProjectModule } from "./project-catalog";
export {
  easeOut,
  slideDown,
  staggerContainer,
  staggerItem,
  fadeIn,
  hoverScale,
  tapScale,
} from "./animations";
export { CommandContext } from "./contexts";
export { useCommandContext } from "./useCommandContext";

/**
 * Route IDs
 *
 * Strongly typed route IDs for use in the application. These IDs are used 
 * to identify different routes in the application and can be used for 
 * navigation, routing, and other purposes.
 */
export const RouteId = {
  root: "root",
  projects: "projects",
};
