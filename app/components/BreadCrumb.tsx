import React, { useEffect, useState } from 'react';
import { Crumb } from './Crumb';

import type { CrumbData } from './Crumb';

import './BreadCrumb.css'

interface BreadCrumbProps {
    path: CrumbData[];
    command: string
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ path, command }) => {
    const [displayedCommand, setDisplayedCommand] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const typingSpeed = 35;

    // Typing animation for the command
    useEffect(() => {
        setIsTyping(true);

        const animate = (index: number) => {
            setDisplayedCommand(command.slice(0, index));
            if (index <= command.length) setTimeout(() => animate(index + 1), typingSpeed);
            if (index > command.length) setIsTyping(false);
        };

        animate(0);
    }, [command]);

    // Blinking Cursor
    useEffect(() => {
        if (isTyping) {
            setShowCursor(true);
            return;
        }

        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, [isTyping]);

    return (
        <nav id="navbar">
            <div className="prompt" >
                <span className="user">portfolio</span>
                <span className="cli-separator">@</span>
                <span className="hostname">navigator</span>
                <span className="cwd">
                    {path.map((crumb, i) => (
                        <Crumb
                            key={i}
                            name={crumb.name}
                            variant={crumb.variant}
                            onClick={crumb.onClick}
                        />
                    ))}
                </span>
                <span className="separator">{'> '}</span>
                <span className="cmd">{displayedCommand}</span>
                <span className="cursor">{showCursor ? "█" : ""}</span>
            </div>
        </nav>
    );
};
