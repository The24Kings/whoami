import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { BreadCrumb, NextPages } from './components';
import type { CrumbData, CrumbVariants } from './components';
import { CommandContext } from './context';

import './layout.css'

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

export default function SiteLayout({ children }: { children?: ReactNode }) {
    const [command, setCommand] = useState('echo welcome');
    const [showNav, setShowNav] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const segments = location.pathname.split('/').filter(Boolean);

    const cwdPath: CrumbData[] = [
        {
            name: '~',
            variant: 'folder',
            onClick: () => {
                setCommand('cd ~');
                navigate('/');
            },
        },
        ...segments.map((seg, i) => ({
            name: seg,
            variant: (seg.endsWith('.md') ? 'file' : 'folder') as CrumbVariants,
            onClick: () => {
                if (seg.endsWith('.md')) {
                    setCommand(`cd ${seg}`);
                } else {
                    setCommand(`cd ${seg}/`);
                }
                navigate('/' + segments.slice(0, i + 1).join('/'));
            },
        })),
    ];

    const handleNavShow = () => {
        setShowNav(true);
        setCommand('ls -a');
    };

    const handleNavHide = () => {
        setShowNav(false);
        setCommand('');
    };

    return (
        <CommandContext.Provider value={setCommand}>
            <a className="skip-link" href="#main-content">Skip to main content</a>
            <header
                id="top-bar"
                onMouseEnter={handleNavShow}
                onMouseLeave={handleNavHide}
                onFocus={handleNavShow}
                onBlur={handleNavHide}
            >
                <BreadCrumb path={cwdPath} command={command} />
                {showNav && <NextPages />}
            </header>

            <main id="main-content" tabIndex={-1}>
                {children ?? <Outlet />}
            </main>
        </CommandContext.Provider>
    );
}