import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "../components";
import type { CrumbData, CrumbVariants } from "../components/Crumb";
import NextPages from "../components/NextPages";
import { useState } from "react";
import { CommandContext } from "../components/CommandContext";

import "./Layout.css"

const Layout: React.FC = () => {
    const [command, setCommand] = useState("echo welcome");

    const location = useLocation();
    const navigate = useNavigate();

    const segments = location.pathname.split('/').filter(Boolean);

    const cwdPath: CrumbData[] = [
        { name: '~', variant: 'folder', onClick: () => navigate('/') },
        ...segments.map((seg, i) => ({
            name: seg,
            variant: seg.endsWith('.md') ? 'file' : 'folder' as CrumbVariants,
            onClick: () => navigate('/' + segments.slice(0, i + 1).join('/')),
        })),
    ];

    return (
        <CommandContext.Provider value={setCommand}>
            <nav id="top-bar">
                <BreadCrumb path={cwdPath} command={command} />
                <NextPages />
            </nav>

            <Outlet />
        </CommandContext.Provider>
    );
}

export default Layout