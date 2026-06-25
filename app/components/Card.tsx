import React from 'react';
import type { PostMetadata } from '../types';
import './Card.css';

export interface CardProps {
    info: PostMetadata;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    info,
    onClick,
}) => {
    const date = info.date.split('T')[0];

    return (
        <li>
            <div className="card" onClick={onClick}>
                <div className="body">
                    <h2 id="title">{info.title}</h2>
                    <h4 id="date">{date}</h4>
                    <pre id="desc"><code>{info.desc}</code></pre>
                    <blockquote id="tags">
                        {info.tags?.map(tag => <span key={tag} id="tag">{tag}</span>)}
                    </blockquote>
                </div>
            </div>
        </li>
    )
};
