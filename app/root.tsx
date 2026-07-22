import { isRouteErrorResponse, Outlet, useRouteError } from "react-router";

import App from "./app";
import type { SectionData } from "./types";
import { Article } from "./components/Article";
import { initSection, type RouteInfo } from "./lib/site-catalog";

export { Layout } from "./document"; // Re-export for react-router

import "./index.css";

function loadRoutes(): SectionData {
  const files = import.meta.glob<RouteInfo>("/app/markdown/*.md", {
    eager: true,
    import: "default",
  });

  const folders = import.meta.glob<RouteInfo>("/app/markdown/*/index.md", {
    eager: true,
    import: "default",
  });

  return initSection({ files, folders });
}

// loader: runs at build time so prerendered pages get correct data + meta.
// clientLoader: runs in the browser so non-prerendered slugs resolve client-side.
export const loader = loadRoutes;
export const clientLoader = loadRoutes;

export default function Root() {
  return (
    <App>
      <Outlet />
    </App>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let heading = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    heading = `${error.status} ${error.statusText}`;
    message = error.data || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <App>
      <Article>
        <h1 className="error">{heading}</h1>
        <p>{message}</p>
        <p>
          <a href="/">Return home</a>
        </p>
      </Article>
    </App>
  );
}
