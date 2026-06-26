import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useSetCommand } from './CommandContext';
import { Crumb } from './Crumb';
import { isSectionData } from '../lib';
import type { ExternalLink, PostResp, SectionData } from '../types';

import './NextPages.css';

function PageEntry({ post, base }: { post: PostResp; base: string }) {
    const navigate = useNavigate();
    const setCommand = useSetCommand();
    const variant = /\.[^/]+$/.test(post.slug) ? 'file' : 'folder';

    return (
        <li>
            <Crumb
                name={post.slug}
                variant={variant}
                onClick={() => {
                    setCommand(variant === 'folder' ? `cd ${post.slug}/` : `cat ${post.slug}`);
                    navigate(`${base}/${post.slug}`)
                }}
            />
        </li>
    );
}

function LinkEntry({ link }: { link: ExternalLink }) {
    return (
        <li>
            <a
                className="symlink"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name} (opens in a new tab)`}
            >
                <em>{link.name}</em> {"->"} <em>{link.url}</em>
            </a>
        </li>
    );
}

export function NextPages() {
    const { pathname } = useLocation();
    const matches = useMatches();
    const setCommand = useSetCommand();
    const navigate = useNavigate();
    const parentPath = pathname.split('/').slice(0, -1).join('/') || '/';

    const sectionMatch = [...matches]
        .reverse()
        .find(m => isSectionData(m.loaderData));

    const sectionData = sectionMatch?.pathname === pathname ? sectionMatch.loaderData as SectionData : null;

    const posts = sectionData?.posts ?? [];
    const links = sectionData?.links ?? [];
    const base = sectionMatch?.pathname === '/' ? '' : (sectionMatch?.pathname ?? '');

    return (
        <>
            <nav id="navigation" aria-label="Directory contents">
                <ul className="pages">
                    <li>
                        <Crumb
                            name="."
                            variant="folder"
                            onClick={() => {
                                setCommand("cd .")
                                navigate(pathname)
                            }}
                        />
                    </li>
                    <li>
                        <Crumb
                            name=".."
                            variant="folder"
                            onClick={() => {
                                setCommand("cd ..")
                                navigate(parentPath)

                            }}
                        />
                    </li>

                    {posts.map(post => <PageEntry key={post.slug} post={post} base={base} />)}
                    {links.map(link => <LinkEntry key={link.url} link={link} />)}
                </ul>
            </nav>
        </>
    );
}
