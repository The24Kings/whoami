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

    return (
        <motion.li variants={staggerItem}>
            <Crumb
                name={post.slug}
                variant={variant}
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

export const NextPages = () => {
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
        <motion.nav
            id="navigation"
            aria-label="Directory contents"
            variants={slideDown}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.ul className="pages" variants={staggerContainer}>
                <motion.li variants={staggerItem}>
                    <Crumb
                        name="."
                        variant="folder"
                        onClick={() => {
                            setCommand("cd .")
                            navigate(pathname)
                        }}
                    />
                </motion.li>
                <motion.li variants={staggerItem}>
                    <Crumb
                        name=".."
                        variant="folder"
                        onClick={() => {
                            setCommand("cd ..")
                            navigate(parentPath)

                        }}
                    />
                </motion.li>

                {posts.map(post => <PageEntry key={post.slug} post={post} base={base} />)}
                {links.map(link => <LinkEntry key={link.url} link={link} />)}
            </motion.ul>
        </motion.nav>
    );
}
