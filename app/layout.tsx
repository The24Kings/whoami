import { Outlet } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

import { BreadCrumb, CommandContext, NextPages } from './components';
import type { CrumbData, CrumbVariants } from './components';

export default function RootLayout() {
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
            <nav
                id="top-bar"
                onMouseEnter={handleNavShow}
                onMouseLeave={handleNavHide}
                onFocus={handleNavShow}
                onBlur={handleNavHide}
            >
                <BreadCrumb path={cwdPath} command={command} />
                {showNav && <NextPages />}
            </nav>

            <Outlet />
        </CommandContext.Provider>
    );
}