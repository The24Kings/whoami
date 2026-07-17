/**
 * Route IDs
 *
 * `root` is the framework root route (app/root.tsx) and is always 'root'.
 * The others are assigned explicitly in app/routes.ts via the route `id`
 * option, so moving the route files around never changes these IDs.
 */
export const RouteId = {
  root: "root",
  projects: "projects",
} as const;
