import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import type { ReactNode } from "react";

import "./layout.css";

interface DocumentProps {
  children: ReactNode;
}

/** The base of the app that ultimately loads everything */
export function Layout({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/jpeg" href="/vash.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
