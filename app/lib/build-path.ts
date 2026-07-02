import { useLocation, useNavigate } from 'react-router';
import type { CrumbProps, CrumbVariants } from "../components";

interface CrumbSpec {
    name: string;
    to: string;
    command: string;
    variant: CrumbVariants;
    label?: string;
}

function toCrumb(
    { name, to, command, variant, label }: CrumbSpec,
    navigate: (to: string) => void,
    setCommand: (cmd: string) => void,
): CrumbProps {
    return {
        name,
        variant,
        'aria-label': label ?? `${name} ${variant}`,
        onClick: () => {
            setCommand(command);
            navigate(to);
        },
    };
}

function buildCwdPath(
    pathname: string,
    navigate: (to: string) => void,
    setCommand: (cmd: string) => void,
): CrumbProps[] {
    const segments = pathname.split('/').filter(Boolean);

    const specs: CrumbSpec[] = [
        { name: '~', to: '/', command: 'cd ~', variant: 'folder', label: 'Home directory' },
        ...segments.map((seg, i): CrumbSpec => {
            const isFile = seg.endsWith('.md');

            return {
                name: seg,
                to: '/' + segments.slice(0, i + 1).join('/'),
                command: isFile ? `cd ${seg}` : `cd ${seg}/`,
                variant: isFile ? 'file' : 'folder',
            };
        }),
    ];

    return specs.map(spec => toCrumb(spec, navigate, setCommand));
}

export function useCwdPath(setCommand: (cmd: string) => void): CrumbProps[] {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return buildCwdPath(pathname, navigate, setCommand);
}