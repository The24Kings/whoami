import { useLocation, useNavigate } from 'react-router';
import type { CrumbData } from "../components";

function buildCwdPath(
    pathname: string,
    navigate: (to: string) => void,
    setCommand: (cmd: string) => void,
): CrumbData[] {
    const segments = pathname.split('/').filter(Boolean);

    const home: CrumbData = {
        name: '~',
        variant: 'folder',
        onClick: () => {
            setCommand('cd ~');
            navigate('/');
        },
    };

    const crumbs: CrumbData[] = segments.map((seg, i) => {
        const isFile = seg.endsWith('.md');

        return {
            name: seg,
            variant: isFile ? 'file' : 'folder',
            onClick: () => {
                setCommand(isFile ? `cd ${seg}` : `cd ${seg}/`);
                navigate('/' + segments.slice(0, i + 1).join('/'));
            },
        };
    });

    return [home, ...crumbs];
}

export function useCwdPath(setCommand: (cmd: string) => void): CrumbData[] {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return buildCwdPath(pathname, navigate, setCommand);
}