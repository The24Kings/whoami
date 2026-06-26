import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { BreadCrumb, NextPages } from './components';
import { CommandContext } from './context';
import { useCwdPath } from './lib';

import './layout.css'

/** THe base of the app that ultimately loads everything */
export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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

/** Navigation and container around site content */
export default function SiteContainer({ children }: { children?: ReactNode }) {
    const [command, setCommand] = useState('echo welcome');
    const [hovering, setHovering] = useState(false);
    const [focused, setFocused] = useState(false);
    const showNav = hovering || focused;

    useEffect(() => {
        setCommand(showNav ? 'ls -a' : '');
    }, [showNav]);

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        // ignore focus moving between elements still inside the header
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setFocused(false);
    };

    return (
        <CommandContext.Provider value={setCommand}>
            <a className="skip-link" href="#main-content">Skip to main content</a>
            <header
                id="top-bar"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => { setHovering(false); setFocused(false); }}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
            >
                <BreadCrumb path={useCwdPath(setCommand)} command={command} />
                {showNav && <NextPages />}
            </header>

            <main id="main-content" tabIndex={-1}>
                {children ?? <Outlet />}
            </main>
        </CommandContext.Provider>
    );
}