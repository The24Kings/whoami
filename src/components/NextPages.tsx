import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useSetCommand } from './CommandContext';
import Crumb from './Crumb';
import type { ExternalLink, PostResp, SectionData } from '../Types';

import './NextPages.css';

function isSectionData(data: unknown): data is SectionData {
    return typeof data === 'object' && data !== null && 'posts' in data;
}

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
            <a className="symlink" href={link.url} target="_blank" rel="noopener noreferrer">
                <em>{link.name}</em> {"->"} <em>{link.url}</em>
            </a>
        </li>
    );
}

function NextPages() {
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
            <nav id="navigation">
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

export default NextPages;