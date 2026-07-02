import React from 'react';
import { motion } from 'motion/react';
import type { PostMetadata } from '../types';
import { hoverScale, tapScale, useTagFilter } from '../lib';
import { useSetCommand } from '../context';

import './Card.css';

export interface CardProps {
    info: PostMetadata;
    onClick?: () => void;
}

function onKeyDown(e: React.KeyboardEvent, onClick?: () => void) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
    }
}

function stopPointerPropagation(el: HTMLButtonElement | null) {
    el?.addEventListener('pointerdown', e => e.stopPropagation());
}

export const Card = ({ info, onClick }: CardProps) => {
    const { active, toggleTag } = useTagFilter();
    const setCommand = useSetCommand();
    const date = info.date?.split('T')[0];
    const src = info.image?.trim();

    const tags = info.tags ?? [];
    const sorted = [...tags].sort((a, b) => a.localeCompare(b));

    const onTagSelect = (e: React.MouseEvent, tag: string) => {
        e.stopPropagation();
        const next = toggleTag(tag);
        setCommand(next.length ? next.map(t => `grep ${t}`).join(' | ') : '');
    }

    return (
        <motion.div
            className="card"
            role="button"
            tabIndex={0}
            aria-label={`View ${info.title}`}
            onClick={onClick}
            onKeyDown={e => onKeyDown(e, onClick)}
            whileHover={hoverScale}
            whileTap={tapScale}
        >
            {src && <div className="img"><img src={src} alt={info.title} /></div>}
            <div className="body">
                <h2 className="title">{info.title}</h2>
                <time className="date" dateTime={info.date}>{date}</time>
                <pre className="desc"><code>{info.desc}</code></pre>
                <blockquote className="tags">
                    {sorted?.map(tag =>
                        <button
                            key={tag}
                            ref={stopPointerPropagation}
                            className={active.includes(tag) ? 'tag active' : 'tag'}
                            onClick={e => onTagSelect(e, tag)}
                        >
                            {tag}
                        </button>
                    )}
                </blockquote>
            </div>
        </motion.div>
    )
};
