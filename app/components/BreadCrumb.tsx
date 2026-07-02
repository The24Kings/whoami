import { useEffect, useState } from 'react';
import { Crumb } from './Crumb';
import type { CrumbProps } from './Crumb';

import './BreadCrumb.css'

interface BreadCrumbProps {
    path: CrumbProps[];
    command: string
}

export const BreadCrumb = ({ path, command }: BreadCrumbProps) => {
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

        // Let the breadcrumb paint before the very first command types out
        const startTimeout = setTimeout(() => animate(0), 50);

        return () => clearTimeout(startTimeout);
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
        <div id="navbar" role="group" aria-label="Breadcrumb">
            <div className="prompt" >
                <span className="user">portfolio</span>
                <span className="cli-separator">@</span>
                <span className="hostname">navigator</span>
                <span className="cwd">
                    {path.map((crumb, i) => (
                        <Crumb
                            key={`${crumb.name}-${i}`}
                            current={i === path.length - 1}
                            {...crumb}
                        />
                    ))}
                </span>
                <span className="separator">{'> '}</span>
                <span className="cmd">{displayedCommand}</span>
                <span className="cursor" aria-hidden="true">{showCursor ? "█" : ""}</span>
            </div>
        </div>
    );
};
