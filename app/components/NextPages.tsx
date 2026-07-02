import { motion } from 'motion/react';
import { useLocation, useMatches, useNavigate } from 'react-router';
import { useSetCommand } from '../context';
import { Crumb } from './Crumb';
import { isSectionData, slideDown, staggerContainer, staggerItem } from '../lib';
import type { ExternalLink, PostResp, SectionData } from '../types';

import './NextPages.css';

interface PageEntryProps {
    post: PostResp;
    base: string;
}

const PageEntry = ({ post, base }: PageEntryProps) => {
    const navigate = useNavigate();
    const setCommand = useSetCommand();
    const variant = /\.[^/]+$/.test(post.slug) ? 'file' : 'folder';
    const label = variant === 'folder' ? `${post.slug} folder` : `${post.slug} file`;

    return (
        <motion.li variants={staggerItem}>
            <Crumb
                name={post.slug}
                variant={variant}
                aria-label={label}
                onClick={() => {
                    setCommand(variant === 'folder' ? `cd ${post.slug}/` : `cat ${post.slug}`);
                    navigate(`${base}/${post.slug}`)
                }}
            />
        </motion.li>
    );
}

interface LinkEntryProps {
    link: ExternalLink;
}

const LinkEntry = ({ link }: LinkEntryProps) => {
    return (
        <motion.li variants={staggerItem}>
            <a
                className="symlink"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name} (opens in a new tab)`}
            >
                <em>{link.name}</em> {"->"} <em>{link.url}</em>
            </a>
        </motion.li>
    );
}

interface NavigateEntryProps {
    name: string;
    to: string;
    label: string;
}

const NavigateEntry = ({ name, to, label }: NavigateEntryProps) => {
    const navigate = useNavigate();
    const setCommand = useSetCommand();

    return (
        <motion.li variants={staggerItem}>
            <Crumb
                name={name}
                variant="folder"
                aria-label={label}
                onClick={() => {
                    setCommand(`cd ${name}`)
                    navigate(to)
                }}
            />
        </motion.li>
    );
}

interface NextPagesProps {
    open: boolean;
}

export const NextPages = ({ open }: NextPagesProps) => {
    const { pathname } = useLocation();
    const matches = useMatches();
    const parentPath = pathname.split('/').slice(0, -1).join('/') || '/';

    const sectionMatch = [...matches]
        .reverse()
        .find(m => isSectionData(m.loaderData));

    const sectionData = sectionMatch?.pathname === pathname ? sectionMatch.loaderData as SectionData : null;

    const pages = sectionData?.pages ?? [];
    const links = sectionData?.links ?? [];
    const base = sectionMatch?.pathname === '/' ? '' : (sectionMatch?.pathname ?? '');

    return (
        <motion.nav
            id="navigation"
            role="navigation"
            aria-label="Directory contents"
            variants={slideDown}
            initial="exit"
            animate={open ? 'animate' : 'exit'}
        >
            <motion.ul className="pages" variants={staggerContainer}>
                <NavigateEntry name="." to={pathname} label="Current directory" />
                <NavigateEntry name=".." to={parentPath} label="Back" />

                {pages.map(page => <PageEntry key={page.slug} post={page} base={base} />)}
                {links.map(link => <LinkEntry key={link.url} link={link} />)}
            </motion.ul>
        </motion.nav>
    );
}
