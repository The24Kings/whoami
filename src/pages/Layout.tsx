import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "../components";
import type { CrumbData, CrumbVariants } from "../components/Crumb";

const Layout: React.FC = () => {
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
        <>
            <BreadCrumb path={cwdPath} command={'this-is-a-really-long-command'} />
            <Outlet />
        </>
    );
}

export default Layout