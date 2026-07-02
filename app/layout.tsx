import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
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
        <MotionConfig reducedMotion="user">
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
                    <NextPages open={showNav} />
                </header>

                {/* Made inert while the nav panel is open so content it visually covers can't be focused or clicked */}
                <main id="main-content" tabIndex={-1} inert={showNav}>
                    {children ?? <Outlet />}
                </main>
            </CommandContext.Provider>
        </MotionConfig>
    );
}