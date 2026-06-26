import React from 'react';
import type { PostMetadata } from '../types';
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

export const Card: React.FC<CardProps> = ({
    info,
    onClick,
}) => {
    const date = info.date.split('T')[0];

    return (
        <li>
            <div
                className="card"
                role="button"
                tabIndex={0}
                aria-label={`View ${info.title}`}
                onClick={onClick}
                onKeyDown={e => onKeyDown(e, onClick)}
            >
                <div className="body">
                    <h2 className="title">{info.title}</h2>
                    <time className="date" dateTime={info.date}>{date}</time>
                    <pre className="desc"><code>{info.desc}</code></pre>
                    <blockquote className="tags">
                        {info.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </blockquote>
                </div>
            </div>
        </li>
    )
};
